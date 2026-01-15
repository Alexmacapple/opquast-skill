# Tech Stack - Opquast Skill

## Languages

| Language | Usage |
|----------|-------|
| **Markdown** | SKILL.md, documentation, règles |
| **JSON** | Règles enrichies, schémas, profils |
| **Python 3** | Scripts d'enrichissement |
| **Bash** | Script d'installation |

## Structure

```
opquast-skill/
├── SKILL.md                  # Point d'entrée Claude Code
├── rules/                    # Données JSON
│   ├── opquast-v5.json      # 245 règles enrichies
│   └── site-profiles.json   # Profils de détection
├── schemas/                  # Schémas JSON
│   └── audit-report.json
├── scripts/                  # Outils
│   └── enrich-rules.py
├── references/               # Règles markdown source
│   ├── regles-v5/           # 245 fichiers
│   └── V5/                  # Par rubrique
└── docs/                     # Documentation phases
```

## Dependencies

### Python (scripts/)
- `json` (stdlib)
- `pathlib` (stdlib)
- `re` (stdlib)

### Phase 3 (future)
- `puppeteer` ou `playwright` pour analyse DOM
- `node.js` 18+

## Data Formats

| Format | Schema | Usage |
|--------|--------|-------|
| Rules | `rules/opquast-v5.json` | 245 règles avec objectives, solution, verification |
| Profiles | `rules/site-profiles.json` | 6 profils de sites |
| Reports | `schemas/audit-report.json` | Sortie structurée |

## Integration Points

- **Claude Code**: Via SKILL.md frontmatter
- **GitHub**: Repo public
- **CI/CD**: Phase 4 (SARIF, JUnit)
