/**
 * axe-core based checks for Opquast rules
 * Uses @axe-core/playwright for accessibility testing
 * Integrates custom Playwright checks for rules not covered by axe-core
 */

import AxeBuilder from '@axe-core/playwright';
import {
  mapAxeResults,
  getAxeRuleIds,
  getAxeRulesForOpquastId,
  getSupportedOpquastRules,
  AXE_TO_OPQUAST,
  CUSTOM_CHECKS,
  LINK_NAME_RULE,
  IMAGE_ALT_RULE
} from '../utils/opquast-mapper.js';
import { runCustomChecks } from './custom-checks.js';
import { runInteractionChecks, INTERACTION_CHECKS } from './interaction-checks.js';

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

    const opquastViolations = mapAxeResults(results.violations);
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
 * Run every axe rule mapped to an Opquast id (audit ShipGuard 2026-09-03, r1-z03-010 :
 * seule la première règle axe était exécutée pour les identifiants partagés comme 69)
 * @param {Page} page - Playwright page
 * @param {number} opquastId - Opquast rule ID
 * @returns {Promise<Object>} - Check result
 */
export async function checkOpquastRule(page, opquastId) {
  const axeRuleIds = getAxeRulesForOpquastId(opquastId);

  if (axeRuleIds.length === 0) {
    return {
      success: false,
      opquastId,
      error: `No axe mapping for Opquast rule ${opquastId}`,
      conformant: null
    };
  }

  const results = await runAxeAnalysis(page, { rules: axeRuleIds });

  if (!results.success) {
    return { success: false, opquastId, axeRuleIds, error: results.error, conformant: null };
  }

  const violations = results.violations.filter(v => v.opquastId === opquastId);

  return {
    success: true,
    opquastId,
    axeRuleIds,
    axeRuleId: axeRuleIds[0],
    conformant: violations.length === 0,
    violation: violations[0] || null,
    violations,
    nodes: violations.flatMap(v => v.nodes || [])
  };
}

/*
 * Helpers par règle : API publique programmatique du module, non appelée par la CLI.
 * Conservés après l'audit (r1-z03-038) et désormais couverts par tests/z03-axe-checks-shape.test.js.
 */

/** Check contrast (Opquast 182) */
export async function checkContrast(page) {
  return checkOpquastRule(page, 182);
}

/** Check link names (Opquast 136 : chaque lien est doté d'un intitulé) */
export async function checkLinkNames(page) {
  return checkOpquastRule(page, LINK_NAME_RULE);
}

/** Check image alt (Opquast 118 : alternative textuelle des images porteuses d'information) */
export async function checkImageAlt(page) {
  return checkOpquastRule(page, IMAGE_ALT_RULE);
}

/**
 * Run full analysis combining axe-core, custom Playwright checks and interaction checks (PRD-004)
 * @param {Page} page - Playwright page object
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} - Combined analysis results
 */
export async function runFullAnalysis(page, options = {}) {
  // includeCustomChecks=false signifie « axe seulement » : les checks d'interaction suivent ce réglage sauf demande explicite
  const { includeCustomChecks = true, includeInteractionChecks = includeCustomChecks } = options;

  const axeResults = await runAxeAnalysis(page, options);

  // Couverture exprimée en règles Opquast distinctes, pas en identifiants axe (audit ShipGuard 2026-09-03, r1-z03-014)
  const axeOpquastIds = [...new Set(Object.values(AXE_TO_OPQUAST).map(m => m.opquastId))];
  const customIds = includeCustomChecks ? Object.keys(CUSTOM_CHECKS).map(Number) : [];
  const interactionIds = includeInteractionChecks ? Object.keys(INTERACTION_CHECKS).map(Number) : [];
  const opquastRuleIds = [...new Set([...axeOpquastIds, ...customIds, ...interactionIds])].sort((a, b) => a - b);

  let customViolations = [];
  let customChecksRun = includeCustomChecks ? Object.keys(CUSTOM_CHECKS).length : 0;
  let customChecksError = null;
  if (includeCustomChecks) {
    try {
      customViolations = await runCustomChecks(page);
    } catch (error) {
      customChecksError = error.message;
      customChecksRun = 0;
      console.error('Custom checks error:', error.message);
    }
  }

  // Checks d'interaction (18 règles, PRD-004) : même traitement d'erreur que les checks custom
  let interactionViolations = [];
  let interactionChecksRun = includeInteractionChecks ? Object.keys(INTERACTION_CHECKS).length : 0;
  let interactionChecksError = null;
  if (includeInteractionChecks) {
    try {
      interactionViolations = await runInteractionChecks(page);
    } catch (error) {
      interactionChecksError = error.message;
      interactionChecksRun = 0;
      console.error('Interaction checks error:', error.message);
    }
  }

  return {
    ...axeResults,
    violations: [...axeResults.violations, ...customViolations, ...interactionViolations],
    customChecks: customViolations,
    customChecksError,
    interactionChecks: interactionViolations,
    interactionChecksError,
    stats: {
      ...axeResults.stats,
      axeRulesRun: axeResults.stats.rulesChecked,
      customChecksRun,
      customViolationsCount: customViolations.length,
      interactionChecksRun,
      interactionViolationsCount: interactionViolations.length,
      opquastRuleIds,
      totalRulesChecked: opquastRuleIds.length,
      totalViolationsCount: axeResults.stats.violationsCount + customViolations.length + interactionViolations.length
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
