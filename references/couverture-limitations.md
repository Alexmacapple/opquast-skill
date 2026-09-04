# Couverture et limitations

## Categories de regles

| Categorie | Regles | Methode | Automatise |
|-----------|--------|---------|------------|
| `static` | 160 (65%) | WebFetch + analyse HTML | LLM ; 17 de ces regles sont aussi verifiees par axe-core via le DOM Analyzer |
| `requires_dom` | 33 (13%) | DOM Analyzer (Playwright) | **20/33** : 165, 166, 167, 182, 186, 238 (axe et checks custom) plus 14 par les checks d'interaction |
| `requires_interaction` | 44 (18%) | DOM Analyzer (checks d'interaction) puis test manuel | **4/44** (79, 80, 85, 92) |
| `content_quality` | 8 (3%) | Evaluation editoriale | Non |

## DOM Analyzer

Le module `scripts/dom-analyzer/` couvre **41 regles Opquast distinctes** : 24 regles axe-core mappees sur 15 regles Opquast, 8 checks Playwright custom et 18 checks d'interaction (PRD-004 : formulaires, liens, navigation, modales, animations, etiquettes, survol). Parmi elles, 20 sont de categorie `requires_dom` et 4 de categorie `requires_interaction` ; les autres sont des regles `static` verifiees de facon deterministe (confiance 1.0) en complement de l'analyse par le modele. Le script `scripts/bridge.js` combine analyse static + DOM et affiche la couverture DOM sur cette base (20/33, 61 %).

Couverture totale : **184/245 regles (75 %)** = 160 static + 20 requires_dom + 4 requires_interaction automatisees. Les 79 % annonces avant l'audit ShipGuard du 3 septembre 2026 additionnaient des identifiants axe-core a des regles Opquast ; le chiffre actuel compte des regles Opquast distinctes.

Codes de sortie du DOM Analyzer et du bridge : 0 conforme, 1 violations, 2 analyse echouee (URL inaccessible, navigateur absent). Un code 0 signifie donc reellement « aucune violation trouvee ».

## Limitation pour les applications monopages

> **Attention** : `WebFetch` recupere uniquement le HTML source initial. Les SPAs (React, Vue, Angular) peuvent avoir un contenu incomplet.

Pour les SPAs, demander a l'utilisateur de fournir le HTML rendu (via DevTools > Elements > Copy outer HTML) ou utiliser le DOM Analyzer.

## Installation du DOM Analyzer

`cd scripts/dom-analyzer && npm install --ignore-scripts && npx playwright install chromium`. Sans cette installation, `scripts/bridge.js` echoue en code 2 et le skill continue sans analyse DOM en le signalant ; il ne doit jamais presenter la couverture DOM comme acquise dans ce cas.
