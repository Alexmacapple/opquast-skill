# Static Analyzer

> Analyseur statique pour les règles Opquast - vérifications déterministes sur HTML source

## Modules

| Module | Description | Exports |
|--------|-------------|---------|
| `validators.js` | 30 validateurs de règles Opquast | `runStaticValidators()`, `getValidatorInfo()` |
| `spa-detector.js` | Détection SPA/SSR (11 frameworks) | `detectSPA()`, `getSPADetectorInfo()` |

## Installation

```bash
cd scripts/static-analyzer
npm install
```

## Usage

### Validateurs statiques

```javascript
import { runStaticValidators } from './validators.js';

const html = '<html><head><title>Page</title></head>...</html>';
const results = runStaticValidators(html, 'https://example.com');

// results = {
//   passed: [{ id: 103, title: '...', confidence: 1.0 }],
//   failed: [{ id: 3, title: '...', confidence: 1.0, details: '...' }],
//   skipped: [{ id: 67, reason: 'No form detected' }]
// }
```

### Détection SPA

```javascript
import { detectSPA } from './spa-detector.js';

const html = '<div id="__next">...</div><script>__NEXT_DATA__</script>';
const result = detectSPA(html, 'https://example.com');

// result = {
//   isSPA: true,
//   isSSR: true,           // Next.js = SSR hybride
//   isLightweight: false,
//   framework: 'React',
//   confidence: 0.75,
//   recommendation: 'warn-spa',
//   warnings: ['Site SSR hybride détecté...']
// }
```

## Validateurs (30 règles)

Les validateurs convertissent des règles "probabilistes" (LLM) en vérifications déterministes via regex et analyse HTML.

| Catégorie | Règles | Exemples |
|-----------|--------|----------|
| Métadonnées | 6 | Meta description (3), viewport (227), charset (226) |
| Formulaires | 8 | Labels (67), autocomplete (75), placeholders (77) |
| Accessibilité | 7 | Lang (125), skip links (162), target blank (133) |
| Structure | 5 | H1 unique (104), heading hierarchy (228) |
| Sécurité | 4 | HTTPS (217), CSP headers |

Chaque validateur retourne:
- `{ valid: true, confidence: 1.0 }` - Règle respectée
- `{ valid: false, confidence: 1.0, details: string }` - Violation détectée
- `null` - Impossible à déterminer (fallback LLM)

## Détection SPA (11 frameworks)

| Framework | Signatures | Type |
|-----------|------------|------|
| React/Next.js | `#root`, `#__next`, `__NEXT_DATA__` | SPA / SSR hybride |
| Vue/Nuxt | `#app`, `#__nuxt`, `__NUXT__` | SPA / SSR hybride |
| Angular | `app-root`, `ng-version` | SPA |
| Svelte | `class*="svelte-"` | SPA |
| Solid.js | `data-hk`, `_$HY` | SPA |
| Qwik | `q:container` | Resumable |
| Alpine.js | `x-data`, `x-init` | Lightweight |
| HTMX | `hx-get`, `hx-post` | Lightweight |
| Ember | `data-ember` | SPA |
| Lit | Web Components | SPA |
| Preact | similaire React | SPA |

### Recommendations

| Type détecté | Recommendation | Comportement |
|--------------|----------------|--------------|
| SSR hybride | `warn-spa` | Analyse statique valide + warning |
| Lightweight | `full-analysis` | Analyse complète recommandée |
| SPA pure (>70%) | `dom-preferred` | DOM Analyzer recommandé |
| Non-SPA | - | Analyse statique normale |

**Important**: L'analyse statique n'est **jamais** skippée, seulement des warnings sont ajoutés.

## Tests

```bash
# Tous les tests (125 total)
npm test

# Tests en mode watch
npm run test:watch

# Tests spécifiques
npm test -- spa-detector
npm test -- validators
```

### Couverture

| Module | Tests | Couverture |
|--------|-------|------------|
| validators.js | 87 | 30 règles + edge cases |
| spa-detector.js | 38 | 11 frameworks + négatifs |

## Architecture

```
static-analyzer/
├── validators.js          # 30 validateurs Opquast
├── spa-detector.js        # Détection SPA/SSR
├── spa-detector.test.js   # Tests SPA (38)
├── tests/
│   └── validators.test.js # Tests validateurs (87)
├── package.json           # vitest config
└── README.md              # Ce fichier
```

## Intégration Bridge

Le module est intégré dans `scripts/bridge.js` pour une analyse unifiée:

```bash
# Analyse complète (DOM + Static + SPA detection)
node scripts/bridge.js https://example.com --json

# Désactiver détection SPA
node scripts/bridge.js https://example.com --no-spa-detection
```

## Références

- [PRD-001](../../docs/PRD-001.md) - Spécification validateurs statiques
- [SKILL.md](../../SKILL.md) - Documentation skill Opquast
- [opquast-v5.json](../../rules/opquast-v5.json) - 245 règles Opquast
