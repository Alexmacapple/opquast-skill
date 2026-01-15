# Track: Phase 3 - Analyse DOM (Playwright + axe-core)

> Étendre la couverture de 65% à 78% via navigateur headless

**ID**: `phase3_dom_20260115`
**Created**: 2026-01-15
**Updated**: 2026-01-15 (Council review)
**Status**: [ ] In Progress
**Priority**: High

---

## Objectif

Implémenter l'analyse DOM dynamique pour vérifier les 33 règles `requires_dom` actuellement non vérifiables par analyse statique.

**Impact**: +33 règles → couverture totale 193/245 (78%)

---

## Council Review (2026-01-15)

**Session**: `value-lapproche-propose-pour-la-0115-2120`
**Verdict**: Feu vert avec modifications

### Changements recommandés

| Original | Council Recommendation |
|----------|------------------------|
| Puppeteer | **Playwright** (multi-browser, auto-wait) |
| wcag.js manuel | **axe-core** (évite réinvention) |
| Tous checks custom | **Hybride** (axe + custom focus) |

### Risques adressés

- Mapping axe → Opquast via layer de traduction
- Browser context réutilisé pour performance
- Approche hybride pour règles comportementales

---

## Architecture Révisée (Council-approved)

```
scripts/dom-analyzer/
├── package.json
│   └── @playwright/test + @axe-core/playwright
├── index.js                 # Point d'entrée CLI
├── checks/
│   ├── axe-checks.js        # Règles via axe-core (182, 186, etc.)
│   └── focus-checks.js      # Règles comportementales (165-167)
└── utils/
    ├── browser.js           # Lifecycle Playwright
    └── opquast-mapper.js    # Mapping axe results → Opquast IDs
```

---

## Phases

### Phase 1: Setup Infrastructure
| Task | Status | Description |
|------|--------|-------------|
| 1.1 | [ ] | Créer `scripts/dom-analyzer/` structure |
| 1.2 | [ ] | Setup package.json avec Playwright + axe-core |
| 1.3 | [ ] | Créer `browser.js` (launch, context, close) |
| 1.4 | [ ] | Créer `opquast-mapper.js` (axe → Opquast IDs) |

### Phase 2: Checks axe-core (Automatisés)
| Task | Status | Description |
|------|--------|-------------|
| 2.1 | [ ] | Règle 182: Contraste via `color-contrast` |
| 2.2 | [ ] | Règle 186: Taille cliquable via `target-size` |
| 2.3 | [ ] | Règles 139-143: Liens via `link-*` rules |
| 2.4 | [ ] | Règle 191: Texte justifié (custom CSS check) |
| 2.5 | [ ] | Règles 237-238: user-select, contextmenu |

### Phase 3: Checks Playwright Custom (Comportementaux)
| Task | Status | Description |
|------|--------|-------------|
| 3.1 | [ ] | Règle 165: Focus clavier visible |
| 3.2 | [ ] | Règle 166: Navigation clavier complète |
| 3.3 | [ ] | Règle 167: Ordre navigation prévisible |
| 3.4 | [ ] | Règles 124-128: Contrôle médias/animations |

### Phase 4: Intégration Skill
| Task | Status | Description |
|------|--------|-------------|
| 4.1 | [ ] | Ajouter flag `--dom` dans SKILL.md |
| 4.2 | [ ] | Définir schema JSON sortie DOM |
| 4.3 | [ ] | Fusionner résultats static + DOM |
| 4.4 | [ ] | Mettre à jour README.md |

### Phase 5: Tests & Documentation
| Task | Status | Description |
|------|--------|-------------|
| 5.1 | [ ] | Tests sur 5 sites réels (différents profils) |
| 5.2 | [ ] | Gestion cookie modals / auth pages |
| 5.3 | [ ] | Documentation installation |
| 5.4 | [ ] | Mise à jour couverture dans docs |

---

## Dépendances (Révisées)

```json
{
  "dependencies": {
    "@playwright/test": "^1.41.0",
    "@axe-core/playwright": "^4.8.0"
  }
}
```

**Prérequis**:
- Node.js 18+
- ~300MB espace disque (browsers Playwright)

---

## Mapping axe-core → Opquast

| Opquast Rule | axe-core Rule | Notes |
|--------------|---------------|-------|
| 182 | `color-contrast` | Direct mapping |
| 186 | `target-size` | Seuil 44x44 (vs WCAG 24x24) |
| 139 | Custom CSS | `text-decoration` check |
| 237 | Custom CSS | `user-select: none` |
| 238 | Custom JS | `oncontextmenu` |
| 165-167 | Custom Playwright | Focus state machine |

---

## Acceptance Criteria

- [ ] Playwright installé et fonctionnel
- [ ] axe-core intégré avec mapping Opquast
- [ ] 33 règles `requires_dom` vérifiables
- [ ] Commande `--dom` fonctionnelle
- [ ] Tests passent sur 5 sites différents
- [ ] Performance < 10s par page
- [ ] Documentation complète
- [ ] Couverture affichée: 78% (193/245)

---

## Risques & Mitigations

| Risque | Mitigation |
|--------|------------|
| Performance (lent) | Browser context réutilisé |
| Mapping axe ≠ Opquast 1:1 | Layer `opquast-mapper.js` |
| Cookie modals bloquants | Auto-dismiss ou skip |
| CI/CD sans display | Headless mode par défaut |
| Auth-protected pages | Documentation limitation |

---

## Références

- [Phase 3 Spec](../../../docs/phase-3-analyse-dom.md)
- [Council Review](../../../deliberations/value-lapproche-propose-pour-la-0115-2120/)
- [Playwright Docs](https://playwright.dev/)
- [axe-core Playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)

---

*Track mis à jour le 2026-01-15 suite à Council review*
