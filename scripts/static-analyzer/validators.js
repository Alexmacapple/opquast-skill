/**
 * Static Heuristic Validators for Opquast Rules
 *
 * PRD-001: Converts probabilistic (LLM) rules to deterministic checks
 * using regex patterns and HTML analysis.
 *
 * Each validator returns:
 * - { valid: true, confidence: 1.0 } if rule is satisfied
 * - { valid: false, confidence: 1.0, details: string } if violation detected
 * - null if rule cannot be determined (fallback to LLM)
 *
 * Modular structure (v2):
 * - validators/metadata.js: 10 rules
 * - validators/accessibility.js: 2 rules
 * - validators/content.js: 6 rules
 * - validators/privacy.js: 2 rules
 * - validators/ecommerce.js: 2 rules
 * - validators/contact.js: 2 rules
 * - validators/seo.js: 3 rules
 * - validators/structure.js: 3 rules
 */

import { CONFIDENCE_LEVELS } from '../dom-analyzer/utils/opquast-mapper.js';
import {
  ALL_VALIDATORS,
  VALIDATORS_BY_CATEGORY,
  getValidatorCategory,
  getValidatorsForCategories,
  getModuleInfo
} from './validators/index.js';

// Re-export for backward compatibility
export const STATIC_VALIDATORS = ALL_VALIDATORS;

/**
 * Run all static validators on HTML content
 *
 * @param {string} html - HTML source code
 * @param {string} url - Page URL (for context)
 * @param {Object} options - Run options
 * @param {string[]} options.categories - Filter by categories (optional)
 * @returns {Object} Validation results
 */
export function runStaticValidators(html, url = '', options = {}) {
  const { categories = null } = options;

  // Select validators based on categories filter
  const validators = categories
    ? getValidatorsForCategories(categories)
    : STATIC_VALIDATORS;

  const results = {
    validators: Object.keys(validators).length,
    passed: [],
    failed: [],
    skipped: [],
    timestamp: new Date().toISOString()
  };

  for (const [idStr, validator] of Object.entries(validators)) {
    const id = parseInt(idStr, 10);

    try {
      const result = validator.check(html, url);

      if (result === null) {
        // Rule doesn't apply or can't be determined
        results.skipped.push({
          opquastId: id,
          title: validator.title,
          category: getValidatorCategory(id),
          reason: 'Non applicable ou indeterminable'
        });
      } else if (result.valid) {
        results.passed.push({
          opquastId: id,
          title: validator.title,
          category: getValidatorCategory(id),
          confidence: result.confidence,
          source: 'static-heuristic',
          confidence_label: 'heuristic'
        });
      } else {
        results.failed.push({
          opquastId: id,
          title: validator.title,
          category: getValidatorCategory(id),
          severity: validator.severity,
          confidence: result.confidence,
          details: result.details,
          source: 'static-heuristic',
          confidence_label: 'heuristic'
        });
      }
    } catch (error) {
      results.skipped.push({
        opquastId: id,
        title: validator.title,
        category: getValidatorCategory(id),
        reason: `Erreur: ${error.message}`
      });
    }
  }

  return results;
}

/**
 * Get validator info
 */
export function getValidatorInfo() {
  const moduleInfo = getModuleInfo();
  return {
    name: 'Static Heuristic Validators',
    version: '2.0.0',
    validators: moduleInfo.totalValidators,
    categories: moduleInfo.categories,
    byCategory: moduleInfo.byCategory,
    rules: Object.entries(STATIC_VALIDATORS).map(([id, v]) => ({
      id: parseInt(id, 10),
      title: v.title,
      severity: v.severity,
      category: getValidatorCategory(parseInt(id, 10))
    })),
    confidenceLevel: CONFIDENCE_LEVELS['heuristic']
  };
}

// Re-export utilities
export { VALIDATORS_BY_CATEGORY, getValidatorCategory, getValidatorsForCategories };

export default { STATIC_VALIDATORS, runStaticValidators, getValidatorInfo };
