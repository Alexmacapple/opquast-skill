# Track: Phase 5 - Tests Automatisés

> Ajouter une suite de tests pour le dom-analyzer

**Created**: 2026-01-15
**Status**: IN_PROGRESS
**Priority**: Critical

---

## Objective

Implémenter tests unitaires et d'intégration pour les 8 custom checks Playwright et les mappings axe-core.

## Phases

### Phase 1: Setup Jest/Vitest
- [ ] Choisir framework (Vitest recommandé pour ESM)
- [ ] Configurer package.json
- [ ] Créer structure tests/

### Phase 2: Tests unitaires custom-checks
- [ ] Test checkUnderlineReserved (139)
- [ ] Test checkTextNotJustified (191)
- [ ] Test checkCopyNotBlocked (237)
- [ ] Test checkContextMenuNotBlocked (238)
- [ ] Test checkFocusVisible (165)
- [ ] Test checkKeyboardNavigable (166)
- [ ] Test checkTabOrder (167)
- [ ] Test checkTargetSize (186)

### Phase 3: Tests intégration
- [ ] Test runFullAnalysis avec fixture HTML
- [ ] Test mapping axe-core
- [ ] Test CLI output JSON

### Phase 4: CI/CD
- [ ] GitHub Actions workflow
- [ ] Badge coverage dans README

---

## Acceptance Criteria

- [ ] `npm test` passe
- [ ] Couverture > 80%
- [ ] CI/CD fonctionnel

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `scripts/dom-analyzer/package.json` | Add vitest + scripts |
| `scripts/dom-analyzer/vitest.config.js` | Create config |
| `scripts/dom-analyzer/tests/custom-checks.test.js` | Create tests |
| `scripts/dom-analyzer/tests/fixtures/` | HTML fixtures |
| `.github/workflows/test.yml` | CI workflow |
