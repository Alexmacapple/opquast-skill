/**
 * Mapping between axe-core rules and Opquast rule IDs
 * Only includes validated axe-core rule IDs
 */

/**
 * Mapping table: axe-core rule ID -> Opquast rule ID(s)
 * These are verified axe-core rules that exist in the library
 */
export const AXE_TO_OPQUAST = {
  // Contrast - verified axe-core rule
  'color-contrast': {
    opquastId: 182,
    title: 'Le contraste entre la couleur du texte et la couleur de fond est suffisant',
    severity: 'critical',
    notes: 'WCAG 1.4.3 - Ratio 4.5:1 (texte normal) ou 3:1 (grand texte)'
  },

  // Links - verified axe-core rule
  'link-name': {
    opquastId: 144,
    title: 'Les liens sont pourvus d\'un intitulé significatif',
    severity: 'critical',
    notes: 'Texte du lien ou aria-label'
  },

  // Images - verified axe-core rule
  'image-alt': {
    opquastId: 111,
    title: 'Les images sont pourvues d\'une alternative textuelle',
    severity: 'critical',
    notes: 'Attribut alt présent et pertinent'
  },

  // Form labels - verified axe-core rule
  'label': {
    opquastId: 67,
    title: 'Les champs de formulaire sont associés à des étiquettes',
    severity: 'critical',
    notes: 'Label explicite ou aria-label'
  },

  // HTML lang - verified axe-core rule
  'html-has-lang': {
    opquastId: 125,
    title: 'Le code source de chaque page indique la langue principale',
    severity: 'critical',
    notes: 'Attribut lang sur html'
  },

  // Document title - verified axe-core rule
  'document-title': {
    opquastId: 97,
    title: 'Chaque page a un titre unique et pertinent',
    severity: 'critical',
    notes: 'Balise title présente et non vide'
  },

  // Bypass blocks - verified axe-core rule
  'bypass': {
    opquastId: 146,
    title: 'Il est possible de naviguer directement au contenu principal',
    severity: 'major',
    notes: 'Skip link ou landmarks'
  },

  // Heading order - verified axe-core rule
  'heading-order': {
    opquastId: 227,
    title: 'La hiérarchie des titres est cohérente',
    severity: 'major',
    notes: 'Pas de saut de niveau'
  }
};

/**
 * Custom checks that don't use axe-core
 * These require Playwright-specific logic
 */
export const CUSTOM_CHECKS = {
  // Focus visibility - requires custom Playwright check
  165: {
    title: 'La prise de focus est visible',
    type: 'focus',
    severity: 'critical'
  },
  // Keyboard navigation - requires custom Playwright check
  166: {
    title: 'Le site est entièrement navigable au clavier',
    type: 'keyboard',
    severity: 'critical'
  },
  // Tab order - requires custom Playwright check
  167: {
    title: 'L\'ordre de tabulation est prévisible',
    type: 'tabindex',
    severity: 'major'
  },
  // Target size - requires bounding box check
  186: {
    title: 'La taille des éléments cliquables est suffisante',
    type: 'target-size',
    severity: 'critical',
    notes: 'Minimum 44x44 pixels'
  },
  // Underline reserved for links
  139: {
    title: 'Le soulignement est réservé aux liens',
    type: 'css-check',
    property: 'text-decoration',
    invalidValue: 'underline',
    severity: 'major'
  },
  // Text not justified
  191: {
    title: 'Le texte n\'est pas justifié',
    type: 'css-check',
    property: 'text-align',
    invalidValue: 'justify',
    severity: 'minor'
  },
  // Copy not blocked
  237: {
    title: 'La copie du contenu n\'est pas bloquée',
    type: 'css-check',
    property: 'user-select',
    invalidValue: 'none',
    severity: 'major'
  },
  // Context menu not blocked
  238: {
    title: 'Le menu contextuel n\'est pas bloqué',
    type: 'attribute-check',
    attribute: 'oncontextmenu',
    severity: 'major'
  }
};

/**
 * Map axe-core violation to Opquast result
 * @param {Object} violation - axe-core violation object
 * @returns {Object|null} - Opquast formatted result or null if no mapping
 */
export function mapAxeViolation(violation) {
  const mapping = AXE_TO_OPQUAST[violation.id];

  if (!mapping) {
    return null;
  }

  return {
    opquastId: mapping.opquastId,
    title: mapping.title,
    severity: mapping.severity,
    axeRuleId: violation.id,
    impact: violation.impact,
    description: violation.description,
    helpUrl: violation.helpUrl,
    nodes: violation.nodes.map(node => ({
      html: node.html,
      target: node.target,
      failureSummary: node.failureSummary
    })),
    notes: mapping.notes
  };
}

/**
 * Map multiple axe violations to Opquast results
 * @param {Array} violations - Array of axe-core violations
 * @returns {Array} - Array of Opquast formatted results
 */
export function mapAxeResults(violations) {
  return violations
    .map(mapAxeViolation)
    .filter(result => result !== null);
}

/**
 * Get all axe-core rule IDs to run
 * @returns {string[]}
 */
export function getAxeRuleIds() {
  return Object.keys(AXE_TO_OPQUAST);
}

/**
 * Get all supported Opquast rule IDs (axe + custom)
 * @returns {Array<number>}
 */
export function getSupportedOpquastRules() {
  const axeRules = Object.values(AXE_TO_OPQUAST).map(m => m.opquastId);
  const customRules = Object.keys(CUSTOM_CHECKS).map(Number);

  return [...new Set([...axeRules, ...customRules])].sort((a, b) => a - b);
}

export default {
  AXE_TO_OPQUAST,
  CUSTOM_CHECKS,
  mapAxeViolation,
  mapAxeResults,
  getAxeRuleIds,
  getSupportedOpquastRules
};
