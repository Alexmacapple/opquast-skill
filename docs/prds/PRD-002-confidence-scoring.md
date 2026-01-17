# PRD-002: Scoring de Confiance par Règle

> Distinguer checks déterministes (axe-core) vs probabilistes (LLM)

**Status**: COMPLETED
**Priority**: P1
**Effort**: Small (4-8h)
**Impact**: Fort (améliore valeur perçue et actionabilité)
**Completed**: 2026-01-17

---

## Contexte

Le score global 7.75/10 manque de granularité. On ne distingue pas:
- Règle certifiée (axe-core) → confiance 1.0
- Règle custom Playwright → confiance 0.8
- Règle static (LLM) → confiance 0.5-0.7
- Règle non-vérifiable → confiance 0

## Objectif

Ajouter un champ `confidence_level` à chaque résultat de règle pour permettre une priorisation basée sur la fiabilité.

## Schema Proposé

```json
{
  "violation": {
    "opquastId": 182,
    "title": "Contraste suffisant",
    "severity": "critical",
    "source": "axe-core",
    "confidence": 1.0,
    "confidence_label": "deterministic"
  }
}
```

### Niveaux de Confiance

| Source | Confidence | Label |
|--------|------------|-------|
| axe-core | 1.0 | `deterministic` |
| custom-checks (Playwright) | 0.85 | `automated` |
| static-heuristics | 0.75 | `heuristic` |
| static-LLM | 0.5 | `probabilistic` |
| requires_interaction | 0 | `manual` |

## Implémentation

### Phase 1: Modifier audit-report.json schema
- Ajouter champs `confidence`, `confidence_label`, `source`

### Phase 2: Propager depuis les sources
```javascript
// Dans opquast-mapper.js
export function mapAxeViolation(violation) {
  return {
    ...mapping,
    source: 'axe-core',
    confidence: 1.0,
    confidence_label: 'deterministic'
  };
}
```

### Phase 3: Affichage dans rapports
```markdown
## Violations par confiance

### Déterministes (confiance 100%)
- Règle 182: Contraste insuffisant [axe-core]

### Automatisées (confiance 85%)
- Règle 186: Taille cliquable insuffisante [Playwright]

### Probabilistes (confiance 50%)
- Règle 3: Meta description absente [LLM]
```

## Acceptance Criteria

- [x] Schema audit-report.json mis à jour (source, confidence, confidence_label)
- [x] Confidence propagée depuis axe-core (1.0)
- [x] Confidence propagée depuis custom-checks (0.85)
- [ ] Rapport affiche groupement par confiance (future enhancement)
- [x] Tests mis à jour (15 nouveaux tests, 90 total)

## Bénéfices

1. **Priorisation**: critical + high-confidence > major + low-confidence
2. **Transparence**: Utilisateur sait ce qui est fiable
3. **Amélioration**: Incite à convertir probabilistic → deterministic

---

*Council recommendation: "Distinguishing between deterministic checks (axe-core) and probabilistic ones (LLM) is essential for user trust"*
