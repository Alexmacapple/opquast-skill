# Règle Opquast 92

> Le copier coller est possible dans les champs de formulaire.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 92 |
| **ID** | 54476 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le copier coller est possible dans les champs de formulaire.

### English
Copy-and-paste is possible in the form’s fields.

### Español
Es posible copiar y pegar en los campos del formulario.

---

## Objectifs

### Français
- Faciliter la saisie dans les formulaires.

### English
- Simplify form completion.

### Español
- Facilitar la entrada de datos en los formularios.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Saisissez votre adresse e-mail. C’est bon, c’est fait ? Et si maintenant je vous demande de la saisir de nouveau, vous allez peut-être avoir la flemme de le faire et voudrez la copier depuis le premier champ pour la coller dans le deuxième. De quel droit certains sites voudraient-ils vous empêcher de faire cela ? Vive le copier-coller libre !

---

## Solution recommandée

<ul><li>Ne pas intercepter les événements JavaScript <code>onpaste</code> ou <code>keydown</code> pour bloquer le coller dans un champ de formulaire.</li><li>Ne pas intercepter les événements JavaScript <code>oncopy</code> ou<code> oncut</code> pour bloquer le copier dans un champ de formulaire.</li></ul>

---

## Méthode de vérification

<div>Vérifier qu’il est possible de copier le contenu de chaque champ y compris les champs de type <code>password</code> (en utilisant le menu contextuel du navigateur ou à défaut un mécanisme propre au formulaire).</div><div>Vérifier qu’il est possible de coller un contenu dans chaque champ y compris dans les champs de type <code>password</code> (en utilisant le menu contextuel du navigateur ou à défaut un mécanisme propre au formulaire).</div>

---

## Vulgarisation

L’application de cette règle doit être évaluée selon le contexte pour tenir compte d’éventuelles contraintes de sécurité spécifiques.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-copier-coller-est-possible-dans-les-champs-de-formulaire/
- **API** : `https://api.opquast.com/checklist/92/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
