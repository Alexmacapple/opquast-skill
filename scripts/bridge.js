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
import { readFile } from 'fs/promises';
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
    rubrique = null
  } = options;

  const results = {
    url,
    timestamp: new Date().toISOString(),
    success: true,
    analysis: {
      dom: null,
      static: null
    },
    summary: {
      totalRules: 245,
      domRulesChecked: 0,
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
      includeCustomChecks: true
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

    // 2. Get static rules info (for guidance, not automated checking)
    if (includeStatic && !domOnly) {
      const staticRules = rules.filter(r => r.category === 'static');
      const domRules = rules.filter(r => r.category === 'requires_dom');
      const interactionRules = rules.filter(r => r.category === 'requires_interaction');

      results.analysis.static = {
        totalStaticRules: staticRules.length,
        staticRuleIds: staticRules.map(r => r.id),
        note: 'Static rules require HTML source analysis (WebFetch + LLM interpretation)'
      };

      results.summary.staticRulesApplicable = staticRules.length;

      results.summary.coverage = {
        dom: {
          checked: results.summary.domRulesChecked,
          total: domRules.length,
          percentage: Math.round((results.summary.domRulesChecked / domRules.length) * 100)
        },
        static: {
          applicable: staticRules.length,
          note: 'Requires WebFetch analysis'
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
  if (results.summary.coverage.static) {
    console.log(`Static Rules: ${results.summary.coverage.static.applicable} applicable (via WebFetch)`);
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
  --json          Output as JSON
  --dom-only      Only run DOM analysis
  --theme <name>  Filter by theme (accessibilite, seo, securite, etc.)
  --rubrique <n>  Filter by rubrique (formulaires, navigation, etc.)
  --help, -h      Show this help

Examples:
  node scripts/bridge.js https://example.com
  node scripts/bridge.js https://example.com --json
  node scripts/bridge.js https://example.com --theme accessibilite
`);
    process.exit(0);
  }

  if (args[0] === '--info') {
    const info = getAnalyzerInfo();
    console.log(JSON.stringify({
      bridge: {
        name: 'Opquast Bridge',
        version: '1.0.0',
        capabilities: ['dom-analysis', 'static-guidance', 'unified-report']
      },
      domAnalyzer: info
    }, null, 2));
    process.exit(0);
  }

  const url = args[0];
  const options = {
    domOnly: args.includes('--dom-only'),
    theme: null,
    rubrique: null
  };

  const themeIdx = args.indexOf('--theme');
  if (themeIdx !== -1 && args[themeIdx + 1]) {
    options.theme = args[themeIdx + 1];
  }

  const rubriqueIdx = args.indexOf('--rubrique');
  if (rubriqueIdx !== -1 && args[rubriqueIdx + 1]) {
    options.rubrique = args[rubriqueIdx + 1];
  }

  const results = await runUnifiedAnalysis(url, options);

  if (args.includes('--json')) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    formatResults(results);
  }

  process.exit(results.summary.violations.length > 0 ? 1 : 0);
}

// Run if called directly
main();
