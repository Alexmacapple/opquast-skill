/**
 * SPA Pre-flight Detector v2
 * Détection hybride: signatures + patterns DOM
 *
 * Détecte 11 frameworks SPA/SSR avant analyse statique
 * pour avertir l'utilisateur des limitations potentielles.
 *
 * @module spa-detector
 */

// Signatures étendues (11 frameworks)
const SPA_SIGNATURES = {
  react: {
    name: 'React',
    elements: ['id="root"', 'id="__next"', 'data-reactroot', 'data-react-helmet'],
    scripts: ['/_next/', 'react.production', 'react-dom'],
    indicators: ['__NEXT_DATA__', '__REACT_DEVTOOLS', 'window.React'],
    isSSR: (html) => html.includes('__NEXT_DATA__')
  },
  vue: {
    name: 'Vue.js',
    elements: ['id="app"', 'id="__nuxt"', 'v-app', 'data-v-', 'data-server-rendered'],
    scripts: ['/_nuxt/', 'vue.global', 'vue.runtime', 'vuex'],
    indicators: ['__NUXT__', '__VUE__', 'window.Vue'],
    isSSR: (html) => html.includes('data-server-rendered') || html.includes('__NUXT__')
  },
  angular: {
    name: 'Angular',
    elements: ['<app-root', 'ng-app', 'ng-version', '_ngcontent', 'ng-controller'],
    scripts: ['zone.js', 'polyfills.js', 'main.js', 'angular.'],
    indicators: ['ng.probe', 'getAllAngularRootElements']
  },
  svelte: {
    name: 'Svelte',
    elements: ['class="svelte-', 'data-svelte'],
    scripts: ['svelte', '__svelte'],
    indicators: ['__SVELTE__']
  },
  solidjs: {
    name: 'Solid.js',
    elements: ['data-hk'],
    scripts: ['solid-js', 'web.js'],
    indicators: ['_$HY', 'window.Solid']
  },
  qwik: {
    name: 'Qwik',
    elements: ['q:container', 'q:base', 'on:qvisible'],
    scripts: ['@builder.io/qwik', 'qwikloader'],
    indicators: ['__qwik__']
  },
  alpine: {
    name: 'Alpine.js',
    elements: ['x-data', 'x-init', 'x-show', 'x-bind', '@click'],
    scripts: ['alpinejs', 'alpine.min'],
    indicators: ['Alpine.version'],
    isLightweight: true
  },
  htmx: {
    name: 'HTMX',
    elements: ['hx-get', 'hx-post', 'hx-trigger', 'hx-swap', 'hx-target'],
    scripts: ['htmx.min', 'htmx.org'],
    indicators: ['htmx.version'],
    isLightweight: true
  },
  ember: {
    name: 'Ember.js',
    elements: ['id="ember-', 'data-ember'],
    scripts: ['ember.prod', 'ember-cli'],
    indicators: ['Ember.VERSION', 'window.Ember']
  },
  lit: {
    name: 'Lit/Web Components',
    elements: ['[is=', ':host'],
    scripts: ['lit-element', 'lit-html', '@lit/'],
    indicators: ['litHtml']
  },
  preact: {
    name: 'Preact',
    elements: ['id="root"', 'id="app"'],
    scripts: ['preact', 'preact-compat'],
    indicators: ['__PREACT_DEVTOOLS__']
  }
};

// Patterns DOM génériques (fallback si signatures échouent)
const DOM_PATTERNS = {
  emptyBody: {
    check: (html) => {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (!bodyMatch) return false;
      const elementCount = (bodyMatch[1].match(/<[a-z][^>]*>/gi) || []).length;
      return elementCount < 15;
    },
    confidence: 0.4,
    indicator: 'Corps HTML minimal'
  },
  bundleScripts: {
    check: (html) => {
      const bundles = html.match(/src="[^"]*\/(chunk|bundle|main|vendor)\.[a-f0-9]+\.js"/gi);
      return bundles && bundles.length >= 2;
    },
    confidence: 0.3,
    indicator: 'Scripts bundle détectés'
  },
  appContainer: {
    check: (html) => {
      return /<div\s+id=["'](root|app|__next|__nuxt)["'][^>]*>\s*<\/div>/i.test(html);
    },
    confidence: 0.5,
    indicator: 'Conteneur app vide'
  },
  hashRouting: {
    check: (html) => {
      return /href=["']#\//i.test(html) || /window\.location\.hash/i.test(html);
    },
    confidence: 0.3,
    indicator: 'Hash routing détecté'
  }
};

/**
 * Vérifie les signatures d'un framework
 * @param {string} html - HTML source
 * @param {Object} signature - Signature du framework
 * @returns {Object} Résultat avec count et indicators
 */
function checkSignature(html, signature) {
  const matches = { count: 0, indicators: [] };

  // Checker elements (attributs HTML)
  for (const elem of signature.elements || []) {
    // Gérer les sélecteurs avec wildcards
    const pattern = elem.includes('*=')
      ? elem.replace('*="', '.*').replace('"', '')
      : elem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars
    const regex = new RegExp(pattern, 'i');
    if (regex.test(html)) {
      matches.count++;
      matches.indicators.push(`Element: ${elem}`);
    }
  }

  // Checker scripts
  for (const script of signature.scripts || []) {
    if (html.toLowerCase().includes(script.toLowerCase())) {
      matches.count++;
      matches.indicators.push(`Script: ${script}`);
    }
  }

  // Checker indicators (globals, etc.)
  for (const ind of signature.indicators || []) {
    if (html.includes(ind)) {
      matches.count++;
      matches.indicators.push(`Indicator: ${ind}`);
    }
  }

  return matches;
}

/**
 * Détecte si HTML provient d'une SPA
 * @param {string} html - HTML source
 * @param {string} url - URL analysée (optionnel)
 * @returns {Object} Résultat détection
 */
export function detectSPA(html, url = '') {
  const result = {
    isSPA: false,
    isSSR: false,
    isLightweight: false,
    framework: null,
    confidence: 0,
    indicators: [],
    detectionMethod: 'none',
    recommendation: 'full-analysis',
    warnings: []
  };

  // Validation input
  if (!html || typeof html !== 'string') {
    return result;
  }

  // 1. Checker signatures framework
  for (const [key, sig] of Object.entries(SPA_SIGNATURES)) {
    const matches = checkSignature(html, sig);
    if (matches.count >= 2) {
      result.isSPA = true;
      result.framework = sig.name;
      result.confidence = Math.min(0.9, 0.3 + (matches.count * 0.15));
      result.indicators = matches.indicators;
      result.detectionMethod = 'signature';

      // Vérifier si SSR hybride
      if (sig.isSSR && sig.isSSR(html)) {
        result.isSSR = true;
      }

      // Vérifier si lightweight (Alpine/HTMX)
      if (sig.isLightweight) {
        result.isLightweight = true;
      }
      break;
    }
  }

  // 2. Si pas de framework, checker patterns DOM génériques
  if (!result.isSPA) {
    let genericConfidence = 0;
    for (const [name, pattern] of Object.entries(DOM_PATTERNS)) {
      if (pattern.check(html)) {
        genericConfidence += pattern.confidence;
        result.indicators.push(pattern.indicator);
      }
    }

    if (genericConfidence >= 0.6) {
      result.isSPA = true;
      result.framework = 'SPA Générique';
      result.confidence = Math.min(0.8, genericConfidence);
      result.detectionMethod = 'dom-pattern';
    }
  }

  // 3. Définir recommendation (RÉVISÉ - plus de skip static)
  if (result.isSPA) {
    if (result.isLightweight) {
      result.recommendation = 'full-analysis';
      result.warnings.push(
        `Framework léger détecté (${result.framework}) - analyse complète recommandée.`
      );
    } else if (result.isSSR) {
      result.recommendation = 'warn-spa';
      result.warnings.push(
        `Site SSR hybride détecté (${result.framework}) - l'analyse statique reste valide ` +
        `mais certaines règles DOM peuvent nécessiter le DOM Analyzer.`
      );
    } else if (result.confidence >= 0.7) {
      result.recommendation = 'dom-preferred';
      result.warnings.push(
        `SPA détectée (${result.framework}, confiance ${Math.round(result.confidence * 100)}%) - ` +
        `l'analyse statique peut être incomplète. DOM Analyzer recommandé.`
      );
    } else {
      result.recommendation = 'warn-spa';
      result.warnings.push(
        `SPA potentielle détectée (${result.framework}, confiance ${Math.round(result.confidence * 100)}%) - ` +
        `résultats statiques à vérifier.`
      );
    }
  }

  return result;
}

/**
 * Info sur le détecteur
 * @returns {Object} Informations du détecteur
 */
export function getSPADetectorInfo() {
  return {
    version: '2.0.0',
    frameworks: Object.keys(SPA_SIGNATURES),
    frameworkCount: Object.keys(SPA_SIGNATURES).length,
    domPatterns: Object.keys(DOM_PATTERNS),
    features: ['signature-detection', 'dom-patterns', 'ssr-hybrid', 'lightweight-detection']
  };
}

export { SPA_SIGNATURES, DOM_PATTERNS };
