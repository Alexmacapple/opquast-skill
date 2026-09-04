/**
 * Mapping between axe-core rules and Opquast rule IDs
 * Only includes validated axe-core rule IDs
 */

/**
 * Confidence levels for different check sources
 * PRD-002: Distinguish deterministic (axe-core) vs probabilistic (LLM) checks
 */
export const CONFIDENCE_LEVELS = {
  'axe-core': {
    confidence: 1.0,
    label: 'deterministic',
    description: 'Automated check with deterministic results'
  },
  'custom-check': {
    confidence: 0.85,
    label: 'automated',
    description: 'Playwright-based automated check'
  },
  'interaction': {
    confidence: 0.80,
    label: 'interaction',
    description: 'Playwright interaction-based check (hover, focus, forms)'
  },
  'heuristic': {
    confidence: 0.75,
    label: 'heuristic',
    description: 'Static pattern-based detection'
  },
  'llm': {
    confidence: 0.5,
    label: 'probabilistic',
    description: 'LLM-based analysis'
  },
  'manual': {
    confidence: 0,
    label: 'manual',
    description: 'Requires manual verification'
  }
};

/**
 * Mapping table: axe-core rule ID -> Opquast rule ID(s)
 * These are verified axe-core rules that exist in the library
 */
export const AXE_TO_OPQUAST = {
  // Titres et sévérités générés depuis rules/opquast-v5.json (audit ShipGuard 2026-09-03) : ne pas éditer à la main,
  // le test mapping-coherence.test.js et scripts/audit-mappings.js exigent l'égalité stricte avec le référentiel.
  // Contrast - verified axe-core rule
  'color-contrast': {
    opquastId: 182,
    title: 'Les contenus sont présentés avec un contraste suffisant par rapport à leur arrière-plan.',
    severity: 'critical',
    notes: 'WCAG 1.4.3 - Ratio 4.5:1 (texte normal) ou 3:1 (grand texte)'
  },

  // Links - verified axe-core rule
  'link-name': {
    opquastId: 136,
    title: 'Chaque lien est doté d\'un intitulé dans le code source.',
    severity: 'critical',
    notes: 'Texte du lien ou aria-label'
  },

  // Images - verified axe-core rule
  'image-alt': {
    opquastId: 118,
    title: 'Chaque image porteuse d\'information est dotée d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'Attribut alt présent et pertinent'
  },

  // Form labels - verified axe-core rule
  'label': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.',
    severity: 'critical',
    notes: 'Label explicite ou aria-label'
  },

  // HTML lang - verified axe-core rule
  'html-has-lang': {
    opquastId: 130,
    title: 'Le code source de chaque page indique la langue principale du contenu.',
    severity: 'critical',
    notes: 'Attribut lang sur html'
  },

  // Document title - verified axe-core rule
  'document-title': {
    opquastId: 103,
    title: 'Le titre de chaque page permet d\'identifier son contenu.',
    severity: 'critical',
    notes: 'Balise title présente et non vide'
  },

  // Bypass blocks - verified axe-core rule
  'bypass': {
    opquastId: 164,
    title: 'Chaque page contient des liens d\'accès rapide placés au début du code source.',
    severity: 'critical',
    notes: 'Skip link ou landmarks'
  },

  // Heading order - verified axe-core rule
  'heading-order': {
    opquastId: 234,
    title: 'Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée.',
    severity: 'critical',
    notes: 'Pas de saut de niveau'
  },

  // ========== Phase 4 additions (16 new mappings) ==========

  // Buttons - verified axe-core rule
  'button-name': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.',
    severity: 'critical',
    notes: 'Texte visible ou aria-label sur les boutons'
  },

  // Frames - verified axe-core rule
  'frame-title': {
    opquastId: 120,
    title: 'Les objets inclus sont dotés d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'Attribut title sur frame/iframe'
  },

  // ARIA required attributes - verified axe-core rule
  'aria-required-attr': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.',
    severity: 'critical',
    notes: 'Attributs ARIA obligatoires selon le rôle'
  },

  // Input image alt - verified axe-core rule
  'input-image-alt': {
    opquastId: 118,
    title: 'Chaque image porteuse d\'information est dotée d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'Attribut alt sur input type="image"'
  },

  // Empty headings - verified axe-core rule
  'empty-heading': {
    opquastId: 234,
    title: 'Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée.',
    severity: 'critical',
    notes: 'Balises h1-h6 avec contenu'
  },

  // Page has H1 - verified axe-core rule
  'page-has-heading-one': {
    opquastId: 234,
    title: 'Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée.',
    severity: 'critical',
    notes: 'Au moins un h1 par page'
  },

  // Table cells have headers - verified axe-core rule
  // Audit ShipGuard 2026-09-03 (r1-z03-042) : règle marquée « experimental » dans axe-core (4.13.0 installée,
  // dépendance déclarée en ^4.8.0). Conservée pour ne pas perdre la couverture d'Opquast 242, mais surveillée :
  // tests/z03-axe-rule-catalogue.test.js échoue si elle disparaît ou change de statut. Retirer la règle est un
  // arbitrage couverture / faux positifs qui relève d'une décision humaine.
  'td-has-header': {
    opquastId: 242,
    title: 'Les cellules des tableaux de données sont reliées à leurs entêtes.',
    severity: 'critical',
    notes: 'Association td/th correcte'
  },

  // Table headers have data cells - verified axe-core rule
  'th-has-data-cells': {
    opquastId: 243,
    title: 'Les titres des tableaux de données sont renseignés.',
    severity: 'critical',
    notes: 'th avec scope ou headers'
  },

  // Object alt - verified axe-core rule
  'object-alt': {
    opquastId: 120,
    title: 'Les objets inclus sont dotés d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'Contenu alternatif pour object/embed'
  },

  // Area alt - verified axe-core rule
  'area-alt': {
    opquastId: 117,
    title: 'Chaque image-lien est dotée d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'Attribut alt sur area'
  },

  // SVG image alt - verified axe-core rule
  'svg-img-alt': {
    opquastId: 118,
    title: 'Chaque image porteuse d\'information est dotée d\'une alternative textuelle appropriée.',
    severity: 'critical',
    notes: 'title ou aria-label sur SVG'
  },

  // Select name - verified axe-core rule
  'select-name': {
    opquastId: 69,
    title: 'Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.',
    severity: 'critical',
    notes: 'Label associé au select'
  },

  // Valid lang attribute - verified axe-core rule
  'html-lang-valid': {
    opquastId: 130,
    title: 'Le code source de chaque page indique la langue principale du contenu.',
    severity: 'critical',
    notes: 'Code langue conforme BCP 47'
  },

  // Meta viewport - verified axe-core rule
  'meta-viewport': {
    opquastId: 193,
    title: 'Les fonctionnalités de zoom ne sont pas bloquées.',
    severity: 'critical',
    notes: 'user-scalable=yes, maximum-scale >= 2'
  },

  // Duplicate ID - verified axe-core rule
  // Audit ShipGuard 2026-09-03 (r1-z03-041) : règle marquée « deprecated » dans axe-core. Vérifié sur la version
  // installée (4.13.0) : elle continue de s'exécuter et de remonter ses violations quand elle est demandée
  // nommément via AxeBuilder.withRules. Conservée car c'est la seule qui couvre l'unicité de TOUS les id
  // (duplicate-id-aria ne couvre que les id référencés par ARIA) ; sa disparition ferait échouer
  // tests/z03-axe-rule-catalogue.test.js au lieu de réduire la couverture en silence.
  'duplicate-id': {
    opquastId: 236,
    title: 'Chaque identifiant HTML n\'est utilisé qu\'une seule fois par page.',
    severity: 'critical',
    notes: 'Pas de doublons d\'id'
  },

  // List structure - verified axe-core rule
  'list': {
    opquastId: 235,
    title: 'Les éléments visuellement présentés sous forme de liste sont balisés de façon appropriée dans le code source.',
    severity: 'critical',
    notes: 'ul/ol contient uniquement li'
  }
  // Note: tabindex (167) removed - handled by CUSTOM_CHECKS for more precise detection
};

/**
 * Custom checks that don't use axe-core
 * These require Playwright-specific logic
 */
export const CUSTOM_CHECKS = {
  // Titres et sévérités alignés sur rules/opquast-v5.json (égalité stricte vérifiée par les tests).
  // Focus visibility - requires custom Playwright check
  165: {
    title: 'Le focus clavier n\'est ni supprimé ni masqué.',
    type: 'focus',
    severity: 'critical'
  },
  // Keyboard navigation - requires custom Playwright check
  166: {
    title: 'La navigation au clavier permet d\'interagir avec l’intégralité des contenus et services.',
    type: 'keyboard',
    severity: 'critical'
  },
  // Tab order - requires custom Playwright check
  167: {
    title: 'La navigation au clavier s\'effectue dans un ordre prévisible.',
    type: 'tabindex',
    severity: 'critical'
  },
  // Target size - requires bounding box check
  186: {
    title: 'La taille des éléments cliquables est suffisante.',
    type: 'target-size',
    severity: 'critical',
    notes: 'Minimum 44x44 pixels'
  },
  // Underline reserved for links
  139: {
    title: 'Le soulignement est réservé aux liens.',
    type: 'css-check',
    property: 'text-decoration',
    invalidValue: 'underline',
    severity: 'critical'
  },
  // Text not justified
  191: {
    title: 'Les styles ne justifient pas le texte.',
    type: 'css-check',
    property: 'text-align',
    invalidValue: 'justify',
    severity: 'critical'
  },
  // Copy not blocked
  237: {
    title: 'La copie du contenu n\'est pas bloquée.',
    type: 'css-check',
    property: 'user-select',
    invalidValue: 'none',
    severity: 'critical'
  },
  // Context menu not blocked
  238: {
    title: 'L\'accès au menu contextuel n\'est pas bloqué.',
    type: 'attribute-check',
    attribute: 'oncontextmenu',
    severity: 'critical'
  }
};

/**
 * Opquast rules targeted by the dedicated axe helpers (audit ShipGuard 2026-09-03 : 144 et 111 n'étaient pas mappées)
 */
export const LINK_NAME_RULE = 136;
export const IMAGE_ALT_RULE = 118;

/**
 * Every axe-core rule mapped to an Opquast id (several axe rules can share one Opquast id)
 * @param {number} opquastId
 * @returns {string[]}
 */
export function getAxeRulesForOpquastId(opquastId) {
  return Object.entries(AXE_TO_OPQUAST)
    .filter(([, mapping]) => mapping.opquastId === opquastId)
    .map(([axeRuleId]) => axeRuleId);
}

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

  const confidenceInfo = CONFIDENCE_LEVELS['axe-core'];

  return {
    opquastId: mapping.opquastId,
    title: mapping.title,
    severity: mapping.severity,
    // PRD-002: Confidence scoring
    source: 'axe-core',
    confidence: confidenceInfo.confidence,
    confidence_label: confidenceInfo.label,
    // Original fields
    axeRuleId: violation.id,
    impact: violation.impact,
    description: violation.description,
    helpUrl: violation.helpUrl,
    nodes: (violation.nodes || []).map(node => ({
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

/**
 * Create a custom check result with confidence scoring
 * PRD-002: Provides consistent format for custom Playwright checks
 * Seule source du format des violations custom depuis l'audit (r1-z03-039) : checks/custom-checks.js l'appelle.
 * @param {number} opquastId - Opquast rule ID
 * @param {Object} options - Check result options
 * @returns {Object} - Formatted result with confidence
 */
export function createCustomCheckResult(opquastId, options = {}) {
  const check = CUSTOM_CHECKS[opquastId];
  if (!check) {
    throw new Error(`Unknown custom check: ${opquastId}`);
  }

  const confidenceInfo = CONFIDENCE_LEVELS['custom-check'];

  return {
    opquastId,
    title: check.title,
    severity: check.severity,
    // PRD-002: Confidence scoring
    source: 'custom-check',
    confidence: confidenceInfo.confidence,
    confidence_label: confidenceInfo.label,
    // Custom check specific
    checkType: check.type,
    ...options
  };
}

/**
 * Get confidence info for a source type
 * API publique programmatique : non appelée par la CLI, couverte par les tests (r1-z03-038)
 * @param {string} source - Source type (axe-core, custom-check, heuristic, llm, manual)
 * @returns {Object} - Confidence info
 */
export function getConfidenceInfo(source) {
  return CONFIDENCE_LEVELS[source] || CONFIDENCE_LEVELS['manual'];
}

export default {
  AXE_TO_OPQUAST,
  LINK_NAME_RULE,
  IMAGE_ALT_RULE,
  getAxeRulesForOpquastId,
  CUSTOM_CHECKS,
  CONFIDENCE_LEVELS,
  mapAxeViolation,
  mapAxeResults,
  getAxeRuleIds,
  getSupportedOpquastRules,
  createCustomCheckResult,
  getConfidenceInfo
};
