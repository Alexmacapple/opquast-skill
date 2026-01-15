# Phase 2 - Intelligence Contextuelle

> Détection automatique du type de site et filtrage intelligent des règles

**Date** : 2026-01-15
**Statut** : Terminé

---

## Objectif

Permettre au skill de s'adapter automatiquement au type de site analysé en :
1. Détectant le profil du site (e-commerce, SaaS, blog, etc.)
2. Filtrant les règles pertinentes
3. Suggérant les pages à analyser

---

## Réalisations

### 1. Profils de sites (`rules/site-profiles.json`)

6 profils définis avec leurs caractéristiques :

| Profil | Description | Règles critiques |
|--------|-------------|------------------|
| `e-commerce` | Boutique en ligne | 30-68, 197-200 |
| `saas` | Application web | 15-29, 75-76, 197-204 |
| `blog` | Site éditorial | 1-14, 144-152, 219-223 |
| `vitrine` | Site de présentation | 93-109, 144-148 |
| `institutionnel` | Site public | 69-98, 181-186 |
| `newsletter` | Site avec newsletter | 174-179, 15-16 |

### 2. Système de détection

Chaque profil définit des indicateurs :

```json
{
  "detection": {
    "keywords": ["panier", "cart", "checkout"],
    "elements": [".product", "[itemtype*='Product']"],
    "urls": ["/cart", "/checkout", "/product"],
    "meta": ["og:type=product"]
  }
}
```

**Ordre de priorité** : e-commerce → saas → blog → institutionnel → vitrine

### 3. Filtrage intelligent

Pour chaque profil :
- `rubriques_prioritaires` : Focus de l'audit
- `regles_critiques` : Règles incontournables
- `regles_exclues` : Règles non pertinentes
- `pages_a_analyser` : Pages recommandées

### Exemple : Site e-commerce

```
Rubriques prioritaires : E-Commerce, Formulaires, Sécurité, Données personnelles
Règles critiques : 30-68 (e-commerce), 197-200 (sécurité paiement)
Règles exclues : (aucune)
Pages à analyser : accueil, produit, panier, checkout, compte, cgv, mentions-legales
```

### Exemple : Blog

```
Rubriques prioritaires : Contenus, Navigation, Structure et code, Liens
Règles critiques : 1-14 (contenus), 144-152 (navigation), 219-223 (structure)
Règles exclues : 30-68 (toutes les règles e-commerce)
Pages à analyser : accueil, article, categorie, contact, mentions-legales
```

---

## Impact sur les audits

### Avant (Phase 1)
- 245 règles vérifiées systématiquement
- Beaucoup de "Non applicable"
- Rapports verbeux

### Après (Phase 2)
- Règles filtrées selon le contexte
- Focus sur les règles pertinentes
- Rapports plus concis et actionnables

### Exemple de gain

| Site | Avant | Après | Réduction |
|------|-------|-------|-----------|
| Blog | 245 règles | ~120 règles | -51% |
| E-commerce | 245 règles | 245 règles | 0% |
| Vitrine | 245 règles | ~100 règles | -59% |

---

## Mise à jour du SKILL.md

Ajouts :
- Section "Intelligence contextuelle"
- Tableau des profils et indicateurs
- Méthodologie mise à jour avec détection du profil
- Format de sortie avec "Profil détecté"
- Workflow mis à jour (8 étapes)

---

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `rules/site-profiles.json` | Créé |
| `SKILL.md` | Mis à jour |

---

## Structure actuelle du skill

```
~/.claude/skills/opquast/
├── SKILL.md                      # Fichier principal (v1.3)
├── rules/
│   ├── opquast-v5.json          # 245 règles enrichies
│   └── site-profiles.json       # 6 profils de sites
├── schemas/
│   └── audit-report.json        # Schéma de sortie
├── scripts/
│   └── enrich-rules.py          # Script d'enrichissement
└── references/
    ├── regles-v5/               # 245 fichiers individuels
    └── V5/                      # Par rubrique/dimension
```

---

## Prochaines étapes

- [x] Phase 0 : Audit de couverture
- [x] Phase 1 : Fondations (JSON enrichi, schéma de sortie)
- [x] Phase 2 : Intelligence contextuelle (profils, filtrage)
- [ ] Phase 3 : Analyse DOM dynamique (optionnel, Puppeteer/Playwright)

---

*Document généré le 2026-01-15 - Skill Opquast v1.3*
