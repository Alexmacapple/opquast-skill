# Règle Opquast 85

> La soumission d'un formulaire est suivie d'un message indiquant la réussite ou non de l'action souhaitée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 85 |
| **ID** | 54061 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La soumission d'un formulaire est suivie d'un message indiquant la réussite ou non de l'action souhaitée.

### English
Form submission is followed by a message indicating whether or not the action was successful.

### Español
El envio de un formulario va seguido de un mensaje que indica el éxito o el fracaso de la acción deseada.

---

## Objectifs

### Français
- Fournir à l'utilisateur un retour immédiat et explicite sur l'action qu'il vient d'effectuer. 
- Éviter la frustration ultérieure d'un utilisateur qui pense, sur le moment, que le processus s'est déroulé avec succès alors qu'il y a eu un problème.

### English
- Give the user immediate, explicit feedback on the action they just performed.
- Prevent user frustration when they think the process was a success, but there was, in fact, a problem.

### Español
- Dar información al usuario sobre la acción que acaba de realizar. 

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Il arrive fréquemment qu’un internaute soit directement renvoyé vers la page d’accueil d’un site après l’envoi d’un formulaire. Dans ce cas, il peut subsister un doute sur la réussite de l’envoi du formulaire. Un simple message permet de le lever.

---

## Solution recommandée

<p>Retourner une page de confirmation explicite après soumission d'un formulaire.</p>

---

## Méthode de vérification

<p>Pour chaque formulaire</p>
<ul><li>Soumettre complètement le formulaire ;</li>
<li>Vérifier que la soumission finale du formulaire donne lieu à l'affichage d'une page de confirmation indiquant explicitement la réussite ou l'échec de l'opération concernée. </li></ul>

---

## Vulgarisation

La nature du résultat (échec, réussite) doit être précisée à la fois dans le titre de page et dans son contenu. En cas d’échec, la page gagne à indiquer les raisons du rejet et si possible les éléments d’informations nécessaires à la correction d’éventuelles erreurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-soumission-dun-formulaire-est-suivie-dun-message-indiquant-la-reussite-ou-non-de-laction-souhaitee/
- **API** : `https://api.opquast.com/checklist/85/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
