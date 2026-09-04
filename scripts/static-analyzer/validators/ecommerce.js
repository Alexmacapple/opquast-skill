/**
 * E-Commerce Validators
 * Rules: 37, 42
 */

export const ECOMMERCE_VALIDATORS = {
  // Rule 37: Terms and conditions accessible
  37: {
    title: 'Les modalités de récupération d\'un bien dématérialisé sont précisées avant la commande.',
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
    title: 'Les conditions de financement sont indiquées.',
    severity: 'major',
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
  }
};

export default ECOMMERCE_VALIDATORS;
