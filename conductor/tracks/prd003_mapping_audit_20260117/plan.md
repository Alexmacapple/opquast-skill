# Track: PRD-003 - Audit des Mappings

> Vérifier cohérence axe-core → Opquast IDs

**Priority**: P2
**Effort**: Small (2-4h)
**Created**: 2026-01-17

---

## Contexte

Le Council a identifié un risque de désalignement entre les IDs dans `opquast-mapper.js` et `rules/opquast-v5.json`.

## Objectifs

1. Auditer les 24 mappings axe-core → Opquast
2. Vérifier que chaque opquastId existe
3. Vérifier cohérence des titres
4. Créer test automatisé de cohérence

---

## Phases

### Phase 1: Audit manuel (2 tasks)
- [ ] Lister tous les mappings avec leurs IDs
- [ ] Cross-référencer avec opquast-v5.json

### Phase 2: Test automatisé (2 tasks)
- [ ] Créer `tests/mapping-coherence.test.js`
- [ ] Vérifier IDs et titres

### Phase 3: Corrections (1 task)
- [ ] Corriger les incohérences trouvées

---

## Acceptance Criteria

- [ ] 24 mappings vérifiés
- [ ] Test de cohérence ajouté
- [ ] Tous les tests passent
- [ ] Documentation mise à jour si corrections

---

## Files

| Fichier | Action |
|---------|--------|
| `tests/mapping-coherence.test.js` | CREATE |
| `utils/opquast-mapper.js` | MODIFY (si corrections) |
