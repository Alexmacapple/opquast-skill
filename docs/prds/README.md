# Product Requirement Documents (PRDs)

> Axes d'amélioration identifiés par Council pour le skill Opquast

**Date**: 2026-01-17
**Score actuel**: 9.0/10 (+1.25 vs baseline)
**Couverture déterministe**: 81 règles (33%)
  - 25 axe-core mappings (confidence 1.0)
  - 8 custom Playwright checks (confidence 0.85)
  - 18 interaction checks (confidence 0.80)
  - 30 static heuristics (confidence 0.75)
**Tests**: 324 passants (110 DOM + 87 static + 127 autres)

---

## PRDs Actifs

| ID | Nom | Priorité | Effort | Status |
|----|-----|----------|--------|--------|
| [PRD-001](./PRD-001-static-heuristics.md) | Validation Heuristique Static | P1 | Medium | **COMPLETED** (Phase 1+2) |
| [PRD-002](./PRD-002-confidence-scoring.md) | Scoring de Confiance | P1 | Small | **COMPLETED** |
| [PRD-003](./PRD-003-mapping-audit.md) | Audit des Mappings | P2 | Small | **COMPLETED** |
| [PRD-004](./PRD-004-interaction-checks.md) | Interaction Checks (Top 18) | P1 | Medium | **COMPLETED** |

---

## Objectif Global

Passer de **7.75/10 à 9/10** en:
1. Augmentant la fiabilité (déterministe > probabiliste)
2. Ajoutant transparence (scores de confiance)
3. Corrigeant incohérences potentielles

## Roadmap Suggérée

### Sprint 1 (Quick Wins) ✅ COMPLETED
- [x] PRD-003: Audit des mappings (9 corrections, 75 tests)
- [x] PRD-002: Confidence scoring (5 niveaux, 90 tests)

### Sprint 2 (Fiabilité) ✅ COMPLETED
- [x] PRD-001 Phase 1: 10 validateurs heuristiques (37 tests)
- [x] Integration bridge.js avec static-analyzer

### Sprint 3 (Extension) ✅ COMPLETED
- [x] PRD-001 Phase 2: +20 validateurs supplémentaires (87 tests total)

### Sprint 4 (Interaction) ✅ COMPLETED
- [x] PRD-004: 18 interaction checks Playwright (19 tests)
- [ ] Mode batch (sitemap)

---

## Source

Ces PRDs sont basés sur les recommandations du Council (Claude + Gemini) lors de la session du 2026-01-17.

> "Distinguishing between deterministic checks (axe-core) and probabilistic ones (LLM) is essential for user trust" — Council
