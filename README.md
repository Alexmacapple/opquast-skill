<!-- Skill Opquast pour Claude Code - Analyseur de qualité web -->

# Opquast Skill pour Claude Code

> Analyseur de qualité web basé sur le référentiel Opquast V5 (245 règles)

[![Version](https://img.shields.io/badge/version-1.4.0-blue.svg)](https://github.com/Alexmacapple/opquast-skill)
[![Opquast](https://img.shields.io/badge/Opquast-V5-orange.svg)](https://www.opquast.com/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-purple.svg)](https://claude.ai/)

## Présentation

Ce skill permet d'auditer des sites web selon le référentiel [Opquast V5](https://www.opquast.com/) (Qualité Numérique) directement depuis Claude Code.

**Disclaimer** : Ce skill n'est pas édité par la société Opquast mais utilise ses contenus et recommandations.

### Fonctionnalités

- Audit de **160 règles** vérifiables par analyse statique (65%)
- Détection automatique du type de site (e-commerce, SaaS, blog, vitrine...)
- Filtrage intelligent des règles selon le contexte
- **Section Quick Wins** : corrections CSS simples prioritaires
- Rapports structurés avec **prioritisation** (Accessibilité > SEO > UX)
- Support des 14 rubriques et 6 dimensions transversales
- **Validation JSON** intégrée avec schémas

### Couverture

| Catégorie | Règles | Description |
|-----------|--------|-------------|
| `static` | 160 (65%) | Vérifiable par analyse HTML |
| `requires_dom` | 33 (14%) | Nécessite navigateur headless |
| `requires_interaction` | 44 (18%) | Nécessite test fonctionnel |
| `content_quality` | 8 (3%) | Évaluation qualitative |

---

## Installation

### Prérequis

- [Claude Code CLI](https://claude.ai/claude-code) installé
- Accès au répertoire `~/.claude/skills/`

### Installation automatique

```bash
# Cloner le repo
git clone https://github.com/your-username/opquast-skill.git
cd opquast-skill

# Installer le skill
./install.sh
```

### Installation manuelle

```bash
# Cloner le repo
git clone https://github.com/your-username/opquast-skill.git

# Créer le répertoire skills si nécessaire
mkdir -p ~/.claude/skills

# Créer un lien symbolique
ln -s "$(pwd)/opquast-skill" ~/.claude/skills/opquast

# Vérifier l'installation
ls -la ~/.claude/skills/opquast
```

### Vérification

Lancer Claude Code et tester :

```
/opquast --regle 1
```

---

## Utilisation

### Commandes

| Commande | Action |
|----------|--------|
| `/opquast <URL>` | Analyse complète |
| `/opquast <URL> --theme accessibilite` | Par thématique |
| `/opquast <URL> --rubrique formulaires` | Par rubrique |
| `/opquast --regle 42` | Consulter une règle |

### Thématiques disponibles

`accessibilite`, `seo`, `securite`, `privacy`, `ecoconception`, `mobile`, `basics`

### Rubriques disponibles

`contenus`, `donnees-personnelles`, `e-commerce`, `formulaires`, `identification`, `images`, `internationalisation`, `liens`, `navigation`, `newsletter`, `presentation`, `securite`, `serveur`, `structure`

### Exemples

```bash
# Audit complet d'un site
/opquast https://example.com

# Focus accessibilité
/opquast https://example.com --theme accessibilite

# Focus formulaires pour un SaaS
/opquast https://app.example.com --rubrique formulaires

# Consulter une règle spécifique
/opquast --regle 182
```

---

## Structure du projet

```
opquast-skill/
├── README.md                 # Ce fichier
├── SKILL.md                  # Fichier skill Claude Code
├── install.sh                # Script d'installation
├── rules/
│   ├── opquast-v5.json      # 245 règles enrichies
│   └── site-profiles.json   # Profils de détection
├── schemas/
│   ├── audit-report.json    # Schéma JSON des rapports
│   ├── rules-schema.json    # Schéma pour opquast-v5.json
│   └── profiles-schema.json # Schéma pour site-profiles.json
├── scripts/
│   ├── enrich-rules.py      # Script d'enrichissement
│   └── validate.py          # Validation JSON Schema
├── references/
│   ├── regles-v5/           # 245 règles détaillées (.md)
│   └── V5/                  # Par rubrique/dimension
└── docs/
    ├── phase-0-audit-couverture.md
    ├── phase-1-fondations.md
    ├── phase-2-intelligence-contextuelle.md
    ├── phase-3-analyse-dom.md
    ├── phase-4-integration-ecosysteme.md
    └── phase-5-evolutions-futures.md
```

---

## Configuration

### Profils de sites

Le skill détecte automatiquement le type de site via `rules/site-profiles.json` :

| Profil | Indicateurs |
|--------|-------------|
| `e-commerce` | panier, prix, checkout |
| `saas` | login, dashboard, pricing |
| `blog` | article, post, author |
| `vitrine` | contact, about, services |
| `institutionnel` | démarches, services publics |
| `newsletter` | formulaire newsletter |

### Personnalisation

Modifier `rules/site-profiles.json` pour ajuster la détection ou ajouter des profils.

---

## Développement

### Valider les fichiers JSON

Vérifier l'intégrité des fichiers JSON avec le script de validation :

```bash
python3 scripts/validate.py
```

Ce script vérifie :
- Conformité au schéma JSON
- Cohérence des compteurs de couverture
- Unicité des IDs de règles
- Validité des références dans les profils

### Enrichir les règles

Si vous modifiez les fichiers dans `references/regles-v5/`, régénérez le JSON :

```bash
python3 scripts/enrich-rules.py
python3 scripts/validate.py  # Vérifier après modification
```

### Ajouter un profil de site

Éditer `rules/site-profiles.json` et ajouter :

```json
{
  "mon-profil": {
    "name": "Mon Profil",
    "description": "Description du profil",
    "detection": {
      "keywords": ["mot1", "mot2"],
      "elements": [".classe", "#id"],
      "urls": ["/path"],
      "meta": ["og:type=value"]
    },
    "rubriques_prioritaires": ["Rubrique1", "Rubrique2"],
    "regles_critiques": [1, 2, 3],
    "regles_exclues": [100, 101],
    "pages_a_analyser": ["accueil", "contact"]
  }
}
```

---

## Roadmap

| Phase | Statut | Description |
|-------|--------|-------------|
| 0 | ✅ | Audit de couverture |
| 1 | ✅ | JSON enrichi, schémas |
| 2 | ✅ | Intelligence contextuelle |
| 3 | 📄 | Analyse DOM (Puppeteer) |
| 4 | 📄 | CI/CD, Council, historique |
| 5 | 📄 | Multi-standards, batch, auto-fix |

Voir le dossier `docs/` pour les spécifications détaillées.

---

## Limitations

### Règles non vérifiables (sans navigateur headless)

- **Contraste** (règle 182) : nécessite CSS calculé
- **Focus clavier** (règles 165-167) : nécessite interaction
- **Taille cliquable** (règle 186) : nécessite CSS calculé
- **Navigation clavier** (règle 166) : nécessite test fonctionnel

Le rapport mentionne ces règles avec `[Nécessite analyse DOM]`.

---

## Licence

Ce projet utilise le référentiel Opquast V5 sous licence [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).

Le code du skill est sous licence MIT.

---

## Liens

- [Opquast officiel](https://www.opquast.com/)
- [Certification Opquast](https://www.opquast.com/certification/)
- [Checklist Opquast V5](https://checklists.opquast.com/fr/qualite-numerique/)
- [Claude Code](https://claude.ai/)

---

## Contribuer

Les contributions sont les bienvenues ! Voir les issues pour les améliorations planifiées.

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit (`git commit -m 'Ajoute fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

*Opquast V5 (Qualité Numérique) — 245 règles*
