# Product Guide - Opquast Skill

## Vision

Un skill Claude Code permettant d'auditer des sites web selon le référentiel Opquast V5 (245 règles de qualité numérique).

## Target Users

1. **Développeurs web** - Vérification qualité pendant le développement
2. **Auditeurs qualité** - Audits professionnels de sites
3. **Équipes DevOps** - Intégration CI/CD pour quality gates
4. **Consultants Opquast** - Support à la certification

## Core Goals

1. **Couverture maximale** - Vérifier le plus de règles Opquast possible
2. **Transparence** - Indiquer clairement ce qui peut/ne peut pas être vérifié
3. **Actionnable** - Fournir des recommandations concrètes
4. **Intégrable** - Export CI/CD, historique, multi-formats

## Current State (v1.3.0)

| Feature | Status |
|---------|--------|
| 245 règles enrichies (JSON) | ✅ |
| Détection type de site | ✅ |
| Filtrage intelligent | ✅ |
| Schéma de sortie | ✅ |
| Analyse DOM (headless) | 📄 Planifié |
| Export CI/CD (SARIF) | 📄 Planifié |
| Multi-standards (RGAA, WCAG) | 📄 Planifié |

## Success Metrics

- Couverture: 60% → 80% (avec headless browser)
- Précision: Réduire faux positifs de 20%
- Adoption: Installation sur N postes
