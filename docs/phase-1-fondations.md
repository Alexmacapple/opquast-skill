# Phase 1 - Fondations

> Externalisation des règles et structuration des données

**Date** : 2026-01-15
**Statut** : Terminé

---

## Objectif

Enrichir le fichier JSON des règles avec les informations complètes extraites des fichiers markdown individuels, et créer un schéma de sortie standardisé pour les rapports d'audit.

---

## Réalisations

### 1. Enrichissement du JSON (`rules/opquast-v5.json`)

Chaque règle contient maintenant :

| Champ | Description |
|-------|-------------|
| `id` | Numéro de la règle (1-245) |
| `title` | Titre de la règle |
| `category` | `static`, `requires_dom`, `requires_interaction`, `content_quality` |
| `rubrique` | Rubrique Opquast (14 rubriques) |
| `tags` | Dimensions transversales |
| `objectives` | **NOUVEAU** - Liste des objectifs de la règle |
| `solution` | **NOUVEAU** - Solution recommandée |
| `verification` | **NOUVEAU** - Méthode de vérification |

### Exemple de règle enrichie

```json
{
  "id": 1,
  "title": "Il est possible de connaître les nouveaux contenus ou services",
  "category": "static",
  "rubrique": "Contenus",
  "tags": ["Accessibilité", "Écoconception", "SEO"],
  "objectives": [
    "Permettre aux utilisateurs d'identifier immédiatement les nouveaux contenus ou services en ligne.",
    "Améliorer la prise en compte des contenus par les moteurs de recherche et outils d'indexation."
  ],
  "solution": "À titre d'exemple, les différentes solutions ci-dessous peuvent être déployées seules ou conjointement : \n- Publier un flux RSS des actualités du site.\n- Publier une rubrique du type \"Actualités du site\" ou \"Quoi de neuf ?\"\n- Indiquer un compte de réseau social ou un canal d'actualité où sont publiées les actualités concernant le site.",
  "verification": "Dans l'ensemble du site, vérifier que les nouveaux contenus ou services sont accessibles par exemple grâce à un canal d'information interne au site (flux RSS des actualités, rubrique du type \"Actualités du site\", etc.) ou un canal externe lui-même accessible depuis le site (obligatoirement via sa page d'accueil) tel qu'un compte de réseau social."
}
```

### 2. Schéma de sortie (`schemas/audit-report.json`)

Schéma JSON Schema (draft 2020-12) définissant la structure des rapports d'audit :

```
audit-report.json
├── metadata
│   ├── url (URI)
│   ├── site_name
│   ├── date
│   ├── version ("5.0")
│   ├── scope {type, value}
│   └── pages_analyzed[]
├── summary
│   ├── total_rules
│   ├── conformes
│   ├── non_conformes
│   ├── non_applicables
│   ├── non_verifiables
│   ├── score (0-100%)
│   └── coverage {static, requires_dom}
├── results
│   ├── non_conformes[]
│   │   ├── rule_id, title, rubrique
│   │   ├── tags[], pages[]
│   │   ├── details, solution
│   │   └── reference_url
│   └── non_verifiables[]
│       ├── rule_id, title
│       └── reason
└── recommendations[]
    ├── priority (critique/important/mineur)
    ├── rule_id, action
    └── impact[]
```

### 3. Script d'enrichissement (`scripts/enrich-rules.py`)

Script Python pour extraire les données des 245 fichiers markdown et enrichir le JSON :

- Extraction des objectifs (français)
- Extraction de la solution recommandée
- Extraction de la méthode de vérification
- Nettoyage HTML → texte brut

---

## Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `rules/opquast-v5.json` | Enrichi avec 3 nouveaux champs |
| `schemas/audit-report.json` | Créé |
| `scripts/enrich-rules.py` | Créé |
| `SKILL.md` | Mis à jour (ressources, méthodologie) |

---

## Structure actuelle du skill

```
~/.claude/skills/opquast/
├── SKILL.md                    # Fichier principal
├── rules/
│   └── opquast-v5.json        # 245 règles enrichies
├── schemas/
│   └── audit-report.json      # Schéma de sortie
├── scripts/
│   └── enrich-rules.py        # Script d'enrichissement
└── references/
    ├── regles-v5/             # 245 fichiers individuels
    └── V5/                    # Par rubrique/dimension
```

---

## Bénéfices

1. **Autonomie** : Le skill peut générer des recommandations sans lire les fichiers markdown
2. **Performance** : Une seule lecture du JSON vs 245 fichiers
3. **Standardisation** : Schéma de sortie pour intégration CI/CD
4. **Maintenabilité** : Script reproductible si les règles changent

---

## Prochaines étapes

- [x] Phase 0 : Audit de couverture
- [x] Phase 1 : Fondations (JSON enrichi, schéma de sortie)
- [ ] Phase 2 : Intelligence contextuelle (filtrage, détection type site)
- [ ] Phase 3 : Analyse DOM dynamique (optionnel, Puppeteer/Playwright)

---

*Document généré le 2026-01-15 - Skill Opquast v1.2*
