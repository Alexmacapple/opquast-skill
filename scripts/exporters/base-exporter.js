/**
 * Base Exporter - Common methods for all exporters
 *
 * Provides data preparation, grouping, and formatting utilities
 * that can be reused across HTML, PDF, and other export formats.
 */

/**
 * Severity order for sorting
 */
const SEVERITY_ORDER = ['critical', 'major', 'minor'];

/**
 * Quick win rule IDs - rules that are easy to fix
 * (based on low complexity: missing attributes, simple CSS, etc.)
 */
const QUICK_WIN_RULES = [
  112, // Images avec attribut width/height
  113, // Images alternatives
  115, // Images liens avec alt pertinent
  124, // Title renseigné
  125, // Title de la page différent
  133, // Soulignement réservé aux liens
  145, // Langue déclarée
  147, // DOCTYPE présent
  148, // Encodage déclaré
  149, // Viewport présent
  175  // Liens tel: avec numéro lisible
];

/**
 * Base class for all exporters
 */
export class BaseExporter {
  constructor(options = {}) {
    this.options = {
      locale: 'fr-FR',
      dateFormat: 'long',
      ...options
    };
  }

  /**
   * Prepare data for export
   * @param {Object} results - Raw bridge.js results
   * @returns {Object} Prepared data for templates
   */
  prepareData(results) {
    const violations = results.summary?.violations || [];

    return {
      // Header info
      url: results.url,
      timestamp: results.timestamp,
      date: this.formatDate(results.timestamp),
      profile: this.detectProfile(results),

      // Scores
      coverage: this.calculateCoverage(results),
      complianceScore: this.calculateComplianceScore(results),

      // Violations
      violationsBySeveity: this.groupBySeverity(violations),
      totalViolations: violations.length,

      // Quick wins
      quickWins: this.extractQuickWins(violations),

      // Non-verifiable rules
      nonVerifiable: this.getNonVerifiableRules(results),

      // Warnings (SPA, etc.)
      warnings: results.warnings || [],
      spaInfo: results.analysis?.spaDetection,

      // Raw data for custom rendering
      raw: results
    };
  }

  /**
   * Format date for display
   * @param {string} isoDate
   * @returns {string}
   */
  formatDate(isoDate) {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat(this.options.locale, {
      dateStyle: this.options.dateFormat,
      timeStyle: 'short'
    }).format(date);
  }

  /**
   * Detect analysis profile based on options used
   * @param {Object} results
   * @returns {string}
   */
  detectProfile(results) {
    if (results.analysis?.dom && !results.analysis?.heuristic) {
      return 'DOM Analysis Only';
    }
    if (results.analysis?.dom && results.analysis?.heuristic) {
      return 'Full Analysis (DOM + Static Heuristics)';
    }
    if (results.analysis?.heuristic && !results.analysis?.dom) {
      return 'Static Heuristics Only';
    }
    return 'Unknown Profile';
  }

  /**
   * Calculate coverage statistics
   * @param {Object} results
   * @returns {Object}
   */
  calculateCoverage(results) {
    const coverage = results.summary?.coverage || {};

    return {
      dom: {
        checked: coverage.dom?.checked || 0,
        total: coverage.dom?.total || 35,
        percentage: coverage.dom?.percentage || 0
      },
      heuristic: {
        checked: coverage.heuristic?.checked || 0,
        validators: coverage.heuristic?.validators || 10
      },
      static: {
        applicable: coverage.static?.applicable || 159,
        remaining: coverage.static?.remaining || 0
      },
      interaction: {
        count: coverage.interaction?.count || 44
      },
      // Combined coverage for visual gauge
      totalChecked: (coverage.dom?.checked || 0) + (coverage.heuristic?.checked || 0),
      totalRules: 245,
      combinedPercentage: Math.round(
        (((coverage.dom?.checked || 0) + (coverage.heuristic?.checked || 0)) / 245) * 100
      )
    };
  }

  /**
   * Calculate compliance score (passed / checked rules)
   * @param {Object} results
   * @returns {Object}
   */
  calculateComplianceScore(results) {
    const violations = results.summary?.violations || [];
    const domChecked = results.summary?.domRulesChecked || 0;
    const staticChecked = results.summary?.staticRulesChecked || 0;
    const totalChecked = domChecked + staticChecked;

    if (totalChecked === 0) {
      return { passed: 0, failed: 0, percentage: 0 };
    }

    const failed = violations.length;
    const passed = totalChecked - failed;
    const percentage = Math.round((passed / totalChecked) * 100);

    return {
      passed,
      failed,
      totalChecked,
      percentage
    };
  }

  /**
   * Group violations by severity
   * @param {Array} violations
   * @returns {Object}
   */
  groupBySeverity(violations) {
    const grouped = {
      critical: [],
      major: [],
      minor: []
    };

    for (const v of violations) {
      const severity = v.severity || 'minor';
      if (grouped[severity]) {
        grouped[severity].push(v);
      }
    }

    return grouped;
  }

  /**
   * Extract quick wins (easy to fix violations)
   * @param {Array} violations
   * @returns {Array}
   */
  extractQuickWins(violations) {
    const quickWins = violations.filter(v => {
      // Rule-based quick wins
      if (QUICK_WIN_RULES.includes(v.opquastId)) {
        return true;
      }
      // Heuristic: minor severity with few elements
      if (v.severity === 'minor' && (v.nodes?.length || 0) <= 5) {
        return true;
      }
      return false;
    });

    // Sort by number of elements (easiest first)
    quickWins.sort((a, b) => (a.nodes?.length || 0) - (b.nodes?.length || 0));

    // Return top 5
    return quickWins.slice(0, 5);
  }

  /**
   * Get non-verifiable rules (require manual testing)
   * @param {Object} results
   * @returns {Object}
   */
  getNonVerifiableRules(results) {
    const coverage = results.summary?.coverage || {};

    return {
      interaction: {
        count: coverage.interaction?.count || 44,
        note: 'Requires manual testing (keyboard navigation, screen readers, etc.)'
      },
      llmRequired: {
        count: coverage.static?.remaining || 0,
        note: 'Requires semantic analysis beyond heuristics'
      }
    };
  }

  /**
   * Get severity color for styling
   * @param {string} severity
   * @returns {string}
   */
  getSeverityColor(severity) {
    const colors = {
      critical: '#dc2626', // red-600
      major: '#ea580c',    // orange-600
      minor: '#ca8a04'     // yellow-600
    };
    return colors[severity] || colors.minor;
  }

  /**
   * Get severity icon/badge
   * @param {string} severity
   * @returns {string}
   */
  getSeverityBadge(severity) {
    const badges = {
      critical: '🔴',
      major: '🟠',
      minor: '🟡'
    };
    return badges[severity] || '⚪';
  }
}

export default BaseExporter;
