# Format de sortie des rapports Opquast

## Template

```markdown
# Analyse Opquast : [Nom du site]

**URL** : [url]
**Date** : [date]
**Profil detecte** : [e-commerce|saas|blog|vitrine|institutionnel]
**Scope** : [thematique/rubrique ou "adapte au profil"]

## Couverture

| Statut | Nombre |
|--------|--------|
| Conformes | X |
| Non conformes | Y |
| Non verifiables (DOM) | Z |
| Non applicables | W |

## Quick Wins

| Regle | Probleme | Solution | Impact |
|-------|----------|----------|--------|

## Non-conformites par priorite

### Accessibilite (priorite haute)
#### Regle [N] : [Titre]
**Impact** : Accessibilite
**Pages** : [URL 1], [URL 2]
**Solution** : [Extrait du champ solution de la regle]
[Voir la regle](https://checklists.opquast.com/fr/qualite-numerique/[N])

### SEO (priorite moyenne)
### UX/Performance (priorite standard)

## Regles non verifiables
Les regles suivantes necessitent une analyse DOM/CSS : [liste]
```

## Ordre de priorite

1. **Accessibilite** : Impact utilisateurs en situation de handicap
2. **SEO** : Impact referencement et decouvrabilite
3. **UX/Performance** : Impact experience utilisateur generale

## Exemple condense

```markdown
# Analyse Opquast : Mairie de Rennes

**URL** : https://metropole.rennes.fr
**Date** : 2026-03-23
**Profil detecte** : institutionnel
**Scope** : adapte au profil

## Couverture
| Statut | Nombre |
|--------|--------|
| Non conformes | 8 |
| Non verifiables (DOM) | 33 |

## Quick Wins
| Regle | Probleme | Solution | Impact |
|-------|----------|----------|--------|
| 191 | Texte justifie detecte | Supprimer `text-align: justify` | Accessibilite |

## Non-conformites par priorite
### Accessibilite (priorite haute)
#### Regle 1 : Attribut lang absent
**Solution** : Ajouter `lang="fr"` sur la balise `<html>`
[Voir la regle](https://checklists.opquast.com/fr/qualite-numerique/1)

## Regles non verifiables
- Regle 182 : Contraste [Necessite analyse DOM]
- Regle 165 : Focus clavier [Necessite analyse DOM]
```
