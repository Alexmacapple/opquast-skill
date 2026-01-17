# Product Requirement Documents (PRDs)

> Axes d'amélioration identifiés par Council pour le skill Opquast

**Date**: 2026-01-17
**Score actuel**: 7.75/10
**Couverture**: 79% (193/245 règles)

---

## PRDs Actifs

| ID | Nom | Priorité | Effort | Status |
|----|-----|----------|--------|--------|
| [PRD-001](./PRD-001-static-heuristics.md) | Validation Heuristique Static | P1 | Medium | **COMPLETED** |
| [PRD-002](./PRD-002-confidence-scoring.md) | Scoring de Confiance | P1 | Small | **COMPLETED** |
| [PRD-003](./PRD-003-mapping-audit.md) | Audit des Mappings | P2 | Small | **COMPLETED** |

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
- [x] PRD-001: 10 validateurs heuristiques (37 tests)
- [x] Integration bridge.js avec static-analyzer

### Sprint 3 (Extension)
- [ ] PRD-001: 20 validateurs supplémentaires
- [ ] Mode batch (sitemap)

---

## Source

Ces PRDs sont basés sur les recommandations du Council (Claude + Gemini) lors de la session du 2026-01-17.

> "Distinguishing between deterministic checks (axe-core) and probabilistic ones (LLM) is essential for user trust" — Council
