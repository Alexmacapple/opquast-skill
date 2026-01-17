# PRD-001: Validation Heuristique des Règles Static

> Automatiser partiellement les 160 règles static via heuristiques déterministes

**Status**: Draft
**Priority**: P1
**Effort**: Medium (8-16h)
**Impact**: +8-10% fiabilité

---

## Contexte

Actuellement, 160 règles static (65%) reposent uniquement sur l'interprétation LLM de WebFetch. Cette approche est:
- Non-déterministe (résultats variables)
- Vulnérable aux SPAs (contenu dynamique invisible)
- Sans score de confiance

## Objectif

Créer des validateurs heuristiques (regex + DOM checks) pour ~30 règles semi-automatisables, passant leur statut de "probabilistic" à "deterministic".

## Règles Candidates

| ID | Règle | Heuristique |
|----|-------|-------------|
| 3 | Meta description présente | `<meta name="description">` exists |
| 15 | Politique confidentialité | Link to `/privacy`, `/confidentialite`, etc. |
| 31 | CGV disponibles | Link to `/cgv`, `/terms`, etc. |
| 97 | Titre de page | `<title>` non vide |
| 125 | Lang attribut | `<html lang="...">` exists |
| 127 | Charset déclaré | `<meta charset>` or `Content-Type` header |

## Implémentation

### Phase 1: Framework de validation
```javascript
// scripts/static-analyzer/validators/index.js
export const validators = {
  3: (html) => /<meta\s+name=["']description["']/i.test(html),
  97: (html) => /<title>[^<]+<\/title>/i.test(html),
  125: (html) => /<html[^>]+lang=["'][a-z]{2}/i.test(html),
  // ...
};
```

### Phase 2: Intégration bridge
- Ajouter `runStaticValidators(html)` au bridge
- Combiner avec résultats DOM
- Marquer règles comme `deterministic: true`

### Phase 3: Tests
- Tests unitaires pour chaque validateur
- Tests d'intégration avec pages réelles

## Acceptance Criteria

- [ ] 30+ validateurs créés
- [ ] Tests unitaires pour chaque validateur
- [ ] Intégration dans bridge.js
- [ ] Champ `deterministic` dans les résultats

## Risques

| Risque | Mitigation |
|--------|------------|
| Faux positifs | Heuristiques conservatrices + fallback LLM |
| Maintenance | Documentation des patterns |

---

*Council recommendation: "High-value, low-effort path to move rules from 'probabilistic' to 'deterministic'"*
