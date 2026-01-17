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
 */

import { CONFIDENCE_LEVELS } from '../dom-analyzer/utils/opquast-mapper.js';

/**
 * Validator definitions
 * Each validator has:
 * - id: Opquast rule ID
 * - title: Rule title (French)
 * - check: Function(html, url) => result or null
 * - severity: critical | major | minor
 */
export const STATIC_VALIDATORS = {
  // Rule 3: Meta description present
  3: {
    title: 'Le code source contient une meta description',
    severity: 'major',
    check: (html) => {
      const hasMetaDesc = /<meta\s+[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["'][^"']+["']/i.test(html) ||
                         /<meta\s+[^>]*content\s*=\s*["'][^"']+["'][^>]*name\s*=\s*["']description["']/i.test(html);
      if (hasMetaDesc) {
        return { valid: true, confidence: 1.0 };
      }
      return {
        valid: false,
        confidence: 1.0,
        details: 'Meta description manquante ou vide'
      };
    }
  },

  // Rule 103: Page title is present and meaningful
  103: {
    title: 'Le titre de page permet d\'identifier son contenu',
    severity: 'critical',
    check: (html) => {
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (!titleMatch) {
        return { valid: false, confidence: 1.0, details: 'Balise title manquante' };
      }
      const title = titleMatch[1].trim();
      if (title.length === 0) {
        return { valid: false, confidence: 1.0, details: 'Balise title vide' };
      }
      if (title.length < 10) {
        return { valid: false, confidence: 0.8, details: `Titre trop court (${title.length} caracteres)` };
      }
      return { valid: true, confidence: 1.0 };
    }
  },

  // Rule 130: HTML lang attribute present
  130: {
    title: 'La langue principale du contenu est indiquee',
    severity: 'critical',
    check: (html) => {
      const hasLang = /<html[^>]+lang\s*=\s*["'][a-z]{2,5}(-[a-zA-Z]{2,5})?["']/i.test(html);
      if (hasLang) {
        return { valid: true, confidence: 1.0 };
      }
      return {
        valid: false,
        confidence: 1.0,
        details: 'Attribut lang manquant sur la balise html'
      };
    }
  },

  // Rule 193: Viewport meta doesn't block zoom
  193: {
    title: 'Les fonctionnalites de zoom ne sont pas bloquees',
    severity: 'critical',
    check: (html) => {
      const viewportMatch = html.match(/<meta[^>]+name\s*=\s*["']viewport["'][^>]*content\s*=\s*["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]+content\s*=\s*["']([^"']+)["'][^>]*name\s*=\s*["']viewport["']/i);

      if (!viewportMatch) {
        // No viewport = not blocking zoom (browser default)
        return { valid: true, confidence: 0.8, details: 'Pas de viewport defini' };
      }

      const content = viewportMatch[1].toLowerCase();
      const blocksZoom = /user-scalable\s*=\s*(no|0|false)/i.test(content) ||
                        /maximum-scale\s*=\s*1(\.0)?(\s|,|$)/i.test(content);

      if (blocksZoom) {
        return {
          valid: false,
          confidence: 1.0,
          details: 'Viewport bloque le zoom utilisateur'
        };
      }
      return { valid: true, confidence: 1.0 };
    }
  },

  // Rule 127: No autoplay audio/video
  127: {
    title: 'Les sons sont declenches par l\'utilisateur',
    severity: 'major',
    check: (html) => {
      // Check for autoplay on audio/video elements
      const hasAutoplay = /<(audio|video)[^>]+autoplay/i.test(html);
      if (hasAutoplay) {
        return {
          valid: false,
          confidence: 1.0,
          details: 'Element audio/video avec autoplay detecte'
        };
      }
      // Check for autoplay in iframes (YouTube, etc.)
      const iframeAutoplay = /<iframe[^>]+src\s*=\s*["'][^"']*autoplay=1/i.test(html);
      if (iframeAutoplay) {
        return {
          valid: false,
          confidence: 0.9,
          details: 'Iframe avec autoplay detectee'
        };
      }
      return { valid: true, confidence: 0.9 };
    }
  },

  // Rule 2: Copyright/license info available
  2: {
    title: 'Informations droits de copie disponibles',
    severity: 'minor',
    check: (html) => {
      const hasCopyright = /(&copy;|©|copyright|droits\s+d['e]\s*auteur|licence|license|creative\s+commons)/i.test(html);
      if (hasCopyright) {
        return { valid: true, confidence: 0.8 };
      }
      // Check footer area specifically
      const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
      if (footerMatch && /(&copy;|©|\d{4})/i.test(footerMatch[1])) {
        return { valid: true, confidence: 0.9 };
      }
      return {
        valid: false,
        confidence: 0.7,
        details: 'Informations de copyright non detectees'
      };
    }
  },

  // Rule 15: Privacy policy link available
  15: {
    title: 'Politique de confidentialite accessible',
    severity: 'major',
    check: (html) => {
      const privacyPatterns = [
        /href\s*=\s*["'][^"']*\/(privacy|confidentialite|vie-privee|politique-confidentialite|rgpd|gdpr)/i,
        /href\s*=\s*["'][^"']*privacy/i,
        />[\s]*(politique\s+(de\s+)?confidentialit|privacy\s+policy|vie\s+priv|rgpd|gdpr)[\s]*</i
      ];

      for (const pattern of privacyPatterns) {
        if (pattern.test(html)) {
          return { valid: true, confidence: 0.9 };
        }
      }
      return {
        valid: false,
        confidence: 0.75,
        details: 'Lien vers politique de confidentialite non detecte'
      };
    }
  },

  // Rule 1: RSS/Atom feed available
  1: {
    title: 'Fil RSS/Atom disponible pour les nouveaux contenus',
    severity: 'minor',
    check: (html) => {
      const hasFeed = /<link[^>]+type\s*=\s*["'](application\/(rss|atom)\+xml|text\/xml)["']/i.test(html) ||
                     /<link[^>]+rel\s*=\s*["']alternate["'][^>]+type\s*=\s*["']application\/(rss|atom)\+xml["']/i.test(html);
      if (hasFeed) {
        return { valid: true, confidence: 1.0 };
      }
      // Check for RSS/feed links in page
      const feedLink = /href\s*=\s*["'][^"']*(rss|feed|atom)[^"']*["']/i.test(html);
      if (feedLink) {
        return { valid: true, confidence: 0.8 };
      }
      // Not all sites need RSS - return null to skip
      return null;
    }
  },

  // Rule 6: Publication date indicated
  6: {
    title: 'Date de publication indiquee',
    severity: 'minor',
    check: (html) => {
      // Check for structured data dates
      const hasStructuredDate = /datetime\s*=\s*["']\d{4}-\d{2}-\d{2}/i.test(html) ||
                               /"datePublished"\s*:\s*["']\d{4}/i.test(html) ||
                               /"dateModified"\s*:\s*["']\d{4}/i.test(html) ||
                               /itemprop\s*=\s*["']datePublished["']/i.test(html);
      if (hasStructuredDate) {
        return { valid: true, confidence: 1.0 };
      }
      // Check for time elements
      const hasTimeElement = /<time[^>]+datetime\s*=/i.test(html);
      if (hasTimeElement) {
        return { valid: true, confidence: 0.9 };
      }
      // Not all pages need dates - return null to skip
      return null;
    }
  },

  // Rule 8: Advertising content identified
  8: {
    title: 'Contenus publicitaires identifies',
    severity: 'minor',
    check: (html) => {
      // Check for ad containers with proper disclosure
      const hasAdDisclosure = /aria-label\s*=\s*["'][^"']*(publicit|sponsor|annonce|ad\b)/i.test(html) ||
                             /class\s*=\s*["'][^"']*(ad-disclosure|sponsored-label|pub-label)/i.test(html);

      // Check for common ad scripts without disclosure
      const hasAdScripts = /(googletag|doubleclick|adsense|adsbygoogle)/i.test(html);

      if (hasAdScripts && !hasAdDisclosure) {
        return {
          valid: false,
          confidence: 0.6,
          details: 'Scripts publicitaires detectes sans identification claire'
        };
      }
      // If no ads detected, rule doesn't apply
      return null;
    }
  }
};

/**
 * Run all static validators on HTML content
 *
 * @param {string} html - HTML source code
 * @param {string} url - Page URL (for context)
 * @returns {Object} Validation results
 */
export function runStaticValidators(html, url = '') {
  const results = {
    validators: Object.keys(STATIC_VALIDATORS).length,
    passed: [],
    failed: [],
    skipped: [],
    timestamp: new Date().toISOString()
  };

  for (const [idStr, validator] of Object.entries(STATIC_VALIDATORS)) {
    const id = parseInt(idStr, 10);

    try {
      const result = validator.check(html, url);

      if (result === null) {
        // Rule doesn't apply or can't be determined
        results.skipped.push({
          opquastId: id,
          title: validator.title,
          reason: 'Non applicable ou indeterminable'
        });
      } else if (result.valid) {
        results.passed.push({
          opquastId: id,
          title: validator.title,
          confidence: result.confidence,
          source: 'static-heuristic',
          confidence_label: 'heuristic'
        });
      } else {
        results.failed.push({
          opquastId: id,
          title: validator.title,
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
  return {
    name: 'Static Heuristic Validators',
    version: '1.0.0',
    validators: Object.keys(STATIC_VALIDATORS).length,
    rules: Object.entries(STATIC_VALIDATORS).map(([id, v]) => ({
      id: parseInt(id, 10),
      title: v.title,
      severity: v.severity
    })),
    confidenceLevel: CONFIDENCE_LEVELS['heuristic']
  };
}

export default { STATIC_VALIDATORS, runStaticValidators, getValidatorInfo };
