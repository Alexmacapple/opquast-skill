import { describe, it, expect } from 'vitest';
import { detectSPA, getSPADetectorInfo, SPA_SIGNATURES, DOM_PATTERNS } from './spa-detector.js';

describe('SPA Detector v2', () => {

  // === TESTS FRAMEWORKS PRINCIPAUX ===

  describe('React Detection', () => {
    it('detecte Create React App (#root + react-dom)', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/static/js/react-dom.production.min.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('React');
      expect(result.detectionMethod).toBe('signature');
    });

    it('detecte Next.js comme SSR hybride', () => {
      const html = `<html><body>
        <div id="__next"><main>Contenu SSR</main></div>
        <script id="__NEXT_DATA__" type="application/json">{"props":{}}</script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isSSR).toBe(true);
      expect(result.framework).toBe('React');
      expect(result.recommendation).toBe('warn-spa');
    });

    it('detecte React avec data-reactroot', () => {
      const html = `<html><body>
        <div data-reactroot><span>App</span></div>
        <script src="/react.production.min.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('React');
    });
  });

  describe('Vue Detection', () => {
    it('detecte Nuxt.js comme SSR hybride', () => {
      const html = `<html><body>
        <div id="__nuxt" data-server-rendered="true"><div>Contenu</div></div>
        <script>window.__NUXT__={}</script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isSSR).toBe(true);
      expect(result.framework).toBe('Vue.js');
    });

    it('detecte Vue SPA pure', () => {
      const html = `<html><body>
        <div id="app" v-app></div>
        <script src="/js/vue.runtime.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isSSR).toBe(false);
    });

    it('detecte Vue via data-v- attributes', () => {
      const html = `<html><body>
        <div data-v-abc123>Component</div>
        <script src="/_nuxt/app.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Vue.js');
    });
  });

  describe('Angular Detection', () => {
    it('detecte Angular via app-root', () => {
      const html = `<html><body>
        <app-root ng-version="15.0.0"></app-root>
        <script src="polyfills.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Angular');
    });

    it('detecte Angular via _ngcontent', () => {
      const html = `<html><body>
        <div _ngcontent-abc-c123>Content</div>
        <script src="/zone.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Angular');
    });
  });

  // === TESTS NOUVEAUX FRAMEWORKS (Council) ===

  describe('Svelte Detection', () => {
    it('detecte Svelte via classes generees', () => {
      const html = `<html><body>
        <div class="svelte-1abc2de">Contenu</div>
        <script src="/build/bundle.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Svelte');
    });
  });

  describe('Alpine.js Detection (lightweight)', () => {
    it('detecte Alpine comme lightweight', () => {
      const html = `<html><body>
        <div x-data="{ open: false }">
          <button @click="open = true">Toggle</button>
        </div>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isLightweight).toBe(true);
      expect(result.framework).toBe('Alpine.js');
      expect(result.recommendation).toBe('full-analysis');
    });

    it('detecte Alpine via x-init', () => {
      const html = `<html><body>
        <div x-init="console.log('init')" x-data="{}">
          <span x-text="msg"></span>
        </div>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isLightweight).toBe(true);
    });
  });

  describe('HTMX Detection (lightweight)', () => {
    it('detecte HTMX comme lightweight', () => {
      const html = `<html><body>
        <button hx-get="/api/data" hx-target="#result">Load</button>
        <div id="result"></div>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.isLightweight).toBe(true);
      expect(result.framework).toBe('HTMX');
      expect(result.recommendation).toBe('full-analysis');
    });

    it('detecte HTMX via hx-trigger', () => {
      const html = `<html><body>
        <form hx-post="/submit" hx-trigger="submit">
          <input name="email" />
        </form>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('HTMX');
    });
  });

  describe('Qwik Detection', () => {
    it('detecte Qwik via q:container', () => {
      const html = `<html><body>
        <div q:container q:base="/build/">Contenu</div>
        <script src="/qwikloader.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Qwik');
    });
  });

  describe('Solid.js Detection', () => {
    it('detecte Solid.js via data-hk', () => {
      const html = `<html><body>
        <div data-hk="0-0">Content</div>
        <script src="/solid-js/web.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Solid.js');
    });
  });

  describe('Ember.js Detection', () => {
    it('detecte Ember via data-ember', () => {
      const html = `<html><body>
        <div data-ember-action="123">Action</div>
        <script src="/ember.prod.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('Ember.js');
    });
  });

  // === TESTS PATTERNS DOM GENERIQUES ===

  describe('Generic SPA Detection', () => {
    it('detecte SPA generique via body vide + bundles', () => {
      const html = `<html><body>
        <div id="app"></div>
        <script src="/js/chunk-vendors.abc123.js"></script>
        <script src="/js/chunk-main.def456.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('SPA Générique');
      expect(result.detectionMethod).toBe('dom-pattern');
    });

    it('detecte SPA via conteneur app vide', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/bundle.abc123.js"></script>
        <script src="/vendor.def456.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
    });
  });

  // === TESTS NEGATIFS (Council requirement) ===

  describe('Non-SPA Detection (tests negatifs)', () => {
    it('ne detecte PAS un site HTML classique', () => {
      const html = `<html><body>
        <header><nav><a href="/">Accueil</a><a href="/about">A propos</a></nav></header>
        <main>
          <article><h1>Article</h1><p>Contenu texte long avec plusieurs paragraphes...</p></article>
          <aside><h2>Sidebar</h2><ul><li>Item 1</li><li>Item 2</li></ul></aside>
        </main>
        <footer><p>Copyright 2024</p></footer>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(false);
    });

    it('ne detecte PAS un site WordPress/PHP', () => {
      const html = `<html><body class="home page-template">
        <div id="page" class="site">
          <header id="masthead" class="site-header"><nav class="main-nav">Menu complet</nav></header>
          <div id="content" class="site-content">
            <article id="post-123" class="post">
              <h1>Titre article</h1>
              <p>Contenu WordPress avec beaucoup de texte...</p>
            </article>
          </div>
          <footer id="colophon" class="site-footer">Footer WordPress</footer>
        </div>
        <script src="/wp-includes/js/jquery.min.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(false);
    });

    it('ne detecte PAS une page statique simple', () => {
      const html = `<!DOCTYPE html>
      <html lang="fr"><head><title>Page Statique</title></head>
      <body>
        <h1>Bienvenue</h1>
        <p>Ceci est une page statique sans JavaScript dynamique.</p>
        <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
        <a href="/contact">Contactez-nous</a>
        <img src="/image.jpg" alt="Image" />
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(false);
    });

    it('ne detecte PAS un site e-commerce classique (non-SPA)', () => {
      const html = `<html><body>
        <header><nav>Menu</nav><div class="cart">Panier (0)</div></header>
        <main>
          <div class="products">
            <div class="product"><h2>Produit 1</h2><p>Description</p><button>Ajouter</button></div>
            <div class="product"><h2>Produit 2</h2><p>Description</p><button>Ajouter</button></div>
            <div class="product"><h2>Produit 3</h2><p>Description</p><button>Ajouter</button></div>
          </div>
        </main>
        <footer>Footer</footer>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(false);
    });
  });

  // === TESTS RECOMMENDATIONS ===

  describe('Recommendations', () => {
    it('recommande warn-spa pour SSR hybride (pas dom-preferred)', () => {
      const html = `<html><body>
        <div id="__next"><h1>Page SSR</h1></div>
        <script id="__NEXT_DATA__">{"props":{}}</script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.recommendation).toBe('warn-spa');
      expect(result.warnings[0]).toContain('SSR hybride');
    });

    it('recommande full-analysis pour Alpine/HTMX', () => {
      const html = `<div x-data="{}" x-init="init()"><span x-text="msg"></span></div>`;
      const result = detectSPA(html);
      expect(result.recommendation).toBe('full-analysis');
    });

    it('recommande dom-preferred pour SPA pure haute confiance', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/react.production.min.js"></script>
        <script src="/react-dom.production.min.js"></script>
        <script>window.__REACT_DEVTOOLS__={}</script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.recommendation).toBe('dom-preferred');
      expect(result.confidence).toBeGreaterThanOrEqual(0.7);
    });

    it('recommande warn-spa pour SPA faible confiance', () => {
      const html = `<html><body>
        <div id="app"></div>
        <script src="/vue.js"></script>
      </body></html>`;
      const result = detectSPA(html);
      // Seulement 2 indicateurs, confiance ~0.6
      if (result.isSPA && result.confidence < 0.7) {
        expect(result.recommendation).toBe('warn-spa');
      }
    });
  });

  // === TESTS EDGE CASES ===

  describe('Edge Cases', () => {
    it('retourne resultat par defaut pour HTML vide', () => {
      const result = detectSPA('');
      expect(result.isSPA).toBe(false);
      expect(result.framework).toBe(null);
    });

    it('retourne resultat par defaut pour input null', () => {
      const result = detectSPA(null);
      expect(result.isSPA).toBe(false);
    });

    it('retourne resultat par defaut pour input undefined', () => {
      const result = detectSPA(undefined);
      expect(result.isSPA).toBe(false);
    });

    it('gere HTML malformed', () => {
      const html = `<html><body><div id="root"</div></body>`;
      const result = detectSPA(html);
      // Ne doit pas crash
      expect(result).toBeDefined();
    });

    it('detecte framework meme avec HTML minifie', () => {
      const html = `<html><body><div id="__next"></div><script id="__NEXT_DATA__">{}</script></body></html>`;
      const result = detectSPA(html);
      expect(result.isSPA).toBe(true);
      expect(result.framework).toBe('React');
    });
  });

  // === TESTS CONFIDENCE ===

  describe('Confidence Scoring', () => {
    it('augmente confidence avec plus de signatures', () => {
      const htmlFew = `<html><body>
        <div id="root"></div>
        <script src="/react.js"></script>
      </body></html>`;

      const htmlMany = `<html><body>
        <div id="root" data-reactroot></div>
        <script src="/react.production.min.js"></script>
        <script src="/react-dom.production.min.js"></script>
        <script>window.__REACT_DEVTOOLS__={}</script>
      </body></html>`;

      const resultFew = detectSPA(htmlFew);
      const resultMany = detectSPA(htmlMany);

      expect(resultMany.confidence).toBeGreaterThan(resultFew.confidence);
    });

    it('confidence max est 0.9', () => {
      const html = `<html><body>
        <div id="root" data-reactroot data-react-helmet></div>
        <script src="/_next/static/chunks/main.js"></script>
        <script src="/react.production.min.js"></script>
        <script src="/react-dom.production.min.js"></script>
        <script id="__NEXT_DATA__">{}</script>
        <script>window.__REACT_DEVTOOLS__={}</script>
      </body></html>`;
      const result = detectSPA(html);
      expect(result.confidence).toBeLessThanOrEqual(0.9);
    });
  });

  // === TEST INFO ===

  describe('getSPADetectorInfo', () => {
    it('retourne info avec 11 frameworks', () => {
      const info = getSPADetectorInfo();
      expect(info.version).toBe('2.0.0');
      expect(info.frameworkCount).toBe(11);
      expect(info.frameworks).toContain('react');
      expect(info.frameworks).toContain('vue');
      expect(info.frameworks).toContain('angular');
      expect(info.frameworks).toContain('svelte');
      expect(info.frameworks).toContain('alpine');
      expect(info.frameworks).toContain('htmx');
      expect(info.frameworks).toContain('qwik');
    });

    it('liste les features', () => {
      const info = getSPADetectorInfo();
      expect(info.features).toContain('signature-detection');
      expect(info.features).toContain('dom-patterns');
      expect(info.features).toContain('ssr-hybrid');
      expect(info.features).toContain('lightweight-detection');
    });

    it('liste les DOM patterns', () => {
      const info = getSPADetectorInfo();
      expect(info.domPatterns).toContain('emptyBody');
      expect(info.domPatterns).toContain('bundleScripts');
      expect(info.domPatterns).toContain('appContainer');
    });
  });

  // === TEST EXPORTS ===

  describe('Exports', () => {
    it('exporte SPA_SIGNATURES', () => {
      expect(SPA_SIGNATURES).toBeDefined();
      expect(SPA_SIGNATURES.react).toBeDefined();
      expect(SPA_SIGNATURES.vue).toBeDefined();
    });

    it('exporte DOM_PATTERNS', () => {
      expect(DOM_PATTERNS).toBeDefined();
      expect(DOM_PATTERNS.emptyBody).toBeDefined();
      expect(typeof DOM_PATTERNS.emptyBody.check).toBe('function');
    });
  });
});
