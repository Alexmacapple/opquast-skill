/**
 * axe-core based checks for Opquast rules
 * Uses @axe-core/playwright for accessibility testing
 */

import AxeBuilder from '@axe-core/playwright';
import { mapAxeResults, getAxeRuleIds, AXE_TO_OPQUAST } from '../utils/opquast-mapper.js';

/**
 * Run axe-core analysis on a page
 * @param {Page} page - Playwright page object
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} - Analysis results
 */
export async function runAxeAnalysis(page, options = {}) {
  const {
    rules = getAxeRuleIds(),
    includeWarnings = false
  } = options;

  try {
    const axeBuilder = new AxeBuilder({ page })
      .withRules(rules);

    const results = await axeBuilder.analyze();

    // Map violations to Opquast format
    const opquastViolations = mapAxeResults(results.violations);

    // Optionally include incomplete (warnings)
    const opquastWarnings = includeWarnings
      ? mapAxeResults(results.incomplete)
      : [];

    return {
      success: true,
      url: page.url(),
      timestamp: new Date().toISOString(),
      violations: opquastViolations,
      warnings: opquastWarnings,
      passes: results.passes.length,
      stats: {
        violationsCount: opquastViolations.length,
        warningsCount: opquastWarnings.length,
        passesCount: results.passes.length,
        rulesChecked: rules.length
      }
    };
  } catch (error) {
    return {
      success: false,
      url: page.url(),
      timestamp: new Date().toISOString(),
      error: error.message,
      violations: [],
      warnings: [],
      stats: {
        violationsCount: 0,
        warningsCount: 0,
        passesCount: 0,
        rulesChecked: 0
      }
    };
  }
}

/**
 * Run specific Opquast rule check via axe
 * @param {Page} page - Playwright page
 * @param {number} opquastId - Opquast rule ID
 * @returns {Promise<Object>} - Check result
 */
export async function checkOpquastRule(page, opquastId) {
  // Find axe rule for this Opquast ID
  const axeRuleId = Object.entries(AXE_TO_OPQUAST)
    .find(([_, mapping]) => mapping.opquastId === opquastId)?.[0];

  if (!axeRuleId) {
    return {
      success: false,
      opquastId,
      error: `No axe mapping for Opquast rule ${opquastId}`,
      conformant: null
    };
  }

  const results = await runAxeAnalysis(page, { rules: [axeRuleId] });

  const violation = results.violations.find(v => v.opquastId === opquastId);

  return {
    success: true,
    opquastId,
    axeRuleId,
    conformant: !violation,
    violation: violation || null,
    nodes: violation?.nodes || []
  };
}

/**
 * Check contrast (Opquast 182)
 * @param {Page} page - Playwright page
 * @returns {Promise<Object>}
 */
export async function checkContrast(page) {
  return checkOpquastRule(page, 182);
}

/**
 * Check link names (Opquast 144)
 * @param {Page} page - Playwright page
 * @returns {Promise<Object>}
 */
export async function checkLinkNames(page) {
  return checkOpquastRule(page, 144);
}

/**
 * Check image alt (Opquast 111)
 * @param {Page} page - Playwright page
 * @returns {Promise<Object>}
 */
export async function checkImageAlt(page) {
  return checkOpquastRule(page, 111);
}

export default {
  runAxeAnalysis,
  checkOpquastRule,
  checkContrast,
  checkLinkNames,
  checkImageAlt
};
