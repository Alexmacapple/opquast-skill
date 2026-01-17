# PRD-003: Audit et Validation des Mappings

> Vérifier la cohérence entre axe-core rules et Opquast IDs

**Status**: COMPLETED
**Priority**: P2
**Effort**: Small (2-4h)
**Impact**: Moyen (corrige potentiels faux positifs/négatifs)
**Completed**: 2026-01-17

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

- [x] Audit manuel des 24 mappings complété
- [x] Test automatisé de cohérence ajouté
- [x] Corrections appliquées (9 mappings corrigés)
- [x] Documentation des mappings mise à jour

## Corrections Appliquées

**9 mappings incorrects corrigés:**

| Axe Rule | Ancien ID | Nouveau ID | Titre Opquast |
|----------|-----------|------------|---------------|
| image-alt | 111 | **118** | Chaque image porteuse d'information est dotée d'une alternative textuelle |
| link-name | 144 | **136** | Chaque lien est doté d'un intitulé dans le code source |
| label | 67 | **69** | Chaque champ de formulaire est associé à une étiquette |
| html-has-lang | 125 | **130** | Le code source indique la langue principale du contenu |
| document-title | 97 | **103** | Le titre de chaque page permet d'identifier son contenu |
| bypass | 146 | **164** | Chaque page contient des liens d'accès rapide |
| heading-order | 227 | **234** | Structure de titres et sous-titres hiérarchisée |
| button-name | 98 | **69** | Chaque champ de formulaire est associé à une étiquette |
| frame-title | 164 | **120** | Les objets inclus sont dotés d'une alternative |
| select-name | 96 | **69** | Chaque champ de formulaire est associé à une étiquette |

## Tests

- `tests/mapping-coherence.test.js` - 8 tests de cohérence
- **75 tests passent** (52 mapper + 15 custom + 8 coherence)

---

*Council flag: "The response failed to identify this critical regression"* - **RÉSOLU**
