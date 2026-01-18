/**
 * Contact & Identification Validators
 * Rules: 22, 107
 */

export const CONTACT_VALIDATORS = {
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
  }
};

export default CONTACT_VALIDATORS;
