# PRD-004: Interaction Checks (Top 20)

> Automatiser 20 règles "requires_interaction" via Playwright

**Status**: COMPLETED
**Priority**: P1
**Effort**: Medium (~1 semaine)
**Impact**: +18 règles déterministes, score 8.75 → 9.0/10
**Completed**: 2026-01-17

---

## Contexte

44 règles Opquast nécessitent une interaction utilisateur et sont actuellement vérifiées manuellement. Cette phase automatise les 20 règles les plus objectives via Playwright.

## Objectif

Passer de 63 à 83 règles déterministes (+32%) en automatisant:
- États CSS dynamiques (hover, focus, visited)
- Validation de formulaires
- Navigation et menus
- Modales et overlays
- Animations

## Règles Ciblées (20)

### Hover/States (4 règles)
| ID | Règle | Check Playwright |
|----|-------|------------------|
| 140 | État hover visible | `hover()` + getComputedStyle |
| 141 | Hover ne cache pas contenu | `hover()` + visibility check |
| 142 | État disabled visible | `disabled` attr + opacity |
| 143 | Page courante marquée | `aria-current="page"` |

### Formulaires (6 règles)
| ID | Règle | Check Playwright |
|----|-------|------------------|
| 92 | Labels explicites | `for` attr matches `id` |
| 93 | Placeholder != label | Compare text content |
| 94 | Champs obligatoires indiqués | `required` ou `aria-required` |
| 95 | Format attendu indiqué | `pattern`, `type`, `aria-describedby` |
| 97 | Erreurs identifiées | `aria-invalid` après submit |
| 98 | Message erreur clair | `aria-describedby` présent |

### Navigation (4 règles)
| ID | Règle | Check Playwright |
|----|-------|------------------|
| 152 | Skip link présent | First focusable = skip link |
| 153 | Breadcrumb présent | `nav[aria-label*="breadcrumb"]` |
| 154 | Menu accessible | ARIA roles (menubar, menu) |
| 144 | Liens visités stylés | `:visited` CSS différent |

### Modales (3 règles)
| ID | Règle | Check Playwright |
|----|-------|------------------|
| 168 | Focus trap modal | Tab cycling in modal |
| 169 | Escape ferme modal | `Escape` key handler |
| 170 | Clic backdrop ferme | Click outside closes |

### Animations (3 règles)
| ID | Règle | Check Playwright |
|----|-------|------------------|
| 189 | Prefers-reduced-motion | CSS media query check |
| 190 | Animation pausable | Play/pause controls |
| 100 | Confirmation avant action destructive | Dialog presence |

## Architecture

```
scripts/dom-analyzer/checks/
├── axe-checks.js          # Existant (25 règles)
├── custom-checks.js       # Existant (8 règles)
└── interaction-checks.js  # NOUVEAU (20 règles)
```

## Implémentation

### interaction-checks.js

```javascript
export async function runInteractionChecks(page) {
  const results = [];

  // Hover/State checks
  results.push(...await runHoverChecks(page));

  // Form checks
  results.push(...await runFormChecks(page));

  // Navigation checks
  results.push(...await runNavigationChecks(page));

  // Modal checks
  results.push(...await runModalChecks(page));

  // Animation checks
  results.push(...await runAnimationChecks(page));

  return results.filter(Boolean);
}
```

### Intégration axe-checks.js

```javascript
import { runInteractionChecks } from './interaction-checks.js';

export async function runFullAnalysis(page, options = {}) {
  const axeResults = await runAxeAnalysis(page, options);
  const customResults = await runCustomChecks(page);
  const interactionResults = await runInteractionChecks(page);

  return {
    ...axeResults,
    violations: [
      ...axeResults.violations,
      ...customResults,
      ...interactionResults
    ],
    stats: {
      ...axeResults.stats,
      interactionChecksRun: 20,
      totalRulesChecked: 25 + 8 + 20 // 53 règles DOM
    }
  };
}
```

## Acceptance Criteria

- [x] 18 interaction checks implémentés
- [x] 19 tests pour checks (fixtures)
- [x] Intégration dans runFullAnalysis()
- [x] Confidence scoring (0.80 pour interaction)
- [x] Documentation mise à jour

## Risques

| Risque | Mitigation |
|--------|------------|
| Faux positifs hover | Timeout + retry |
| Performance modales | Limiter à 5 modales |
| Détection animation | Check CSS uniquement |

---

*Council recommendation: "Option A2 - Top 20 automatisables offre le meilleur ROI"*
