/**
 * Contrôle de cohérence entre les tables du mapper (AXE_TO_OPQUAST, CUSTOM_CHECKS) et le référentiel
 * rules/opquast-v5.json : titre et sévérité doivent être strictement égaux à ceux de la règle visée.
 * Logique unique, partagée par scripts/audit-mappings.js et tests/mapping-coherence.test.js
 * (audit ShipGuard 2026-09-03, r1-z04-053).
 */

import { AXE_TO_OPQUAST, CUSTOM_CHECKS } from './opquast-mapper.js';

/**
 * @param {Object<number, {title: string, severity: string}>} rulesById - règles du référentiel indexées par id
 * @returns {{ checked: number, issues: Array<{label: string, opquastId: number, issue: string, mapper?: string, json?: string}> }}
 */
export function checkMappingCoherence(rulesById) {
  const issues = [];
  let checked = 0;

  const check = (label, opquastId, entry) => {
    checked++;
    const rule = rulesById[opquastId];
    if (!rule) {
      issues.push({ label, opquastId, issue: 'ID_NOT_FOUND' });
      return;
    }
    if (entry.title !== rule.title) {
      issues.push({ label, opquastId, issue: 'TITLE_MISMATCH', mapper: entry.title, json: rule.title });
    }
    if (entry.severity !== rule.severity) {
      issues.push({ label, opquastId, issue: 'SEVERITY_MISMATCH', mapper: entry.severity, json: rule.severity });
    }
  };

  Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => check(axeRule, mapping.opquastId, mapping));
  Object.entries(CUSTOM_CHECKS).forEach(([id, entry]) => check(`custom ${id}`, Number(id), entry));

  return { checked, issues };
}

export default { checkMappingCoherence };
