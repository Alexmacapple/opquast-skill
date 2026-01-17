# Track: PRD-002 - Confidence Scoring

> Distinguer checks déterministes (axe-core) vs probabilistes (LLM)

**Priority**: P1
**Effort**: Small (4-8h)
**Created**: 2026-01-17

---

## Contexte

Le Council recommande d'ajouter un niveau de confiance pour chaque résultat:
- axe-core = 1.0 (déterministe)
- custom-checks = 0.85 (automatisé)
- static = 0.5-0.75 (heuristique/probabiliste)

## Objectifs

1. Ajouter `source`, `confidence`, `confidence_label` aux résultats
2. Propager depuis axe-core et custom-checks
3. Mettre à jour les tests

---

## Phases

### Phase 1: Modifier opquast-mapper.js (2 tasks)
- [ ] Ajouter constantes CONFIDENCE_LEVELS
- [ ] Modifier mapAxeViolation pour inclure confidence

### Phase 2: Modifier custom-checks (1 task)
- [ ] Ajouter confidence aux résultats custom

### Phase 3: Tests (2 tasks)
- [ ] Mettre à jour tests mapper
- [ ] Ajouter tests confidence

---

## Acceptance Criteria

- [ ] Chaque résultat axe-core a confidence: 1.0
- [ ] Chaque résultat custom a confidence: 0.85
- [ ] Tous les tests passent
- [ ] Documentation mise à jour

---

## Files

| Fichier | Action |
|---------|--------|
| `utils/opquast-mapper.js` | MODIFY |
| `checks/custom-checks.js` | MODIFY |
| `tests/opquast-mapper.test.js` | MODIFY |
