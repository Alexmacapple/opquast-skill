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
    opquastId: 136,
    title: 'Chaque lien est doté d\'un intitulé dans le code source',
    severity: 'critical',
    notes: 'Texte du lien ou aria-label'
  },

  // Images - verified axe-core rule
  'image-alt': {
    opquastId: 118,
    title: 'Chaque image porteuse d\'information est dotée d\'une alternative textuelle appropriée',
    severity: 'critical',
    notes: 'Attribut alt présent et pertinent'
  },

  // Form labels - verified axe-core rule
  'label': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre',
    severity: 'critical',
    notes: 'Label explicite ou aria-label'
  },

  // HTML lang - verified axe-core rule
  'html-has-lang': {
    opquastId: 130,
    title: 'Le code source de chaque page indique la langue principale du contenu',
    severity: 'critical',
    notes: 'Attribut lang sur html'
  },

  // Document title - verified axe-core rule
  'document-title': {
    opquastId: 103,
    title: 'Le titre de chaque page permet d\'identifier son contenu',
    severity: 'critical',
    notes: 'Balise title présente et non vide'
  },

  // Bypass blocks - verified axe-core rule
  'bypass': {
    opquastId: 164,
    title: 'Chaque page contient des liens d\'accès rapide placés au début du code source',
    severity: 'major',
    notes: 'Skip link ou landmarks'
  },

  // Heading order - verified axe-core rule
  'heading-order': {
    opquastId: 234,
    title: 'Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée',
    severity: 'major',
    notes: 'Pas de saut de niveau'
  },

  // ========== Phase 4 additions (17 new mappings) ==========

  // Buttons - verified axe-core rule
  'button-name': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre',
    severity: 'critical',
    notes: 'Texte visible ou aria-label sur les boutons'
  },

  // Frames - verified axe-core rule
  'frame-title': {
    opquastId: 120,
    title: 'Les objets inclus sont dotés d\'une alternative textuelle appropriée',
    severity: 'major',
    notes: 'Attribut title sur frame/iframe'
  },

  // ARIA required attributes - verified axe-core rule
  'aria-required-attr': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre',
    severity: 'critical',
    notes: 'Attributs ARIA obligatoires selon le rôle'
  },

  // Input image alt - verified axe-core rule
  'input-image-alt': {
    opquastId: 118,
    title: 'Les boutons image ont une alternative textuelle',
    severity: 'critical',
    notes: 'Attribut alt sur input type="image"'
  },

  // Empty headings - verified axe-core rule
  'empty-heading': {
    opquastId: 234,
    title: 'Les titres ne sont pas vides',
    severity: 'major',
    notes: 'Balises h1-h6 avec contenu'
  },

  // Page has H1 - verified axe-core rule
  'page-has-heading-one': {
    opquastId: 234,
    title: 'La page contient un titre de niveau 1',
    severity: 'major',
    notes: 'Au moins un h1 par page'
  },

  // Table cells have headers - verified axe-core rule
  'td-has-header': {
    opquastId: 242,
    title: 'Les cellules de données sont reliées à leurs entêtes',
    severity: 'major',
    notes: 'Association td/th correcte'
  },

  // Table headers have data cells - verified axe-core rule
  'th-has-data-cells': {
    opquastId: 243,
    title: 'Les entêtes de tableau ont des cellules associées',
    severity: 'major',
    notes: 'th avec scope ou headers'
  },

  // Object alt - verified axe-core rule
  'object-alt': {
    opquastId: 120,
    title: 'Les objets inclus ont une alternative',
    severity: 'critical',
    notes: 'Contenu alternatif pour object/embed'
  },

  // Area alt - verified axe-core rule
  'area-alt': {
    opquastId: 117,
    title: 'Les zones cliquables ont une alternative',
    severity: 'critical',
    notes: 'Attribut alt sur area'
  },

  // SVG image alt - verified axe-core rule
  'svg-img-alt': {
    opquastId: 118,
    title: 'Les images SVG ont une alternative',
    severity: 'critical',
    notes: 'title ou aria-label sur SVG'
  },

  // Select name - verified axe-core rule
  'select-name': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre',
    severity: 'critical',
    notes: 'Label associé au select'
  },

  // Valid lang attribute - verified axe-core rule
  'html-lang-valid': {
    opquastId: 130,
    title: 'L\'attribut lang est valide',
    severity: 'major',
    notes: 'Code langue conforme BCP 47'
  },

  // Meta viewport - verified axe-core rule
  'meta-viewport': {
    opquastId: 193,
    title: 'Le viewport ne bloque pas le zoom',
    severity: 'critical',
    notes: 'user-scalable=yes, maximum-scale >= 2'
  },

  // Duplicate ID - verified axe-core rule
  'duplicate-id': {
    opquastId: 236,
    title: 'Chaque identifiant HTML est unique',
    severity: 'major',
    notes: 'Pas de doublons d\'id'
  },

  // List structure - verified axe-core rule
  'list': {
    opquastId: 235,
    title: 'Les listes sont correctement balisées',
    severity: 'minor',
    notes: 'ul/ol contient uniquement li'
  }
  // Note: tabindex (167) removed - handled by CUSTOM_CHECKS for more precise detection
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
