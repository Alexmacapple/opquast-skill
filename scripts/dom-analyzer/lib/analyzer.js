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
import { getSupportedOpquastRules, getAxeRuleIds, CUSTOM_CHECKS } from '../utils/opquast-mapper.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const PACKAGE_VERSION = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf-8')).version;

/**
 * Contrat d'erreur du module (audit ShipGuard 2026-09-03, r1-z03-004) :
 * - argument invalide (URL absente ou de protocole non http/https) : exception levée, c'est une erreur de programmation ;
 * - défaillance d'analyse (navigation, moteur, page) : objet retourné avec success: false et la même forme
 *   que l'objet de succès (r1-z03-036), consommé tel quel par index.js (code de sortie 2) et par scripts/bridge.js.
 * analyzeBatch absorbe les deux mécanismes : un lot n'est jamais interrompu par une URL invalide.
 */

/**
 * Valide une URL http(s).
 * Audit ShipGuard 2026-09-03 (r1-z03-018) : startsWith('http') acceptait « httpfoo://x » ou « http-truc ».
 * @param {string} url
 * @returns {boolean}
 */
export function isHttpUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

/** Garde partagée par analyze() et analyzeWithContext() : une seule implémentation, une seule règle */
function assertHttpUrl(url) {
  if (!isHttpUrl(url)) {
    throw new Error('URL must start with http:// or https://');
  }
}

/**
 * Objet d'erreur de même forme que l'objet de succès (r1-z03-036) : les consommateurs
 * n'ont plus deux structures à connaître pour lire warnings, customChecks ou stats.
 * @param {string} url
 * @param {Error|string} error
 * @returns {Object}
 */
function buildErrorResult(url, error) {
  return {
    success: false,
    error: typeof error === 'string' ? error : error.message,
    url,
    timestamp: new Date().toISOString(),
    violations: [],
    warnings: [],
    passes: 0,
    customChecks: [],
    customChecksError: null,
    stats: {
      rulesChecked: 0,
      axeRulesRun: 0,
      violationsCount: 0,
      warningsCount: 0,
      passesCount: 0,
      customChecksRun: 0,
      customViolationsCount: 0,
      opquastRuleIds: [],
      totalRulesChecked: 0,
      totalViolationsCount: 0
    }
  };
}

/**
 * Analyze a URL for Opquast rule violations
 *
 * @param {string} url - URL to analyze
 * @param {Object} options - Analysis options
 * @param {boolean} options.includeWarnings - Include axe-core warnings
 * @param {boolean} options.includeCustomChecks - Run custom Playwright checks (default: true)
 * @param {number[]} options.rules - Opquast rule IDs used to FILTER the reported violations (tous les contrôles sont exécutés, r1-z03-019)
 * @param {boolean} options.keepBrowserOpen - Don't close browser after analysis (for batch)
 * @param {Object} options.storageState - Playwright storage state for authentication
 * @returns {Promise<Object>} Analysis results
 */
export async function analyze(url, options = {}) {
  const {
    includeWarnings = false,
    includeCustomChecks = true,
    rules = null,
    keepBrowserOpen = false,
    storageState = null
  } = options;

  assertHttpUrl(url);

  let context = null;
  let page = null;

  try {
    // Launch browser and create context (with optional auth state)
    await launchBrowser();
    const contextOptions = storageState ? { storageState } : {};
    context = await createContext(contextOptions);
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
      results.stats.violationsCount = results.violations.length;
      results.stats.totalViolationsCount = results.violations.length;
      results.stats.filteredRules = rules;
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

    return buildErrorResult(url, error);
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

  assertHttpUrl(url);

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
      results.stats.violationsCount = results.violations.length;
      results.stats.totalViolationsCount = results.violations.length;
      results.stats.filteredRules = rules;
    }

    await page.close();
    return results;

  } catch (error) {
    if (page) await page.close().catch(() => {});

    return buildErrorResult(url, error);
  }
}

/**
 * Analyze multiple URLs (batch mode)
 *
 * @param {string[]} urls - URLs to analyze
 * @param {Object} options - Analysis options
 * @param {Function} onProgress - Callback for progress updates
 * @returns {Promise<Object[]>} Array of analysis results (un objet par URL, jamais d'exception par URL)
 */
export async function analyzeBatch(urls, options = {}, onProgress = null) {
  const results = [];

  await launchBrowser();
  const context = await createContext();

  try {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];

      if (onProgress) {
        onProgress({ current: i + 1, total: urls.length, url });
      }

      try {
        results.push(await analyzeWithContext(context, url, options));
      } catch (error) {
        // Une URL invalide lève (contrat ci-dessus) : le lot continue et rend la même forme de résultat (r1-z03-004)
        results.push(buildErrorResult(url, error));
      }
    }
  } finally {
    // Toujours libérer le navigateur, même sur exception (audit ShipGuard 2026-09-03, r1-z03-031)
    await context.close().catch(() => {});
    await closeBrowser().catch(() => {});
  }

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
 * API publique programmatique : non appelée par la CLI, couverte par tests/z03-*.test.js (r1-z03-038)
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
    version: PACKAGE_VERSION,
    supportedRules,
    rulesCount: supportedRules.length,
    axeRulesCount: axeRules.length,
    customChecksCount: Object.keys(CUSTOM_CHECKS).length,
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
  isHttpUrl,
  getSupportedRules,
  getAxeRules,
  getAnalyzerInfo
};
