# Spec: Opquast Skill v1.4.0 Improvements

## Overview

3 améliorations concrètes pour augmenter la valeur du skill sans complexité excessive.

## Improvements

### 1. Vérification statique des règles CSS-détectables

**Objectif**: Vérifier certaines règles `requires_dom` via analyse CSS statique

**Règles ciblées**:
- Règle 139: Soulignement réservé aux liens (`text-decoration: underline` sur non-liens)
- Règle 191: Texte non justifié (`text-align: justify`)
- Règle 237: Copie contenu non bloquée (`user-select: none`)

**Livrable**: Mise à jour de `opquast-v5.json` pour reclasser ces règles en `static`

### 2. Export Markdown amélioré

**Objectif**: Générer un rapport markdown plus actionnable

**Améliorations**:
- Section "Quick Wins" avec corrections faciles
- Prioritisation par impact (Accessibilité > SEO > UX)
- Liens directs vers solutions dans le JSON enrichi

**Livrable**: Mise à jour de la section "Format de sortie" dans SKILL.md

### 3. Validation JSON Schema intégrée

**Objectif**: Ajouter un script de validation des fichiers JSON

**Livrable**: Script `scripts/validate.py` qui vérifie:
- `rules/opquast-v5.json` contre un schéma
- `rules/site-profiles.json` contre un schéma
- Intégrité des références (rule_id valides dans profiles)

## Success Criteria

- [ ] 3+ règles reclassées de `requires_dom` à `static`
- [ ] Format de rapport amélioré documenté
- [ ] Script de validation fonctionnel
- [ ] Tests manuels passants
- [ ] Version v1.4.0 taguée et pushée
