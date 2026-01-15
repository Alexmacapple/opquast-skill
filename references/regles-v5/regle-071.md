# Règle Opquast 71

> L'étiquette de chaque champ de formulaire indique si la saisie est obligatoire.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 71 |
| **ID** | 54488 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'étiquette de chaque champ de formulaire indique si la saisie est obligatoire.

### English
Each form field’s label indicates whether or not it is a required field.

### Español
La etiqueta de cada campo del formulario indica si la entrada es obligatoria.

---

## Objectifs

### Français
- Permettre aux utilisateurs de savoir à l'avance si un champ est obligatoire. 
- Prévenir les erreurs avant qu'elles ne surviennent.
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données. 
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Tell users in advance whether or not a field is required.
- Prevent mistakes before they are made.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios saber de antemano si un campo es obligatorio. 
-  Prevenir los errores antes de que ocurran.
-  Construir la confianza del usuario en el uso de sus datos. 
- Mejorar la accesibilidad del contenido para las personas con discapacidad

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

Mieux vaut éviter à l’utilisateur de commettre une erreur parce qu’on ne lui a pas donné suffisamment d’informations dès le départ.

---

## Solution recommandée

<p>Indiquer le caractère obligatoire de la saisie dans l'étiquette associée au champ. Si l'indication est faite avec un symbole graphique (astérisque par exemple), faire précéder le formulaire d'une légende explicitant ce symbole.</p>

---

## Méthode de vérification

<p>Pour chaque formulaire :</p><p></p><ul><li>Vérifier que l’étiquette associée à chaque champ en indique le caractère obligatoire, si besoin en contrôlant, avec un inspecteur de code, que l’information est bien présente dans l’élément <code>label</code>,  dans un attribut <code>aria-label,</code> ou bien qu’elle est reliée au champ via un attribut <code>aria-labelledby</code> ou <code>aria-describedby</code>.</li><li>Vérifier que les champs dont l’étiquette ne donne aucune information sur leur caractère obligatoire sont bien facultatifs, en validant le formulaire sans les remplir. Si un message d’erreur indique qu’ils doivent être remplis ou si le formulaire ne peut être validé ainsi, la bonne pratique est invalidée.</li></ul><p></p>

---

## Vulgarisation

Le point clé est de faire figurer l’information dans l’étiquette effectivement associée au champ concerné. La signalétique de l’astérisque est courante pour indiquer le caractère obligatoire d’un champ, mais elle mérite toujours d’être explicitée en début de formulaire.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire/
- **API** : `https://api.opquast.com/checklist/71/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
