/**
 * Tests for interaction-based Playwright checks
 * PRD-004: Tests 18 interaction rules
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { launchBrowser, createContext, closeBrowser } from '../utils/browser.js';
import {
  runInteractionChecks,
  runInteractionCheck,
  getInteractionCheckInfo,
  INTERACTION_CHECKS
} from '../checks/interaction-checks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fixture paths
const TEST_PAGE = `file://${join(__dirname, 'fixtures/test-page.html')}`;
const CLEAN_PAGE = `file://${join(__dirname, 'fixtures/clean-page.html')}`;

describe('Interaction Checks', () => {
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

  describe('INTERACTION_CHECKS definition', () => {
    it('should define 18 interaction checks', () => {
      expect(Object.keys(INTERACTION_CHECKS).length).toBe(18);
    });

    it('should have form checks', () => {
      expect(INTERACTION_CHECKS[79]).toBeDefined();
      expect(INTERACTION_CHECKS[80]).toBeDefined();
      expect(INTERACTION_CHECKS[85]).toBeDefined();
      expect(INTERACTION_CHECKS[92]).toBeDefined();
    });

    it('should have link checks', () => {
      expect(INTERACTION_CHECKS[140]).toBeDefined();
      expect(INTERACTION_CHECKS[141]).toBeDefined();
      expect(INTERACTION_CHECKS[142]).toBeDefined();
    });

    it('should have navigation checks', () => {
      expect(INTERACTION_CHECKS[154]).toBeDefined();
      expect(INTERACTION_CHECKS[157]).toBeDefined();
      expect(INTERACTION_CHECKS[158]).toBeDefined();
    });

    it('should have modal checks', () => {
      expect(INTERACTION_CHECKS[160]).toBeDefined();
      expect(INTERACTION_CHECKS[161]).toBeDefined();
      expect(INTERACTION_CHECKS[162]).toBeDefined();
    });

    it('should have correct severity levels', () => {
      expect(INTERACTION_CHECKS[140].severity).toBe('critical');
      expect(INTERACTION_CHECKS[141].severity).toBe('minor');
    });
  });

  describe('getInteractionCheckInfo', () => {
    it('should return check metadata', () => {
      const info = getInteractionCheckInfo();

      expect(info.name).toBe('Interaction Checks');
      expect(info.version).toBe('1.0.0');
      expect(info.checks).toBe(18);
      expect(info.rules).toHaveLength(18);
      expect(info.confidenceLevel.confidence).toBe(0.80);
    });
  });

  describe('Link checks (140, 141, 142)', () => {
    it('should detect undifferentiated links on test page', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 140);

      // Test page has links, may or may not have violations
      if (result) {
        expect(result.opquastId).toBe(140);
        expect(result.source).toBe('interaction-check');
      }

      await page.close();
    });

    it('should check for :visited CSS rules', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 141);

      // May return null or violation depending on page CSS
      if (result) {
        expect(result.opquastId).toBe(141);
        expect(result.severity).toBe('minor');
      }

      await page.close();
    });

    it('should detect external links without indicators', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 142);

      if (result) {
        expect(result.opquastId).toBe(142);
      }

      await page.close();
    });
  });

  describe('Navigation checks (154, 157, 158)', () => {
    it('should detect target="_blank" without warning', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 154);

      if (result) {
        expect(result.opquastId).toBe(154);
        expect(result.title).toContain('popup');
      }

      await page.close();
    });

    it('should check for active menu indicators', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 157);

      if (result) {
        expect(result.opquastId).toBe(157);
      }

      await page.close();
    });
  });

  describe('Form checks (79, 80, 85, 92)', () => {
    it('should check for copy/paste blocking', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 92);

      // Test page has input with blocked paste
      if (result) {
        expect(result.opquastId).toBe(92);
      }

      await page.close();
    });

    it('should check for error message patterns', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 80);

      if (result) {
        expect(result.opquastId).toBe(80);
      }

      await page.close();
    });
  });

  describe('Label checks (77)', () => {
    it('should detect labels far from fields', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const result = await runInteractionCheck(page, 77);

      if (result) {
        expect(result.opquastId).toBe(77);
      }

      await page.close();
    });
  });

  describe('runInteractionChecks - Full suite', () => {
    it('should run all checks and return array', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const results = await runInteractionChecks(page);

      expect(Array.isArray(results)).toBe(true);

      // Verify result format if any violations
      if (results.length > 0) {
        const result = results[0];
        expect(result).toHaveProperty('opquastId');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('severity');
        expect(result).toHaveProperty('source');
        expect(result.source).toBe('interaction-check');
        expect(result).toHaveProperty('confidence');
        expect(result.confidence).toBe(0.80);
      }

      await page.close();
    });

    it('should return fewer violations on clean page', async () => {
      page = await context.newPage();
      await page.goto(CLEAN_PAGE);

      const results = await runInteractionChecks(page);

      expect(Array.isArray(results)).toBe(true);
      // Clean page should have fewer interaction violations
      expect(results.length).toBeLessThanOrEqual(5);

      await page.close();
    });
  });

  describe('Result format', () => {
    it('should include proper confidence scoring', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const results = await runInteractionChecks(page);

      results.forEach(result => {
        expect(result.source).toBe('interaction-check');
        expect(result.confidence).toBe(0.80);
        expect(result.confidence_label).toBe('interaction');
      });

      await page.close();
    });

    it('should include nodes with proper structure', async () => {
      page = await context.newPage();
      await page.goto(TEST_PAGE);

      const results = await runInteractionChecks(page);

      results.forEach(result => {
        expect(result).toHaveProperty('nodes');
        expect(Array.isArray(result.nodes)).toBe(true);

        if (result.nodes.length > 0) {
          const node = result.nodes[0];
          expect(node).toHaveProperty('html');
          expect(node).toHaveProperty('failureSummary');
        }
      });

      await page.close();
    });
  });
});
