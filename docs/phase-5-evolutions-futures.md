# Phase 5 - Évolutions Futures

> Support multi-standards, mode batch et suggestions de correction

**Date** : 2026-01-15
**Statut** : Planifié (non implémenté)
**Dépendances** : Infrastructure complète (Phases 1-4)

---

## Objectif

Étendre le skill au-delà d'Opquast pour devenir un outil d'audit qualité web complet :
1. Support de multiples référentiels (RGAA, WCAG, Section 508)
2. Audit de sites entiers (multi-pages)
3. Génération automatique de corrections

---

## 5.1 Support Multi-Standards

### Référentiels cibles

| Standard | Origine | Focus | Règles |
|----------|---------|-------|--------|
| **Opquast V5** | France | Qualité globale | 245 |
| **RGAA 4.1** | France | Accessibilité légale | 106 critères |
| **WCAG 2.2** | W3C | Accessibilité internationale | 87 critères |
| **Section 508** | USA | Accessibilité fédérale | ~60 critères |
| **Éco-index** | France | Écoconception | 15 règles |

### Architecture unifiée

```
rules/
├── opquast-v5.json       # Existant
├── rgaa-4.1.json         # À créer
├── wcag-2.2.json         # À créer
├── section-508.json      # À créer
├── eco-index.json        # À créer
└── mappings/
    ├── opquast-to-rgaa.json
    ├── opquast-to-wcag.json
    └── rgaa-to-wcag.json
```

### Schéma unifié des règles

```json
{
  "$schema": "unified-rule-schema.json",
  "id": "wcag-1.1.1",
  "standard": "wcag",
  "version": "2.2",
  "level": "A",
  "title": "Non-text Content",
  "title_fr": "Contenu non textuel",
  "description": "All non-text content has a text alternative",
  "category": "static",
  "verification": "...",
  "solution": "...",
  "mappings": {
    "opquast": [113, 114, 115],
    "rgaa": ["1.1", "1.2", "1.3"],
    "section508": ["1194.22(a)"]
  }
}
```

### Commandes

```bash
# Audit Opquast (défaut)
/opquast https://example.com

# Audit RGAA
/opquast https://example.com --standard rgaa

# Audit WCAG niveau AA
/opquast https://example.com --standard wcag --level AA

# Audit combiné
/opquast https://example.com --standard opquast,rgaa

# Voir correspondances
/opquast --mapping opquast-to-rgaa
```

### Rapport multi-standards

```markdown
# Audit Qualité Web : example.com

**Standards** : Opquast V5, RGAA 4.1

## Scores

| Standard | Score | Niveau |
|----------|-------|--------|
| Opquast | 87% | - |
| RGAA | 72% | Partiellement conforme |

## Non-conformités croisées

### Images sans alternative

| Standard | Règle | Statut |
|----------|-------|--------|
| Opquast | 113 | ❌ |
| RGAA | 1.1 | ❌ |
| WCAG | 1.1.1 | ❌ |

**Impact** : Accessibilité, SEO
**Correction** : Ajouter attribut `alt` aux images
```

### Implémentation

```python
# scripts/multi-standard.py

from pathlib import Path
import json

STANDARDS = {
    'opquast': 'rules/opquast-v5.json',
    'rgaa': 'rules/rgaa-4.1.json',
    'wcag': 'rules/wcag-2.2.json'
}

def load_standard(name: str) -> dict:
    """Charge un référentiel."""
    with open(STANDARDS[name]) as f:
        return json.load(f)

def find_mappings(rule_id: str, from_std: str, to_std: str) -> list:
    """Trouve les correspondances entre standards."""
    mapping_file = f"rules/mappings/{from_std}-to-{to_std}.json"
    with open(mapping_file) as f:
        mappings = json.load(f)
    return mappings.get(str(rule_id), [])

def unified_audit(url: str, standards: list) -> dict:
    """Audit unifié multi-standards."""
    results = {}
    for std in standards:
        rules = load_standard(std)
        results[std] = check_rules(url, rules)

    # Fusion des résultats avec mappings
    return merge_results(results)
```

---

## 5.2 Mode Batch (Multi-Pages)

### Concept

Auditer un site entier plutôt qu'une seule page.

### Sources de pages

| Source | Méthode |
|--------|---------|
| Sitemap | Parse `sitemap.xml` |
| Crawl | Spider à partir de l'accueil |
| Liste | Fichier texte d'URLs |
| Échantillon | N pages aléatoires |

### Commandes

```bash
# Via sitemap
/opquast https://example.com --batch sitemap

# Crawl (max 50 pages)
/opquast https://example.com --batch crawl --max-pages 50

# Liste personnalisée
/opquast --batch urls.txt

# Échantillon représentatif
/opquast https://example.com --batch sample --pages 10
```

### Stratégies de crawl

```json
{
  "crawl_config": {
    "max_pages": 50,
    "max_depth": 3,
    "include_patterns": ["/*"],
    "exclude_patterns": [
      "/admin/*",
      "/api/*",
      "*.pdf",
      "*.zip"
    ],
    "priority_pages": [
      "/",
      "/contact",
      "/mentions-legales",
      "/politique-confidentialite"
    ],
    "respect_robots_txt": true,
    "delay_ms": 1000
  }
}
```

### Rapport batch

```markdown
# Audit Batch Opquast : example.com

**Pages analysées** : 47
**Durée** : 12m 34s
**Date** : 2026-01-15

## Score global

| Métrique | Valeur |
|----------|--------|
| Score moyen | 84% |
| Score minimum | 62% (/old-page) |
| Score maximum | 95% (/) |
| Non-conformités totales | 127 |
| Non-conformités uniques | 23 |

## Top 10 des non-conformités

| Règle | Occurrences | Pages |
|-------|-------------|-------|
| 3 - Meta description | 42 | 89% |
| 113 - Alt images | 31 | 66% |
| 15 - Politique confidentialité | 28 | 60% |
| ... | ... | ... |

## Pages problématiques

| Page | Score | Issues |
|------|-------|--------|
| /old-page | 62% | 18 |
| /product/123 | 71% | 14 |
| /blog/article | 75% | 12 |

## Répartition par rubrique

```
E-Commerce     ████████░░ 78%
Formulaires    ██████████ 95%
Navigation     █████████░ 88%
Sécurité       ██████████ 100%
```
```

### Implémentation

```python
# scripts/batch-audit.py

import asyncio
from urllib.parse import urljoin
import xml.etree.ElementTree as ET

async def get_sitemap_urls(base_url: str) -> list:
    """Récupère les URLs depuis sitemap.xml."""
    sitemap_url = urljoin(base_url, '/sitemap.xml')
    response = await fetch(sitemap_url)
    root = ET.fromstring(response)

    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [loc.text for loc in root.findall('.//sm:loc', ns)]
    return urls

async def crawl_site(base_url: str, max_pages: int = 50) -> list:
    """Crawl un site pour découvrir les pages."""
    visited = set()
    to_visit = [base_url]

    while to_visit and len(visited) < max_pages:
        url = to_visit.pop(0)
        if url in visited:
            continue

        visited.add(url)
        html = await fetch(url)
        links = extract_internal_links(html, base_url)
        to_visit.extend(links)

    return list(visited)

async def batch_audit(urls: list, standard: str = 'opquast') -> dict:
    """Audit batch de plusieurs URLs."""
    results = []

    for url in urls:
        result = await audit_single(url, standard)
        results.append({'url': url, 'result': result})

    return aggregate_results(results)
```

---

## 5.3 Suggestions de Correction

### Concept

Passer de "violation détectée" à "voici le fix".

### Niveaux de suggestion

| Niveau | Description | Exemple |
|--------|-------------|---------|
| **Guideline** | Conseil général | "Ajouter un attribut alt" |
| **Template** | Code générique | `<img alt="[description]">` |
| **Contextual** | Code spécifique | `<img alt="Logo Example Corp">` |
| **Auto-fix** | Patch applicable | Diff prêt à appliquer |

### Format des suggestions

```markdown
### Règle 113 : Chaque image a un attribut alt

**Problème détecté :**
```html
<img src="/logo.png" class="site-logo">
```

**Suggestion contextuelle :**
```html
<img src="/logo.png" class="site-logo" alt="Logo Example Corp">
```

**Explication :**
L'image semble être le logo du site (classe `site-logo`, chemin `/logo.png`).
L'alternative suggérée utilise le nom du site détecté dans le `<title>`.

**Auto-fix disponible :** ✅
```diff
- <img src="/logo.png" class="site-logo">
+ <img src="/logo.png" class="site-logo" alt="Logo Example Corp">
```
```

### Intelligence des suggestions

```python
# scripts/suggest-fix.py

def suggest_alt_text(img_element: dict, page_context: dict) -> str:
    """Suggère un texte alternatif intelligent."""

    src = img_element.get('src', '')
    classes = img_element.get('class', '')

    # Logo detection
    if 'logo' in src.lower() or 'logo' in classes.lower():
        site_name = page_context.get('site_name', 'Site')
        return f"Logo {site_name}"

    # Icon detection
    if 'icon' in src.lower() or 'icon' in classes.lower():
        return ""  # Decorative, empty alt

    # Filename analysis
    filename = src.split('/')[-1].split('.')[0]
    if filename:
        # hero-banner-summer-2026.jpg → "Summer 2026 banner"
        words = filename.replace('-', ' ').replace('_', ' ').title()
        return words

    return "[Description de l'image]"

def generate_fix_diff(original: str, fixed: str, filepath: str) -> str:
    """Génère un diff applicable."""
    import difflib

    diff = difflib.unified_diff(
        original.splitlines(keepends=True),
        fixed.splitlines(keepends=True),
        fromfile=f'a/{filepath}',
        tofile=f'b/{filepath}'
    )
    return ''.join(diff)
```

### Export des corrections

```bash
# Générer un fichier de patches
/opquast https://example.com --fixes > fixes.patch

# Appliquer les corrections (après review)
git apply fixes.patch
```

### Intégration IDE

```json
// .vscode/settings.json
{
  "opquast.enableAutoFix": true,
  "opquast.fixOnSave": false,
  "opquast.showInlineHints": true
}
```

---

## Architecture finale (Phase 5)

```
~/.claude/skills/opquast/
├── SKILL.md
├── rules/
│   ├── opquast-v5.json
│   ├── rgaa-4.1.json
│   ├── wcag-2.2.json
│   ├── section-508.json
│   ├── eco-index.json
│   ├── site-profiles.json
│   └── mappings/
│       ├── opquast-to-rgaa.json
│       └── ...
├── schemas/
│   ├── audit-report.json
│   ├── unified-rule.json
│   └── sarif-opquast.json
├── scripts/
│   ├── enrich-rules.py
│   ├── multi-standard.py
│   ├── batch-audit.py
│   ├── suggest-fix.py
│   ├── export-sarif.py
│   └── dom-analyzer/
│       └── ...
├── audits/
│   └── [historique par site]
└── references/
    └── ...
```

---

## Estimation globale

| Tâche | Complexité | Impact |
|-------|------------|--------|
| 5.1 Multi-standards | Élevée | Très élevé |
| 5.1 Mappings | Moyenne | Élevé |
| 5.2 Batch sitemap | Faible | Élevé |
| 5.2 Batch crawl | Moyenne | Élevé |
| 5.3 Suggestions simples | Faible | Moyen |
| 5.3 Auto-fix | Élevée | Très élevé |

---

## Roadmap suggérée

```
Phase 5.1a : RGAA 4.1 (priorité légale France)
    ↓
Phase 5.2a : Batch via sitemap
    ↓
Phase 5.1b : WCAG 2.2 (standard international)
    ↓
Phase 5.3a : Suggestions simples
    ↓
Phase 5.2b : Batch via crawl
    ↓
Phase 5.3b : Auto-fix
```

---

## Vision finale

Un outil d'audit qualité web complet :

- **Multi-référentiels** : Opquast, RGAA, WCAG, Section 508
- **Multi-pages** : Audit de sites entiers
- **Multi-modèles** : Validation Council
- **Actionnable** : Suggestions et auto-fix
- **Intégré** : CI/CD, IDE, historique

---

*Document généré le 2026-01-15 - Skill Opquast v1.3*
