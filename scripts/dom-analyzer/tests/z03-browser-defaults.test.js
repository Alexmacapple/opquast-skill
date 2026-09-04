/**
 * Audit ShipGuard 2026-09-03, zone z03 — valeurs par défaut de utils/browser.js.
 *
 * Constats couverts :
 * - r1-z03-032 : Chromium était lancé avec --no-sandbox sur des URL arbitraires ;
 * - r1-z03-033 : ignoreHTTPSErrors: true acceptait silencieusement les certificats invalides ;
 * - r1-z03-034 : l'attente fixe de 1 s après networkidle n'était pas configurable.
 */

import { describe, it, expect, afterEach } from 'vitest';
import {
  getLaunchArgs,
  getContextDefaults,
  getSettleDelay,
  launchBrowser,
  createContext,
  navigateAndWait,
  closeBrowser
} from '../utils/browser.js';

const ENV_KEYS = ['OPQUAST_CHROMIUM_NO_SANDBOX', 'OPQUAST_IGNORE_HTTPS_ERRORS', 'OPQUAST_SETTLE_DELAY'];

afterEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
});

describe('bac à sable Chromium (r1-z03-032)', () => {
  it('n\'est pas désactivé par défaut', () => {
    const args = getLaunchArgs();
    expect(args).not.toContain('--no-sandbox');
    expect(args).not.toContain('--disable-setuid-sandbox');
    expect(args).toContain('--disable-dev-shm-usage');
  });

  it('peut être désactivé explicitement pour un environnement conteneurisé', () => {
    process.env.OPQUAST_CHROMIUM_NO_SANDBOX = '1';
    const args = getLaunchArgs();
    expect(args).toContain('--no-sandbox');
    expect(args).toContain('--disable-setuid-sandbox');
  });

  it('lance réellement un navigateur avec les arguments par défaut', async () => {
    await launchBrowser();
    const context = await createContext();
    const page = await context.newPage();
    await page.setContent('<!DOCTYPE html><html lang="fr"><body><h1>bac à sable</h1></body></html>');
    expect(await page.evaluate(() => document.querySelector('h1').textContent)).toBe('bac à sable');
    await page.close();
    await context.close();
    await closeBrowser();
  });
});

describe('certificats TLS (r1-z03-033)', () => {
  it('refuse les certificats invalides par défaut', () => {
    expect(getContextDefaults().ignoreHTTPSErrors).toBe(false);
  });

  it('accepte un contournement explicite pour auditer une préproduction auto-signée', () => {
    process.env.OPQUAST_IGNORE_HTTPS_ERRORS = '1';
    expect(getContextDefaults().ignoreHTTPSErrors).toBe(true);
  });

  it('conserve les autres réglages du contexte', () => {
    const defaults = getContextDefaults();
    expect(defaults.viewport).toEqual({ width: 1280, height: 720 });
    expect(defaults.userAgent).toMatch(/Mozilla/);
  });
});

describe('attente de stabilisation (r1-z03-034)', () => {
  it('vaut 1 s par défaut, comme avant l\'audit', () => {
    expect(getSettleDelay()).toBe(1000);
    expect(getSettleDelay({})).toBe(1000);
  });

  it('est configurable par option puis par variable d\'environnement', () => {
    expect(getSettleDelay({ settleDelay: 0 })).toBe(0);
    expect(getSettleDelay({ settleDelay: 250 })).toBe(250);
    process.env.OPQUAST_SETTLE_DELAY = '150';
    expect(getSettleDelay()).toBe(150);
    expect(getSettleDelay({ settleDelay: 0 })).toBe(0);
  });

  it('n\'est pas transmise à page.goto (option inconnue de Playwright)', async () => {
    await launchBrowser();
    const context = await createContext();
    const page = await context.newPage();
    await navigateAndWait(page, 'data:text/html,<html lang="fr"><body><p>ok</p></body></html>', { settleDelay: 0 });
    expect(await page.evaluate(() => document.querySelector('p').textContent)).toBe('ok');
    await page.close();
    await context.close();
    await closeBrowser();
  });
});
