# Règle Opquast 130

> Le code source de chaque page indique la langue principale du contenu.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 130 |
| **ID** | 54438 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le code source de chaque page indique la langue principale du contenu.

### English
Each page’s source code indicates the content’s main language.

### Español
El código fuente de cada página indica el idioma principal del contenido.

---

## Objectifs

### Français
- Favoriser l’indexation des contenus selon leur langue. 
- Faciliter la traduction automatique. 
- Permettre une lecture correcte du contenu par un outil de synthèse vocale.
- Améliorer l’accessibilité des contenus aux personnes handicapées.
-  Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Cultivate content indexing by language.
- Facilitate machine translation.
- Enable correct reading of the content by a synthesized speech tool.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Promover la indexación de los contenidos de acuerdo a su idioma. 
- Facilitar la traducción automática. 
-  Permitir la lectura correcta del contenido por una herramienta de texto a voz.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.
-  Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Internationalisation

### Phases projet
- Développement

---

## Explication pédagogique

Une page web est rédigée dans une langue qui n’est pas forcément identifiable par les outils qui analysent les pages. Cette information doit être fournie à tous les outils automatiques dans le code source de celles-ci.

---

## Solution recommandée

<p>Renseigner l'attribut <code>lang</code> de l'élément racine <code>html</code> à l'aide du code langue approprié (tel qu'indiqué par le registre tenu par l'IANA : <a href="http://www.iana.org/assignments/language-subtag-registry">http://www.iana.org/assignments/language-subtag-registry</a>). En pratique, pour le français, cela donne : &lt;html lang="fr"&gt; (en HTML) et &lt;html lang="fr" xml:lang="fr"&gt; (en XHTML).</p><p>À défaut, dans des cas plus complexes, la langue du contenu peut être indiquée via les différents éléments parents : <code>head</code>, <code>body</code>, <code>title</code>, etc.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Attributs_universels/lang"><code>lang</code> sur MDN</a></p>

---

## Méthode de vérification

<p>La vérification consiste à contrôler la présence et la pertinence de l'attribut lang de l'élément <code>html</code> (ou à défaut de ses éléments descendants) dans le code source de chaque page&nbsp;:</p><ul>
<li>Vérifier que la langue par défaut du contenu est indiquée via l'attribut <code>lang</code> de l'élément <code>html</code>, par exemple &lt;html lang="fr"&gt; (en HTML)</li>
					<li>À défaut, vérifier qu'elle est au moins héritée, pour chaque élément de contenu, d'un élément parent (<code>head</code>, <code>body</code>, <code>title</code>, etc.) via son attribut <code>lang</code>. </li>
				</ul><p>Vérifier la validité et la pertinence du code de langue utilisé. Pour cela, recourir par exemple au Language Subtag Lookup Tool de Richard Ishida,&nbsp;<a href="https://r12a.github.io/app-subtags/">https://r12a.github.io/app-subtags/</a>. </p><p>Parmi les cas courants de codes de langue erronés, citons <code>jp</code> au lieu de <code>ja</code> pour le japonais, <code>lu</code> au lieu de <code>lb</code> pour le luxembourgeois, <code>gr</code> au lieu de <code>el</code> pour le grec, <code>lat</code> au lieu de <code>la</code> pour le latin et <code>oci</code> au lieu de <code>oc</code> pour l'occitan. Par ailleurs, les codes <code>mul</code> pour «&nbsp;langues multiples&nbsp;» et <code>und</code> pour «&nbsp;langue indéterminée&nbsp;» ne doivent pas être utilisés dans un contenu web. Enfin, l'attribut <code>xml:lang </code>peut être également renseigné en complément de l'attribut <code>lang</code>, mais il n'est pas suffisant pour rendre conforme cette bonne pratique.</p>

---

## Vulgarisation

L’indication de la langue de traitement (attribut HTML lang) ne doit pas être confondue avec l’indication de la langue ou des langues du public cible, également appelée langue principale du contenu (en-tête HTTP content-language).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu/
- **API** : `https://api.opquast.com/checklist/130/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
