/**
 * Audit ShipGuard 2026-09-03 (r1-z03-001, r1-z03-002, r1-z03-010) : checkLinkNames et checkImageAlt visaient des règles
 * non mappées (144, 111) ; un identifiant Opquast partagé ne lançait que sa première règle axe.
 */
import { describe, it, expect } from 'vitest';
import { getAxeRulesForOpquastId, LINK_NAME_RULE, IMAGE_ALT_RULE } from '../utils/opquast-mapper.js';

describe('axe rules per Opquast id', () => {
  it('resolves the rules used by checkLinkNames and checkImageAlt', () => {
    expect(LINK_NAME_RULE).toBe(136);
    expect(IMAGE_ALT_RULE).toBe(118);
    expect(getAxeRulesForOpquastId(LINK_NAME_RULE)).toContain('link-name');
    expect(getAxeRulesForOpquastId(IMAGE_ALT_RULE)).toContain('image-alt');
  });

  it('returns every axe rule of a shared Opquast id', () => {
    expect(getAxeRulesForOpquastId(69).sort()).toEqual(['aria-required-attr', 'button-name', 'label', 'select-name']);
    expect(getAxeRulesForOpquastId(144)).toEqual([]);
    expect(getAxeRulesForOpquastId(111)).toEqual([]);
  });
});
