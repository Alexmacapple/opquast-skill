# Changelog

All notable changes to the Opquast Skill are documented in this file.

> Note de numérotation. Ce fichier porte deux numérotations qui se recouvrent.
> Les étiquettes Git `v1.3.0` et `v1.4.0` datent toutes deux du 15 janvier 2026 et
> précèdent les entrées 1.0.0 à 1.2.0 ci-dessous, datées des 16, 17 et 18 janvier :
> la numérotation du fichier a été reprise à zéro après la pose des étiquettes.
> La version affichée par le README et par `git describe` reste celle de la
> dernière étiquette, `v1.4.0`. Les travaux listés sous « Non publié » n'ont pas
> encore d'étiquette et justifient une version 1.5.0 à poser.

## [Non publié]

Travaux menés depuis l'étiquette `v1.4.0` du 15 janvier 2026, du plus récent au
plus ancien. Les entrées sont datées faute d'étiquette intermédiaire.

### Ajouté

- Contrôle de dérive `scripts/sync-rules-from-api.py` entre le fichier local et
  l'API Opquast, avec les modes `--check`, `--dry-run`, `--write`, `--full` et
  `--rules` (2026-09-03).
- Diagnostic d'installation `scripts/doctor.py` : Node, dépendances des deux
  analyseurs, Chromium, Python, environnement virtuel et clé du serveur MCP,
  accès à l'API, dérive du référentiel (2026-09-04).
- Intégration continue GitHub `.github/workflows/ci.yml` : tests rejoués à chaque
  poussée et contrôle de dérive hebdomadaire le lundi (2026-09-04).
- Option `install.sh --dom` installant les dépendances verrouillées des deux
  analyseurs et Chromium, sans installer le skill (2026-09-04).
- Checks d'interaction du DOM Analyzer et validateurs en modules thématiques,
  issus du chantier de janvier fusionné dans `main` (2026-09-04).
- Documentation de l'API Opquast dans le `SKILL.md` : endpoints V5, format
  d'authentification, repli local et champ `source` (2026-07-02).

### Modifié

- Titres, étiquettes, rubriques, phases et identifiants de `rules/opquast-v5.json`
  alignés sur l'API Opquast, champ `synced_from_api` à l'appui (2026-09-03).
- Couverture annoncée corrigée : 184 règles sur 245, soit 75 %. Le chiffre
  précédent additionnait des identifiants axe-core à des règles Opquast. Le DOM
  Analyzer couvre 41 règles Opquast distinctes (2026-09-04).
- `SKILL.md` restructuré, contenu déporté dans `references/` (2026-03-23).
- Nom d'invocation aligné sur le dossier du dépôt : la commande est
  `/opquast-skill`. Le champ `name` du frontmatter n'est qu'un libellé
  d'affichage, le nom du dossier commande l'invocation. `install.sh` installe
  désormais sous `~/.claude/skills/opquast-skill` (2026-09-04).

### Corrigé

- Une analyse DOM échouée sortait en code 0, indiscernable d'une page conforme.
  Les codes du DOM Analyzer et du pont sont désormais 0 aucune violation,
  1 violations, 2 analyse échouée (2026-09-04).
- Le mapper axe-core et les validateurs statiques portaient 13 titres et
  10 sévérités contredisant le référentiel ; les tests de cohérence acceptaient
  un seul mot commun (2026-09-04).
- Le serveur MCP relayait une réponse d'une forme inattendue sans champ `source`,
  et un instantané local illisible faisait tomber tous ses outils (2026-09-04).
- La suite de tests du static-analyzer ne pouvait pas s'exécuter, à cause d'un
  chemin d'import erroné ; les scripts ESM ne fonctionnaient pas sous Node 18
  pourtant déclaré (2026-09-04).
- `install.sh --dom` sortait en code 1 sans rien installer lorsque le dépôt vit
  sous un répertoire `.claude/skills` : le garde-fou contre l'installation en
  double s'appliquait avant le traitement de l'option (2026-09-04).

## [1.2.0] - 2026-01-18

### Added

- **SPA Pre-flight Detection v2** (`scripts/static-analyzer/spa-detector.js`)
  - Detects 11 SPA/SSR frameworks before static analysis
  - Frameworks: React, Vue, Angular, Svelte, Solid.js, Qwik, Alpine.js, HTMX, Ember, Lit, Preact
  - SSR hybrid detection for Next.js (`__NEXT_DATA__`) and Nuxt (`data-server-rendered`)
  - Lightweight framework handling (Alpine.js, HTMX) - full analysis recommended
  - DOM pattern fallback detection (emptyBody, bundleScripts, appContainer, hashRouting)
  - Confidence scoring (0.3-0.9 range)
  - Recommendations: `full-analysis`, `warn-spa`, `dom-preferred`

- **Bridge Integration** (`scripts/bridge.js`)
  - `--no-spa-detection` CLI flag to disable SPA detection
  - SPA detection results in unified analysis output
  - Warnings automatically added for detected SPAs
  - `--info` endpoint includes SPA detector metadata

- **Test Suite** (`scripts/static-analyzer/spa-detector.test.js`)
  - 38 unit tests covering all 11 frameworks
  - Negative tests (WordPress, static HTML, e-commerce sites)
  - Edge case handling (null, empty, malformed input)
  - Confidence and recommendation validation

### Changed

- **SKILL.md**: Updated documentation with SPA detection v2 behavior matrix
- **Static analysis never skipped**: SPAs generate warnings but analysis always runs
- **Modular validators** (`scripts/static-analyzer/validators/`)
  - Split 30 validators into 8 thematic modules
  - `metadata.js` (10), `accessibility.js` (2), `content.js` (6), `privacy.js` (2)
  - `ecommerce.js` (2), `contact.js` (2), `seo.js` (3), `structure.js` (3)
  - Category-based filtering via `runStaticValidators(html, url, { categories: [...] })`
  - Backward compatible: `STATIC_VALIDATORS` and `runStaticValidators()` unchanged

### Fixed

- False positives for SSR hybrid sites (Next.js, Nuxt) now correctly identified

## [1.1.0] - 2026-01-17

### Added

- PRD-004: Interaction checks in DOM analyzer
- PRD-001 Phase 2: 20 additional static validators

## [1.0.0] - 2026-01-16

### Added

- Initial release with DOM analyzer (32 rules via axe-core + Playwright)
- Static heuristic validators (PRD-001)
- Confidence scoring (PRD-002)
- Opquast ID mappings (PRD-003)
- Bridge for unified analysis
