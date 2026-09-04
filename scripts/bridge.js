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

import { analyze, getAnalyzerInfo } from './dom-analyzer/lib/analyzer.js';
import { runStaticValidators, getValidatorInfo } from './static-analyzer/validators.js';
import { detectSPA, getSPADetectorInfo } from './static-analyzer/spa-detector.js';
import { exportResults, getExporterInfo, SUPPORTED_FORMATS } from './exporters/index.js';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
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
      totalRules: 245,
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
      results.summary.violations.push(...domResults.violations.map(v => ({
        ...v,
        source: 'dom'
      })));
    }

    // 2. Run static heuristic validators (PRD-001)
    if (!domOnly) {
      try {
        console.error(`[Bridge] Running static heuristic validators...`);
        const response = await fetch(url, {
          headers: { 'User-Agent': 'OpquastBot/1.0' }
        });
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
          source: 'static-heuristic'
        })));

        console.error(`[Bridge] Heuristic validators: ${heuristicResults.passed.length} passed, ${heuristicResults.failed.length} failed, ${heuristicResults.skipped.length} skipped`);
      } catch (fetchError) {
        console.error(`[Bridge] Warning: Could not fetch HTML for static validation: ${fetchError.message}`);
        results.analysis.heuristic = { error: fetchError.message };
      }
    }

    // 3. Get static rules info (for guidance on remaining rules)
    if (includeStatic && !domOnly) {
      const staticRules = rules.filter(r => r.category === 'static');
      const domRules = rules.filter(r => r.category === 'requires_dom');
      const interactionRules = rules.filter(r => r.category === 'requires_interaction');

      const heuristicCount = results.summary.staticRulesChecked || 0;
      const remainingStatic = staticRules.length - heuristicCount;

      results.analysis.static = {
        totalStaticRules: staticRules.length,
        heuristicChecked: heuristicCount,
        remainingForLLM: remainingStatic,
        staticRuleIds: staticRules.map(r => r.id),
        note: `${heuristicCount} rules checked via heuristics (deterministic), ${remainingStatic} require LLM interpretation`
      };

      results.summary.staticRulesApplicable = staticRules.length;

      results.summary.coverage = {
        dom: {
          checked: results.summary.domRulesChecked,
          total: domRules.length,
          percentage: Math.round((results.summary.domRulesChecked / domRules.length) * 100)
        },
        heuristic: {
          checked: heuristicCount,
          validators: 10,
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
 * @param {Object} results
 */
function formatResults(results) {
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
    console.log(`Static Rules: ${results.summary.coverage.static.remaining || results.summary.coverage.static.applicable} remaining (LLM required)`);
  }
  if (results.summary.coverage.interaction) {
    console.log(`Interaction Rules: ${results.summary.coverage.interaction.count} (manual testing)`);
  }

  // Violations
  if (results.summary.violations.length > 0) {
    console.log(`\n--- Violations (${results.summary.violations.length}) ---\n`);

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
          console.log(`    Elements: ${v.nodes?.length || 0}`);
        }
        console.log('');
      }
    }
  } else {
    console.log('\n✓ No DOM violations found\n');
  }

  // Guidance for static analysis
  if (results.analysis.static) {
    console.log('--- Static Analysis Guidance ---\n');
    console.log(`${results.analysis.static.totalStaticRules} static rules can be checked via WebFetch.`);
    console.log('Use: /opquast <url> for full analysis including static rules.\n');
  }
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

  const url = args[0];
  const options = {
    domOnly: args.includes('--dom-only'),
    spaDetection: !args.includes('--no-spa-detection'),
    theme: null,
    rubrique: null,
    storageState: null
  };

  const themeIdx = args.indexOf('--theme');
  if (themeIdx !== -1 && args[themeIdx + 1]) {
    options.theme = args[themeIdx + 1];
  }

  const rubriqueIdx = args.indexOf('--rubrique');
  if (rubriqueIdx !== -1 && args[rubriqueIdx + 1]) {
    options.rubrique = args[rubriqueIdx + 1];
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
      process.exit(1);
    }
  }

  // Parse format option (default: text)
  let format = 'text';
  const formatIdx = args.indexOf('--format');
  if (formatIdx !== -1 && args[formatIdx + 1]) {
    format = args[formatIdx + 1].toLowerCase();
    if (!SUPPORTED_FORMATS.includes(format)) {
      console.error(`Error: Unsupported format '${format}'. Supported: ${SUPPORTED_FORMATS.join(', ')}`);
      process.exit(1);
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
        process.exit(1);
      }
      console.log(exported);
    }
  } catch (exportError) {
    console.error(`Export error: ${exportError.message}`);
    process.exit(1);
  }

  process.exit(results.summary.violations.length > 0 ? 1 : 0);
}

// Run if called directly
main();
