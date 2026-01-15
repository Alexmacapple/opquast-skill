# Règle Opquast 91

> La navigation dans un processus complexe ne provoque pas la perte des données précédemment soumises.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 91 |
| **ID** | 54269 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La navigation dans un processus complexe ne provoque pas la perte des données précédemment soumises.

### English
Navigating through a complex process does not cause any previously-submitted data to be lost.

### Español
La navegación en un proceso complejo no provoca la pérdida de los datos introducidos anteriormente.

---

## Objectifs

### Français
- Faciliter la saisie et sa correction dans les formulaires répartis par étapes. 
- Limiter les risques d’abandon en cours de procédure.

### English
- Simplify input and corrections in forms divided into multiple steps.
- Limit the risk of abandoning the procedure.

### Español
- Facilitar la entrada y corrección de datos en formas distribuidas en etapas. 
- Limitar los riesgos de abandono durante el procedimiento.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Il est certes extrêmement confortable pour l’utilisateur de pouvoir naviguer dans les différentes étapes d’un processus complexe. Il est évidemment essentiel de l’avertir lorsque des données peuvent être perdues. C’est d’ailleurs l’objet d’une autre des règles assurance qualité web. Il est encore plus utile de s’assurer que l’ensemble des données saisies par l’utilisateur sont enregistrées à tout moment.

---

## Solution recommandée

Prévoir, au niveau de la gestion de la navigation dans les étapes du processus, l’enregistrement des données saisies à chaque étape, de manière à pouvoir afficher à nouveau celle-ci sans perte de données après que l’utilisateur a utilisé le mécanisme de navigation dans les étapes.

---

## Méthode de vérification

Utiliser le mécanisme de navigation dans les étapes précédentes de la saisie et vérifier manuellement que les données saisies à chaque étape sont conservées et affichées à nouveau par la suite.

---

## Vulgarisation

Aussi bien organisée que soit la saisie dans un formulaire complexe par étapes, il est impossible de garantir que l’utilisateur n’aura pas besoin de revenir vérifier ou modifier celle-ci en cours de processus. Le contraindre dans ce cas à recommencer une ou plusieurs étapes de saisie est très décevant.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-navigation-dans-un-processus-complexe-ne-provoque-pas-la-perte-des-donnees-precedemment-soumises/
- **API** : `https://api.opquast.com/checklist/91/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
