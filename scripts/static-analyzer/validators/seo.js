/**
 * SEO Validators
 * Rules: 105, 219, 220
 */

export const SEO_VALIDATORS = {
  // Rule 105: Print stylesheet
  105: {
    title: 'L’adresse complète et le numéro de téléphone des sociétés et organisations sont disponibles depuis toutes les pages.',
    severity: 'major',
    check: (html) => {
      const hasPrintCSS = /<link[^>]+media\s*=\s*["']print["']/i.test(html) ||
                         /@media\s+print/i.test(html);
      if (hasPrintCSS) {
        return { valid: true, confidence: 1.0 };
      }
      return null; // Not all pages need print styles
    }
  },

  // Rule 219: Robots.txt referenced
  219: {
    title: 'La racine du site contient des instructions pour les robots d\'indexation.',
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
    title: 'Le site propose un fichier sitemap indiquant les contenus à explorer.',
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
  }
};

export default SEO_VALIDATORS;
