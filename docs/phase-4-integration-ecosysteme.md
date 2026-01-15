# Phase 4 - Intégration Écosystème

> Composabilité avec Council, export CI/CD et historique d'audits

**Date** : 2026-01-15
**Statut** : Planifié (non implémenté)
**Dépendances** : Phases 1-3 stables

---

## Objectif

Intégrer le skill Opquast dans l'écosystème de développement :
1. Validation multi-modèle des findings via Council
2. Export pour pipelines CI/CD
3. Suivi de l'évolution qualité dans le temps

---

## 4.1 Composabilité avec Council

### Concept

Utiliser le skill Council pour valider les non-conformités détectées par Opquast, réduisant les faux positifs.

### Commande proposée

```bash
/opquast https://example.com --validate-with-council
```

### Workflow

```
1. Opquast détecte 15 non-conformités
   ↓
2. Pour chaque finding critique:
   → Council évalue avec 3+ modèles
   → Vote: vrai positif / faux positif / incertain
   ↓
3. Rapport enrichi avec niveau de confiance
```

### Format de sortie

```markdown
### Règle 3 : Meta description manquante

**Statut** : Non conforme
**Validation Council** : ✅ Confirmé (3/3 modèles)
**Confiance** : 100%

---

### Règle 182 : Contraste insuffisant

**Statut** : Non conforme (analyse DOM)
**Validation Council** : ⚠️ Incertain (2/3 modèles)
**Confiance** : 67%
**Note** : Vérification manuelle recommandée
```

### Implémentation

```python
# scripts/validate-with-council.py

import subprocess
import json

def validate_finding(finding: dict) -> dict:
    """Valide un finding Opquast avec Council."""

    query = f"""
    Valide cette non-conformité Opquast:

    Règle {finding['rule_id']}: {finding['title']}
    Contexte: {finding['details']}

    Est-ce un vrai positif ou un faux positif?
    """

    result = subprocess.run([
        "python3", "council.py",
        "--query", query,
        "--mode", "vote",
        "--models", "claude,gemini,codex"
    ], capture_output=True, text=True)

    return json.loads(result.stdout)
```

### Bénéfices

- Réduction des faux positifs de ~20-30%
- Confiance accrue dans les résultats
- Détection des cas ambigus

---

## 4.2 Export CI/CD

### Formats supportés

| Format | Usage |
|--------|-------|
| SARIF | GitHub Code Scanning, Azure DevOps |
| JUnit XML | Jenkins, GitLab CI |
| JSON | Custom integrations |
| Markdown | Pull Request comments |

### SARIF (Static Analysis Results Interchange Format)

```json
{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [{
    "tool": {
      "driver": {
        "name": "Opquast Checker",
        "version": "1.3.0",
        "informationUri": "https://www.opquast.com/",
        "rules": [
          {
            "id": "opquast-3",
            "name": "MetaDescriptionMissing",
            "shortDescription": {
              "text": "Le code source de chaque page contient une métadonnée qui en décrit le contenu"
            },
            "helpUri": "https://checklists.opquast.com/fr/qualite-numerique/3"
          }
        ]
      }
    },
    "results": [
      {
        "ruleId": "opquast-3",
        "level": "warning",
        "message": {
          "text": "Meta description manquante"
        },
        "locations": [{
          "physicalLocation": {
            "artifactLocation": {
              "uri": "https://example.com/"
            }
          }
        }]
      }
    ]
  }]
}
```

### GitHub Actions Integration

```yaml
# .github/workflows/opquast.yml

name: Opquast Quality Check

on:
  pull_request:
    branches: [main]

jobs:
  opquast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Opquast Audit
        run: |
          /opquast ${{ env.PREVIEW_URL }} --format sarif > opquast.sarif

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: opquast.sarif
```

### Badges

```markdown
![Opquast Score](https://img.shields.io/badge/Opquast-92%25-green)
![Opquast Rules](https://img.shields.io/badge/Rules-142%2F147-blue)
```

Génération dynamique :

```bash
/opquast https://example.com --badge > badge.json
```

```json
{
  "schemaVersion": 1,
  "label": "Opquast",
  "message": "92%",
  "color": "green"
}
```

### GitLab CI Integration

```yaml
# .gitlab-ci.yml

opquast:
  stage: test
  script:
    - /opquast $PREVIEW_URL --format junit > opquast-report.xml
  artifacts:
    reports:
      junit: opquast-report.xml
```

---

## 4.3 Historique d'audit

### Structure

```
audits/
├── example.com/
│   ├── 2026-01-10.json
│   ├── 2026-01-15.json
│   └── latest.json → 2026-01-15.json
└── other-site.com/
    └── ...
```

### Commandes

```bash
# Audit avec sauvegarde historique
/opquast https://example.com --save-history

# Comparer avec audit précédent
/opquast https://example.com --diff

# Comparer deux dates
/opquast https://example.com --diff 2026-01-10 2026-01-15
```

### Format diff

```markdown
# Évolution Opquast : example.com

**Période** : 2026-01-10 → 2026-01-15

## Résumé

| Métrique | Avant | Après | Évolution |
|----------|-------|-------|-----------|
| Score | 85% | 92% | +7% ⬆️ |
| Non-conformités | 22 | 12 | -10 ✅ |
| Règles vérifiées | 140 | 142 | +2 |

## Corrections apportées ✅

- Règle 3 : Meta description ajoutée
- Règle 15 : Politique confidentialité accessible
- Règle 197 : HTTPS activé
- ...

## Nouvelles non-conformités ❌

- Règle 47 : Offres promotionnelles non datées

## Régressions ⚠️

(aucune)
```

### Implémentation

```python
# scripts/audit-history.py

import json
from pathlib import Path
from datetime import date

AUDITS_DIR = Path("audits")

def save_audit(url: str, report: dict):
    """Sauvegarde un audit dans l'historique."""
    domain = url.split("//")[1].split("/")[0]
    site_dir = AUDITS_DIR / domain
    site_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{date.today().isoformat()}.json"
    filepath = site_dir / filename

    with open(filepath, 'w') as f:
        json.dump(report, f, indent=2)

    # Symlink latest
    latest = site_dir / "latest.json"
    if latest.exists():
        latest.unlink()
    latest.symlink_to(filename)

def diff_audits(url: str, date1: str, date2: str) -> dict:
    """Compare deux audits."""
    domain = url.split("//")[1].split("/")[0]
    site_dir = AUDITS_DIR / domain

    with open(site_dir / f"{date1}.json") as f:
        audit1 = json.load(f)
    with open(site_dir / f"{date2}.json") as f:
        audit2 = json.load(f)

    rules1 = {r['rule_id'] for r in audit1['results']['non_conformes']}
    rules2 = {r['rule_id'] for r in audit2['results']['non_conformes']}

    return {
        "fixed": list(rules1 - rules2),
        "new_issues": list(rules2 - rules1),
        "persistent": list(rules1 & rules2),
        "score_before": audit1['summary']['score'],
        "score_after": audit2['summary']['score']
    }
```

---

## Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `scripts/validate-with-council.py` | Validation multi-modèle |
| `scripts/export-sarif.py` | Export format SARIF |
| `scripts/export-junit.py` | Export format JUnit |
| `scripts/audit-history.py` | Gestion historique |
| `schemas/sarif-opquast.json` | Schéma SARIF customisé |

---

## Estimation

| Tâche | Complexité | Priorité |
|-------|------------|----------|
| 4.1 Council validation | Moyenne | Basse |
| 4.2 Export SARIF | Faible | Haute |
| 4.2 Export JUnit | Faible | Moyenne |
| 4.2 Badges | Faible | Basse |
| 4.3 Historique | Moyenne | Moyenne |
| 4.3 Diff | Moyenne | Moyenne |

---

## Prérequis

- Phase 1 : JSON structuré (pour export)
- Phase 2 : Profils de sites (pour historique pertinent)
- Skill Council fonctionnel (pour 4.1)

---

*Document généré le 2026-01-15 - Skill Opquast v1.3*
