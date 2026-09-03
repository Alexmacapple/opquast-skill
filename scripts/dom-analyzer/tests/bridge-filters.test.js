/**
 * Audit ShipGuard 2026-09-03 (r1-z04-005) : les filtres --theme / --rubrique doivent s'appliquer aux violations.
 * bridge.js est importable sans effet de bord depuis r1-z04-001.
 */
import { describe, it, expect } from 'vitest';
import { filterViolationsByRules } from '../../bridge.js';

describe('bridge filters', () => {
  it('keeps only violations of the selected rules', () => {
    const violations = [{ opquastId: 69 }, { opquastId: 182 }, { opquastId: 3 }];
    const rules = [{ id: 69 }, { id: 3 }];
    expect(filterViolationsByRules(violations, rules).map(v => v.opquastId)).toEqual([69, 3]);
  });
});
