# Règle Opquast 146

> L'utilisateur est averti des ouvertures de nouvelles fenêtres.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 146 |
| **ID** | 54440 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'utilisateur est averti des ouvertures de nouvelles fenêtres.

### English
The user is notified when new windows are to be opened.

### Español
Se notifica al usuario cuando se abren nuevas ventanas.

---

## Objectifs

### Français
- Permettre à l'utilisateur d'anticiper le résultat de l'activation d'un lien. 
- Éviter aux utilisateurs d'aides techniques d'être désorientés par l'ouverture d'une nouvelle fenêtre qui n'est pas toujours perceptible et perturbe notamment l'utilisation de l'historique de navigation.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow users to anticipate what will happen when a link is activated.
- Prevent users of technical aids from becoming disoriented when a new window opens, which Is not always perceptible and which disrupts the use of the  browsing history, in particular.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir al usuario anticipar el resultado de la activación de un enlace. 
-  Evitar la desorientación de los usuarios de ayudas técnicas abriendo una nueva ventana que no siempre es perceptible e interrumpe el uso del historial de navegación.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Liens

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Contrairement à une légende répandue, ouvrir une nouvelle fenêtre n’est pas une technique proscrite sur le plan de l’accessibilité. En revanche, si vous choisissez de le faire, il faut absolument prévenir les utilisateurs. Et c’est facile !

---

## Solution recommandée

<p>Ajouter une mention du type «&nbsp;(nouvelle fenêtre)&nbsp;», soit directement dans le libellé du lien, soit dans son attribut <code>title</code> qui doit alors reprendre et compléter le libellé.</p><p>Ajouter une mention du type «&nbsp;(nouvelle fenêtre)&nbsp;» dans les étiquettes de contrôle de formulaire, dans les libellés de boutons ou dans tout autre objet provoquant l'ouverture d'une nouvelle fenêtre.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans les pages inspectées&nbsp;:</p><ul>
<li>Identifier les liens et autres contrôles d'ouverture d'une nouvelle fenêtre, c'est-à-dire&nbsp;: </li>
<ul><li>Les usages de l'attribut <code>target</code> dans la source générée HTML ; </li><li>Les usages de la fonctionnalité <code>window.open</code> via une recherche dans les fichiers Javascript et dans la source HTML ; </li></ul><li>Vérifier, pour chacun de ces liens, quelle que soit la technologie utilisée, la présence d'un avertissement explicite consultable avant toute action sur celui-ci.</li></ul>

---

## Vulgarisation

Le recours à l’ouverture d’une nouvelle fenêtre du navigateur n’est pas en soi un défaut de qualité, dès lors que celle-ci peut être anticipée par l’utilisateur. Par exemple, certaines politiques ergonomiques retiennent l’ouverture systématique des liens externes dans une nouvelle fenêtre. À cet égard, c’est la cohérence du comportement des différents liens dans le site qui sera un gage de qualité. La technique utilisée (notamment le choix entre l’attribut target _blank et JavaScript) est indifférente.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres/
- **API** : `https://api.opquast.com/checklist/146/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
