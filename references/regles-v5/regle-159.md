# Règle Opquast 159

> Les icônes de navigation sont accompagnées d'une légende explicite.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 159 |
| **ID** | 54442 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les icônes de navigation sont accompagnées d'une légende explicite.

### English
Navigation icons are provided with an explicit legend.

### Español
Los iconos de navegación están acompañados de una leyenda explícita.

---

## Objectifs

### Français
- Limiter le temps d'apprentissage de l'interface. 
- Faciliter la compréhension des icônes. 
- Limiter le risque d'erreurs.

### English
- Reduce the time it takes to learn to use the interface.
- Facilitate your users’ understanding of the icons.
- Reduce the risk of error.
- Improve the accessibility of content for people with disabilities.

### Español
- Limitar el tiempo de aprendizaje de la interfaz. 
- Facilitar la comprensión de los iconos.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Conception

---

## Explication pédagogique

Très peu de sites peuvent se permettre de fournir une navigation exclusivement à partir d’icônes. Dans la plupart des cas, même si la signification d’une icône vous semble évidente, elle ne le sera pas forcément pour vos utilisateurs. Soyez prudent : doublez l’image avec du texte.

---

## Solution recommandée

<p>La nature de la cible de chaque icône-lien lorsqu'elle n'est pas accompagnée d'un contenu textuel est précisée par l'attribut <code>alt</code> de l'image et par l'attribut <code>title</code> ou <code>aria-label</code> du lien.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/Img"><code>img</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Vérifier que chaque icône de navigation ou d'action sans contenu textuel associé est dotée&nbsp;:</p><ul>
<li>D'un attribut <code>alt</code> pertinent pour l'élément <code>img</code> ;</li>
<li>D'un attribut <code>title</code> ou <code>aria-label</code> pertinent pour l'élément <code>a</code>, <code>button</code> ou <code>input</code> ;</li>
</ul>

---

## Vulgarisation

Cette règle ne dispense pas de recourir autant que possible à des icônes courantes pour certaines fonctionnalités (courriel, impression, retour à l’accueil).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-icones-de-navigation-sont-accompagnees-dune-legende-explicite/
- **API** : `https://api.opquast.com/checklist/159/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
