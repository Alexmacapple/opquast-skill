/**
 * Audit ShipGuard 2026-09-03, zone z03 — garde-fou contre la dérive silencieuse du catalogue axe-core.
 *
 * Constats couverts :
 * - r1-z03-041 : la règle axe « duplicate-id » (Opquast 236) est dépréciée dans axe-core ;
 * - r1-z03-042 : la règle axe « td-has-header » (Opquast 242) est expérimentale.
 *
 * La dépendance est déclarée en plage ouverte (^4.8.0) : sans ce test, la disparition d'une règle
 * mappée réduirait la couverture sans aucun signal. Un échec ici n'est pas un bug du skill, c'est
 * une décision de couverture à prendre (règle de remplacement ou check custom).
 */

import { describe, it, expect } from 'vitest';
import axe from 'axe-core';
import { getAxeRuleIds, AXE_TO_OPQUAST } from '../utils/opquast-mapper.js';

const catalogue = new Map(axe.getRules().map(rule => [rule.ruleId, rule]));

describe('catalogue axe-core installé', () => {
  it('contient toutes les règles référencées par AXE_TO_OPQUAST', () => {
    const manquantes = getAxeRuleIds().filter(id => !catalogue.has(id));
    expect(manquantes).toEqual([]);
  });

  it('signale le statut déprécié de duplicate-id (Opquast 236, r1-z03-041)', () => {
    const rule = catalogue.get('duplicate-id');
    expect(rule, 'duplicate-id a disparu d\'axe-core : choisir une règle de remplacement pour Opquast 236').toBeDefined();
    expect(AXE_TO_OPQUAST['duplicate-id'].opquastId).toBe(236);
    // Statut connu au moment de l'audit : conservé volontairement, mais surveillé
    expect(rule.tags).toContain('deprecated');
  });

  it('signale le statut expérimental de td-has-header (Opquast 242, r1-z03-042)', () => {
    const rule = catalogue.get('td-has-header');
    expect(rule, 'td-has-header a disparu d\'axe-core : Opquast 242 perd sa couverture automatisée').toBeDefined();
    expect(AXE_TO_OPQUAST['td-has-header'].opquastId).toBe(242);
    expect(rule.tags).toContain('experimental');
  });
});
