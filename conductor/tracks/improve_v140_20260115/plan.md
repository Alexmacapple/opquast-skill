# Plan: Opquast Skill v1.4.0 Improvements

## Phase 1: Reclassification des règles CSS-détectables

### [x] Task 1.1: Identifier les règles CSS-statiques
- Analyser les 52 règles `requires_dom`
- Identifier celles vérifiables via CSS inline/style tags
- Documenter la méthode de vérification statique

### [x] Task 1.2: Mettre à jour opquast-v5.json
- Modifier `category` pour les règles identifiées
- Ajouter champ `static_verification_method`
- Valider le JSON

### [x] Task 1.3: Mettre à jour la documentation
- Modifier docs/phase-0-audit-couverture.md
- Mettre à jour les compteurs dans SKILL.md

### [x] Phase 1 Checkpoint
- Vérifier cohérence JSON
- Tester /opquast --regle pour règles modifiées

---

## Phase 2: Export Markdown amélioré

### [x] Task 2.1: Définir le nouveau format
- Section "Quick Wins"
- Prioritisation par impact
- Template avec solutions intégrées

### [x] Task 2.2: Mettre à jour SKILL.md
- Remplacer section "Format de sortie"
- Ajouter exemples

### [x] Phase 2 Checkpoint
- Review du format par test manuel

---

## Phase 3: Script de validation

### [x] Task 3.1: Créer schemas/rules-schema.json
- Définir structure attendue pour opquast-v5.json
- Inclure validation des champs enrichis

### [x] Task 3.2: Créer schemas/profiles-schema.json
- Définir structure pour site-profiles.json
- Valider les références rule_id

### [x] Task 3.3: Créer scripts/validate.py
- Validation JSON Schema
- Vérification intégrité références
- Rapport d'erreurs clair

### [x] Task 3.4: Tester la validation
- Exécuter sur fichiers actuels
- Vérifier qu'aucune erreur n'est levée

### [x] Phase 3 Checkpoint
- Script fonctionnel
- Documentation usage

---

## Phase 4: Release v1.4.0

### [x] Task 4.1: Mettre à jour README.md
- Ajouter section "Validation"
- Documenter nouvelles fonctionnalités

### [x] Task 4.2: Commit et tag
- `feat(rules): reclassify CSS-detectable rules as static`
- `feat(skill): improved markdown export format`
- `feat(scripts): add JSON validation script`
- Tag v1.4.0

### [x] Task 4.3: Push GitHub
- Push commits et tags
- Vérifier repo

### [x] Phase 4 Checkpoint
- Release publiée
- Tous tests passants

---

**Completed**: 2026-01-15
**Tag**: v1.4.0
**Commits**: 5
