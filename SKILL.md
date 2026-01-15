---
name: opquast
description: |
  Analyseur de qualité web basé sur le référentiel Opquast V5 (245 règles).
  Expert certifié pour auditer les sites selon les bonnes pratiques qualité.

  INVOKE THIS SKILL when user wants:
  - Audit qualité: "analyse opquast", "audit qualité web", "check opquast"
  - Analyse URL: "/opquast https://...", "vérifie ce site", "analyse cette page"
  - Par thématique: "analyse accessibilité", "audit SEO", "check sécurité"
  - Par rubrique: "vérifie les formulaires", "analyse e-commerce", "audit navigation"
  - Consulter règle: "règle opquast 42", "montre la règle 125", "détail règle"
allowed-tools:
  - "WebFetch(*)"
  - "Read(**/*)"
  - "Glob(**/*)"
  - "Grep(**/*)"
---

# Opquast Checker

> Analyseur de qualité web basé sur le référentiel Opquast V5 (245 règles)

**Disclaimer** (afficher une fois par session) :
> Opquast Checker n'est pas édité par la société Opquast mais utilise ses contenus et recommandations. Pour approfondir la qualité web : [certification Opquast](https://www.opquast.com/).

## Couverture et Limitations

> **Important** : Ce skill utilise l'analyse statique (HTML source). Certaines règles nécessitent un navigateur headless pour être vérifiées.

### Catégories de règles

| Catégorie | Règles | Description |
|-----------|--------|-------------|
| `static` | 160 (65%) | Vérifiable par analyse du code source HTML |
| `requires_dom` | 33 (14%) | Nécessite DOM rendu et/ou CSS calculé |
| `requires_interaction` | 44 (18%) | Nécessite interaction utilisateur ou test fonctionnel |
| `content_quality` | 8 (3%) | Évaluation qualitative du contenu éditorial |

### Règles NON vérifiables sans navigateur headless

- **Contraste** (règle 182) : nécessite CSS calculé
- **Focus clavier** (règles 165-167) : nécessite test d'interaction
- **Navigation clavier** (règle 166) : nécessite test fonctionnel
- **Taille cliquable** (règle 186) : nécessite CSS calculé
- **Popups** (règle 154) : nécessite navigation réelle
- **Liens visités** (règle 141) : nécessite état navigateur

Le rapport indiquera les règles non vérifiables avec la mention `[Nécessite analyse DOM]`.

## Ressources

### Règles structurées (JSON)
- `rules/opquast-v5.json` : 245 règles enrichies avec :
  - `id`, `title`, `category`, `rubrique`, `tags`
  - `objectives` : Liste des objectifs de la règle
  - `solution` : Solution recommandée
  - `verification` : Méthode de vérification

### Profils de sites
- `rules/site-profiles.json` : Détection et filtrage par type de site

### Schéma de sortie
- `schemas/audit-report.json` : Schéma JSON pour les rapports d'audit structurés

### Règles détaillées (Markdown)
- `references/regles-v5/` : 245 règles individuelles (regle-001.md à regle-245.md)
- `references/V5/` : Fichiers par rubrique et dimension transversale

### Rubriques (14)
| Fichier | Rubrique | Règles |
|---------|----------|--------|
| 01-opquast-contenus.md | Contenus | 14 |
| 02-opquast-donnees-personnelles.md | Données personnelles | 15 |
| 03-opquast-e-commerce.md | E-Commerce | 39 |
| 04-opquast-formulaires.md | Formulaires | 30 |
| 05-opquast-identification-contact.md | Identification et contact | 17 |
| 06-opquast-images-medias.md | Images et médias | 12 |
| 07-opquast-internationalisation.md | Internationalisation | 8 |
| 08-opquast-liens.md | Liens | 17 |
| 09-opquast-navigation.md | Navigation | 20 |
| 10-opquast-newsletter.md | Newsletter | 7 |
| 11-opquast-presentation.md | Présentation | 17 |
| 12-opquast-securite.md | Sécurité | 21 |
| 13-opquast-serveur-performances.md | Serveur et performances | 13 |
| 14-opquast-structure-code.md | Structure et code | 15 |

### Dimensions transversales (6)
| Fichier | Dimension | Règles |
|---------|-----------|--------|
| T1-accessibilite.md | Accessibilité | 128 |
| T2-seo.md | SEO | 37 |
| T3-donnees-personnelles.md | Privacy | 21 |
| T4-ecoconception.md | Écoconception | 35 |
| T5-mobile.md | Mobile | 6 |
| T6-basics.md | Basics | 65 |

## Commandes

| Commande | Action |
|----------|--------|
| `/opquast <URL>` | Analyse complète |
| `/opquast <URL> --theme accessibilite` | Par thématique |
| `/opquast <URL> --rubrique formulaires` | Par rubrique |
| `/opquast --regle 42` | Consulter une règle |

**Thématiques** : `accessibilite`, `seo`, `securite`, `privacy`, `ecoconception`, `mobile`, `basics`

**Rubriques** : `contenus`, `donnees-personnelles`, `e-commerce`, `formulaires`, `identification`, `images`, `internationalisation`, `liens`, `navigation`, `newsletter`, `presentation`, `securite`, `serveur`, `structure`

## Intelligence contextuelle

### Détection du type de site

Lors de l'analyse, détecter automatiquement le profil du site via `rules/site-profiles.json` :

| Profil | Indicateurs clés |
|--------|------------------|
| `e-commerce` | panier, prix, checkout, product schema |
| `saas` | login, dashboard, pricing, subscription |
| `blog` | article, post, author, published date |
| `vitrine` | contact, about, services, team |
| `institutionnel` | démarches, services publics, délibérations |
| `newsletter` | formulaire newsletter, subscribe |

### Filtrage intelligent

Pour chaque profil, le fichier définit :
- `rubriques_prioritaires` : rubriques à vérifier en priorité
- `regles_critiques` : règles incontournables pour ce type
- `regles_exclues` : règles non pertinentes (ex: e-commerce sur un blog)
- `pages_a_analyser` : pages recommandées pour l'audit

### Utilisation

1. Analyser le HTML récupéré
2. Chercher les indicateurs de détection (keywords, elements, urls, meta)
3. Sélectionner le profil correspondant
4. Adapter l'audit aux règles pertinentes
5. Mentionner le profil détecté dans le rapport

## Méthodologie

### 1. Récupération
- Utiliser `WebFetch` pour la page principale
- Explorer : contact, formulaires, panier, mentions légales, CGV

### 2. Détection du profil
- Charger `rules/site-profiles.json`
- Analyser le HTML pour détecter le type de site
- Appliquer le profil ou utiliser `vitrine` par défaut

### 3. Vérification
Pour chaque règle applicable :
1. Charger `rules/opquast-v5.json` pour les métadonnées enrichies
2. Filtrer par `category: "static"` (règles vérifiables)
3. Exclure les `regles_exclues` du profil détecté
4. Prioriser les `regles_critiques` du profil
5. Utiliser `verification` pour la méthode de test
6. Utiliser `solution` pour les recommandations

### 4. Pages à analyser
Selon le profil détecté, analyser les pages définies dans `pages_a_analyser`.
Par défaut :
- Page d'accueil
- Contact / Identification
- Mentions légales / CGV / Confidentialité

## Format de sortie

```markdown
# Analyse Opquast : [Nom du site]

**URL** : [url]
**Date** : [date]
**Profil détecté** : [e-commerce|saas|blog|vitrine|institutionnel]
**Scope** : [thématique/rubrique ou "adapté au profil"]

## Couverture

| Statut | Nombre |
|--------|--------|
| Conformes | X |
| Non conformes | Y |
| Non vérifiables (DOM) | Z |
| Non applicables | W |

---

## Quick Wins

> Corrections rapides à fort impact

| Règle | Problème | Solution | Impact |
|-------|----------|----------|--------|
| 191 | Texte justifié détecté | Supprimer `text-align: justify` | Accessibilité |
| 237 | Copie bloquée | Retirer `user-select: none` | Accessibilité |
| 139 | Soulignement sur non-liens | Utiliser autre style que underline | Accessibilité |

---

## Non-conformités par priorité

### Accessibilité (priorité haute)

#### Règle [N] : [Titre]
**Impact** : Accessibilité
**Pages** : [URL 1], [URL 2]
**Solution** : [Extrait du champ solution de la règle]
[Voir la règle](https://checklists.opquast.com/fr/qualite-numerique/[N])

### SEO (priorité moyenne)

#### Règle [N] : [Titre]
...

### UX/Performance (priorité standard)

#### Règle [N] : [Titre]
...

---

## Règles non vérifiables

Les règles suivantes nécessitent une analyse DOM/CSS :
- Règle 182 : Contraste [Nécessite analyse DOM]
- Règle 165 : Focus clavier [Nécessite analyse DOM]
```

### Ordre de priorité
1. **Accessibilité** : Impact utilisateurs en situation de handicap
2. **SEO** : Impact référencement et découvrabilité
3. **UX/Performance** : Impact expérience utilisateur générale

### Section Quick Wins
Afficher les règles CSS-détectables avec correction simple :
- Règles avec `static_verification_method` dans le JSON
- Solutions en une ligne (ex: "Supprimer text-align: justify")
- Toujours en premier pour action immédiate

### Règles d'affichage
- NE PAS afficher les règles conformes
- NE PAS afficher les règles non applicables
- Grouper par tag principal (Accessibilité > SEO > autres)
- Afficher la section "Règles non vérifiables" avec les règles `requires_dom`
- Si tout OK : "Toutes les règles sont respectées."

## URL inaccessible

Si WebFetch échoue :
1. Proposer des captures d'écran
2. Préciser que certaines règles ne pourront pas être vérifiées
3. Demander de vérifier l'URL

## Workflow

1. Afficher disclaimer (première fois)
2. Récupérer page avec WebFetch
3. **Détecter le profil** via `rules/site-profiles.json`
4. Charger `rules/opquast-v5.json` (règles enrichies)
5. Filtrer selon profil et scope demandé
6. Analyser les pages recommandées
7. Générer rapport avec profil détecté
8. Proposer analyse complémentaire

---

*Opquast V5 (Qualité Numérique) — 245 règles*
