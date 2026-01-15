# Règle Opquast 191

> Les styles ne justifient pas le texte.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 191 |
| **ID** | 54535 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les styles ne justifient pas le texte.

### English
Styles do not justify the text.

### Español
Las hojas de estilo no justifican el texto

---

## Objectifs

### Français
- Faciliter la lecture à l’écran, notamment pour les personnes dyslexiques.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Simplify reading on the screen, especially for people with dyslexia.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Facilitar la lectura de la pantalla, especialmente para las personas disléxicas.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Présentation

### Phases projet
- Conception
- Développement
- Editorial

---

## Explication pédagogique

La justification de texte, c’est souvent très joli, notamment sur support papier. Malheureusement, sur le web, plusieurs études ont montré qu’elle rend la lecture plus difficile pour de nombreux publics, tels que les dyslexiques. Pensez à eux, ne justifiez pas vos textes.

---

## Solution recommandée

<div>Ne pas utiliser la propriété CSS text-align avec la valeur justify, ou tout autre équivalent.</div>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/CSS/text-align"><code>text-align</code> sur MDN</a></p>

---

## Méthode de vérification

<div>Vérifier dans le code CSS l’absence de règles text-align : justify.</div><div>Vérifier dans le code HTML l’absence d’attributs HTML align="justify".</div>

---

## Vulgarisation

Un texte justifié fait perdre à l’oeil du lecteur les points de repère fournis par les irrégularités des fins de ligne. Ceci s’avère particulièrement pénalisant pour des personnes dyslexiques.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-styles-ne-justifient-pas-le-texte/
- **API** : `https://api.opquast.com/checklist/191/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
