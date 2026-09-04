/**
 * Metadata Validators
 * Rules: 3, 103, 104, 106, 108, 109, 130, 221, 222, 225
 */

export const METADATA_VALIDATORS = {
  // Rule 3: Meta description present
  3: {
    title: 'Le code source de chaque page contient une métadonnée qui en décrit le contenu.',
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
    title: 'Le titre de chaque page permet d\'identifier son contenu.',
    severity: 'critical',
    check: (html) => {
      // Le titre du document se lit dans <head> : un <title> de SVG inline placé avant ne doit pas
      // le supplanter, et un titre contenant du balisage ne doit pas être tronqué (r1-z04-039).
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const titleMatch = (headMatch && headMatch[1].match(/<title[^>]*>([\s\S]*?)<\/title>/i)) ||
                         html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (!titleMatch) {
        return { valid: false, confidence: 1.0, details: 'Balise title manquante' };
      }
      const title = titleMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
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
    title: 'Le code source des pages contient un appel valide à une icône de favori.',
    severity: 'major',
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
    title: 'Le numéro d\'immatriculation délivré aux sociétés ou organisations au terme des procédures légales d\'enregistrement en vigueur dans leur pays est indiqué.',
    severity: 'minor',
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
    title: 'Les délais de réponse aux demandes d\'information sont indiqués.',
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
    title: 'Les horaires et tarifs de fonctionnement des services mis à la disposition des utilisateurs sont indiqués.',
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
    title: 'Le code source de chaque page indique la langue principale du contenu.',
    severity: 'critical',
    check: (html) => {
      // Seul l'attribut lang compte : xml:lang ou data-lang ne satisfont pas la règle (r1-z04-032)
      const hasLang = /<html[^>]*\s(?<!xml:)(?<!data-)lang\s*=\s*["'][a-z]{2,5}(-[a-zA-Z]{2,5})?["']/i.test(html);
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
    title: 'Le serveur ne force pas la redirection vers la version ou l\'application mobile.',
    severity: 'minor',
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
    title: 'Le serveur envoie un code HTTP 404 pour les ressources non trouvées.',
    severity: 'minor',
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
    title: 'Le menu principal de navigation figure sur les pages d\'erreur personnalisées.',
    severity: 'critical',
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
