# Track: Phase 7 - Bridge Skill↔Dom-Analyzer

> Intégrer dom-analyzer comme module ES dans le skill

**Priority**: Critical (Council vote unanime)
**Effort**: Medium
**Created**: 2026-01-17

---

## Contexte

Le dom-analyzer existe comme CLI séparé. Le skill ne peut pas l'invoquer directement.
Objectif: 1 commande → analyse static + DOM (193 règles, 79% coverage)

## Objectifs

1. Exposer dom-analyzer comme module ES (`export async function analyze()`)
2. Créer wrapper pour le skill
3. Documenter l'usage dans SKILL.md
4. Fallback gracieux si Node.js absent

---

## Phases

### Phase 1: Refactor dom-analyzer (3 tasks)
- [ ] Créer `scripts/dom-analyzer/lib/analyzer.js` (module ES)
- [ ] Exposer `analyze(url, options)` comme fonction principale
- [ ] Garder CLI comme wrapper du module

### Phase 2: Créer Bridge (2 tasks)
- [ ] Créer `scripts/bridge.js` (point d'entrée unifié)
- [ ] Combiner analyse static + DOM

### Phase 3: Intégration Skill (2 tasks)
- [ ] Mettre à jour SKILL.md avec instructions bridge
- [ ] Ajouter exemples d'usage

### Phase 4: Tests (2 tasks)
- [ ] Ajouter tests pour le module analyzer
- [ ] Test d'intégration bridge complet

---

## Acceptance Criteria

- [ ] `import { analyze } from './lib/analyzer.js'` fonctionne
- [ ] `node scripts/bridge.js <url>` retourne static + DOM
- [ ] SKILL.md documente le bridge
- [ ] Tests passent

---

## Files

| Fichier | Action |
|---------|--------|
| `scripts/dom-analyzer/lib/analyzer.js` | CREATE |
| `scripts/dom-analyzer/index.js` | MODIFY (use lib) |
| `scripts/bridge.js` | CREATE |
| `SKILL.md` | MODIFY |
