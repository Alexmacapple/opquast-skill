/**
 * Privacy Validators
 * Rules: 15, 29
 */

export const PRIVACY_VALIDATORS = {
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
  }
};

export default PRIVACY_VALIDATORS;
