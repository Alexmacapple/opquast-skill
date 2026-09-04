#!/usr/bin/env node

/**
 * Opquast Bridge - Unified Analysis
 *
 * Combines static analysis guidance with DOM analysis for comprehensive
 * Opquast rule checking. This bridge allows the skill to invoke both
 * analysis types through a single entry point.
 *
 * Usage:
 *   node scripts/bridge.js <url> [options]
 *   node scripts/bridge.js https://example.com --json
 *   node scripts/bridge.js https://example.com --dom-only
 *
 * Programmatic usage:
 *   import { runUnifiedAnalysis } from './scripts/bridge.js';
 */

import { analyze, getAnalyzerInfo, getSupportedRules } from './dom-analyzer/lib/analyzer.js';
import { runStaticValidators, getValidatorInfo } from './static-analyzer/validators.js';
import { detectSPA, getSPADetectorInfo } from './static-analyzer/spa-detector.js';
import { INTERACTION_CHECKS } from './dom-analyzer/checks/interaction-checks.js';
import { exportResults, getExporterInfo, SUPPORTED_FORMATS } from './exporters/index.js';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load Opquast rules from JSON
 * @returns {Promise<Object>}
 */
async function loadOpquastRules() {
  const rulesPath = join(__dirname, '..', 'rules', 'opquast-v5.json');
  const data = await readFile(rulesPath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Run unified analysis combining static guidance + DOM analysis
 *
 * @param {string} url - URL to analyze
 * @param {Object} options - Analysis options
 * @param {boolean} options.domOnly - Only run DOM analysis
 * @param {boolean} options.includeStatic - Include static rules summary
 * @param {string} options.theme - Filter by theme (accessibilite, seo, etc.)
 * @param {string} options.rubrique - Filter by rubrique
 * @returns {Promise<Object>} Unified analysis results
 */
/**
 * Keep only the violations whose Opquast rule belongs to the selected rule set (theme / rubrique filters)
 * @param {Array} violations
 * @param {Array} rules - rules kept after filtering (objects with id)
 * @returns {Array}
 */
export function filterViolationsByRules(violations, rules) {
  const allowed = new Set(rules.map(r => r.id));
  return violations.filter(v => allowed.has(v.opquastId));
}

export async function runUnifiedAnalysis(url, options = {}) {
  const {
    domOnly = false,
    includeStatic = true,
    theme = null,
    rubrique = null,
    spaDetection = true,
    storageState = null
  } = options;

  const results = {
    url,
    timestamp: new Date().toISOString(),
    success: true,
    warnings: [],
    analysis: {
      spaDetection: null,
      dom: null,
      static: null,
      heuristic: null
    },
    summary: {
      // Dérivé du référentiel après chargement (r1-z04-013) ; reste null si le référentiel est illisible
      totalRules: null,
      domRulesChecked: 0,
      staticRulesChecked: 0,
      staticRulesApplicable: 0,
      violations: [],
      coverage: {}
    }
  };

  try {
    // Load rules database
    const rulesDb = await loadOpquastRules();
    let rules = rulesDb.rules;
    // Le total vient du référentiel, jamais d'une constante recopiée (r1-z04-013)
    results.summary.totalRules = rulesDb.total_rules ?? rules.length;

    // Filter by theme if specified
    if (theme) {
      const themeMap = {
        'accessibilite': 'Accessibilité',
        'seo': 'SEO',
        'securite': 'Sécurité',
        'privacy': 'Données personnelles',
        'ecoconception': 'Écoconception',
        'mobile': 'Mobile',
        'basics': 'Basics'
      };
      const tagName = themeMap[theme.toLowerCase()] || theme;
      rules = rules.filter(r => r.tags && r.tags.includes(tagName));
    }

    // Filter by rubrique if specified
    if (rubrique) {
      rules = rules.filter(r =>
        r.rubrique && r.rubrique.toLowerCase().includes(rubrique.toLowerCase())
      );
    }

    // 1. Run DOM analysis
    console.error(`[Bridge] Running DOM analysis on ${url}...`);
    const domResults = await analyze(url, {
      includeWarnings: false,
      includeCustomChecks: true,
      storageState
    });

    results.analysis.dom = domResults;
    results.summary.domRulesChecked = domResults.stats?.totalRulesChecked || 0;

    // Add DOM violations to summary
    if (domResults.violations) {
      // Conserver la source PRD-002 (axe-core / custom-check) ; la lane est portée par un champ distinct (r1-z03-043)
      results.summary.violations.push(...domResults.violations.map(v => ({
        ...v,
        source: v.source || 'dom',
        lane: 'dom'
      })));
    }

    // 2. Run static heuristic validators (PRD-001)
    if (!domOnly) {
      try {
        console.error(`[Bridge] Running static heuristic validators...`);
        const response = await fetch(url, {
          headers: { 'User-Agent': 'OpquastBot/1.0' },
          signal: AbortSignal.timeout(30000)
        });
        if (!response.ok) {
          // Une page d'erreur HTTP n'est pas la page à auditer (r1-z04-007)
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        const html = await response.text();

        // Pre-flight SPA detection (v2 - warning only, never skip)
        let spaInfo = null;
        if (spaDetection) {
          spaInfo = detectSPA(html, url);
          results.analysis.spaDetection = spaInfo;

          if (spaInfo.isSPA) {
            const confPct = Math.round(spaInfo.confidence * 100);
            console.error(`[Bridge] ${spaInfo.isSSR ? 'SSR Hybride' : 'SPA'} détecté: ${spaInfo.framework} (${confPct}%)`);

            results.warnings.push(...spaInfo.warnings);

            if (spaInfo.recommendation === 'dom-preferred') {
              console.error(`[Bridge] Recommandation: privilégier les résultats DOM Analyzer`);
            }
          }
        }

        // Static validators run TOUJOURS (même pour SPA)
        const heuristicResults = runStaticValidators(html, url);
        results.analysis.heuristic = heuristicResults;
        results.summary.staticRulesChecked = heuristicResults.passed.length + heuristicResults.failed.length;

        // Ajouter metadata SPA aux résultats heuristiques
        if (spaInfo?.isSPA) {
          results.analysis.heuristic.spaWarning = {
            framework: spaInfo.framework,
            reliability: spaInfo.isSSR ? 'medium' : 'low',
            note: 'Résultats statiques peuvent être incomplets pour contenu client-rendered'
          };
        }

        // Add heuristic violations to summary
        results.summary.violations.push(...heuristicResults.failed.map(v => ({
          ...v,
          source: v.source || 'static-heuristic',
          lane: 'static-heuristic'
        })));

        console.error(`[Bridge] Heuristic validators: ${heuristicResults.passed.length} passed, ${heuristicResults.failed.length} failed, ${heuristicResults.skipped.length} skipped`);
      } catch (fetchError) {
        console.error(`[Bridge] Warning: Could not fetch HTML for static validation: ${fetchError.message}`);
        // Forme stable même en erreur (r1-z04-009)
        results.analysis.heuristic = { error: fetchError.message, passed: [], failed: [], skipped: [], errors: [] };
      }
    }

    // 3. Get static rules info (for guidance on remaining rules)
    if (includeStatic && !domOnly) {
      const staticRules = rules.filter(r => r.category === 'static');
      const domRules = rules.filter(r => r.category === 'requires_dom');
      const interactionRules = rules.filter(r => r.category === 'requires_interaction');

      // Ne soustraire que les validateurs qui portent sur des règles static (r1-z04-010)
      const staticIds = new Set(staticRules.map(r => r.id));
      const heuristicStatic = [...(results.analysis.heuristic?.passed || []), ...(results.analysis.heuristic?.failed || [])].filter(v => staticIds.has(v.opquastId)).length;
      const heuristicCount = results.summary.staticRulesChecked || 0;
      const remainingStatic = staticRules.length - heuristicStatic;

      results.analysis.static = {
        totalStaticRules: staticRules.length,
        heuristicChecked: heuristicCount,
        remainingForLLM: remainingStatic,
        staticRuleIds: staticRules.map(r => r.id),
        note: `${heuristicCount} rules checked via heuristics (deterministic), ${remainingStatic} require LLM interpretation`
      };

      results.summary.staticRulesApplicable = staticRules.length;

      // Couverture DOM = règles requires_dom réellement couvertes par l'analyseur, pas nombre d'identifiants axe (r1-z04-002)
      // Règles couvertes par l'analyseur DOM : axe-core, checks custom et checks d'interaction (PRD-004)
      const supported = new Set([...getSupportedRules(), ...Object.keys(INTERACTION_CHECKS).map(Number)]);
      const domCovered = domRules.filter(r => supported.has(r.id)).length;
      results.summary.domRulesChecked = domCovered;
      results.summary.coverage = {
        dom: {
          checked: domCovered,
          total: domRules.length,
          percentage: domRules.length ? Math.round((domCovered / domRules.length) * 100) : 0,
          note: `${domCovered} règles requires_dom automatisées ; ${supported.size} règles Opquast distinctes couvertes par axe-core et les checks custom`
        },
        heuristic: {
          checked: heuristicCount,
          // Nombre de validateurs réellement déclarés, pas une constante recopiée (r1-z04-014)
          validators: results.analysis.heuristic?.validators ?? getValidatorInfo().validators,
          note: 'Deterministic HTML pattern checks'
        },
        static: {
          applicable: staticRules.length,
          remaining: remainingStatic,
          note: 'Remaining rules require LLM analysis'
        },
        interaction: {
          count: interactionRules.length,
          note: 'Requires manual testing'
        }
      };
    }

    // Appliquer les filtres --theme / --rubrique aux violations (r1-z04-005)
    if (theme || rubrique) {
      results.summary.violations = filterViolationsByRules(results.summary.violations, rules);
      results.summary.filteredRuleIds = rules.map(r => r.id);
    }

    // Update success based on DOM analysis
    results.success = domResults.success;
    if (!domResults.success) {
      results.error = domResults.error;
    }

  } catch (error) {
    results.success = false;
    results.error = error.message;
  }

  return results;
}

/**
 * Format unified results for console
 * Exportée pour être testable sans passer par le CLI (r1-z04-021)
 * @param {Object} results
 */
export function formatResults(results) {
  console.log('\n================================================');
  console.log('  Opquast Unified Analysis (Bridge)');
  console.log('================================================\n');

  console.log(`URL: ${results.url}`);
  console.log(`Date: ${results.timestamp}`);
  console.log(`Status: ${results.success ? 'OK' : 'ERROR'}`);

  if (!results.success) {
    console.log(`Error: ${results.error}`);
    return;
  }

  // Coverage summary
  console.log('\n--- Coverage ---\n');
  if (results.summary.coverage.dom) {
    console.log(`DOM Rules: ${results.summary.coverage.dom.checked}/${results.summary.coverage.dom.total} checked (${results.summary.coverage.dom.percentage}%)`);
  }
  if (results.summary.coverage.heuristic) {
    console.log(`Heuristic Validators: ${results.summary.coverage.heuristic.checked}/${results.summary.coverage.heuristic.validators} (deterministic)`);
  }
  if (results.summary.coverage.static) {
    // ?? et non || : 0 règle restante doit s'afficher 0, pas le total applicable (r1-z04-015)
    console.log(`Static Rules: ${results.summary.coverage.static.remaining ?? results.summary.coverage.static.applicable} remaining (LLM required)`);
  }
  if (results.summary.coverage.interaction) {
    console.log(`Interaction Rules: ${results.summary.coverage.interaction.count} (manual testing)`);
  }

  // Violations
  if (results.summary.violations.length > 0) {
    // Le compteur agrège les deux lanes : le titre le dit explicitement (r1-z04-019)
    const domCount = results.summary.violations.filter(v => v.lane !== 'static-heuristic').length;
    const heuristicCount = results.summary.violations.length - domCount;
    console.log(`\n--- Violations (${results.summary.violations.length}: ${domCount} DOM, ${heuristicCount} static heuristics) ---\n`);

    // Group by severity
    const bySeverity = {
      critical: results.summary.violations.filter(v => v.severity === 'critical'),
      major: results.summary.violations.filter(v => v.severity === 'major'),
      minor: results.summary.violations.filter(v => v.severity === 'minor')
    };

    for (const [severity, violations] of Object.entries(bySeverity)) {
      if (violations.length > 0) {
        console.log(`[${severity.toUpperCase()}] (${violations.length})`);
        for (const v of violations) {
          console.log(`  - Règle ${v.opquastId}: ${v.title}`);
          // Les violations heuristiques n'ont pas de nodes mais un champ details (r1-z04-020)
          if (v.nodes?.length) {
            console.log(`    Elements: ${v.nodes.length}`);
          } else if (v.details) {
            console.log(`    Details: ${v.details}`);
          } else {
            console.log('    Elements: 0');
          }
        }
        console.log('');
      }
    }
  } else {
    // Le compteur couvre DOM et heuristiques : le message d'absence aussi (r1-z04-019)
    console.log('\n✓ No violations found (DOM analysis and static heuristics)\n');
  }

  // Guidance for static analysis
  if (results.analysis.static) {
    console.log('--- Static Analysis Guidance ---\n');
    console.log(`${results.analysis.static.totalStaticRules} static rules can be checked via WebFetch.`);
    console.log('Use: /opquast <url> for full analysis including static rules.\n');
  }
}

/**
 * Analyse les arguments CLI d'une invocation d'analyse (hors --help et --info).
 * Exportée pour être testable sans lancer d'analyse (r1-z04-021).
 *
 * @param {string[]} args - process.argv.slice(2)
 * @returns {{url: string|undefined, options: Object, errors: string[]}}
 */
export function parseCliOptions(args) {
  const errors = [];
  const url = args[0];

  // Sans garde, `node scripts/bridge.js --json` prend « --json » pour l'URL (r1-z04-016)
  if (!/^https?:\/\//i.test(url ?? '')) {
    errors.push(`URL invalide : « ${url ?? ''} ». Une adresse http:// ou https:// est attendue en premier argument.`);
  }

  const options = {
    domOnly: args.includes('--dom-only'),
    spaDetection: !args.includes('--no-spa-detection'),
    theme: null,
    rubrique: null,
    storageState: null
  };

  // Un drapeau ne peut pas servir de valeur : --theme --json vidait silencieusement le jeu de règles (r1-z04-017)
  for (const [flag, key] of [['--theme', 'theme'], ['--rubrique', 'rubrique']]) {
    const idx = args.indexOf(flag);
    if (idx === -1) continue;
    const value = args[idx + 1];
    if (value === undefined || value.startsWith('--')) {
      errors.push(`${flag} attend une valeur (reçu : ${value === undefined ? 'aucun argument' : `« ${value} »`}).`);
      continue;
    }
    options[key] = value;
  }

  return { url, options, errors };
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Opquast Bridge - Unified Analysis

Usage:
  node scripts/bridge.js <url> [options]

Options:
  --format <fmt>      Output format: ${SUPPORTED_FORMATS.join(', ')} (default: text)
  --output <file>     Write output to file (stdout if omitted)
  --json              Shortcut for --format json
  --dom-only          Only run DOM analysis
  --no-spa-detection  Disable SPA framework detection
  --auth-state <file> Use saved authentication state (from auth-helper.js)
  --theme <name>      Filter by theme (accessibilite, seo, securite, etc.)
  --rubrique <n>      Filter by rubrique (formulaires, navigation, etc.)
  --help, -h          Show this help

Authentication (for protected pages):
  1. node scripts/auth-helper.js https://example.com/login
  2. Login in browser, close when done
  3. node scripts/bridge.js https://example.com/protected --auth-state .opquast-auth.json

Examples:
  node scripts/bridge.js https://example.com
  node scripts/bridge.js https://example.com --json
  node scripts/bridge.js https://example.com --format html --output report.html
  node scripts/bridge.js https://example.com --format pdf --output report.pdf
  node scripts/bridge.js https://example.com --theme accessibilite
  node scripts/bridge.js https://protected.com/dashboard --auth-state .opquast-auth.json
`);
    process.exit(0);
  }

  if (args[0] === '--info') {
    const domInfo = getAnalyzerInfo();
    const validatorInfo = getValidatorInfo();
    const spaInfo = getSPADetectorInfo();
    const exporterInfo = getExporterInfo();
    console.log(JSON.stringify({
      bridge: {
        name: 'Opquast Bridge',
        version: '1.3.0',
        capabilities: ['dom-analysis', 'static-heuristics', 'spa-detection', 'unified-report', 'html-export', 'pdf-export']
      },
      domAnalyzer: domInfo,
      staticValidators: validatorInfo,
      spaDetector: spaInfo,
      exporters: exporterInfo
    }, null, 2));
    process.exit(0);
  }

  const { url, options, errors } = parseCliOptions(args);

  if (errors.length > 0) {
    errors.forEach(message => console.error(`[Bridge] ${message}`));
    console.error('Utilisation : node scripts/bridge.js <url> [--json] [--dom-only] [--theme <nom>] [--rubrique <nom>]');
    process.exitCode = 2;
    return;
  }

  // Parse auth-state option
  const authStateIdx = args.indexOf('--auth-state');
  if (authStateIdx !== -1 && args[authStateIdx + 1]) {
    const authStateFile = args[authStateIdx + 1];
    try {
      const authData = JSON.parse(await readFile(authStateFile, 'utf-8'));
      options.storageState = authData.storageState || authData;
      console.error(`[Bridge] Using authentication state from: ${authStateFile}`);
    } catch (err) {
      console.error(`[Bridge] Error loading auth state: ${err.message}`);
      console.error(`[Bridge] Run: node scripts/auth-helper.js <login-url> to create auth state`);
      process.exitCode = 2;
      return;
    }
  }

  // Parse format option (default: text)
  let format = 'text';
  const formatIdx = args.indexOf('--format');
  if (formatIdx !== -1 && args[formatIdx + 1]) {
    format = args[formatIdx + 1].toLowerCase();
    if (!SUPPORTED_FORMATS.includes(format)) {
      console.error(`Error: Unsupported format '${format}'. Supported: ${SUPPORTED_FORMATS.join(', ')}`);
      process.exitCode = 2;
      return;
    }
  } else if (args.includes('--json')) {
    format = 'json';
  }

  // Parse output file option
  let outputFile = null;
  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    outputFile = args[outputIdx + 1];
  }

  // Run analysis
  const results = await runUnifiedAnalysis(url, options);

  // Export based on format
  try {
    const exported = await exportResults(results, format);

    if (outputFile) {
      // Write to file
      if (format === 'pdf') {
        await writeFile(outputFile, exported);
      } else {
        await writeFile(outputFile, exported, 'utf8');
      }
      console.error(`Report saved to: ${outputFile}`);
    } else {
      // Write to stdout
      if (format === 'pdf') {
        // PDF cannot be written to stdout as text
        console.error('Error: PDF format requires --output <file>');
        process.exitCode = 2;
        return;
      }
      console.log(exported);
    }
  } catch (exportError) {
    console.error(`Export error: ${exportError.message}`);
    process.exitCode = 2;
    return;
  }

  // 0 conforme, 1 violations, 2 analyse échouée (r1-z04-003). exitCode plutôt que exit() : la sortie JSON n'est jamais tronquée (r1-z04-011)
  process.exitCode = !results.success ? 2 : (results.summary.violations.length > 0 ? 1 : 0);
}

// Run only when invoked as a CLI, never on import (r1-z04-001)
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  // Sans .catch, un rejet de formatResults ou de JSON.stringify termine le processus sur une
  // trace brute d'unhandledRejection, sans message exploitable (r1-z04-018)
  main().catch((error) => {
    console.error(`[Bridge] Erreur inattendue : ${error?.message ?? error}`);
    if (error?.stack) console.error(error.stack);
    process.exitCode = 2;
  });
}
