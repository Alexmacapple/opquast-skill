# PRD-003: Audit et Validation des Mappings

> Vérifier la cohérence entre axe-core rules et Opquast IDs

**Status**: Draft
**Priority**: P2
**Effort**: Small (2-4h)
**Impact**: Moyen (corrige potentiels faux positifs/négatifs)

---

## Contexte

Le Council a identifié un risque potentiel de désalignement entre les IDs dans `opquast-mapper.js` et `rules/opquast-v5.json`:

> "Cross-referencing opquast-mapper.js with rules/opquast-v5.json reveals potential mismatched IDs"

## Objectif

1. Auditer tous les mappings axe-core → Opquast
2. Valider que chaque opquastId existe dans rules/opquast-v5.json
3. Vérifier que le titre correspond
4. Créer un test automatisé de cohérence

## Plan d'Audit

### Mappings à vérifier (24)

| Axe Rule | Opquast ID | À vérifier |
|----------|------------|------------|
| color-contrast | 182 | ✓ Contraste |
| image-alt | 111 | ✓ Alt images |
| link-name | 144 | ✓ Liens |
| label | 67 | ✓ Labels formulaires |
| html-has-lang | 125 | ✓ Lang HTML |
| document-title | 97 | ✓ Titre page |
| bypass | 146 | ✓ Skip links |
| heading-order | 227 | ✓ Hiérarchie titres |
| button-name | 98 | ✓ Boutons |
| frame-title | 164 | ✓ Frames |
| ... | ... | ... |

## Implémentation

### Test de cohérence automatisé

```javascript
// tests/mapping-coherence.test.js
import { AXE_TO_OPQUAST } from '../utils/opquast-mapper.js';
import rules from '../../rules/opquast-v5.json';

describe('Mapping coherence', () => {
  const rulesById = Object.fromEntries(
    rules.rules.map(r => [r.id, r])
  );

  Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
    it(`${axeRule} → Opquast ${mapping.opquastId} should be valid`, () => {
      const rule = rulesById[mapping.opquastId];
      expect(rule).toBeDefined();
      // Vérifier que le titre est cohérent
      expect(rule.title.toLowerCase()).toContain(
        mapping.title.split(' ')[0].toLowerCase()
      );
    });
  });
});
```

### Script de rapport

```bash
node scripts/audit-mappings.js
# Output: rapport de cohérence avec warnings
```

## Acceptance Criteria

- [ ] Audit manuel des 24 mappings complété
- [ ] Test automatisé de cohérence ajouté
- [ ] Corrections appliquées si nécessaire
- [ ] Documentation des mappings mise à jour

## Corrections Potentielles

Si des incohérences sont trouvées:
1. Corriger l'opquastId dans opquast-mapper.js
2. Mettre à jour les tests
3. Documenter le changement

---

*Council flag: "The response failed to identify this critical regression"*
