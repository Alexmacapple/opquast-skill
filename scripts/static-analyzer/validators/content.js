/**
 * Content Validators
 * Rules: 1, 2, 5, 6, 8, 99
 */

export const CONTENT_VALIDATORS = {
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
  }
};

export default CONTENT_VALIDATORS;
