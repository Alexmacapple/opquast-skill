/**
 * Validators Index - Aggregates all thematic validators
 *
 * Modules:
 * - metadata: 10 rules (3, 103, 104, 106, 108, 109, 130, 221, 222, 225)
 * - accessibility: 2 rules (125, 193)
 * - content: 6 rules (1, 2, 5, 6, 8, 99)
 * - privacy: 2 rules (15, 29)
 * - ecommerce: 2 rules (37, 42)
 * - contact: 2 rules (22, 107)
 * - seo: 3 rules (105, 219, 220)
 * - structure: 3 rules (178, 223, 224)
 *
 * Total: 30 validators
 */

import { METADATA_VALIDATORS } from './metadata.js';
import { ACCESSIBILITY_VALIDATORS } from './accessibility.js';
import { CONTENT_VALIDATORS } from './content.js';
import { PRIVACY_VALIDATORS } from './privacy.js';
import { ECOMMERCE_VALIDATORS } from './ecommerce.js';
import { CONTACT_VALIDATORS } from './contact.js';
import { SEO_VALIDATORS } from './seo.js';
import { STRUCTURE_VALIDATORS } from './structure.js';

/**
 * All validators merged into a single object
 */
export const ALL_VALIDATORS = {
  ...METADATA_VALIDATORS,
  ...ACCESSIBILITY_VALIDATORS,
  ...CONTENT_VALIDATORS,
  ...PRIVACY_VALIDATORS,
  ...ECOMMERCE_VALIDATORS,
  ...CONTACT_VALIDATORS,
  ...SEO_VALIDATORS,
  ...STRUCTURE_VALIDATORS
};

/**
 * Validators grouped by category for selective runs
 */
export const VALIDATORS_BY_CATEGORY = {
  metadata: METADATA_VALIDATORS,
  accessibility: ACCESSIBILITY_VALIDATORS,
  content: CONTENT_VALIDATORS,
  privacy: PRIVACY_VALIDATORS,
  ecommerce: ECOMMERCE_VALIDATORS,
  contact: CONTACT_VALIDATORS,
  seo: SEO_VALIDATORS,
  structure: STRUCTURE_VALIDATORS
};

/**
 * Get category for a validator ID
 * @param {number} id - Opquast rule ID
 * @returns {string|null} Category name or null
 */
export function getValidatorCategory(id) {
  for (const [category, validators] of Object.entries(VALIDATORS_BY_CATEGORY)) {
    if (id in validators) {
      return category;
    }
  }
  return null;
}

/**
 * Get validators for specific categories
 * @param {string[]} categories - List of category names
 * @returns {Object} Merged validators
 */
export function getValidatorsForCategories(categories) {
  const result = {};
  for (const category of categories) {
    if (VALIDATORS_BY_CATEGORY[category]) {
      Object.assign(result, VALIDATORS_BY_CATEGORY[category]);
    }
  }
  return result;
}

/**
 * Module info
 */
export function getModuleInfo() {
  return {
    totalValidators: Object.keys(ALL_VALIDATORS).length,
    categories: Object.keys(VALIDATORS_BY_CATEGORY),
    byCategory: Object.fromEntries(
      Object.entries(VALIDATORS_BY_CATEGORY).map(([k, v]) => [k, Object.keys(v).length])
    )
  };
}

// Re-export individual modules
export {
  METADATA_VALIDATORS,
  ACCESSIBILITY_VALIDATORS,
  CONTENT_VALIDATORS,
  PRIVACY_VALIDATORS,
  ECOMMERCE_VALIDATORS,
  CONTACT_VALIDATORS,
  SEO_VALIDATORS,
  STRUCTURE_VALIDATORS
};

export default ALL_VALIDATORS;
