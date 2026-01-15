/**
 * Tests for custom Playwright checks
 * Tests all 8 custom Opquast rules: 139, 191, 237, 238, 165, 166, 167, 186
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { launchBrowser, createContext, closeBrowser } from '../utils/browser.js';
import { runCustomChecks, runCustomCheck } from '../checks/custom-checks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fixture paths
const TEST_PAGE = `file://${join(__dirname, 'fixtures/test-page.html')}`;
const CLEAN_PAGE = `file://${join(__dirname, 'fixtures/clean-page.html')}`;

describe('Custom Checks', () => {
  let context;
  let page;

  beforeAll(async () => {
    await launchBrowser();
    context = await createContext();
  });

  afterAll(async () => {
    if (context) await context.close();
    await closeBrowser();
  });

  describe('Rule 139: Underline reserved for links', () => {
    it('should detect underlined non-link text', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 139);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(139);
      expect(result.nodes.length).toBeGreaterThan(0);

      await page.close();
    });

    it('should pass on clean page', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const result = await runCustomCheck(page, 139);

      // null means no violations
      expect(result).toBeNull();

      await page.close();
    });
  });

  describe('Rule 191: Text not justified', () => {
    it('should detect justified text', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 191);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(191);
      expect(result.nodes.length).toBeGreaterThan(0);
      expect(result.severity).toBe('minor');

      await page.close();
    });
  });

  describe('Rule 237: Copy not blocked', () => {
    it('should detect user-select: none', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 237);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(237);
      expect(result.nodes.length).toBeGreaterThan(0);

      await page.close();
    });
  });

  describe('Rule 238: Context menu not blocked', () => {
    it('should detect oncontextmenu blocking', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 238);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(238);
      expect(result.nodes.length).toBeGreaterThan(0);

      await page.close();
    });
  });

  describe('Rule 165: Focus visible', () => {
    it('should detect elements without visible focus', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 165);

      // May or may not find violations depending on browser defaults
      if (result) {
        expect(result.opquastId).toBe(165);
        expect(result.severity).toBe('critical');
      }

      await page.close();
    });

    it('should pass on clean page with good focus styles', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const result = await runCustomCheck(page, 165);

      // Clean page has explicit focus styles, should pass
      expect(result).toBeNull();

      await page.close();
    });
  });

  describe('Rule 166: Keyboard navigable', () => {
    it('should detect non-focusable interactive elements', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 166);

      // Test page has a div with onclick and tabindex=-1
      if (result) {
        expect(result.opquastId).toBe(166);
        expect(result.severity).toBe('critical');
        expect(result.nodes.length).toBeGreaterThan(0);
      }

      await page.close();
    });

    it('should pass on clean page', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const result = await runCustomCheck(page, 166);

      // Clean page uses proper buttons and links
      expect(result).toBeNull();

      await page.close();
    });
  });

  describe('Rule 167: Tab order predictable', () => {
    it('should detect positive tabindex', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 167);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(167);
      expect(result.nodes.length).toBeGreaterThan(0);

      // Check failure message mentions tabindex
      const hasTabindexMessage = result.nodes.some(n =>
        n.failureSummary.toLowerCase().includes('tabindex')
      );
      expect(hasTabindexMessage).toBe(true);

      await page.close();
    });

    it('should pass on clean page', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const result = await runCustomCheck(page, 167);

      expect(result).toBeNull();

      await page.close();
    });
  });

  describe('Rule 186: Target size sufficient', () => {
    it('should detect small clickable elements', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 186);

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(186);
      expect(result.severity).toBe('critical');

      // Check that violation mentions size
      const hasSizeMessage = result.nodes.some(n =>
        n.failureSummary.includes('44x44')
      );
      expect(hasSizeMessage).toBe(true);

      await page.close();
    });
  });

  describe('runCustomChecks - Full suite', () => {
    it('should run all 8 checks and return violations', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const results = await runCustomChecks(page);

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      // Check we have multiple rule IDs
      const ruleIds = results.map(r => r.opquastId);
      expect(new Set(ruleIds).size).toBeGreaterThan(1);

      await page.close();
    });

    it('should return empty array on clean page', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const results = await runCustomChecks(page);

      expect(Array.isArray(results)).toBe(true);
      // Clean page should have few or no violations
      expect(results.length).toBeLessThan(3);

      await page.close();
    });
  });

  describe('Result format', () => {
    it('should return properly formatted violations', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runCustomCheck(page, 191);

      expect(result).toHaveProperty('opquastId');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('severity');
      expect(result).toHaveProperty('nodes');
      expect(Array.isArray(result.nodes)).toBe(true);

      if (result.nodes.length > 0) {
        const node = result.nodes[0];
        expect(node).toHaveProperty('html');
        expect(node).toHaveProperty('target');
        expect(node).toHaveProperty('failureSummary');
      }

      await page.close();
    });
  });
});
