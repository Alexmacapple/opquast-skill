# Règle Opquast 70

> Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 70 |
| **ID** | 54095 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source.

### English
Information supplementing a field’s label is associated with that field in the source code.

### Español
La información que completa la etiqueta de un campo está asociada al campo en el código fuente.

---

## Objectifs

### Français
- Optimiser le rendu dans les lecteurs d’écran en permettant d’expliciter les étiquettes des champs de formulaire.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Optimize the rendering on screen readers, by making it possible to spell out the form’s field labels.
- Improve the accessibility of content for people with disabilities.

### Español
- Optimizar la representación en los lectores de pantalla permitiendo aclarar las etiquetas de los campos de formulario.
- Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Les formulaires sont particulièrement importants pour les personnes handicapées, car ils sont souvent associés à des services à très haute valeur ajoutée : demande de service, achat en ligne, démarche administrative, etc. C’est la raison pour laquelle il est essentiel de veiller au fonctionnement de vos formulaires dans des lecteurs d’écran, utilisés par les non-voyants. Cette bonne pratique va contribuer au fait qu’ils deviennent utilisables dans ce contexte. Par la suite, son suivi lors des évolutions du site est essentiel.

---

## Solution recommandée

<div>Associer explicitement dans le code source chaque information venant compléter une étiquette de champ de formulaire, ou venant informer l’utilisateur en cas d’erreur de saisie :</div><div><ul><li>soit à l’aide d’un regroupement de champ fieldset et de l’élément legend ;</li><li>soit à l’aide de l'attribut <code> aria-describedby </code>.</li></ul></div>

---

## Méthode de vérification

<div>Vérifier dans le code source que chaque information venant compléter une étiquette de champ de formulaire, ou venant informer l’utilisateur en cas d’erreur de saisie :</div><div><ul><li>est associée au champ en étant balisée par un élément legend inclus dans un élément fieldset regroupant les champs concernés ;</li><li>ou est associée au champ via un attribut <code> aria-describedby</code>.</li></ul></div>

---

## Vulgarisation

Cette règle s’applique à une large diversité de cas, mais parmi lesquels on peut retenir en particulier :
•les informations d’aide à la saisie affichées souvent à la suite du champ, hors de l’étiquette proprement dite (indication du format attendu, par exemple) ;
•les liens ou icônes donnant accès à une aide à la saisie, associés visuellement à un champ ;
•les signalements d’erreurs de saisie ou d’absence de saisie dans un champ obligatoire.
Si l’association logique entre le champ et ces informations est uniquement visuelle, elle risque de ne pas être perçue lorsque le formulaire n’est pas affiché comme prévu, ou lorsque l’utilisateur y a accès via un lecteur d’écran.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source/
- **API** : `https://api.opquast.com/checklist/70/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
