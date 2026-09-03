/**
 * Tests for Opquast mapper utilities
 * Tests all mapping functions and validates the 25 axe-core rule mappings
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { describe, it, expect } from 'vitest';
import {
  AXE_TO_OPQUAST,
  CUSTOM_CHECKS,
  CONFIDENCE_LEVELS,
  mapAxeViolation,
  mapAxeResults,
  getAxeRuleIds,
  getSupportedOpquastRules,
  createCustomCheckResult,
  getConfidenceInfo
} from '../utils/opquast-mapper.js';

// Mock axe-core violation for testing
const createMockViolation = (id, overrides = {}) => ({
  id,
  impact: 'critical',
  description: `Test violation for ${id}`,
  helpUrl: `https://dequeuniversity.com/rules/axe/4.4/${id}`,
  nodes: [
    {
      html: '<img src="test.jpg">',
      target: ['img'],
      failureSummary: 'Element does not have an alt attribute'
    }
  ],
  ...overrides
});

const rulesById = Object.fromEntries(
  JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'rules', 'opquast-v5.json'), 'utf-8')).rules.map(r => [r.id, r])
);
const sev = (id) => rulesById[id].severity;
const title = (id) => rulesById[id].title;

describe('AXE_TO_OPQUAST Mapping', () => {
  describe('Structure validation', () => {
    it('should have 24 axe-core rule mappings', () => {
      // Note: tabindex was removed (handled by CUSTOM_CHECKS for rule 167)
      const ruleCount = Object.keys(AXE_TO_OPQUAST).length;
      expect(ruleCount).toBe(24);
    });

    it('each mapping should have required fields', () => {
      const requiredFields = ['opquastId', 'title', 'severity'];

      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        requiredFields.forEach(field => {
          expect(mapping).toHaveProperty(field);
          expect(mapping[field]).toBeDefined();
        });
      });
    });

    it('all opquastIds should be valid (1-245)', () => {
      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        expect(mapping.opquastId).toBeGreaterThanOrEqual(1);
        expect(mapping.opquastId).toBeLessThanOrEqual(245);
      });
    });

    it('all severities should be valid values', () => {
      const validSeverities = ['critical', 'major', 'minor'];

      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        expect(validSeverities).toContain(mapping.severity);
      });
    });

    it('all titles should be non-empty strings', () => {
      Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
        expect(typeof mapping.title).toBe('string');
        expect(mapping.title.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Specific mappings', () => {
    it('should map color-contrast to Opquast 182', () => {
      expect(AXE_TO_OPQUAST['color-contrast'].opquastId).toBe(182);
      expect(AXE_TO_OPQUAST['color-contrast'].severity).toBe(sev(182));
    });

    it('should map image-alt to Opquast 118', () => {
      expect(AXE_TO_OPQUAST['image-alt'].opquastId).toBe(118);
      expect(AXE_TO_OPQUAST['image-alt'].severity).toBe(sev(118));
    });

    it('should map link-name to Opquast 136', () => {
      expect(AXE_TO_OPQUAST['link-name'].opquastId).toBe(136);
      expect(AXE_TO_OPQUAST['link-name'].severity).toBe(sev(136));
    });

    it('should map document-title to Opquast 103', () => {
      expect(AXE_TO_OPQUAST['document-title'].opquastId).toBe(103);
      expect(AXE_TO_OPQUAST['document-title'].severity).toBe(sev(103));
    });

    it('should map html-has-lang to Opquast 130', () => {
      expect(AXE_TO_OPQUAST['html-has-lang'].opquastId).toBe(130);
      expect(AXE_TO_OPQUAST['html-has-lang'].severity).toBe(sev(130));
    });

    it('should map bypass to Opquast 164', () => {
      expect(AXE_TO_OPQUAST['bypass'].opquastId).toBe(164);
      expect(AXE_TO_OPQUAST['bypass'].severity).toBe(sev(164));
    });

    it('should map label to Opquast 69', () => {
      expect(AXE_TO_OPQUAST['label'].opquastId).toBe(69);
      expect(AXE_TO_OPQUAST['label'].severity).toBe(sev(69));
    });

    it('should map heading-order to Opquast 234', () => {
      expect(AXE_TO_OPQUAST['heading-order'].opquastId).toBe(234);
      expect(AXE_TO_OPQUAST['heading-order'].severity).toBe(sev(234));
    });
  });

  describe('Phase 4 additions (17 new mappings)', () => {
    const phase4Mappings = [
      ['button-name', 69, sev(69)],
      ['frame-title', 120, sev(120)],
      ['aria-required-attr', 69, sev(69)],
      ['input-image-alt', 118, sev(118)],
      ['empty-heading', 234, sev(234)],
      ['page-has-heading-one', 234, sev(234)],
      ['td-has-header', 242, sev(242)],
      ['th-has-data-cells', 243, sev(243)],
      ['object-alt', 120, sev(120)],
      ['area-alt', 117, sev(117)],
      ['svg-img-alt', 118, sev(118)],
      ['select-name', 69, sev(69)],
      ['html-lang-valid', 130, sev(130)],
      ['meta-viewport', 193, sev(193)],
      ['duplicate-id', 236, sev(236)],
      ['list', 235, sev(235)]
    ];

    phase4Mappings.forEach(([axeRule, expectedOpquastId, expectedSeverity]) => {
      it(`should map ${axeRule} to Opquast ${expectedOpquastId}`, () => {
        expect(AXE_TO_OPQUAST[axeRule]).toBeDefined();
        expect(AXE_TO_OPQUAST[axeRule].opquastId).toBe(expectedOpquastId);
        expect(AXE_TO_OPQUAST[axeRule].severity).toBe(expectedSeverity);
      });
    });
  });
});

describe('CUSTOM_CHECKS', () => {
  it('should have 8 custom checks', () => {
    expect(Object.keys(CUSTOM_CHECKS).length).toBe(8);
  });

  it('should include focus/keyboard checks (165, 166, 167)', () => {
    expect(CUSTOM_CHECKS[165]).toBeDefined();
    expect(CUSTOM_CHECKS[166]).toBeDefined();
    expect(CUSTOM_CHECKS[167]).toBeDefined();
  });

  it('should include CSS checks (139, 191, 237)', () => {
    expect(CUSTOM_CHECKS[139]).toBeDefined();
    expect(CUSTOM_CHECKS[191]).toBeDefined();
    expect(CUSTOM_CHECKS[237]).toBeDefined();
  });

  it('should include target size check (186)', () => {
    expect(CUSTOM_CHECKS[186]).toBeDefined();
    expect(CUSTOM_CHECKS[186].severity).toBe(sev(186));
  });

  it('should include context menu check (238)', () => {
    expect(CUSTOM_CHECKS[238]).toBeDefined();
  });
});

describe('mapAxeViolation', () => {
  it('should transform axe violation to Opquast format', () => {
    const violation = createMockViolation('image-alt');
    const result = mapAxeViolation(violation);

    expect(result).not.toBeNull();
    expect(result.opquastId).toBe(118);
    expect(result.title).toBe(title(118));
    expect(result.severity).toBe(sev(118));
    expect(result.axeRuleId).toBe('image-alt');
    expect(result.impact).toBe('critical');
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].html).toBe('<img src="test.jpg">');
  });

  it('should return null for unmapped rules', () => {
    const violation = createMockViolation('unknown-rule');
    const result = mapAxeViolation(violation);

    expect(result).toBeNull();
  });

  it('should preserve node information', () => {
    const violation = createMockViolation('link-name', {
      nodes: [
        { html: '<a href="#">Link 1</a>', target: ['a.link1'], failureSummary: 'No text' },
        { html: '<a href="#">Link 2</a>', target: ['a.link2'], failureSummary: 'No text' }
      ]
    });

    const result = mapAxeViolation(violation);

    expect(result.nodes).toHaveLength(2);
    expect(result.nodes[0].target).toEqual(['a.link1']);
    expect(result.nodes[1].target).toEqual(['a.link2']);
  });

  it('should include notes when available', () => {
    const violation = createMockViolation('color-contrast');
    const result = mapAxeViolation(violation);

    expect(result.notes).toBeDefined();
    expect(result.notes).toContain('4.5:1');
  });

  // PRD-002: Confidence scoring tests
  it('should include confidence scoring fields', () => {
    const violation = createMockViolation('image-alt');
    const result = mapAxeViolation(violation);

    expect(result.source).toBe('axe-core');
    expect(result.confidence).toBe(1.0);
    expect(result.confidence_label).toBe('deterministic');
  });

  it('should have deterministic confidence for all axe results', () => {
    const rules = ['color-contrast', 'link-name', 'label', 'bypass'];
    rules.forEach(ruleId => {
      const violation = createMockViolation(ruleId);
      const result = mapAxeViolation(violation);
      expect(result.confidence).toBe(1.0);
      expect(result.confidence_label).toBe('deterministic');
    });
  });
});

describe('mapAxeResults', () => {
  it('should transform multiple violations', () => {
    const violations = [
      createMockViolation('image-alt'),
      createMockViolation('link-name'),
      createMockViolation('document-title')
    ];

    const results = mapAxeResults(violations);

    expect(results).toHaveLength(3);
    expect(results.map(r => r.opquastId)).toEqual([118, 136, 103]);
  });

  it('should filter out unmapped violations', () => {
    const violations = [
      createMockViolation('image-alt'),
      createMockViolation('unknown-rule'),
      createMockViolation('link-name')
    ];

    const results = mapAxeResults(violations);

    expect(results).toHaveLength(2);
    expect(results.map(r => r.axeRuleId)).toEqual(['image-alt', 'link-name']);
  });

  it('should return empty array for empty input', () => {
    const results = mapAxeResults([]);
    expect(results).toEqual([]);
  });

  it('should return empty array when no violations are mapped', () => {
    const violations = [
      createMockViolation('unknown-rule-1'),
      createMockViolation('unknown-rule-2')
    ];

    const results = mapAxeResults(violations);
    expect(results).toEqual([]);
  });
});

describe('getAxeRuleIds', () => {
  it('should return all axe rule IDs', () => {
    const ruleIds = getAxeRuleIds();

    expect(Array.isArray(ruleIds)).toBe(true);
    expect(ruleIds.length).toBe(24); // tabindex removed, handled by custom checks
  });

  it('should include known axe rules', () => {
    const ruleIds = getAxeRuleIds();

    expect(ruleIds).toContain('image-alt');
    expect(ruleIds).toContain('link-name');
    expect(ruleIds).toContain('color-contrast');
    expect(ruleIds).toContain('document-title');
    expect(ruleIds).toContain('html-has-lang');
  });

  it('should match AXE_TO_OPQUAST keys', () => {
    const ruleIds = getAxeRuleIds();
    const mappingKeys = Object.keys(AXE_TO_OPQUAST);

    expect(ruleIds.sort()).toEqual(mappingKeys.sort());
  });
});

describe('getSupportedOpquastRules', () => {
  it('should return unique Opquast rule IDs', () => {
    const rules = getSupportedOpquastRules();

    expect(Array.isArray(rules)).toBe(true);
    // Should be unique
    expect(new Set(rules).size).toBe(rules.length);
  });

  it('should include both axe and custom check rules', () => {
    const rules = getSupportedOpquastRules();

    // From axe mappings
    expect(rules).toContain(118); // image-alt
    expect(rules).toContain(136); // link-name

    // From custom checks
    expect(rules).toContain(165); // focus visible
    expect(rules).toContain(186); // target size
  });

  it('should return sorted array', () => {
    const rules = getSupportedOpquastRules();
    const sorted = [...rules].sort((a, b) => a - b);

    expect(rules).toEqual(sorted);
  });

  it('should have all values as numbers', () => {
    const rules = getSupportedOpquastRules();

    rules.forEach(rule => {
      expect(typeof rule).toBe('number');
      expect(rule).toBeGreaterThanOrEqual(1);
      expect(rule).toBeLessThanOrEqual(245);
    });
  });

  it('should deduplicate shared opquastIds', () => {
    const rules = getSupportedOpquastRules();

    // empty-heading and page-has-heading-one both map to 234
    // svg-img-alt and input-image-alt both map to 118
    // These should only appear once
    const count234 = rules.filter(r => r === 234).length;
    const count118 = rules.filter(r => r === 118).length;

    expect(count234).toBe(1);
    expect(count118).toBe(1);
  });
});

describe('Edge cases', () => {
  it('should handle violation with empty nodes array', () => {
    const violation = createMockViolation('image-alt', { nodes: [] });
    const result = mapAxeViolation(violation);

    expect(result).not.toBeNull();
    expect(result.nodes).toEqual([]);
  });

  it('should handle violation with missing optional fields', () => {
    const violation = {
      id: 'image-alt',
      nodes: [{ html: '<img>', target: ['img'], failureSummary: 'No alt' }]
    };

    const result = mapAxeViolation(violation);

    expect(result).not.toBeNull();
    expect(result.impact).toBeUndefined();
    expect(result.description).toBeUndefined();
  });
});

// PRD-002: Confidence Scoring Tests
describe('CONFIDENCE_LEVELS', () => {
  it('should define 5 confidence levels', () => {
    expect(Object.keys(CONFIDENCE_LEVELS)).toHaveLength(5);
  });

  it('should have axe-core with 1.0 confidence', () => {
    expect(CONFIDENCE_LEVELS['axe-core'].confidence).toBe(1.0);
    expect(CONFIDENCE_LEVELS['axe-core'].label).toBe('deterministic');
  });

  it('should have custom-check with 0.85 confidence', () => {
    expect(CONFIDENCE_LEVELS['custom-check'].confidence).toBe(0.85);
    expect(CONFIDENCE_LEVELS['custom-check'].label).toBe('automated');
  });

  it('should have heuristic with 0.75 confidence', () => {
    expect(CONFIDENCE_LEVELS['heuristic'].confidence).toBe(0.75);
    expect(CONFIDENCE_LEVELS['heuristic'].label).toBe('heuristic');
  });

  it('should have llm with 0.5 confidence', () => {
    expect(CONFIDENCE_LEVELS['llm'].confidence).toBe(0.5);
    expect(CONFIDENCE_LEVELS['llm'].label).toBe('probabilistic');
  });

  it('should have manual with 0 confidence', () => {
    expect(CONFIDENCE_LEVELS['manual'].confidence).toBe(0);
    expect(CONFIDENCE_LEVELS['manual'].label).toBe('manual');
  });

  it('all levels should have description', () => {
    Object.values(CONFIDENCE_LEVELS).forEach(level => {
      expect(level.description).toBeDefined();
      expect(typeof level.description).toBe('string');
    });
  });
});

describe('createCustomCheckResult', () => {
  it('should create result with custom-check confidence', () => {
    const result = createCustomCheckResult(165, { nodes: [] });

    expect(result.opquastId).toBe(165);
    expect(result.source).toBe('custom-check');
    expect(result.confidence).toBe(0.85);
    expect(result.confidence_label).toBe('automated');
  });

  it('should include check metadata', () => {
    const result = createCustomCheckResult(186, { nodes: [] });

    expect(result.title).toBe(title(186));
    expect(result.severity).toBe(sev(186));
    expect(result.checkType).toBe('target-size');
  });

  it('should merge additional options', () => {
    const result = createCustomCheckResult(167, {
      nodes: [{ html: '<div tabindex="5">' }],
      customField: 'test'
    });

    expect(result.nodes).toHaveLength(1);
    expect(result.customField).toBe('test');
  });

  it('should throw for unknown check', () => {
    expect(() => createCustomCheckResult(999)).toThrow('Unknown custom check');
  });
});

describe('getConfidenceInfo', () => {
  it('should return correct info for known sources', () => {
    expect(getConfidenceInfo('axe-core').confidence).toBe(1.0);
    expect(getConfidenceInfo('custom-check').confidence).toBe(0.85);
    expect(getConfidenceInfo('heuristic').confidence).toBe(0.75);
    expect(getConfidenceInfo('llm').confidence).toBe(0.5);
  });

  it('should return manual for unknown source', () => {
    const info = getConfidenceInfo('unknown-source');
    expect(info.confidence).toBe(0);
    expect(info.label).toBe('manual');
  });
});

describe('mapAxeViolation sans nodes (audit ShipGuard 2026-09-03, r1-z04-049)', () => {
  it('returns an empty nodes array instead of throwing', () => {
    const result = mapAxeViolation({ id: 'image-alt', impact: 'critical', description: 'x', helpUrl: 'u' });
    expect(result.nodes).toEqual([]);
  });
});
