# Règle Opquast 183

> Le contenu et le sens de chaque page ne sont pas altérés lorsque les styles sont désactivés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 183 |
| **ID** | 54059 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le contenu et le sens de chaque page ne sont pas altérés lorsque les styles sont désactivés.

### English
The content and meaning of each page are not altered when styles are disabled.

### Español
El contenido y el significado de cada página no se ve modificado cuando se desactivan los estilos.

---

## Objectifs

### Français
- Permettre la compréhension des contenus par les utilisateurs dont le navigateur n'appliquera pas les feuilles de styles du site ou dont le mode d'accès n'est pas visuel.
- Séparer rigoureusement les contenus de la présentation pour améliorer leur interopérabilité.
- Favoriser le référencement du contenu.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow users whose browsers don’t apply the website’s style sheets or whose method of access is not visible to understand the site’s content.
- Meticulously separate the content from its presentation, to foster interoperability.
- Improve the way content is taken into account by search engines and indexing tools.
- Improve the accessibility of content for people with disabilities.

### Español
-  Permitir la comprensión del contenido a los usuarios cuyo navegador no aplica las hojas de estilo del sitio o cuyo modo de acceso no es visual.
- Separar estrictamente el contenido de la presentación para mejorar la interoperabilidad.
- Habilitar la referenciación del contenido./li>
- Mejorar la accesibilidad de los contenidos para las personas discapacitadas.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Les styles constituent une couche de présentation. Les contenus doivent rester lisibles et compréhensibles lorsque cette couche ne peut pas se voir ou s’afficher.

---

## Solution recommandée

<p>Dans l’usage de CSS (y compris via JavaScript), veiller à conserver la cohérence des contenus pour les présenter dans le même ordre avec ou sans mise en forme CSS. On évitera ainsi de se retrouver, par exemple, avec un menu coupé en deux si les feuilles de styles sont désactivées.</p>

---

## Méthode de vérification

<p>Comparer visuellement les pages avec et sans application des styles CSS. L’opération nécessite de recourir, pour chaque page, à l’ensemble de ces méthodes :</p><ul><li>Désactiver les styles CSS dans le navigateur ;</li><li>Vérifier l’absence de perte d’informations dont la cause peut alors être confirmée en examinant les styles appliqués à l’élément concerné à l’aide d’un inspecteur de code.</li><li>Vérifier que les contenus restent lisibles, par exemple dans le cas d’une image HTML transparente dont la lisibilité dépendra de la couleur d’arrière-plan appliquée avec la propriété background-color.</li><li>Vérifier la cohérence du contenu affiché sans CSS, qui doit rester logiquement organisé et parfaitement compréhensible. Par exemple, un organigramme constitué de différents blocs de texte mis en forme via des propriétés CSS de positionnement pourra apparaitre comme une succession de blocs de texte dénuée de sens en l’absence de CSS.</li></ul>

---

## Vulgarisation

Les techniques CSS permettent de réaliser la mise en page à partir d’un ordre arbitraire des contenus du code source HTML, notamment à l’aide des propriétés de placement. Ceci peut aboutir à la création d’un sens purement visuel indépendamment de la source, par exemple, dans la mise en page d’un formulaire, en plaçant à l’écran les champs et leurs étiquettes sans qu’ils soient effectivement associés dans le code HTML. Pour garantir que le sens du contenu sera perceptible dans tous les contextes utilisateurs, il est indispensable qu’il soit porté par la source HTML seule, indépendamment de la mise en forme CSS.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-contenu-et-le-sens-de-chaque-page-ne-sont-pas-alteres-lorsque-les-styles-sont-desactives/
- **API** : `https://api.opquast.com/checklist/183/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
