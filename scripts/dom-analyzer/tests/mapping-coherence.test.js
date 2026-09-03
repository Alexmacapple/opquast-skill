/**
 * Coherence test for axe-core → Opquast ID mappings
 * Ensures all mappings in opquast-mapper.js match rules in opquast-v5.json
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AXE_TO_OPQUAST, CUSTOM_CHECKS } from '../utils/opquast-mapper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Mapping Coherence', () => {
  let rulesJson;
  let rulesById;

  beforeAll(() => {
    const rulesPath = join(__dirname, '..', '..', '..', 'rules', 'opquast-v5.json');
    rulesJson = JSON.parse(readFileSync(rulesPath, 'utf-8'));
    rulesById = Object.fromEntries(rulesJson.rules.map(r => [r.id, r]));
  });

  describe('AXE_TO_OPQUAST mappings', () => {
    it('should have at least 20 mappings', () => {
      expect(Object.keys(AXE_TO_OPQUAST).length).toBeGreaterThanOrEqual(20);
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

    it('should have titles strictly equal to the Opquast reference titles', () => {
      // Audit ShipGuard 2026-09-03 (r1-z03-006, r1-z04-001) : un seul mot commun laissait passer 13 titres faux
      const mismatches = [];
      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        const opquastRule = rulesById[mapping.opquastId];
        if (!opquastRule) return;
        if (mapping.title !== opquastRule.title) {
          mismatches.push({ axeRule, opquastId: mapping.opquastId, mapperTitle: mapping.title, jsonTitle: opquastRule.title });
        }
      });
      expect(mismatches).toEqual([]);
    });

    it('should have severities equal to the Opquast reference severities', () => {
      const mismatches = [];
      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        const opquastRule = rulesById[mapping.opquastId];
        if (opquastRule && mapping.severity !== opquastRule.severity) {
          mismatches.push({ axeRule, opquastId: mapping.opquastId, mapper: mapping.severity, json: opquastRule.severity });
        }
      });
      expect(mismatches).toEqual([]);
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
    it('should have at least 5 custom checks', () => {
      expect(Object.keys(CUSTOM_CHECKS).length).toBeGreaterThanOrEqual(5);
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

    it('should have titles and severities equal to the Opquast reference', () => {
      const mismatches = [];
      Object.entries(CUSTOM_CHECKS).forEach(([opquastId, check]) => {
        const rule = rulesById[Number(opquastId)];
        if (!rule) return;
        if (check.title !== rule.title || check.severity !== rule.severity) {
          mismatches.push({ opquastId, title: check.title, jsonTitle: rule.title, severity: check.severity, jsonSeverity: rule.severity });
        }
      });
      expect(mismatches).toEqual([]);
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
    it('should cover at least 20 unique Opquast rules', () => {
      const axeRules = Object.values(AXE_TO_OPQUAST).map(m => m.opquastId);
      const customRules = Object.keys(CUSTOM_CHECKS).map(Number);
      const uniqueRules = new Set([...axeRules, ...customRules]);

      // Note: Some axe rules map to the same Opquast ID (e.g., label, button-name, select-name all → 69)
      expect(uniqueRules.size).toBeGreaterThanOrEqual(20);
    });
  });
});
