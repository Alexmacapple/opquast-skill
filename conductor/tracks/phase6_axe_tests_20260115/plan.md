# Track: Phase 6 - Tests Axe-core Mapping

> Ajouter tests pour les 25 règles axe-core mappées

**Priority**: Critical (Council vote unanime)
**Effort**: Medium
**Created**: 2026-01-15

---

## Contexte

Le mapping `AXE_TO_OPQUAST` dans `opquast-mapper.js` contient 25 règles axe-core mappées vers des règles Opquast. Ces mappings n'ont **aucun test** actuellement.

| Composant | Règles | Tests | Couverture |
|-----------|--------|-------|------------|
| Custom Playwright | 8 | 15 | 100% |
| Axe-core mappings | 25 | 0 | **0%** |

## Objectifs

1. Tester `mapAxeViolation()` - transformation d'une violation
2. Tester `mapAxeResults()` - agrégation des résultats
3. Tester `getAxeRuleIds()` - liste des règles axe
4. Tester `getSupportedOpquastRules()` - règles supportées
5. Valider les 25 mappings individuellement

---

## Phases

### Phase 1: Setup (2 tasks)
- [ ] Créer `tests/opquast-mapper.test.js`
- [ ] Ajouter fixtures pour violations axe-core simulées

### Phase 2: Unit Tests (4 tasks)
- [ ] Test `mapAxeViolation()` - cas nominal
- [ ] Test `mapAxeViolation()` - règle non mappée (retourne null)
- [ ] Test `mapAxeResults()` - multiple violations
- [ ] Test `getAxeRuleIds()` et `getSupportedOpquastRules()`

### Phase 3: Mapping Validation (2 tasks)
- [ ] Test que tous les mappings ont les champs requis
- [ ] Test que les opquastIds sont valides (1-245)

### Phase 4: Integration (2 tasks)
- [ ] Test `runAxeAnalysis()` avec page réelle
- [ ] Vérifier couverture > 80%

---

## Acceptance Criteria

- [ ] Tous les tests passent
- [ ] Couverture opquast-mapper.js > 90%
- [ ] 25 mappings validés
- [ ] `npm test` passe sans erreur

---

## Files

| Fichier | Action |
|---------|--------|
| `tests/opquast-mapper.test.js` | CREATE |
| `tests/fixtures/axe-violations.js` | CREATE |
| `utils/opquast-mapper.js` | READ (référence) |
