# PRD-001: Validation Heuristique des Règles Static

> Automatiser partiellement les 160 règles static via heuristiques déterministes

**Status**: COMPLETED (Phase 1 + Phase 2)
**Priority**: P1
**Effort**: Medium (8-16h)
**Impact**: +12% couverture deterministe
**Completed**: 2026-01-17

---

## Contexte

Actuellement, 160 règles static (65%) reposent uniquement sur l'interprétation LLM de WebFetch. Cette approche est:
- Non-déterministe (résultats variables)
- Vulnérable aux SPAs (contenu dynamique invisible)
- Sans score de confiance

## Objectif

Créer des validateurs heuristiques (regex + DOM checks) pour ~30 règles semi-automatisables, passant leur statut de "probabilistic" à "deterministic".

## Règles Implementées (30 validateurs)

### Phase 1 (10 règles)
| ID | Règle | Heuristique |
|----|-------|-------------|
| 1 | Fil RSS/Atom disponible | `<link type="application/rss+xml">` |
| 2 | Droits de copie | `©`, `copyright`, ou footer avec année |
| 3 | Meta description présente | `<meta name="description">` exists |
| 6 | Date publication indiquée | `<time datetime>` ou schema.org |
| 8 | Contenus pub identifiés | Scripts ads sans disclosure |
| 15 | Politique confidentialité | Link `/privacy`, `/confidentialite` |
| 103 | Titre de page | `<title>` non vide, >10 chars |
| 127 | Autoplay désactivé | Pas de `autoplay` sur media |
| 130 | Lang attribut | `<html lang="...">` exists |
| 193 | Viewport zoom | Pas de `user-scalable=no` |

### Phase 2 (20 règles)
| ID | Règle | Heuristique |
|----|-------|-------------|
| 5 | Abréviations expliquées | `<abbr title="...">` |
| 22 | Login standard | Email + password fields |
| 29 | Politique cookies | `/cookies` link ou cookie-banner |
| 37 | CGV accessibles | `/cgv`, `/terms` link |
| 42 | Devise indiquée | €, $, £ avec prix |
| 99 | Homepage descriptive | H1 + meta desc sur `/` |
| 104 | Favicon présent | `<link rel="icon">` |
| 105 | Feuille impression | `media="print"` ou `@media print` |
| 106 | URL canonique | `<link rel="canonical">` |
| 107 | 2+ moyens contact | mailto + tel + /contact |
| 108 | OpenGraph tags | og:title + og:description + og:image |
| 109 | Twitter Cards | twitter:card + twitter:title |
| 178 | Désinscription newsletter | `/unsubscribe` link |
| 219 | Robots meta | `<meta name="robots">` |
| 220 | Sitemap disponible | `/sitemap.xml` link |
| 221 | UTF-8 charset | `<meta charset="utf-8">` |
| 222 | Doctype HTML5 | `<!DOCTYPE html>` |
| 223 | Pas éléments obsolètes | Pas de font, center, marquee |
| 224 | Styles inline limités | <20 attributs style |
| 225 | Données structurées | JSON-LD ou microdata |

## Implémentation

### Architecture
```
scripts/static-analyzer/
├── validators.js        # 30 validateurs heuristiques
├── tests/
│   └── validators.test.js  # 87 tests unitaires
└── package.json
```

### Intégration bridge.js v1.1.0
- `runStaticValidators(html)` appele depuis le bridge
- Resultats combines avec analyse DOM
- Champs standardises: `source: static-heuristic`, `confidence_label: heuristic`

## Acceptance Criteria

- [x] 30 validateurs implementes (Phase 1: 10 + Phase 2: 20)
- [x] 87 tests unitaires passent
- [x] Integration dans bridge.js v1.1.0
- [x] Champ `source: static-heuristic` et `confidence_label: heuristic` dans les resultats

## Risques

| Risque | Mitigation |
|--------|------------|
| Faux positifs | Heuristiques conservatrices + fallback LLM |
| Maintenance | Documentation des patterns |

---

*Council recommendation: "High-value, low-effort path to move rules from 'probabilistic' to 'deterministic'"*
