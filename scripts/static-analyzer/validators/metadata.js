/**
 * Metadata Validators
 * Rules: 3, 103, 104, 106, 108, 109, 130, 221, 222, 225
 */

export const METADATA_VALIDATORS = {
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

export default METADATA_VALIDATORS;
