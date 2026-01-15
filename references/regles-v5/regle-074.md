# Règle Opquast 74

> L'étiquette de chaque champ de formulaire qui le nécessite indique les limites de nombre de caractères.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 74 |
| **ID** | 54536 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'étiquette de chaque champ de formulaire qui le nécessite indique les limites de nombre de caractères.

### English
The label of each form field indicates the maximum number of characters allowed, where applicable.

### Español
La etiqueta de cada campo del formulario que lo requiera indica el máximo número de caracteres que puede introducirse.

---

## Objectifs

### Français
- Prévenir les erreurs d’envoi de formulaires. 
- Prévenir les pertes de données.
- Éviter l'agacement et l'incompréhension de l'utilisateur.

### English
- Preventing transmission errors forms.
- Preventing data loss.

### Español
-  Prevenir errores en el envío de formularios. 
- Evitar la pérdida de datos.  
- Evitar las molestias y los malentendidos de los usuarios. 

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

Vous est-il déjà arrivé de poster un message et d’avoir une erreur à l’envoi, ou pire de vous apercevoir après envoi que la moitié du texte que vous aviez écrit avait disparu ? Si c'est le cas, vous comprendrez aisément l’intérêt de cette bonne pratique qui consiste à préciser les limites en nombre de caractères.

---

## Solution recommandée

<p>Pour chaque champ faisant l'objet d'une limitation spécifique du nombre de caractères qui peuvent être saisis, indiquer le nombre de caractères maximum dans l'étiquette du champ, ou dans une mention explicitement associée à celle-ci dans le code HTML.</p>
<p>Au-delà de cette règle, il est important de veiller à ce que les restrictions de ce type à la saisie d'un champ de formulaire soient cohérentes avec son contenu.</p>

---

## Méthode de vérification

<p>Vérifier, pour chaque champ faisant l'objet d'une limitation spécifique du nombre de caractères qui peuvent être saisis, que le nombre de caractères autorisés est indiqué dans l'étiquette du champ, ou via une mention explicitement associée à celle-ci dans le code HTML.</p>

---

## Vulgarisation

Afin d'être accessible pour tous les utilisateurs, y compris ceux de lecteurs d'écran, l'indication du nombre maximum de caractères pouvant être saisis devra être explicitement associée au champ: soit dans son élément label ou son équivalent aria, soit via un attribut aria-describedby...

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/letiquette-de-chaque-champ-de-formulaire-qui-le-necessite-indique-les-limites-de-nombre-de-caracteres/
- **API** : `https://api.opquast.com/checklist/74/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
