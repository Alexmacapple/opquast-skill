/**
 * Structure & Code Validators
 * Rules: 178, 223, 224
 */

export const STRUCTURE_VALIDATORS = {
  // Rule 178: Newsletter unsubscribe without login
  178: {
    title: 'Les archives de newsletters sont disponibles en ligne.',
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

  // Rule 223: No deprecated HTML elements
  223: {
    title: 'Le serveur envoie une page d\'erreur 404 personnalisée.',
    severity: 'critical',
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
    title: 'Le serveur envoie une page d\'interdiction 403 personnalisée.',
    severity: 'critical',
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
  }
};

export default STRUCTURE_VALIDATORS;
