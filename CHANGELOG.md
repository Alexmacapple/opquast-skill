# Changelog

All notable changes to the Opquast Skill are documented in this file.

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
