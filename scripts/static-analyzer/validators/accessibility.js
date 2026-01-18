/**
 * Accessibility Validators
 * Rules: 127, 193
 */

export const ACCESSIBILITY_VALIDATORS = {
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
  }
};

export default ACCESSIBILITY_VALIDATORS;
