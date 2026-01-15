# Règle Opquast 235

> Les éléments visuellement présentés sous forme de liste sont balisés de façon appropriée dans le code source.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 235 |
| **ID** | 53935 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les éléments visuellement présentés sous forme de liste sont balisés de façon appropriée dans le code source.

### English
Elements that are visually displayed as lists are tagged in an appropriate way in the source code.

### Español
Los contenidos presentados en forma de lista están debidamente etiquetados en el código fuente.

---

## Objectifs

### Français
- Permettre l’identification des listes par les navigateurs et les aides techniques et donc leur restitution appropriée afin de faciliter leur compréhension par les utilisateurs.
- Améliorer la sémantique du contenu des pages et sa réutilisabilité.

### English
- Enable browsers and technical aids to identify lists and then reproduce them accurately, in order to facilitate their understanding by users.
- Improve the semantics of page content and its reusability.
- Improve the accessibility of content for people with disabilities.

### Español
-  Permitir la identificación de las listas por los navegadores y las ayudas técnicas y, por tanto, su adecuada restitución para facilitar su comprensión por parte de los usuarios.
-  Mejorar la semántica del contenido de las páginas y su reutilización.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Structure et code

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Pour un producteur de contenu, ajouter des tirets, des « * » ou des puces sous forme d’images est fort tentant. Oui, mais la magie des éléments HTML et la compétence des navigateurs vous permettent déjà de faire des listes propres. Il suffit de le savoir.

---

## Solution recommandée

<p>Soit utiliser les éléments HTML appropriés :</p><ul><li><code>ul, li</code> pour les listes non ordonnées ;</li><li><code>ol, li</code>pour les listes ordonnées ;</li><li><code>dl, dt, dd</code> pour les listes de définitions ou de descriptions.</li></ul><p>Soit recourir aux attributs ARIA permettant de donner la sémantique d’une liste non ordonnée ou ordonnée à un contenu balisé de manière plus générique :</p><ul><li>donner au conteneur de la liste un attribut <code>role="list"</code> ;</li><li>donner à chaque élément de la liste un attribut <code>role="listitem"</code> ;</li><li>(il n’existe pas d’équivalent aux listes de définitions via un rôle ARIA).&nbsp;</li></ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/ul"><code>ul</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/ol"><code>ol</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/dl"><code>dl</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque page contenant une liste :</p><ul><li>Contrôler le code source des contenus présentés sous forme de liste (caractérisés par la présence de retours à la ligne et de marqueurs de listes tels que des puces ou des numéros) à l’aide d’un inspecteur de code.</li><li>Vérifier si le code source de ces listes apparentes comporte bien les éléments HTML correspondant au type de liste concerné :<code> ul, li</code> pour une liste non ordonnée (liste à puces), <code>ol, li</code> pour une liste ordonnée (liste numérotée) et <code>dl, dt, dd</code>npour une liste de définitions ou, à défaut, les rôles ARIA <code>list</code> et <code>listitem</code>.</li></ul>

---

## Vulgarisation

Concernant les listes ordonnées et non ordonnées, l’évaluation de cette règle ne prend généralement en compte que les contenus explicitement affichés sous forme de listes, c’est-à-dire avec des marqueurs (puces ou numéros) et des retours à la ligne entre chaque item. Ceci évite des questions subjectives sur la nécessité de baliser sous forme de liste ce qui apparaît comme une simple énumération horizontale.
Concernant les listes de définitions, leur emploi doit se limiter aux cas où il s’agit effectivement d’associer une entrée à une description ou à une définition (elles sont par exemple totalement exclues pour le balisage de menus déroulants ou de formulaires et leur utilisation est discutable dans le cas de galeries d’images).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-elements-visuellement-presentes-sous-forme-de-liste-sont-balises-de-facon-appropriee-dans-le-code-source/
- **API** : `https://api.opquast.com/checklist/235/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
