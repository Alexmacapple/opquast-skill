#!/usr/bin/env node

/**
 * Opquast DOM Analyzer - CLI
 * Headless browser analysis for Opquast rules requiring DOM/CSS
 *
 * Usage:
 *   node index.js <url> [options]
 *   node index.js https://example.com --json
 *   node index.js https://example.com --rules 182,186
 *
 * For programmatic usage, import from lib/analyzer.js:
 *   import { analyze } from './lib/analyzer.js';
 */

import { getSupportedOpquastRules } from './utils/opquast-mapper.js';

// L'analyseur (et Playwright) n'est chargé qu'au moment d'analyser : --help et --info fonctionnent sans navigateur (r1-z03-040)
const loadAnalyzer = () => import('./lib/analyzer.js');

/**
 * Parse command line arguments
 * @returns {Object}
 */
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    process.exit(0);
  }

  if (args[0] === '--info') {
    loadAnalyzer().then(({ getAnalyzerInfo }) => {
      console.log(JSON.stringify(getAnalyzerInfo(), null, 2));
      process.exit(0);
    }).catch(error => {
      console.error(`Error: ${error.message}`);
      process.exit(2);
    });
    return null;
  }

  const options = {
    url: args[0],
    json: args.includes('--json'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    rules: null
  };

  const rulesIndex = args.indexOf('--rules');
  if (rulesIndex !== -1) {
    const raw = args[rulesIndex + 1] || '';
    const ids = raw.split(',').map(v => v.trim());
    if (ids.length === 0 || ids.some(v => !/^\d+$/.test(v))) {
      console.error('Error: --rules expects a comma-separated list of Opquast rule numbers (e.g. --rules 182,186)');
      process.exit(1);
    }
    options.rules = ids.map(Number);
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Opquast DOM Analyzer - Headless browser analysis

Usage:
  opquast-dom <url> [options]

Options:
  --json          Output results as JSON
  --verbose, -v   Verbose output
  --rules <ids>   Comma-separated list of Opquast rule IDs to check
  --info          Show analyzer info (rules count, capabilities)
  --help, -h      Show this help message

Examples:
  opquast-dom https://example.com
  opquast-dom https://example.com --json
  opquast-dom https://example.com --rules 182,186,165

Programmatic Usage:
  import { analyze } from './lib/analyzer.js';
  const results = await analyze('https://example.com');

Supported Opquast Rules:
  ${getSupportedOpquastRules().join(', ')}
`);
}

/**
 * Format results for console output
 * @param {Object} results
 * @param {boolean} verbose
 */
function formatConsoleOutput(results, verbose) {
  console.log('\n========================================');
  console.log('  Opquast DOM Analysis Results');
  console.log('========================================\n');

  console.log(`URL: ${results.url}`);
  console.log(`Date: ${results.timestamp}`);
  console.log(`Status: ${results.success ? 'OK' : 'ERROR'}`);

  if (!results.success) {
    console.log(`Error: ${results.error}`);
    return;
  }

  console.log(`\nStatistics:`);
  console.log(`  - Axe-core rules: ${results.stats.rulesChecked}`);
  console.log(`  - Custom checks: ${results.stats.customChecksRun || 0}`);
  console.log(`  - Total rules: ${results.stats.totalRulesChecked || results.stats.rulesChecked}`);
  console.log(`  - Violations: ${results.stats.totalViolationsCount || results.stats.violationsCount}`);
  console.log(`  - Warnings: ${results.stats.warningsCount}`);
  console.log(`  - Passes: ${results.stats.passesCount}`);

  if (results.violations.length > 0) {
    console.log(`\n--- Violations ---\n`);

    for (const violation of results.violations) {
      console.log(`[${violation.severity.toUpperCase()}] Règle ${violation.opquastId}: ${violation.title}`);
      console.log(`  Impact: ${violation.impact || 'N/A'}`);
      console.log(`  Elements: ${violation.nodes.length}`);

      if (verbose) {
        for (const node of violation.nodes.slice(0, 3)) {
          console.log(`    - ${node.target ? node.target.join(' > ') : 'N/A'}`);
          console.log(`      ${node.failureSummary}`);
        }
        if (violation.nodes.length > 3) {
          console.log(`    ... and ${violation.nodes.length - 3} more`);
        }
      }
      console.log('');
    }
  } else {
    console.log(`\n✓ No violations found\n`);
  }
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();
  if (!options) return;

  if (!options.url.startsWith('http')) {
    console.error('Error: URL must start with http:// or https://');
    process.exit(1);
  }

  try {
    if (!options.json) {
      console.log(`Analyzing: ${options.url}`);
    }

    const { analyze } = await loadAnalyzer();
    const results = await analyze(options.url, {
      includeWarnings: options.verbose,
      includeCustomChecks: true,
      rules: options.rules
    });

    // Output results
    if (options.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      formatConsoleOutput(results, options.verbose);
    }

    // Exit codes: 0 conformant, 1 violations, 2 analysis failed (audit ShipGuard 2026-09-03, r1-z03-003)
    // exitCode plutôt que exit() : la sortie JSON est entièrement écrite avant la fin du processus
    process.exitCode = !results.success ? 2 : (results.violations.length > 0 ? 1 : 0);

  } catch (error) {
    if (options.json) {
      console.log(JSON.stringify({
        success: false,
        error: error.message,
        url: options.url
      }, null, 2));
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(2);
  }
}

// Run
main();
