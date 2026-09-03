/**
 * Audit ShipGuard 2026-09-03, zone z03 — checks/axe-checks.js.
 *
 * Constats couverts :
 * - r1-z03-044 : aucun test n'importait checks/axe-checks.js ;
 * - r1-z03-037 : runFullAnalysis changeait de forme quand includeCustomChecks vaut false ;
 * - r1-z03-038 : checkOpquastRule, checkContrast, checkLinkNames et checkImageAlt n'étaient jamais exécutés.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { launchBrowser, createContext, closeBrowser } from '../utils/browser.js';
import {
  runAxeAnalysis,
  runFullAnalysis,
  checkOpquastRule,
  checkContrast,
  checkLinkNames,
  checkImageAlt
} from '../checks/axe-checks.js';
import { AXE_TO_OPQUAST, getSupportedOpquastRules } from '../utils/opquast-mapper.js';

const PAGE = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Fixture axe z03</title></head>
<body>
  <h1>Fixture</h1>
  <a href="#vide"></a>
  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
  <p id="dup">un</p>
  <p id="dup">deux</p>
</body>
</html>`;

const axeOpquastIds = [...new Set(Object.values(AXE_TO_OPQUAST).map(m => m.opquastId))];

describe('checks/axe-checks.js', () => {
  let context;
  let page;

  beforeAll(async () => {
    await launchBrowser();
    context = await createContext();
    page = await context.newPage();
    await page.setContent(PAGE);
  });

  afterAll(async () => {
    if (page) await page.close().catch(() => {});
    if (context) await context.close().catch(() => {});
    await closeBrowser();
  });

  it('runAxeAnalysis mappe les violations sur des identifiants Opquast', async () => {
    const results = await runAxeAnalysis(page, { rules: ['link-name', 'image-alt'] });

    expect(results.success).toBe(true);
    expect(results.stats.rulesChecked).toBe(2);
    const ids = results.violations.map(v => v.opquastId);
    expect(ids).toContain(136);
    expect(ids).toContain(118);
  });

  it('runFullAnalysis expose les mêmes clés avec et sans checks custom (r1-z03-037)', async () => {
    const withCustom = await runFullAnalysis(page, { includeCustomChecks: true });
    const withoutCustom = await runFullAnalysis(page, { includeCustomChecks: false });

    expect(Object.keys(withoutCustom).sort()).toEqual(Object.keys(withCustom).sort());
    expect(Object.keys(withoutCustom.stats).sort()).toEqual(Object.keys(withCustom.stats).sort());

    expect(withoutCustom.customChecks).toEqual([]);
    expect(withoutCustom.customChecksError).toBeNull();
    expect(withoutCustom.stats.customChecksRun).toBe(0);
    expect(withoutCustom.stats.customViolationsCount).toBe(0);
    expect(withoutCustom.stats.axeRulesRun).toBe(withoutCustom.stats.rulesChecked);
    expect(withoutCustom.stats.totalViolationsCount).toBe(withoutCustom.stats.violationsCount);

    // Sans les checks custom, la couverture annoncée se limite aux règles Opquast portées par axe
    expect(withoutCustom.stats.totalRulesChecked).toBe(axeOpquastIds.length);
    expect(withoutCustom.stats.opquastRuleIds.sort((a, b) => a - b)).toEqual([...axeOpquastIds].sort((a, b) => a - b));
    expect(withoutCustom.stats.totalRulesChecked).toBeGreaterThan(0);

    // Avec les checks custom, la couverture est celle de l'analyseur complet
    expect(withCustom.stats.totalRulesChecked).toBe(getSupportedOpquastRules().length);
  });

  it('checkOpquastRule exécute toutes les règles axe d\'un identifiant et signale l\'absence de mapping', async () => {
    const linkNames = await checkLinkNames(page);
    expect(linkNames.success).toBe(true);
    expect(linkNames.opquastId).toBe(136);
    expect(linkNames.axeRuleIds).toContain('link-name');
    expect(linkNames.conformant).toBe(false);
    expect(linkNames.violations.length).toBeGreaterThan(0);

    const imageAlt = await checkImageAlt(page);
    expect(imageAlt.opquastId).toBe(118);
    expect(imageAlt.conformant).toBe(false);

    const contrast = await checkContrast(page);
    expect(contrast.success).toBe(true);
    expect(contrast.opquastId).toBe(182);
    expect(typeof contrast.conformant).toBe('boolean');

    const unmapped = await checkOpquastRule(page, 999);
    expect(unmapped.success).toBe(false);
    expect(unmapped.conformant).toBeNull();
    expect(unmapped.error).toMatch(/999/);
  });
});
