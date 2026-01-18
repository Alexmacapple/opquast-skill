/**
 * Integration Tests: spa-detector ↔ bridge.js
 *
 * Tests the integration between SPA detection and the unified analysis bridge.
 * Since bridge.js requires network access, we test the integration logic
 * by simulating the bridge's behavior with spa-detector.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectSPA, getSPADetectorInfo } from '../spa-detector.js';
import { runStaticValidators } from '../validators.js';

/**
 * Simulates bridge.js integration logic for SPA detection
 * This mirrors the actual implementation in bridge.js lines 134-164
 */
function simulateBridgeIntegration(html, url, options = {}) {
  const { spaDetection = true } = options;

  const results = {
    url,
    warnings: [],
    analysis: {
      spaDetection: null,
      heuristic: null
    }
  };

  // Pre-flight SPA detection (mirrors bridge.js lines 135-150)
  let spaInfo = null;
  if (spaDetection) {
    spaInfo = detectSPA(html, url);
    results.analysis.spaDetection = spaInfo;

    if (spaInfo.isSPA) {
      // Propagate warnings (mirrors bridge.js line 144)
      results.warnings.push(...spaInfo.warnings);
    }
  }

  // Static validators always run (mirrors bridge.js lines 152-164)
  const heuristicResults = runStaticValidators(html, url);
  results.analysis.heuristic = heuristicResults;

  // Add SPA warning metadata if detected (mirrors bridge.js lines 158-164)
  if (spaInfo?.isSPA) {
    results.analysis.heuristic.spaWarning = {
      framework: spaInfo.framework,
      reliability: spaInfo.isSSR ? 'medium' : 'low',
      note: 'Résultats statiques peuvent être incomplets pour contenu client-rendered'
    };
  }

  return results;
}

/**
 * Simulates CLI argument parsing for spaDetection option
 * Mirrors bridge.js line 350
 */
function parseCliSpaDetection(args) {
  return !args.includes('--no-spa-detection');
}

// ============================================
// INTEGRATION TESTS
// ============================================

describe('Integration: spa-detector ↔ bridge.js', () => {

  describe('detectSPA() called correctly from bridge', () => {

    it('calls detectSPA with HTML and URL', () => {
      const html = '<html><div id="root"></div><script src="/react.production.js"></script></html>';
      const url = 'https://example.com';

      const results = simulateBridgeIntegration(html, url);

      expect(results.analysis.spaDetection).not.toBeNull();
      expect(results.analysis.spaDetection.isSPA).toBe(true);
      expect(results.analysis.spaDetection.framework).toBe('React');
    });

    it('stores spaDetection result in results.analysis', () => {
      const html = '<html><body><h1>Simple page</h1></body></html>';
      const url = 'https://example.com';

      const results = simulateBridgeIntegration(html, url);

      expect(results.analysis).toHaveProperty('spaDetection');
      expect(results.analysis.spaDetection.isSPA).toBe(false);
    });

    it('does NOT call detectSPA when spaDetection=false', () => {
      const html = '<html><div id="root"></div><script src="/react.production.js"></script></html>';
      const url = 'https://example.com';

      const results = simulateBridgeIntegration(html, url, { spaDetection: false });

      expect(results.analysis.spaDetection).toBeNull();
    });

  });

  describe('SPA warnings propagated to results.warnings', () => {

    it('propagates warnings for React SPA', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/react.production.min.js"></script>
        <script src="/react-dom.production.min.js"></script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://spa-app.com');

      expect(results.warnings.length).toBeGreaterThan(0);
      expect(results.warnings[0]).toContain('SPA');
    });

    it('propagates warnings for Next.js SSR hybrid', () => {
      const html = `<html><body>
        <div id="__next"><main>Server rendered content</main></div>
        <script id="__NEXT_DATA__" type="application/json">{"props":{}}</script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://nextjs-app.com');

      expect(results.warnings.length).toBeGreaterThan(0);
      expect(results.warnings[0]).toContain('SSR hybride');
    });

    it('propagates warnings for Vue SPA', () => {
      const html = `<html><body>
        <div id="app" v-app></div>
        <script src="/vue.runtime.js"></script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://vue-app.com');

      expect(results.warnings.length).toBeGreaterThan(0);
    });

    it('propagates warnings for Alpine.js (lightweight)', () => {
      const html = `<html><body>
        <div x-data="{ open: false }">
          <button @click="open = true">Toggle</button>
        </div>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://alpine-app.com');

      expect(results.warnings.length).toBeGreaterThan(0);
      expect(results.warnings[0]).toContain('léger');
    });

    it('no warnings for non-SPA sites', () => {
      const html = `<!DOCTYPE html>
      <html lang="fr">
        <head><title>Site classique</title></head>
        <body>
          <header><nav>Menu</nav></header>
          <main><article>Contenu</article></main>
          <footer>Footer</footer>
        </body>
      </html>`;

      const results = simulateBridgeIntegration(html, 'https://classic-site.com');

      expect(results.warnings.length).toBe(0);
    });

  });

  describe('spaDetection option works (true/false)', () => {

    const reactHtml = `<html><body>
      <div id="root"></div>
      <script src="/react.production.js"></script>
      <script src="/react-dom.production.js"></script>
    </body></html>`;

    it('spaDetection=true (default) runs detection', () => {
      const results = simulateBridgeIntegration(reactHtml, 'https://app.com');

      expect(results.analysis.spaDetection).not.toBeNull();
      expect(results.analysis.spaDetection.isSPA).toBe(true);
      expect(results.warnings.length).toBeGreaterThan(0);
    });

    it('spaDetection=true explicitly runs detection', () => {
      const results = simulateBridgeIntegration(reactHtml, 'https://app.com', {
        spaDetection: true
      });

      expect(results.analysis.spaDetection).not.toBeNull();
      expect(results.analysis.spaDetection.isSPA).toBe(true);
    });

    it('spaDetection=false skips detection entirely', () => {
      const results = simulateBridgeIntegration(reactHtml, 'https://app.com', {
        spaDetection: false
      });

      expect(results.analysis.spaDetection).toBeNull();
      expect(results.warnings.length).toBe(0);
    });

    it('static validators still run when spaDetection=false', () => {
      const results = simulateBridgeIntegration(reactHtml, 'https://app.com', {
        spaDetection: false
      });

      expect(results.analysis.heuristic).not.toBeNull();
      expect(results.analysis.heuristic.validators).toBeGreaterThan(0);
    });

  });

  describe('--no-spa-detection CLI flag parsing', () => {

    it('returns true when flag not present', () => {
      expect(parseCliSpaDetection(['https://example.com'])).toBe(true);
      expect(parseCliSpaDetection(['https://example.com', '--json'])).toBe(true);
      expect(parseCliSpaDetection(['https://example.com', '--dom-only'])).toBe(true);
    });

    it('returns false when --no-spa-detection present', () => {
      expect(parseCliSpaDetection(['https://example.com', '--no-spa-detection'])).toBe(false);
      expect(parseCliSpaDetection(['--no-spa-detection', 'https://example.com'])).toBe(false);
    });

    it('returns false when flag combined with other flags', () => {
      expect(parseCliSpaDetection(['https://example.com', '--json', '--no-spa-detection'])).toBe(false);
      expect(parseCliSpaDetection(['https://example.com', '--no-spa-detection', '--json'])).toBe(false);
    });

  });

  describe('spaWarning metadata added to heuristic results', () => {

    it('adds spaWarning for React SPA (low reliability)', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/react.production.js"></script>
        <script src="/react-dom.production.js"></script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://react-app.com');

      expect(results.analysis.heuristic.spaWarning).toBeDefined();
      expect(results.analysis.heuristic.spaWarning.framework).toBe('React');
      expect(results.analysis.heuristic.spaWarning.reliability).toBe('low');
    });

    it('adds spaWarning for Next.js SSR (medium reliability)', () => {
      const html = `<html><body>
        <div id="__next"><main>SSR Content</main></div>
        <script id="__NEXT_DATA__" type="application/json">{"props":{}}</script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://next-app.com');

      expect(results.analysis.heuristic.spaWarning).toBeDefined();
      expect(results.analysis.heuristic.spaWarning.framework).toBe('React');
      expect(results.analysis.heuristic.spaWarning.reliability).toBe('medium');
    });

    it('no spaWarning for non-SPA sites', () => {
      const html = `<!DOCTYPE html>
      <html><head><title>Classic</title></head>
      <body><p>Content</p></body></html>`;

      const results = simulateBridgeIntegration(html, 'https://classic.com');

      expect(results.analysis.heuristic.spaWarning).toBeUndefined();
    });

    it('no spaWarning when spaDetection=false', () => {
      const html = `<html><body>
        <div id="root"></div>
        <script src="/react.production.js"></script>
      </body></html>`;

      const results = simulateBridgeIntegration(html, 'https://app.com', {
        spaDetection: false
      });

      expect(results.analysis.heuristic.spaWarning).toBeUndefined();
    });

  });

  describe('getSPADetectorInfo() integration', () => {

    it('returns info compatible with bridge --info output', () => {
      const info = getSPADetectorInfo();

      expect(info).toHaveProperty('version');
      expect(info).toHaveProperty('frameworks');
      expect(info).toHaveProperty('frameworkCount');
      expect(info.frameworkCount).toBe(11);
    });

    it('frameworks array includes all expected frameworks', () => {
      const info = getSPADetectorInfo();

      const expected = ['react', 'vue', 'angular', 'svelte', 'solidjs', 'qwik', 'alpine', 'htmx', 'ember', 'lit', 'preact'];
      for (const fw of expected) {
        expect(info.frameworks).toContain(fw);
      }
    });

  });

  describe('Edge cases in integration', () => {

    it('handles empty HTML gracefully', () => {
      const results = simulateBridgeIntegration('', 'https://empty.com');

      expect(results.analysis.spaDetection.isSPA).toBe(false);
      expect(results.warnings.length).toBe(0);
    });

    it('handles malformed HTML gracefully', () => {
      const html = '<div><span>Unclosed tags';

      const results = simulateBridgeIntegration(html, 'https://malformed.com');

      expect(results.analysis.spaDetection).not.toBeNull();
      expect(results.analysis.heuristic).not.toBeNull();
    });

    it('handles HTML with only scripts', () => {
      const html = '<script src="/bundle.js"></script>';

      const results = simulateBridgeIntegration(html, 'https://scripts-only.com');

      expect(results.analysis.spaDetection).not.toBeNull();
    });

    it('URL is passed correctly to both modules', () => {
      const html = '<!DOCTYPE html><html><body>Test</body></html>';
      const url = 'https://test-url.com/page?param=value';

      const results = simulateBridgeIntegration(html, url);

      expect(results.url).toBe(url);
    });

  });

  describe('Full integration flow', () => {

    it('complete flow for React SPA', () => {
      const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>React App</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/main.abc123.js"></script>
          <script src="/static/js/react.production.min.js"></script>
        </body>
      </html>`;

      const results = simulateBridgeIntegration(html, 'https://react-app.example.com');

      // SPA detected
      expect(results.analysis.spaDetection.isSPA).toBe(true);
      expect(results.analysis.spaDetection.framework).toBe('React');

      // Warnings propagated
      expect(results.warnings.length).toBeGreaterThan(0);

      // Static validators ran
      expect(results.analysis.heuristic.passed.length + results.analysis.heuristic.failed.length).toBeGreaterThan(0);

      // SPA warning added
      expect(results.analysis.heuristic.spaWarning).toBeDefined();
    });

    it('complete flow for classic site', () => {
      const html = `<!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="description" content="Site classique">
          <title>Mon Site Classique</title>
          <link rel="canonical" href="https://classic.example.com">
        </head>
        <body>
          <header><nav>Navigation</nav></header>
          <main>
            <h1>Bienvenue</h1>
            <p>Contenu de la page</p>
          </main>
          <footer>© 2024</footer>
        </body>
      </html>`;

      const results = simulateBridgeIntegration(html, 'https://classic.example.com');

      // No SPA detected
      expect(results.analysis.spaDetection.isSPA).toBe(false);

      // No warnings
      expect(results.warnings.length).toBe(0);

      // Static validators ran and found some passes
      expect(results.analysis.heuristic.passed.length).toBeGreaterThan(0);

      // No SPA warning
      expect(results.analysis.heuristic.spaWarning).toBeUndefined();
    });

    it('complete flow with spaDetection disabled', () => {
      const html = `<html><body><div id="root"></div><script src="/react.js"></script></body></html>`;

      const results = simulateBridgeIntegration(html, 'https://app.com', {
        spaDetection: false
      });

      // SPA detection skipped
      expect(results.analysis.spaDetection).toBeNull();

      // No warnings
      expect(results.warnings.length).toBe(0);

      // Static validators still ran
      expect(results.analysis.heuristic).not.toBeNull();
      expect(results.analysis.heuristic.validators).toBeGreaterThan(0);

      // No SPA warning metadata
      expect(results.analysis.heuristic.spaWarning).toBeUndefined();
    });

  });

});
