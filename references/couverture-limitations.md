# Couverture et limitations

## Categories de regles

| Categorie | Regles | Methode | Automatise |
|-----------|--------|---------|------------|
| `static` | 160 (65%) | WebFetch + analyse HTML | LLM |
| `requires_dom` | 33 (14%) | DOM Analyzer (Playwright) | **32/33** |
| `requires_interaction` | 44 (18%) | Test manuel | Non |
| `content_quality` | 8 (3%) | Evaluation editoriale | Non |

## DOM Analyzer

Le module `scripts/dom-analyzer/` verifie automatiquement **32 regles DOM** via Playwright + axe-core. Le script `scripts/bridge.js` combine analyse static + DOM. Couverture totale : 193/245 regles (79%).

## Limitation WebFetch (SPAs)

> **Attention** : `WebFetch` recupere uniquement le HTML source initial. Les SPAs (React, Vue, Angular) peuvent avoir un contenu incomplet.

Pour les SPAs, demander a l'utilisateur de fournir le HTML rendu (via DevTools > Elements > Copy outer HTML) ou utiliser le DOM Analyzer.
