# Règle Opquast 90

> L'utilisateur est averti de la perte d'information en cas d'utilisation de l'historique de son navigateur dans un processus complexe.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 90 |
| **ID** | 54475 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'utilisateur est averti de la perte d'information en cas d'utilisation de l'historique de son navigateur dans un processus complexe.

### English
The user is warned when they will lose information if they go back using their browser’s history during a complex process.

### Español
Se advierte al usuario de la pérdida de información al utilizar el historial de su navegador en un proceso complejo.

---

## Objectifs

### Français
- Faciliter l’utilisation des formulaires répartis sur plusieurs pages successives. 
- Limiter les risques d’abandon en cours de processus.

### English
- Simplify the use of forms divided over several pages in a row.
- Limit the risk of abandoning the process.

### Español
- Facilitar el uso de formularios repartidos en varias páginas sucesivas. 
- Limitar los riesgos de abandono durante el proceso.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Ne vous est-il jamais arrivé de croire que vous pouviez tout simplement retourner voir ce que vous aviez saisi à l’étape précédente lors de votre déclaration d’impôts, par exemple, et de constater peu après que tout ce que vous aviez saisi avant ce remords était perdu ? Évitons ce genre de déception à nos utilisateurs.

---

## Solution recommandée

Générer une alerte JavaScript en cas de l’utilisation de la fonctionnalité « back » de l’historique du navigateur.

---

## Méthode de vérification

Amorcer la saisie d’un formulaire après la première étape du processus, puis activer le bouton « back » du navigateur.

---

## Vulgarisation

Cette règle s’applique tout particulièrement en l’absence de mécanisme explicite permettant à l’utilisateur de revenir à une étape précédente de la série de formulaires.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/lutilisateur-est-averti-de-la-perte-dinformation-en-cas-dutilisation-de-lhistorique-de-son-navigateur-dans-un-processus-complexe/
- **API** : `https://api.opquast.com/checklist/90/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
