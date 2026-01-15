# Règle Opquast 76

> Les caractères saisis dans un champ de mot de passe peuvent être affichés en clair.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 76 |
| **ID** | 54528 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les caractères saisis dans un champ de mot de passe peuvent être affichés en clair.

### English
The characters entered in a password field can be displayed in an un-encrypted text.

### Español
Los caracteres introducidos en el campo de contraseña pueden mostrarse de forma visible

---

## Objectifs

### Français
- Faciliter la saisie des mots de passe, notamment sur les claviers virtuels des terminaux mobiles, ainsi qu'avec un lecteur d'écran. 
- Prévenir les erreurs.

### English
- Simplify password entry, especially on mobile devices’ virtual keyboards.
- Prevent mistakes.

### Español
- Facilitar la entrada de contraseñas, especialmente en los teclados virtuales de los terminales móviles. 
-  Prevenir los errores.

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

Lorsque vous saisissez vos mots de passe, vous avez l’habitude de le faire dans des champs dédiés, où chaque caractère saisi est remplacé par un point ou une étoile. C’est bien, car cela évite la consultation au-dessus de votre épaule. Mais très souvent, notamment pour les mots de passe longs ou dans des contextes mobiles, cela peut être gênant. Dès lors, pourquoi ne pas donner la possibilité aux utilisateurs d’afficher leur mot de passe à leur demande, lorsqu’ils en ont besoin et qu’ils jugent que cela ne présente pas de risque en matière de confidentialité ?

---

## Solution recommandée

<div>Afficher un bouton associé à un script qui bascule la valeur de l’attribut type du champ de saisie entre les valeurs <code>password</code> et <code>text</code>.</div>

---

## Méthode de vérification

<div>Contrôler manuellement la possibilité d’afficher le mot de passe en clair via un dispositif inclus dans la page.</div>

---

## Vulgarisation

L’applicabilité de cette règle doit être évalué dans des contextes où des impératifs spécifiques de sécurité s’imposent.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-caracteres-saisis-dans-un-champ-de-mot-de-passe-peuvent-etre-affiches-en-clair/
- **API** : `https://api.opquast.com/checklist/76/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
