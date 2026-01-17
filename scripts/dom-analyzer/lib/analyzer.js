/**
 * Opquast DOM Analyzer - ES Module
 *
 * Core analysis function exportable for use in other modules.
 * This module can be imported directly without using CLI.
 *
 * Usage:
 *   import { analyze, analyzeWithContext } from './lib/analyzer.js';
 *   const results = await analyze('https://example.com');
 */

import { launchBrowser, createContext, navigateAndWait, closeBrowser } from '../utils/browser.js';
import { runFullAnalysis } from '../checks/axe-checks.js';
import { getSupportedOpquastRules, getAxeRuleIds } from '../utils/opquast-mapper.js';

/**
 * Analyze a URL for Opquast rule violations
 *
 * @param {string} url - URL to analyze
 * @param {Object} options - Analysis options
 * @param {boolean} options.includeWarnings - Include axe-core warnings
 * @param {boolean} options.includeCustomChecks - Run custom Playwright checks (default: true)
 * @param {number[]} options.rules - Specific Opquast rule IDs to check
 * @param {boolean} options.keepBrowserOpen - Don't close browser after analysis (for batch)
 * @returns {Promise<Object>} Analysis results
 */
export async function analyze(url, options = {}) {
  const {
    includeWarnings = false,
    includeCustomChecks = true,
    rules = null,
    keepBrowserOpen = false
  } = options;

  if (!url || !url.startsWith('http')) {
    throw new Error('URL must start with http:// or https://');
  }

  let context = null;
  let page = null;

  try {
    // Launch browser and create context
    await launchBrowser();
    context = await createContext();
    page = await context.newPage();

    // Navigate to URL
    await navigateAndWait(page, url);

    // Run analysis
    const results = await runFullAnalysis(page, {
      includeWarnings,
      includeCustomChecks
    });

    // Filter by specific rules if requested
    if (rules && rules.length > 0) {
      results.violations = results.violations.filter(v =>
        rules.includes(v.opquastId)
      );
    }

    // Cleanup
    await page.close();
    await context.close();

    if (!keepBrowserOpen) {
      await closeBrowser();
    }

    return results;

  } catch (error) {
    // Cleanup on error
    if (page) await page.close().catch(() => {});
    if (context) await context.close().catch(() => {});
    if (!keepBrowserOpen) {
      await closeBrowser().catch(() => {});
    }

    return {
      success: false,
      error: error.message,
      url,
      timestamp: new Date().toISOString(),
      violations: [],
      stats: {
        rulesChecked: 0,
        violationsCount: 0,
        warningsCount: 0,
        passesCount: 0
      }
    };
  }
}

/**
 * Analyze with an existing browser context (for batch operations)
 *
 * @param {Object} context - Playwright browser context
 * @param {string} url - URL to analyze
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeWithContext(context, url, options = {}) {
  const {
    includeWarnings = false,
    includeCustomChecks = true,
    rules = null
  } = options;

  if (!url || !url.startsWith('http')) {
    throw new Error('URL must start with http:// or https://');
  }

  let page = null;

  try {
    page = await context.newPage();
    await navigateAndWait(page, url);

    const results = await runFullAnalysis(page, {
      includeWarnings,
      includeCustomChecks
    });

    // Filter by specific rules if requested
    if (rules && rules.length > 0) {
      results.violations = results.violations.filter(v =>
        rules.includes(v.opquastId)
      );
    }

    await page.close();
    return results;

  } catch (error) {
    if (page) await page.close().catch(() => {});

    return {
      success: false,
      error: error.message,
      url,
      timestamp: new Date().toISOString(),
      violations: [],
      stats: {
        rulesChecked: 0,
        violationsCount: 0,
        warningsCount: 0,
        passesCount: 0
      }
    };
  }
}

/**
 * Analyze multiple URLs (batch mode)
 *
 * @param {string[]} urls - URLs to analyze
 * @param {Object} options - Analysis options
 * @param {Function} onProgress - Callback for progress updates
 * @returns {Promise<Object[]>} Array of analysis results
 */
export async function analyzeBatch(urls, options = {}, onProgress = null) {
  const results = [];

  await launchBrowser();
  const context = await createContext();

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    if (onProgress) {
      onProgress({ current: i + 1, total: urls.length, url });
    }

    const result = await analyzeWithContext(context, url, options);
    results.push(result);
  }

  await context.close();
  await closeBrowser();

  return results;
}

/**
 * Get list of supported Opquast rule IDs
 * @returns {number[]}
 */
export function getSupportedRules() {
  return getSupportedOpquastRules();
}

/**
 * Get list of axe-core rule IDs used
 * @returns {string[]}
 */
export function getAxeRules() {
  return getAxeRuleIds();
}

/**
 * Get analyzer metadata
 * @returns {Object}
 */
export function getAnalyzerInfo() {
  const supportedRules = getSupportedOpquastRules();
  const axeRules = getAxeRuleIds();

  return {
    name: 'Opquast DOM Analyzer',
    version: '1.1.0',
    supportedRules,
    rulesCount: supportedRules.length,
    axeRulesCount: axeRules.length,
    customChecksCount: supportedRules.length - axeRules.length,
    capabilities: {
      singleUrl: true,
      batch: true,
      customContext: true
    }
  };
}

export default {
  analyze,
  analyzeWithContext,
  analyzeBatch,
  getSupportedRules,
  getAxeRules,
  getAnalyzerInfo
};
