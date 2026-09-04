/**
 * Coherence test for axe-core → Opquast ID mappings
 * Ensures all mappings in opquast-mapper.js match rules in opquast-v5.json
 *
 * Garde jumelle : scripts/audit-mappings.js applique le MÊME critère (égalité stricte des titres et
 * des sévérités) en ligne de commande via « npm run audit:mappings ». Les deux doivent rester
 * alignés : toute évolution du critère se répercute ici et là-bas (audit ShipGuard, r1-z04-053).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AXE_TO_OPQUAST, CUSTOM_CHECKS } from '../utils/opquast-mapper.js';
import { checkMappingCoherence } from '../utils/mapping-coherence.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Mapping Coherence', () => {
  let rulesJson;
  let rulesById;

  beforeAll(() => {
    // Le chemin relatif (trois remontées depuis tests/) est le point fragile : un référentiel absent
    // ou corrompu doit nommer le chemin attendu, pas planter le hook (r1-z04-054).
    const rulesPath = join(__dirname, '..', '..', '..', 'rules', 'opquast-v5.json');
    try {
      rulesJson = JSON.parse(readFileSync(rulesPath, 'utf-8'));
    } catch (error) {
      throw new Error(`Référentiel Opquast illisible : ${rulesPath} (${error.message})`);
    }
    if (!Array.isArray(rulesJson?.rules)) {
      throw new Error(`Référentiel Opquast inexploitable : ${rulesPath} ne contient pas de tableau « rules »`);
    }
    rulesById = Object.fromEntries(rulesJson.rules.map(r => [r.id, r]));
  });

  describe('AXE_TO_OPQUAST mappings', () => {
    // Comptes exacts et non planchers : un plancher à 20 laissait passer la suppression accidentelle
    // de 4 mappings, alors que opquast-mapper.test.js exige 24 (contrats contradictoires, r1-z04-052)
    it('should have exactly 24 mappings', () => {
      expect(Object.keys(AXE_TO_OPQUAST).length).toBe(24);
    });

    it('should reference existing Opquast IDs', () => {
      const invalidIds = [];

      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        if (!rulesById[mapping.opquastId]) {
          invalidIds.push({ axeRule, opquastId: mapping.opquastId });
        }
      });

      expect(invalidIds).toEqual([]);
    });

    it('should have titles and severities strictly equal to the Opquast reference (module partagé, r1-z04-053)', () => {
      const { checked, issues } = checkMappingCoherence(rulesById);
      expect(checked).toBe(Object.keys(AXE_TO_OPQUAST).length + Object.keys(CUSTOM_CHECKS).length);
      expect(issues).toEqual([]);
    });

    it('should have valid severity values', () => {
      const validSeverities = ['critical', 'major', 'minor'];
      const invalidSeverities = [];

      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        if (!validSeverities.includes(mapping.severity)) {
          invalidSeverities.push({ axeRule, severity: mapping.severity });
        }
      });

      expect(invalidSeverities).toEqual([]);
    });
  });

  describe('CUSTOM_CHECKS mappings', () => {
    it('should have exactly 8 custom checks', () => {
      expect(Object.keys(CUSTOM_CHECKS).length).toBe(8);
    });

    it('should reference existing Opquast IDs', () => {
      const invalidIds = [];

      Object.entries(CUSTOM_CHECKS).forEach(([opquastId, check]) => {
        const id = Number(opquastId);
        if (!rulesById[id]) {
          invalidIds.push({ opquastId: id, title: check.title });
        }
      });

      expect(invalidIds).toEqual([]);
    });

    it('should have valid check types', () => {
      const validTypes = ['focus', 'keyboard', 'tabindex', 'target-size', 'css-check', 'attribute-check'];
      const invalidTypes = [];

      Object.entries(CUSTOM_CHECKS).forEach(([opquastId, check]) => {
        if (!validTypes.includes(check.type)) {
          invalidTypes.push({ opquastId, type: check.type });
        }
      });

      expect(invalidTypes).toEqual([]);
    });
  });

  describe('Coverage statistics', () => {
    it('should cover exactly 23 unique Opquast rules', () => {
      const axeRules = Object.values(AXE_TO_OPQUAST).map(m => m.opquastId);
      const customRules = Object.keys(CUSTOM_CHECKS).map(Number);
      const uniqueRules = new Set([...axeRules, ...customRules]);

      // Note: Some axe rules map to the same Opquast ID (e.g., label, button-name, select-name all → 69)
      expect(uniqueRules.size).toBe(23);
    });
  });
});
