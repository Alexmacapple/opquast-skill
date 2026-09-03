# Couverture et limitations

## Categories de regles

| Categorie | Regles | Methode | Automatise |
|-----------|--------|---------|------------|
| `static` | 160 (65%) | WebFetch + analyse HTML | LLM ; 17 de ces regles sont aussi verifiees par axe-core via le DOM Analyzer |
| `requires_dom` | 33 (13%) | DOM Analyzer (Playwright) | **6/33** (165, 166, 167, 182, 186, 238) |
| `requires_interaction` | 44 (18%) | Test manuel | Non |
| `content_quality` | 8 (3%) | Evaluation editoriale | Non |

## DOM Analyzer

Le module `scripts/dom-analyzer/` couvre **23 regles Opquast distinctes** : 24 regles axe-core mappees sur 15 regles Opquast et 8 checks Playwright custom. Parmi elles, 6 sont de categorie `requires_dom` ; les autres sont des regles `static` verifiees de facon deterministe (confiance 1.0) en complement de l'analyse par le modele. Le script `scripts/bridge.js` combine analyse static + DOM et affiche la couverture DOM sur cette base (6/33, 18 %).

Couverture totale : **166/245 regles (68 %)** = 160 static + 6 requires_dom automatisees. Les 79 % annonces auparavant additionnaient des identifiants axe-core a des regles Opquast (audit ShipGuard du 3 septembre 2026).

Codes de sortie du DOM Analyzer et du bridge : 0 conforme, 1 violations, 2 analyse echouee (URL inaccessible, navigateur absent). Un code 0 signifie donc reellement « aucune violation trouvee ».

## Limitation pour les applications monopages

> **Attention** : `WebFetch` recupere uniquement le HTML source initial. Les SPAs (React, Vue, Angular) peuvent avoir un contenu incomplet.

Pour les SPAs, demander a l'utilisateur de fournir le HTML rendu (via DevTools > Elements > Copy outer HTML) ou utiliser le DOM Analyzer.

## Installation du DOM Analyzer

`cd scripts/dom-analyzer && npm install --ignore-scripts && npx playwright install chromium`. Sans cette installation, `scripts/bridge.js` echoue en code 2 et le skill continue sans analyse DOM en le signalant ; il ne doit jamais presenter la couverture DOM comme acquise dans ce cas.
