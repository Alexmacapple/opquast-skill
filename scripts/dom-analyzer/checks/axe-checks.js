/**
 * axe-core based checks for Opquast rules
 * Uses @axe-core/playwright for accessibility testing
 * Integrates custom Playwright checks for rules not covered by axe-core
 */

import AxeBuilder from '@axe-core/playwright';
import { mapAxeResults, getAxeRuleIds, AXE_TO_OPQUAST } from '../utils/opquast-mapper.js';
import { runCustomChecks } from './custom-checks.js';
import { runInteractionChecks } from './interaction-checks.js';

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

/**
 * Run full analysis combining axe-core, custom, and interaction checks
 * @param {Page} page - Playwright page object
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} - Combined analysis results
 */
export async function runFullAnalysis(page, options = {}) {
  const {
    includeCustomChecks = true,
    includeInteractionChecks = true
  } = options;

  // 1. Run axe-core analysis (25 rules mapped)
  const axeResults = await runAxeAnalysis(page, options);

  if (!includeCustomChecks && !includeInteractionChecks) {
    return axeResults;
  }

  // 2. Run custom Playwright checks (8 rules)
  let customViolations = [];
  if (includeCustomChecks) {
    try {
      customViolations = await runCustomChecks(page);
    } catch (error) {
      console.error('Custom checks error:', error.message);
    }
  }

  // 3. Run interaction checks (18 rules) - PRD-004
  let interactionViolations = [];
  if (includeInteractionChecks) {
    try {
      interactionViolations = await runInteractionChecks(page);
    } catch (error) {
      console.error('Interaction checks error:', error.message);
    }
  }

  // 4. Merge results
  const allViolations = [
    ...axeResults.violations,
    ...customViolations,
    ...interactionViolations
  ];

  return {
    ...axeResults,
    violations: allViolations,
    customChecks: customViolations,
    interactionChecks: interactionViolations,
    stats: {
      ...axeResults.stats,
      customChecksRun: 8,
      customViolationsCount: customViolations.length,
      interactionChecksRun: 18,
      interactionViolationsCount: interactionViolations.length,
      totalRulesChecked: axeResults.stats.rulesChecked + 8 + 18,
      totalViolationsCount: allViolations.length
    }
  };
}

export default {
  runAxeAnalysis,
  runFullAnalysis,
  checkOpquastRule,
  checkContrast,
  checkLinkNames,
  checkImageAlt
};
