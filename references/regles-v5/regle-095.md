# Règle Opquast 95

> Les champs de saisie de type mail, URL, téléphone, nombre, recherche, mots de passe, heure et date sont dotés du type approprié.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 95 |
| **ID** | 54414 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les champs de saisie de type mail, URL, téléphone, nombre, recherche, mots de passe, heure et date sont dotés du type approprié.

### English
Email, URL, telephone number, search, password, and date and time input fields are assigned an appropriate input type.

### Español
Los campos de entrada de tipo correo electrónico, URL, teléfono, número, búsqueda, contraseñas, hora y fecha tienen el formato apropiado.

---

## Objectifs

### Français
- Permettre l’utilisation des claviers virtuels adaptés aux différents types de saisie sur les terminaux mobiles.
- Faciliter la validation de la saisie.
- Améliorer la compatibilité avec les terminaux mobiles.

### English
- Allow the use of virtual keyboards adapted to the different input modes on mobile devices.
- Facilitate submission of the input data.
- Improve compatibility with mobile terminals.

### Español
- Permitir el uso de teclados virtuales adaptados a los diferentes tipos de entrada en los terminales móviles.
-  Facilitar la validación de la entrada.
-  Mejorar la compatibilidad con los terminales móviles.

---

## Métadonnées

### Tags
- Accessibilité
- Mobile

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Dans les formulaires, il est possible de préciser quels sont les types de données attendues. Cela a de nombreux avantages. Cela permet aux systèmes d’exploitation mobile d’afficher des claviers adaptés ou de vérifier que les données respectent une forme ou une syntaxe. Bref, c’est souvent très intéressant.

---

## Solution recommandée

<div>Doter chaque élément input concerné d’un attribut type correspondant à la saisie attendue : <code>email</code>, <code>url</code>, <code>tel</code>, <code>number</code>, <code>search</code>, <code>password</code>, <code>date</code>, <code>time</code>.</div>

---

## Méthode de vérification

<div>Vérifier, pour chaque élément input concerné, la présence de l’attribut type doté de la valeur correspondant au type de saisie attendue : <code>email</code>, <code>url</code>, <code>tel</code>, <code>number</code>, <code>search</code>, <code>password</code>, <code>date</code>, <code>time</code>.</div>

---

## Vulgarisation

Le bénéfice le plus immédiat, pour l’utilisateur de périphériques mobiles, sera de voir s’afficher immédiatement le clavier virtuel adapté à la saisie demandée : clavier numérique pour une saisie de nombres ou de numéros de téléphone, touche @ (arobase) pour la saisie d’une adresse électronique, etc.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-champs-de-saisie-de-type-mail-url-telephone-nombre-recherche-mots-de-passe-heure-et-date-sont-dotes-du-type-approprie/
- **API** : `https://api.opquast.com/checklist/95/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
