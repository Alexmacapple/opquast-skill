/**
 * Audit ShipGuard 2026-09-03, zone z03 — contrat public de lib/analyzer.js.
 *
 * Constats couverts :
 * - r1-z03-044 : aucun test n'importait lib/analyzer.js ;
 * - r1-z03-018 : validation d'URL trop permissive et dupliquée dans analyze() et analyzeWithContext() ;
 * - r1-z03-036 : l'objet d'erreur n'avait pas la même forme que l'objet de succès ;
 * - r1-z03-012 : la version exposée par --info doit être celle de package.json ;
 * - r1-z03-004 : contrat d'erreur (lever pour un argument invalide, retourner pour une analyse échouée) ;
 * - r1-z03-038 : les exports « morts » (analyzeBatch, getAxeRules) sont désormais exercés.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  analyze,
  analyzeWithContext,
  analyzeBatch,
  getAnalyzerInfo,
  getSupportedRules,
  getAxeRules,
  isHttpUrl
} from '../lib/analyzer.js';
import { getSupportedOpquastRules, getAxeRuleIds } from '../utils/opquast-mapper.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

// Port fermé : la navigation échoue vite, sans accès réseau sortant
const UNREACHABLE = 'http://127.0.0.1:9/';

describe('validation d\'URL (r1-z03-018)', () => {
  it('accepte uniquement les URL http et https', () => {
    expect(isHttpUrl('http://example.com')).toBe(true);
    expect(isHttpUrl('https://example.com/page?a=1')).toBe(true);
    expect(isHttpUrl('httpfoo://x')).toBe(false);
    expect(isHttpUrl('http-truc')).toBe(false);
    expect(isHttpUrl('httpsss:/x')).toBe(false);
    expect(isHttpUrl('file:///etc/hosts')).toBe(false);
    expect(isHttpUrl('')).toBe(false);
    expect(isHttpUrl(null)).toBe(false);
  });

  it('analyze() rejette une URL non http(s) sans lancer de navigateur', async () => {
    await expect(analyze('httpfoo://x')).rejects.toThrow(/http/i);
    await expect(analyze('http-truc')).rejects.toThrow(/http/i);
    await expect(analyze('')).rejects.toThrow(/http/i);
  });

  it('analyzeWithContext() applique exactement la même garde', async () => {
    const contextStub = {
      newPage: () => {
        throw new Error('newPage ne doit pas être appelé pour une URL invalide');
      }
    };
    await expect(analyzeWithContext(contextStub, 'httpfoo://x')).rejects.toThrow(/http/i);
  });
});

describe('forme de l\'objet retourné par analyze() (r1-z03-036)', () => {
  it('retourne les mêmes clés en erreur qu\'en succès', async () => {
    const results = await analyze(UNREACHABLE);

    expect(results.success).toBe(false);
    expect(typeof results.error).toBe('string');
    expect(results.url).toBe(UNREACHABLE);
    expect(typeof results.timestamp).toBe('string');

    // Champs présents dans la réponse de succès et jusque-là absents de la réponse d'erreur
    expect(results.violations).toEqual([]);
    expect(results.warnings).toEqual([]);
    expect(results.passes).toBe(0);
    expect(results.customChecks).toEqual([]);
    expect(results).toHaveProperty('customChecksError');

    for (const key of [
      'rulesChecked',
      'axeRulesRun',
      'violationsCount',
      'warningsCount',
      'passesCount',
      'customChecksRun',
      'customViolationsCount',
      'totalRulesChecked',
      'totalViolationsCount'
    ]) {
      expect(results.stats[key], `stats.${key} manquant`).toBe(0);
    }
    expect(results.stats.opquastRuleIds).toEqual([]);
  });
});

describe('analyzeBatch (r1-z03-004, r1-z03-038)', () => {
  it('ne laisse pas une URL invalide interrompre le lot', async () => {
    const results = await analyzeBatch(['httpfoo://x', UNREACHABLE]);

    expect(results).toHaveLength(2);
    expect(results.every(r => r.success === false)).toBe(true);
    expect(results[0].url).toBe('httpfoo://x');
    expect(results[0].error).toMatch(/http/i);
    expect(results[1].url).toBe(UNREACHABLE);
    // Forme uniforme y compris pour l'URL rejetée avant navigation
    expect(results[0].stats.totalRulesChecked).toBe(0);
  });
});

describe('métadonnées de l\'analyseur (r1-z03-012, r1-z03-038)', () => {
  it('expose la version réelle du paquet', () => {
    expect(getAnalyzerInfo().version).toBe(pkg.version);
  });

  it('expose les règles supportées et les règles axe utilisées', () => {
    const info = getAnalyzerInfo();
    expect(getSupportedRules()).toEqual(getSupportedOpquastRules());
    expect(getAxeRules()).toEqual(getAxeRuleIds());
    expect(info.rulesCount).toBe(getSupportedOpquastRules().length);
    expect(info.axeRulesCount).toBe(getAxeRuleIds().length);
  });
});
