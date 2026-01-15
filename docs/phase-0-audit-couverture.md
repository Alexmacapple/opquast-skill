# Phase 0 - Audit de Couverture Opquast

> Catégorisation des 245 règles Opquast V5 selon leur vérifiabilité

**Date** : 2026-01-15
**Statut** : Terminé

---

## Objectif

Catégoriser chaque règle Opquast selon qu'elle peut être vérifiée par :
- Analyse statique du code HTML
- Analyse du DOM rendu (CSS calculé, JavaScript)
- Interaction utilisateur (formulaires, navigation)
- Évaluation qualitative (contenu éditorial)

---

## Résultats

### Répartition globale

| Catégorie | Règles | Pourcentage | Vérifiable par le skill |
|-----------|--------|-------------|-------------------------|
| `static` | 147 | 60% | Oui |
| `requires_dom` | 52 | 21% | Non (nécessite headless browser) |
| `requires_interaction` | 31 | 13% | Non (nécessite test fonctionnel) |
| `content_quality` | 15 | 6% | Partiel (évaluation subjective) |

### Couverture effective

- **Règles vérifiables** : 147/245 (60%)
- **Règles partiellement vérifiables** : 15/245 (6%)
- **Règles non vérifiables** : 83/245 (34%)

---

## Règles `requires_dom` (52 règles)

Ces règles nécessitent un navigateur headless (Puppeteer/Playwright) pour être vérifiées :

### Présentation et CSS
| Règle | Description |
|-------|-------------|
| 77 | Étiquette formulaire visuellement rattachée au champ |
| 78 | Informations contextuelles visuellement rattachées |
| 138 | Liens de même nature ont apparence identique |
| 139 | Soulignement réservé aux liens |
| 140 | Liens visuellement différenciés |
| 141 | Liens visités différenciés |
| 142 | Liens internes/externes différenciés |
| 143 | Liens accès limité différenciés |
| 180 | Charte graphique cohérente |
| 181 | Information pas uniquement par couleur |
| 182 | Contraste suffisant |
| 183 | Contenu OK sans styles |
| 186 | Taille éléments cliquables suffisante |
| 191 | Texte non justifié |
| 196 | Impression sans navigation |

### Navigation et interaction
| Règle | Description |
|-------|-------------|
| 91 | Actions hover aussi par focus |
| 124 | Vidéos déclenchées par utilisateur |
| 125 | Sons déclenchés par utilisateur |
| 126 | Animations peuvent être mises en pause |
| 127 | Animations ne bloquent pas navigation |
| 128 | Contenu animé interruptible |
| 129 | Sélection qualité vidéo |
| 153 | Accès immédiat si pas public spécifique |
| 154 | Pas de popups à la navigation |
| 157 | Items menu actifs signalés |
| 158 | Blocs navigation même emplacement |
| 160 | Fermeture fenêtres visuellement rattachée |
| 161 | Fermeture fenêtres immédiate |
| 162 | Bouton fermeture explicite modales |
| 163 | Fermeture même emplacement |
| 165 | Focus clavier visible |
| 166 | Navigation clavier complète |
| 167 | Ordre navigation clavier prévisible |

### Structure
| Règle | Description |
|-------|-------------|
| 237 | Copie contenu non bloquée |
| 238 | Menu contextuel non bloqué |
| 244 | Linéarisation tableaux OK |

---

## Règles `requires_interaction` (31 règles)

Ces règles nécessitent des tests fonctionnels avec interaction utilisateur :

### Comptes et authentification
- 17, 18, 19 : Création compte
- 20, 21, 22 : Gestion compte
- 24, 26 : Alias mail, exposition compte

### E-commerce
- 30, 49, 57, 58 : Panier, codes promo
- 60-65 : Commande, confirmation, factures

### Formulaires
- 75, 79-85, 89, 92 : Validation, erreurs, processus

### Newsletter
- 174, 177-179 : Inscription/désinscription

### Sécurité
- 201-204 : Gestion mots de passe

### Navigation
- 110, 111 : Accusés de réception
- 169, 170, 173 : Recherche, limites temps

---

## Règles `content_quality` (15 règles)

Ces règles nécessitent une évaluation qualitative du contenu :

| Règle | Description |
|-------|-------------|
| 4 | Dates formats explicites |
| 8 | Contenus pub/sponsorisés identifiés |
| 99 | Page accueil expose nature contenus |
| 137 | Libellé lien décrit fonction |
| 184 | Contenu pas désigné par forme/position |
| 216 | Contenus téléchargeables analysés (menaces) |
| 240 | PDF texte sélectionnable |
| 241 | PDF structure titres |

---

## Fichiers créés

### `rules/opquast-v5.json`

```json
{
  "version": "5.0",
  "total_rules": 245,
  "coverage": {
    "static": 147,
    "requires_dom": 52,
    "requires_interaction": 31,
    "content_quality": 15
  },
  "rules": [
    {
      "id": 1,
      "title": "...",
      "category": "static|requires_dom|requires_interaction|content_quality",
      "rubrique": "...",
      "tags": ["Accessibilité", "SEO", ...]
    }
  ]
}
```

### `SKILL.md` (mis à jour)

Ajout de :
- Section "Couverture et Limitations"
- Tableau des catégories
- Liste règles non vérifiables
- Format de sortie avec métriques

---

## Décision architecturale

**Option retenue** : Scope réduit assumé (pas de headless browser pour l'instant)

Le skill indiquera clairement dans ses rapports :
1. Les règles vérifiées (static)
2. Les règles non vérifiables avec mention `[Nécessite analyse DOM]`
3. Les métriques de couverture

**Phase 3 future** : Intégration optionnelle Puppeteer/Playwright

---

## Prochaines étapes

- [x] Phase 0 : Audit de couverture
- [ ] Phase 1 : Enrichissement JSON (objectifs, exemples, solutions)
- [ ] Phase 2 : Intelligence contextuelle (filtrage, détection type site)
- [ ] Phase 3 : Analyse DOM dynamique (optionnel)

---

*Document généré le 2026-01-15 - Skill Opquast v1.1*
