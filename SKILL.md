---
name: opquast
description: |
  Analyseur de qualité web basé sur le référentiel Opquast V5 (245 règles).
  Expert certifié pour auditer les sites selon les bonnes pratiques qualité.

  INVOKE THIS SKILL when user wants:
  - Audit qualité: "analyse opquast", "audit qualité web", "check opquast"
  - Analyse URL: "/opquast https://...", "vérifie ce site", "analyse cette page"
  - Par thématique: "qualité accessibilité opquast", "audit SEO opquast", "check sécurité opquast"
  - Par rubrique: "vérifie les formulaires", "analyse e-commerce", "audit navigation"
  - Consulter règle: "règle opquast 42", "montre la règle 125", "détail règle"
  - Explorer règles: "liste règles opquast", "cherche règles images", "règles critiques"

  Do NOT invoke for: audits WCAG purs (utiliser le skill d'audit d'accessibilité web), audits RGAA (use /audit-rgaa), corrections de code (utiliser le skill de correction d'accessibilité)
context: fork
argument-hint: "[URL ou --commande]"
allowed-tools:
  - "WebFetch(*)"
  - "Read(**/*)"
  - "Glob(**/*)"
  - "Grep(**/*)"
  - "Bash(node scripts/*)"
  - "Bash(python3 scripts/validate.py*)"
  - "Bash(python3 scripts/sync-rules-from-api.py --check*)"
  - "Bash(python3 scripts/sync-rules-from-api.py --dry-run*)"
---

# Opquast Checker

> Analyseur de qualité web basé sur le référentiel Opquast V5 (245 règles)

**Disclaimer** (afficher une fois par session) :
> Opquast Checker n'est pas édité par la société Opquast mais utilise ses contenus et recommandations. Pour approfondir la qualité web : [certification Opquast](https://www.opquast.com/).

## Arguments

Parser `$ARGUMENTS` pour extraire :

| Pattern | Action | Exemple |
|---------|--------|---------|
| URL seule | Analyse complète | `/opquast https://example.com` |
| URL + `--theme <t>` | Analyse par thématique | `/opquast https://example.com --theme seo` |
| URL + `--rubrique <r>` | Analyse par rubrique | `/opquast https://example.com --rubrique formulaires` |
| `--regle <N>` | Consulter une règle | `/opquast --regle 42` |
| `--list [--page N]` | Liste paginée | `/opquast --list --page 3` |
| `--search <mot>` | Recherche par mot-clé | `/opquast --search image` |
| `--severity <s>` | Filtrer par sévérité | `/opquast --severity critical` |

Valeurs acceptées : voir `references/rubriques-dimensions.md`

## Contraintes

### Impératifs

- TOUJOURS afficher le disclaimer lors de la première analyse de la session
- TOUJOURS détecter le profil du site avant de lancer l'audit
- TOUJOURS mentionner les règles non vérifiables (DOM, interaction) dans le rapport
- TOUJOURS charger `rules/opquast-v5.json` comme référence pour l'audit hors ligne ; l'API/MCP Opquast est la source live. Les deux sont alignées (titres, tags, rubriques, phases synchronisés depuis l'API, voir `synced_from_api` dans le fichier) ; en cas d'écart, l'API prime et le fichier doit être resynchronisé (voir Maintenance)
- TOUJOURS consulter la spec live `https://api.opquast.com/swagger/?format=openapi` avant d'ajouter ou d'utiliser un endpoint API non documenté ici
- JAMAIS inventer un numéro de règle ou une sévérité non présente dans le JSON
- JAMAIS inventer un endpoint API, un format d'authentification ou un paramètre : vérifier dans Swagger ou dans `MCP/opquast-mcp/server.py`
- JAMAIS afficher les règles conformes ou non applicables dans le rapport
- JAMAIS analyser sans avoir récupéré le HTML via WebFetch (ou HTML fourni par l'utilisateur)
- JAMAIS analyser plus de 5 pages par invocation. Au-delà, proposer une analyse par lots

### Règles d'affichage

- Grouper les non-conformités par tag principal (Accessibilité > SEO > autres)
- Quick Wins en premier (corrections CSS simples à fort impact)
- Section "Règles non vérifiables" avec les règles `requires_dom`
- Si tout est conforme : "Toutes les règles vérifiables sont respectées."

## Couverture

166/245 règles (68 %) : 160 règles `static` évaluées par le modèle après WebFetch, plus 6 règles `requires_dom` automatisées par le DOM Analyzer (qui couvre 23 règles Opquast distinctes, dont 17 règles static vérifiées de façon déterministe par axe-core). Détails et limitations SPA : voir `references/couverture-limitations.md`

## Ressources

- `rules/opquast-v5.json` : 245 règles (id, title, category, rubrique, tags, phases, opquast_id, objectives, solution, verification, severity). Titres, tags, rubriques, phases et identifiants proviennent de l'API ; objectifs, solutions et vérifications proviennent des fiches `references/regles-v5/`
- `scripts/sync-rules-from-api.py` : alignement du fichier de règles sur l'API (`--check`, `--dry-run`, `--write`, `--full`, `--rules <copie>`)
- `scripts/tests/` : tests pytest des scripts Python ; `scripts/dom-analyzer/tests/` et `scripts/static-analyzer/tests/` : tests vitest ; `scripts/audit-mappings.js` : cohérence stricte du mapper avec le référentiel
- `rules/site-profiles.json` : Détection et filtrage par type de site (6 profils)
- `schemas/audit-report.json` : Schéma JSON pour les rapports structurés
- Dossier des règles V5 : 245 règles détaillées individuelles
- `references/V5/` : Fichiers par rubrique (14) et dimension transversale (6)
- `references/rubriques-dimensions.md` : Valeurs acceptées pour thématiques, rubriques et sévérités
- `references/explorateur-exemples.md` : Exemples de sortie pour l'explorateur de règles

## API Opquast

Source de vérité live : `https://api.opquast.com/swagger/?format=openapi`. L'interface humaine est `https://api.opquast.com/swagger/`.

Authentification : les endpoints privés attendent l'en-tête `Authorization: <clé API brute>` (vérifié le 2026-09-03 ; `Api-Key` est toléré, `Bearer`, `Token` et `X-API-Key` sont refusés). Une clé révoquée donne `403` avec « Informations d'authentification non fournies ».

Endpoints V5 utiles (`version=qualite-numerique`) :

| Usage | Endpoint | Auth |
|-------|----------|------|
| Checklist publique | `GET /checklist/public/` | Non |
| Checklist étendue | `GET /checklist/extended/` | Oui |
| Règle par numéro | `GET /checklist/{number}/` | Oui |
| Règle aléatoire | `GET /checklist/random/` | Oui |
| Règle embarquable | `GET /checklist/{number}/embed/` | Non |
| Règle aléatoire embarquable | `GET /checklist/random/embed/` | Non |
| Certifiés partenaire | `GET /certified/` | Oui |
| Certifiés expirés | `GET /certified/expired/` | Oui |
| Certifié par nom ou clé | `GET /certified/{applicant_name_or_key}/` | Oui |

Serveur local : `MCP/opquast-mcp/server.py` expose ces données comme outils MCP (documentation : `MCP/opquast-mcp/README.md`). Chaque réponse porte `source` (`api`, `cache` ou `local`) ; en repli local, `fallback_reason` donne la cause et `local_snapshot` la date d'alignement du fichier. L'outil `opquast_status` indique la source effective avant toute consultation.

Quand l'utilisateur demande une information actuelle ou une recherche large dans les règles, préférer l'API/MCP si disponible, puis citer `source: api`. Si l'API répond `401` ou `403`, signaler le statut, vérifier `OPQUAST_API_KEY` ou le champ `opquast_api_key` de `~/Claude/.claude/credentials.json` (ordre de `MCP/opquast-mcp/run.sh`), puis basculer sur les données locales avec `source: local`.

### Maintenance

Le fichier local et l'API doivent rester alignés. Contrôle de dérive (code retour 1 si écart) :

```bash
python3 scripts/sync-rules-from-api.py --check
```

Mise à jour des titres, tags, rubriques, phases et identifiants : `--write`. Codes de retour : 0 aligné, 1 dérive ou anomalie (écriture refusée : titre vide, doublon, règle absente d'un côté, valeur hors schéma), 2 API injoignable ou usage. Après une mise à jour, relancer `python3 scripts/validate.py` (accepte `--rules <fichier>` pour valider une copie).

Source de référence des corps de règles (`objectives`, `solution`, `verification`) : les fiches `references/regles-v5/`, injectées par `scripts/enrich-rules.py`. `--full` (clé API requise) les remplace explicitement par la checklist étendue et trace `enrichment_source: api` dans le fichier ; ne pas mélanger les deux sans le décider.

Tests : `python3 -m pytest scripts/tests -q` ; `cd scripts/dom-analyzer && npm test` ; `cd scripts/static-analyzer && npm test` ; `cd scripts && npm run audit:mappings`.

## Intelligence contextuelle

Lors de l'analyse, détecter automatiquement le profil du site via `rules/site-profiles.json` :

| Profil | Indicateurs clés |
|--------|------------------|
| `e-commerce` | panier, prix, checkout, product schema |
| `saas` | login, dashboard, pricing, subscription |
| `blog` | article, post, author, published date |
| `vitrine` | contact, about, services, team |
| `institutionnel` | démarches, services publics, délibérations |
| `newsletter` | formulaire newsletter, subscribe |

Pour chaque profil, le fichier définit `rubriques_prioritaires`, `regles_critiques`, `regles_exclues` et `pages_a_analyser`. `detection_priority` fixe l'ordre d'essai des profils (un site e-commerce avec newsletter est classé e-commerce) et `fallback_profile` le profil appliqué à défaut : `vitrine`, qui exclut les 39 règles E-Commerce.

## Format de sortie

Template complet, ordre de priorité et exemple condensé : voir `references/format-sortie.md`

Structure du rapport : Couverture -> Quick Wins -> Non-conformités par priorité (Accessibilité > SEO > UX) -> Règles non vérifiables (DOM).

### Exemple `/opquast <URL>` (condensé)

```
/opquast https://boutique.example.com

# Analyse Opquast : Boutique Example
**Profil** : e-commerce | **Non conformes** : 14 | **DOM** : 33 non vérifiables
Quick Wins : règle 191 (justify), 237 (user-select) | Accessibilité : règle 118 (alternative des images)
```

Rapport complet et template : voir `references/format-sortie.md`

### Exemple `/opquast --regle`

```
/opquast --regle 69

# Règle 69 : Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.
**Rubrique** : Formulaires | **Sévérité** : critical | **Tags** : Basics, Accessibilité | **Phases** : Développement
**Solution** : `label for` associé à l'`id` du champ, ou `aria-label` / `aria-labelledby` si l'étiquette n'est pas affichée
→ https://checklists.opquast.com/fr/qualite-numerique/69
```

### Exemple `/opquast --search`

```
/opquast --search formulaire

# 30 règles contenant "formulaire"
| ID | Titre | Sévérité |
|----|-------|----------|
| 69 | Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre. | critical |
| 71 | L'étiquette de chaque champ de formulaire indique si la saisie est obligatoire. | critical |
```

### Exemple `/opquast --theme`

```
/opquast https://example.com --theme seo

# Analyse Opquast : Example — SEO (37 règles)
**Non conformes** : 5 | Règle 3 : métadonnée de description absente | Règle 103 : titre de page non identifiant
```

Exemples complets pour `--list`, `--rubrique`, `--severity` : voir `references/explorateur-exemples.md`

## Gestion d'erreurs

| Situation | Comportement |
|-----------|-------------|
| WebFetch échoue (URL inaccessible) | Proposer des captures d'écran, préciser les limitations, demander de vérifier l'URL |
| `rules/opquast-v5.json` introuvable | STOPPER l'analyse. Signaler : "Fichier de règles manquant. Vérifier l'installation du skill." |
| `rules/site-profiles.json` introuvable | Continuer sans profilage. Appliquer toutes les règles static sans filtrage |
| Profil de site non reconnu | Utiliser le profil `vitrine` par défaut (`fallback_profile`). Mentionner dans le rapport : "Profil non détecté, profil vitrine appliqué par défaut (règles E-Commerce exclues)" |
| HTML source quasi-vide (SPA détectée) | Avertir l'utilisateur. Proposer de fournir le HTML rendu ou d'utiliser le DOM Analyzer |
| `scripts/bridge.js` échoue ou absent | Continuer sans analyse DOM. Classer toutes les règles `requires_dom` dans la section "Non vérifiables" |
| API Opquast répond `401`/`403` | Signaler l'erreur d'authentification, ne pas afficher la clé, utiliser le fallback local si possible |
| Swagger API indisponible | Ne pas inventer l'endpoint. Utiliser seulement les endpoints déjà documentés ici ou le fallback local |
| Réponse API différente de `rules/opquast-v5.json` (titre, tag, rubrique) | Faire confiance à l'API, signaler l'écart, proposer `python3 scripts/sync-rules-from-api.py --write` |
| Argument `$ARGUMENTS` non reconnu | Lister les commandes disponibles avec exemples |

## Workflow

1. Parser `$ARGUMENTS` (URL, flags, commandes)
2. Afficher disclaimer (première fois)
3. Récupérer page principale avec `WebFetch` + pages secondaires (contact, mentions légales, CGV)
4. **Détecter le profil** via `rules/site-profiles.json` (défaut : `vitrine`)
5. Charger `rules/opquast-v5.json`, filtrer par `category: "static"`, exclure `regles_exclues` du profil, prioriser `regles_critiques`
6. Pour une consultation de règles, une recherche large ou une donnée live, interroger l'API/MCP Opquast si disponible (`/checklist/extended/`, `/checklist/{number}/`) et conserver le fallback local
7. Si le DOM Analyzer est disponible (`scripts/bridge.js`), lancer l'analyse des règles `requires_dom` applicables au profil
8. Pour chaque règle : appliquer `verification` comme méthode de test, `solution` pour les recommandations
9. Analyser les pages définies dans `pages_a_analyser` du profil
10. Générer rapport avec profil détecté (voir `references/format-sortie.md`)
11. Proposer analyse complémentaire

## Checklist finale

- [ ] Disclaimer affiché
- [ ] HTML récupéré avec succès (ou limitation SPA signalée)
- [ ] Profil de site détecté et mentionné dans le rapport
- [ ] Règles filtrées selon profil et scope
- [ ] Source des règles indiquée (`api` ou `local`) quand une consultation API/MCP est effectuée
- [ ] Quick Wins listés en premier
- [ ] Non-conformités groupées par priorité (Accessibilité > SEO > UX)
- [ ] Règles non vérifiables (DOM) listées séparément
- [ ] Lien vers chaque règle citée sur checklists.opquast.com
- [ ] Analyse complémentaire proposée

---

*Opquast V5 (Qualité Numérique) — 245 règles*
