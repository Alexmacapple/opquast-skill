/**
 * Tests for custom Playwright checks
 * Tests all 8 custom Opquast rules: 139, 191, 237, 238, 165, 166, 167, 186
 *
 * Audit ShipGuard 2026-09-04 :
 * - r1-z04-055 : les attentes des règles 165 et 166 étaient enfermées dans `if (result)` ; une
 *   détection cassée rendait la suite verte. Elles sont désormais inconditionnelles.
 * - r1-z04-056 / r1-z04-059 : chaque test ouvre sa propre page et la ferme dans un `finally`,
 *   au lieu de partager une variable `page` refermée seulement en dernière instruction.
 * - r1-z04-057 : la page témoin ne portait plus son nom (3 violations tolérées) ; la fixture a été
 *   corrigée pour être réellement propre et l'assertion exige un tableau vide.
 * - r1-z04-058 : « should run all 8 checks » ne vérifiait pas les 8 checks ; le décompte est exact.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { launchBrowser, createContext, closeBrowser } from '../utils/browser.js';
import { readFileSync } from 'fs';

const rulesById = Object.fromEntries(
  JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'rules', 'opquast-v5.json'), 'utf-8')).rules.map(r => [r.id, r])
);
import { runCustomChecks, runCustomCheck } from '../checks/custom-checks.js';
import { CUSTOM_CHECKS } from '../utils/opquast-mapper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fixture paths
const TEST_PAGE = `file://${join(__dirname, 'fixtures/test-page.html')}`;
const CLEAN_PAGE = `file://${join(__dirname, 'fixtures/clean-page.html')}`;

describe('Custom Checks', () => {
  let context;

  beforeAll(async () => {
    await launchBrowser();
    context = await createContext();
  });

  afterAll(async () => {
    if (context) await context.close();
    await closeBrowser();
  });

  /**
   * Ouvre une page dédiée au test, la ferme quoi qu'il arrive (r1-z04-056, r1-z04-059).
   */
  const withPage = async (url, fn) => {
    const page = await context.newPage();
    try {
      await page.goto(url);
      return await fn(page);
    } finally {
      await page.close();
    }
  };

  describe('Rule 139: Underline reserved for links', () => {
    it('should detect underlined non-link text', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 139));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(139);
      expect(result.nodes.length).toBeGreaterThan(0);
    });

    it('should pass on clean page', async () => {
      const result = await withPage(CLEAN_PAGE, page => runCustomCheck(page, 139));

      // null means no violations
      expect(result).toBeNull();
    });
  });

  describe('Rule 191: Text not justified', () => {
    it('should detect justified text', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 191));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(191);
      expect(result.nodes.length).toBeGreaterThan(0);
      expect(result.severity).toBe(rulesById[191].severity);
    });
  });

  describe('Rule 237: Copy not blocked', () => {
    it('should detect user-select: none', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 237));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(237);
      expect(result.nodes.length).toBeGreaterThan(0);
    });
  });

  describe('Rule 238: Context menu not blocked', () => {
    it('should detect oncontextmenu blocking', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 238));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(238);
      expect(result.nodes.length).toBeGreaterThan(0);
    });
  });

  describe('Rule 165: Focus visible', () => {
    it('should detect elements without visible focus', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 165));

      // Assertion inconditionnelle : la fixture porte un bouton .no-focus dont le focus est masqué,
      // une détection qui cesserait de fonctionner doit faire échouer ce test (r1-z04-055).
      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(165);
      expect(result.severity).toBe(rulesById[165].severity);
      expect(result.nodes.length).toBeGreaterThan(0);
      expect(result.nodes.some(n => n.html.includes('no-focus'))).toBe(true);
    });

    it('should pass on clean page with good focus styles', async () => {
      const result = await withPage(CLEAN_PAGE, page => runCustomCheck(page, 165));

      // Clean page has explicit focus styles, should pass
      expect(result).toBeNull();
    });
  });

  describe('Rule 166: Keyboard navigable', () => {
    it('should detect non-focusable interactive elements', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 166));

      // La fixture porte un div[onclick] avec tabindex="-1" : la détection est exigée (r1-z04-055)
      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(166);
      expect(result.severity).toBe(rulesById[166].severity);
      expect(result.nodes.length).toBeGreaterThan(0);
      expect(result.nodes.some(n => n.html.includes('tabindex="-1"'))).toBe(true);
    });

    it('should pass on clean page', async () => {
      const result = await withPage(CLEAN_PAGE, page => runCustomCheck(page, 166));

      // Clean page uses proper buttons and links
      expect(result).toBeNull();
    });
  });

  describe('Rule 167: Tab order predictable', () => {
    it('should detect positive tabindex', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 167));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(167);
      expect(result.nodes.length).toBeGreaterThan(0);

      // Check failure message mentions tabindex
      const hasTabindexMessage = result.nodes.some(n =>
        n.failureSummary.toLowerCase().includes('tabindex')
      );
      expect(hasTabindexMessage).toBe(true);
    });

    it('should pass on clean page', async () => {
      const result = await withPage(CLEAN_PAGE, page => runCustomCheck(page, 167));

      expect(result).toBeNull();
    });
  });

  describe('Rule 186: Target size sufficient', () => {
    it('should detect small clickable elements', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 186));

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(186);
      expect(result.severity).toBe(rulesById[186].severity);

      // Check that violation mentions size
      const hasSizeMessage = result.nodes.some(n =>
        n.failureSummary.includes('44x44')
      );
      expect(hasSizeMessage).toBe(true);
    });
  });

  describe('runCustomChecks - Full suite', () => {
    it('should run all 8 checks and return one violation per check', async () => {
      const results = await withPage(TEST_PAGE, page => runCustomChecks(page));

      expect(Array.isArray(results)).toBe(true);

      // La fixture déclenche les 8 règles : un check qui cesserait de s'exécuter ferait chuter
      // ce décompte, ce que « length > 0 » ne détectait pas (r1-z04-058).
      const ruleIds = results.map(r => r.opquastId).sort((a, b) => a - b);
      const expectedIds = Object.keys(CUSTOM_CHECKS).map(Number).sort((a, b) => a - b);
      expect(expectedIds).toHaveLength(8);
      expect(ruleIds).toEqual(expectedIds);
    });

    it('should execute every declared custom check individually', async () => {
      // Deuxième garantie, indépendante de la fixture : chaque identifiant déclaré dans
      // CUSTOM_CHECKS est bien routé vers une fonction de contrôle (r1-z04-058).
      const executed = await withPage(TEST_PAGE, async (page) => {
        const seen = [];
        for (const id of Object.keys(CUSTOM_CHECKS).map(Number)) {
          const result = await runCustomCheck(page, id);
          if (result !== null) seen.push(result.opquastId);
        }
        return seen;
      });

      expect(executed.sort((a, b) => a - b)).toEqual(Object.keys(CUSTOM_CHECKS).map(Number).sort((a, b) => a - b));
    });

    it('should return empty array on clean page', async () => {
      const results = await withPage(CLEAN_PAGE, page => runCustomChecks(page));

      // La page témoin ne porte aucune violation : le nom du test est désormais exact (r1-z04-057)
      expect(results).toEqual([]);
    });
  });

  describe('Result format', () => {
    it('should return properly formatted violations', async () => {
      const result = await withPage(TEST_PAGE, page => runCustomCheck(page, 191));

      expect(result).toHaveProperty('opquastId');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('severity');
      expect(result).toHaveProperty('nodes');
      expect(Array.isArray(result.nodes)).toBe(true);

      expect(result.nodes.length).toBeGreaterThan(0);
      const node = result.nodes[0];
      expect(node).toHaveProperty('html');
      expect(node).toHaveProperty('target');
      expect(node).toHaveProperty('failureSummary');
    });
  });
});

describe('Rule 166 : élément cliquable non focalisable (audit ShipGuard 2026-09-03, r1-z03-023)', () => {
  it('flags a div[onclick] without tabindex and accepts one with tabindex=0', async () => {
    await launchBrowser();
    const context = await createContext();
    const page = await context.newPage();
    try {
      await page.setContent('<html lang="fr"><body><div onclick="void 0">Cliquez</div><div onclick="void 0" tabindex="0">Ok</div><button>b</button></body></html>');
      const result = await runCustomCheck(page, 166);
      expect(result).not.toBeNull();
      expect(result.nodes).toHaveLength(1);
      expect(result.nodes[0].html).toContain('Cliquez');
    } finally {
      await page.close();
      await context.close();
    }
  });
});
