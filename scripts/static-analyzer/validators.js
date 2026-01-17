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
  },

  // ============================================
  // PHASE 2 VALIDATORS (20 additional rules)
  // ============================================

  // Rule 5: Abbreviations have expansions
  5: {
    title: 'Les abreviations ont leur signification',
    severity: 'minor',
    check: (html) => {
      // Check for abbr tags with title
      const abbrWithTitle = /<abbr[^>]+title\s*=\s*["'][^"']+["']/i.test(html);
      // Check for acronym tags (legacy)
      const acronymTag = /<acronym[^>]+title\s*=\s*["'][^"']+["']/i.test(html);

      if (abbrWithTitle || acronymTag) {
        return { valid: true, confidence: 0.9 };
      }
      // Not all pages have abbreviations - skip if none found
      const hasAbbr = /<abbr/i.test(html);
      if (hasAbbr) {
        return { valid: false, confidence: 0.8, details: 'Balise abbr sans attribut title' };
      }
      return null;
    }
  },

  // Rule 22: Login with standard credentials
  22: {
    title: 'Connexion possible avec identifiants standards',
    severity: 'minor',
    check: (html) => {
      // Check for login form with email/password fields
      const hasLoginForm = /type\s*=\s*["']password["']/i.test(html);
      if (!hasLoginForm) return null;

      const hasEmailField = /type\s*=\s*["']email["']/i.test(html) ||
                           /name\s*=\s*["'](email|login|username)["']/i.test(html);
      if (hasEmailField) {
        return { valid: true, confidence: 0.8 };
      }
      return { valid: false, confidence: 0.6, details: 'Formulaire de connexion sans champ email standard' };
    }
  },

  // Rule 29: Cookie policy explained
  29: {
    title: 'Politique cookies expliquee',
    severity: 'major',
    check: (html) => {
      const cookiePatterns = [
        /href\s*=\s*["'][^"']*\/cookies/i,
        /href\s*=\s*["'][^"']*cookie-policy/i,
        />[\s]*(politique.*cookies|cookie.*policy|gestion.*cookies)/i,
        /class\s*=\s*["'][^"']*(cookie-banner|cookie-consent|cookies-notice)/i
      ];

      for (const pattern of cookiePatterns) {
        if (pattern.test(html)) {
          return { valid: true, confidence: 0.85 };
        }
      }
      // Check if site uses cookies
      const usesCookies = /(gtag|analytics|facebook|twitter|linkedin)/i.test(html);
      if (usesCookies) {
        return { valid: false, confidence: 0.7, details: 'Scripts tiers detectes sans politique cookies visible' };
      }
      return null;
    }
  },

  // Rule 37: Terms and conditions accessible
  37: {
    title: 'CGV/CGU accessibles',
    severity: 'major',
    check: (html) => {
      const termsPatterns = [
        /href\s*=\s*["'][^"']*\/(cgv|cgu|conditions|terms)/i,
        />[\s]*(conditions\s+(generales|d'utilisation)|terms\s+(of\s+)?(service|use)|cgu|cgv)/i
      ];

      for (const pattern of termsPatterns) {
        if (pattern.test(html)) {
          return { valid: true, confidence: 0.9 };
        }
      }
      // E-commerce sites must have terms
      const isEcommerce = /(add-to-cart|panier|checkout|paiement|payment)/i.test(html);
      if (isEcommerce) {
        return { valid: false, confidence: 0.75, details: 'Site e-commerce sans lien CGV visible' };
      }
      return null;
    }
  },

  // Rule 42: Currency indicated
  42: {
    title: 'Devise des prix indiquee',
    severity: 'minor',
    check: (html) => {
      // Check for currency symbols or codes near prices
      const hasCurrency = /(€|\$|£|EUR|USD|GBP)\s*\d|\d\s*(€|\$|£|EUR|USD|GBP)/i.test(html);
      const hasPrice = /itemprop\s*=\s*["']price["']/i.test(html) ||
                      /class\s*=\s*["'][^"']*price/i.test(html);

      if (hasCurrency) {
        return { valid: true, confidence: 0.9 };
      }
      if (hasPrice) {
        return { valid: false, confidence: 0.7, details: 'Prix detectes sans devise explicite' };
      }
      return null;
    }
  },

  // Rule 99: Homepage describes site content
  99: {
    title: 'Page accueil decrit le contenu du site',
    severity: 'major',
    check: (html, url) => {
      // Only check homepage
      if (url && !url.match(/^https?:\/\/[^\/]+\/?$/)) return null;

      // Check for descriptive elements
      const hasH1 = /<h1[^>]*>[^<]+<\/h1>/i.test(html);
      const hasMetaDesc = /<meta[^>]+name\s*=\s*["']description["']/i.test(html);
      const hasMainContent = /<main/i.test(html) || /role\s*=\s*["']main["']/i.test(html);

      if (hasH1 && hasMetaDesc && hasMainContent) {
        return { valid: true, confidence: 0.85 };
      }
      if (!hasH1) {
        return { valid: false, confidence: 0.8, details: 'Page accueil sans H1 descriptif' };
      }
      return { valid: true, confidence: 0.7 };
    }
  },

  // Rule 104: Favicon present
  104: {
    title: 'Favicon present',
    severity: 'minor',
    check: (html) => {
      const hasFavicon = /<link[^>]+rel\s*=\s*["'](icon|shortcut icon|apple-touch-icon)["']/i.test(html);
      if (hasFavicon) {
        return { valid: true, confidence: 1.0 };
      }
      return { valid: false, confidence: 0.9, details: 'Favicon non declare dans le HTML' };
    }
  },

  // Rule 105: Print stylesheet
  105: {
    title: 'Feuille de style impression disponible',
    severity: 'minor',
    check: (html) => {
      const hasPrintCSS = /<link[^>]+media\s*=\s*["']print["']/i.test(html) ||
                         /@media\s+print/i.test(html);
      if (hasPrintCSS) {
        return { valid: true, confidence: 1.0 };
      }
      return null; // Not all pages need print styles
    }
  },

  // Rule 106: Canonical URL
  106: {
    title: 'URL canonique declaree',
    severity: 'major',
    check: (html) => {
      const hasCanonical = /<link[^>]+rel\s*=\s*["']canonical["'][^>]+href\s*=\s*["'][^"']+["']/i.test(html) ||
                          /<link[^>]+href\s*=\s*["'][^"']+["'][^>]+rel\s*=\s*["']canonical["']/i.test(html);
      if (hasCanonical) {
        return { valid: true, confidence: 1.0 };
      }
      return { valid: false, confidence: 0.8, details: 'URL canonique non declaree' };
    }
  },

  // Rule 107: Multiple contact methods
  107: {
    title: 'Au moins deux moyens de contact proposes',
    severity: 'major',
    check: (html) => {
      let contactMethods = 0;

      if (/href\s*=\s*["']mailto:/i.test(html)) contactMethods++;
      if (/href\s*=\s*["']tel:/i.test(html)) contactMethods++;
      if (/href\s*=\s*["'][^"']*\/contact/i.test(html)) contactMethods++;
      if (/href\s*=\s*["'][^"']*(twitter|facebook|linkedin|instagram)/i.test(html)) contactMethods++;
      if (/<form[^>]*>[\s\S]*?(contact|message|email)/i.test(html)) contactMethods++;

      if (contactMethods >= 2) {
        return { valid: true, confidence: 0.9 };
      }
      if (contactMethods === 1) {
        return { valid: false, confidence: 0.8, details: 'Un seul moyen de contact detecte' };
      }
      return { valid: false, confidence: 0.7, details: 'Aucun moyen de contact detecte' };
    }
  },

  // Rule 108: OpenGraph tags
  108: {
    title: 'Balises OpenGraph presentes',
    severity: 'minor',
    check: (html) => {
      const hasOgTitle = /<meta[^>]+property\s*=\s*["']og:title["']/i.test(html);
      const hasOgDesc = /<meta[^>]+property\s*=\s*["']og:description["']/i.test(html);
      const hasOgImage = /<meta[^>]+property\s*=\s*["']og:image["']/i.test(html);

      if (hasOgTitle && hasOgDesc && hasOgImage) {
        return { valid: true, confidence: 1.0 };
      }
      if (hasOgTitle || hasOgDesc) {
        return { valid: false, confidence: 0.8, details: 'Balises OpenGraph incompletes' };
      }
      return null; // Not required for all sites
    }
  },

  // Rule 109: Twitter Cards
  109: {
    title: 'Twitter Cards configurees',
    severity: 'minor',
    check: (html) => {
      const hasTwitterCard = /<meta[^>]+name\s*=\s*["']twitter:card["']/i.test(html);
      const hasTwitterTitle = /<meta[^>]+name\s*=\s*["']twitter:title["']/i.test(html);

      if (hasTwitterCard && hasTwitterTitle) {
        return { valid: true, confidence: 1.0 };
      }
      if (hasTwitterCard) {
        return { valid: false, confidence: 0.8, details: 'Twitter Card incomplete' };
      }
      return null; // Not required
    }
  },

  // Rule 178: Newsletter unsubscribe without login
  178: {
    title: 'Desinscription newsletter sans connexion',
    severity: 'minor',
    check: (html) => {
      // Check for unsubscribe links
      const hasUnsubscribe = /href\s*=\s*["'][^"']*(unsubscribe|desinscri|desabonne)/i.test(html) ||
                            />[\s]*(se\s+desinscrire|unsubscribe|desabonnement)/i.test(html);

      // Check if page has newsletter form
      const hasNewsletter = /(newsletter|inscription.*email|email.*inscription)/i.test(html);

      if (hasUnsubscribe) {
        return { valid: true, confidence: 0.85 };
      }
      if (hasNewsletter) {
        return { valid: false, confidence: 0.6, details: 'Newsletter detectee sans lien desinscription visible' };
      }
      return null;
    }
  },

  // Rule 219: Robots.txt referenced
  219: {
    title: 'Instructions robots.txt',
    severity: 'minor',
    check: (html) => {
      // Check for robots meta tag
      const hasRobotsMeta = /<meta[^>]+name\s*=\s*["']robots["']/i.test(html);
      if (hasRobotsMeta) {
        return { valid: true, confidence: 0.9 };
      }
      // Can't check robots.txt file from HTML, return null
      return null;
    }
  },

  // Rule 220: Sitemap available
  220: {
    title: 'Sitemap disponible',
    severity: 'minor',
    check: (html) => {
      const hasSitemapLink = /href\s*=\s*["'][^"']*sitemap/i.test(html) ||
                            /<loc>[^<]*sitemap/i.test(html);
      if (hasSitemapLink) {
        return { valid: true, confidence: 0.9 };
      }
      // Can't verify sitemap.xml from HTML alone
      return null;
    }
  },

  // Rule 221: Charset UTF-8
  221: {
    title: 'Encodage UTF-8 declare',
    severity: 'critical',
    check: (html) => {
      const hasUtf8 = /<meta[^>]+charset\s*=\s*["']?utf-8["']?/i.test(html) ||
                     /content-type[^>]+charset\s*=\s*utf-8/i.test(html);
      if (hasUtf8) {
        return { valid: true, confidence: 1.0 };
      }
      const hasOtherCharset = /<meta[^>]+charset\s*=/i.test(html);
      if (hasOtherCharset) {
        return { valid: false, confidence: 0.9, details: 'Encodage declare mais pas UTF-8' };
      }
      return { valid: false, confidence: 0.8, details: 'Encodage non declare' };
    }
  },

  // Rule 222: Doctype HTML5
  222: {
    title: 'Doctype HTML5 declare',
    severity: 'major',
    check: (html) => {
      const hasHtml5Doctype = /^[\s]*<!DOCTYPE\s+html>/i.test(html);
      if (hasHtml5Doctype) {
        return { valid: true, confidence: 1.0 };
      }
      const hasOtherDoctype = /<!DOCTYPE/i.test(html);
      if (hasOtherDoctype) {
        return { valid: false, confidence: 0.9, details: 'Doctype present mais pas HTML5' };
      }
      return { valid: false, confidence: 1.0, details: 'Doctype manquant' };
    }
  },

  // Rule 223: No deprecated HTML elements
  223: {
    title: 'Pas elements HTML obsoletes',
    severity: 'minor',
    check: (html) => {
      const deprecatedTags = /<(font|center|marquee|blink|frame|frameset|applet)\b/i;
      if (deprecatedTags.test(html)) {
        return { valid: false, confidence: 1.0, details: 'Elements HTML obsoletes detectes' };
      }
      return { valid: true, confidence: 0.9 };
    }
  },

  // Rule 224: No inline styles
  224: {
    title: 'Pas de styles inline excessifs',
    severity: 'minor',
    check: (html) => {
      const inlineStyles = html.match(/style\s*=\s*["'][^"']+["']/gi) || [];
      if (inlineStyles.length > 20) {
        return { valid: false, confidence: 0.7, details: `${inlineStyles.length} styles inline detectes` };
      }
      if (inlineStyles.length > 10) {
        return { valid: false, confidence: 0.6, details: `${inlineStyles.length} styles inline detectes` };
      }
      return { valid: true, confidence: 0.8 };
    }
  },

  // Rule 225: Structured data present
  225: {
    title: 'Donnees structurees presentes',
    severity: 'minor',
    check: (html) => {
      const hasJsonLd = /<script[^>]+type\s*=\s*["']application\/ld\+json["']/i.test(html);
      const hasMicrodata = /itemscope|itemprop|itemtype/i.test(html);
      const hasRdfa = /typeof\s*=|property\s*=.*vocab/i.test(html);

      if (hasJsonLd || hasMicrodata || hasRdfa) {
        return { valid: true, confidence: 0.9 };
      }
      return null; // Not required for all sites
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
