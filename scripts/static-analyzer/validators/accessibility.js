/**
 * Accessibility Validators
 * Rules: 125, 193
 */

export const ACCESSIBILITY_VALIDATORS = {
  // Rule 125: sons déclenchés par l'utilisateur (autoplay) ; 127 concerne les animations (r1-z04-028)
  125: {
    title: 'Les sons sont déclenchés par l\'utilisateur.',
    severity: 'critical',
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

  // Rule 193: Viewport meta doesn't block zoom
  193: {
    title: 'Les fonctionnalités de zoom ne sont pas bloquées.',
    severity: 'critical',
    check: (html) => {
      const viewportMatch = html.match(/<meta[^>]+name\s*=\s*["']viewport["'][^>]*content\s*=\s*["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]+content\s*=\s*["']([^"']+)["'][^>]*name\s*=\s*["']viewport["']/i);

      if (!viewportMatch) {
        // No viewport = not blocking zoom (browser default)
        return { valid: true, confidence: 0.8, details: 'Pas de viewport defini' };
      }

      const content = viewportMatch[1].toLowerCase();
      // Comparaison numérique plutôt que motif littéral : 1, 1.0, 1.00, « 1.0; » et toute valeur
      // inférieure à 1 bloquent le zoom, quel que soit le séparateur qui suit (r1-z04-038).
      const maxScaleMatch = content.match(/maximum-scale\s*=\s*([0-9]*\.?[0-9]+)/i);
      const maxScale = maxScaleMatch ? Number.parseFloat(maxScaleMatch[1]) : null;
      const blocksZoom = /user-scalable\s*=\s*(no|0|false)/i.test(content) ||
                        (maxScale !== null && !Number.isNaN(maxScale) && maxScale <= 1);

      if (blocksZoom) {
        return {
          valid: false,
          confidence: 1.0,
          details: 'Viewport bloque le zoom utilisateur'
        };
      }
      return { valid: true, confidence: 1.0 };
    }
  }
};

export default ACCESSIBILITY_VALIDATORS;
