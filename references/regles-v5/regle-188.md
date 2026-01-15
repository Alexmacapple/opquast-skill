# Règle Opquast 188

> Les contenus générés via les styles sont dotés d'une alternative appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 188 |
| **ID** | 54170 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les contenus générés via les styles sont dotés d'une alternative appropriée.

### English
Content generated via styles is provided with a suitable alternative.

### Español
Existe una alternativa adecuada al contenido generado mediante las hojas de estilo

---

## Objectifs

### Français
- Permettre aux utilisateurs placés dans des contextes où les styles ne sont pas restitués (navigateur texte, lecteur d'écran, navigateur avec styles désactivés) d’accéder à l’information présente sous forme de contenus générés en CSS (images d’arrière-plan notamment). 
- Permettre aux robots d'exploiter l'information véhiculée par les styles CSS (référencement, indexation, traduction automatique des alternatives).
- Améliorer l’accessibilité des contenus aux personnes handicapées.
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Ensure access to the content, regardless of whether or not the CSS formatting layer is handled. 
- Allow content to be reused on media and platforms that do not handle formatting for on-screen display. 
- Give users in environments where styles are
- not reproduced (text browsers, screen readers or browsers with the images disabled) access to information that takes the form of CSS-generated content (particularly background images).
- Enable bots to exploit the information carried by CSS styles (to reference, index and perform machine translation on the alternatives).
- Improve the way content is taken into account by search engines and indexing tools.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios acceder a la información en forma de contenido generado por CSS (imágenes de fondo en particular) en contextos en los que no se muestran los estilos (navegador de texto, lector de pantalla, navegador con estilos desactivados)
- Permitir a los robots explotar la información transmitida por los estilos CSS (referencia, indexación, traducción automática de alternativas).
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Certaines instructions CSS permettent d’afficher des textes et des images qui sont de fait invisibles pour les utilisateurs et les outils qui ne prennent pas en charge les feuilles de styles. Par exemple, en cas de désactivation des couleurs ou des styles CSS, une image CSS (propriété background-image) ne sera pas visible alors qu’une image HTML (élément <img>) l’aurait été.

---

## Solution recommandée

<p>Fournir un contenu masqué à l’affichage via CSS :</p><ul><li>pour chaque information portée par les propriétés CSS background-image ou content ;</li><li>pour chaque information affichée via un pseudo-élément CSS :before ou :after ;</li><li>et plus généralement, pour chaque information absente par ailleurs de la page et dont la restitution dépend du support des styles. </li></ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/CSS/background-image"><code>background-image</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/content"><code>content</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/::before"><code>before</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/::after"><code>after</code> sur MDN</a></p>

---

## Méthode de vérification

<div>Examiner directement le code CSS et comparer visuellement l’affichage normal de la page avec son rendu après désactivation des images d’arrière-plan. Pour chaque page :</div><div><ul><li>Afficher les feuilles de styles grâce à une barre d’outils dédiée et vérifier que les propriétés et éléments cités dans le paragraphe « Solution technique » sont absents des CSS ou ne sont pas utilisés pour produire une information par ailleurs absente du code HTML.</li><li>Désactiver les images d’arrière-plan CSS avec une barre d’outils dédiée.</li><li>Contrôler l’absence de perte d’information, en comparant l’affichage avec et sans images d’arrière-plan.</li></ul></div>

---

## Vulgarisation

Le recours aux images d’arrière-plan CSS pour générer un pseudo-contenu dans un élément HTML vide peut sembler une solution à première vue intéressante. Elle permet de produire notamment un code HTML générique pour des boutons, qui sera aisément personnalisable via la seule feuille de styles. Cependant, ce détournement du rôle de la couche de mise en forme ne permet pas de réaliser une intégration robuste et accessible. Il est donc indispensable de prévoir au moins une alternative dans le contenu HTML.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-contenus-generes-via-les-styles-sont-dotes-dune-alternative-appropriee/
- **API** : `https://api.opquast.com/checklist/188/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
