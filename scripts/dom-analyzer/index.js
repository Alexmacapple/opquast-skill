#!/usr/bin/env node

/**
 * Opquast DOM Analyzer
 * Headless browser analysis for Opquast rules requiring DOM/CSS
 *
 * Usage:
 *   node index.js <url> [options]
 *   node index.js https://example.com --json
 *   node index.js https://example.com --rules 182,186
 */

import { createContext, navigateAndWait, closeBrowser } from './utils/browser.js';
import { runAxeAnalysis } from './checks/axe-checks.js';
import { getSupportedOpquastRules } from './utils/opquast-mapper.js';

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

  const options = {
    url: args[0],
    json: args.includes('--json'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    rules: null
  };

  const rulesIndex = args.indexOf('--rules');
  if (rulesIndex !== -1 && args[rulesIndex + 1]) {
    options.rules = args[rulesIndex + 1].split(',').map(Number);
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
  --help, -h      Show this help message

Examples:
  opquast-dom https://example.com
  opquast-dom https://example.com --json
  opquast-dom https://example.com --rules 182,186,165

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
  console.log(`  - Rules checked: ${results.stats.rulesChecked}`);
  console.log(`  - Violations: ${results.stats.violationsCount}`);
  console.log(`  - Warnings: ${results.stats.warningsCount}`);
  console.log(`  - Passes: ${results.stats.passesCount}`);

  if (results.violations.length > 0) {
    console.log(`\n--- Violations ---\n`);

    for (const violation of results.violations) {
      console.log(`[${violation.severity.toUpperCase()}] Règle ${violation.opquastId}: ${violation.title}`);
      console.log(`  Impact: ${violation.impact}`);
      console.log(`  Elements: ${violation.nodes.length}`);

      if (verbose) {
        for (const node of violation.nodes.slice(0, 3)) {
          console.log(`    - ${node.target.join(' > ')}`);
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

  if (!options.url.startsWith('http')) {
    console.error('Error: URL must start with http:// or https://');
    process.exit(1);
  }

  try {
    // Create browser context
    const context = await createContext();
    const page = await context.newPage();

    // Navigate to URL
    if (!options.json) {
      console.log(`Analyzing: ${options.url}`);
    }

    await navigateAndWait(page, options.url);

    // Run analysis
    const results = await runAxeAnalysis(page, {
      includeWarnings: options.verbose
    });

    // Output results
    if (options.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      formatConsoleOutput(results, options.verbose);
    }

    // Cleanup
    await closeBrowser();

    // Exit with appropriate code
    process.exit(results.violations.length > 0 ? 1 : 0);

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
    await closeBrowser();
    process.exit(2);
  }
}

// Run
main();
