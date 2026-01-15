# Règle Opquast 117

> Chaque image-lien est dotée d'une alternative textuelle appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 117 |
| **ID** | 54518 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque image-lien est dotée d'une alternative textuelle appropriée.

### English
Each image link has an appropriate text alternative.

### Español
Cada imagen con enlace tiene un texto alternativo apropiado

---

## Objectifs

### Français
- Permettre aux utilisateurs placés dans des contextes où les images ne sont pas perceptibles (navigateur texte, lecteur d’écran, navigateur avec images désactivées) de comprendre le sens des liens présents sur des images qu’ils ne peuvent voir. 
- Permettre aux robots d’exploiter l’information véhiculée par les images-liens (pour le référencement, l’indexation, la traduction automatique des alternatives d’images texte). 
- Permettre l’affichage d’un texte pertinent pendant le chargement des images.
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Allow users in environments where images are not seen (text browsers, screen readers or browsers with the images disabled) to understand the meaning of the links attached to images that they cannot see.
- Enable bots to exploit the information carried by the image links (to reference, index and perform machine translation on the image text alternatives).
- Enable the display of relevant text while images are loading.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Permitir a los usuarios situados en contextos donde las imágenes no son perceptibles (navegador de texto, lector de pantalla, navegador con imágenes deshabilitadas) entender el significado de los enlaces en las imágenes que no pueden ver. 
-  Permitir a los robots explotar la información transmitida por los enlaces de imágenes (para la referencia, la indexación, la traducción automática de alternativas de imagen-texto). 
-  Habilitar la visualización de texto relevante durante la carga de imágenes.
- Mejorar la accesibilidad del contenido para las personas con discapacidad. 
- Mejorar la consideración del contenido por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- SEO

### Thématiques
- Images et médias

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Aimeriez-vous naviguer sur un site dont les liens seraient libellés « 42.gif », « logo » ou « 148572156725.jpg » ? Non, n’est-ce pas ? Alors, évitons d’imposer non seulement cela aux utilisateurs de lecteurs d’écran, mais aussi à Google, qui va, du coup, trouver vos contenus bien peu pertinents et bien difficiles à référencer.

---

## Solution recommandée

<div>Les images-liens sont aisées à identifier (elles sont le seul contenu qui est placé entre des balises &lt;a&gt; et &lt;/a&gt;). Il faut toutefois penser aussi aux liens générés avec JavaScript sur d’autres éléments.</div><div>D’une manière générale, il faut :</div><div><ul><li>donner à chaque élément img concerné un attribut alt indiquant la cible ou le rôle du lien ;</li><li>donner à chaque élément area concerné un attribut alt indiquant la cible ou le rôle du lien ;</li><li>indiquer la cible ou le rôle du lien dans le contenu de chaque élément object concerné ;</li><li>indiquer la cible ou le rôle du lien dans le contenu de chaque élément canvas concerné.</li></ul></div>

---

## Méthode de vérification

<ul><li>Vérifier que l’attribut alt de chaque élément img concerné indique la cible ou le rôle du lien.</li><li>Vérifier que l’attribut alt de chaque élément area concerné indique la cible ou le rôle du lien.</li><li>Vérifier que le contenu de chaque élément object concerné indique la cible ou le rôle du lien.</li><li>Vérifier que le contenu de chaque élément canvas concerné indique la cible ou le rôle du lien.</li><li>Vérifier le libellé textuel de tout autre élément ayant le rôle d’un lien.</li></ul>

---

## Vulgarisation

L’alternative textuelle d’une image-lien doit privilégier l’identification de la cible ou du rôle du lien. Dans le cas d’un logo ou d’une icône, la description de l’image elle-même ou la précision de son type (par exemple, « logo de... ») n’apportera pas d’information pertinente. De même, une vignette représentant la couverture d’un document à télécharger n’aura pas besoin d’être décrite : le titre du document, le format et le poids du fichier seront suffisants. Dans certains autres cas, cependant, une image peut être à la fois donnée à voir pour elle-même et être un lien. La description devra alors synthétiser l’essentiel de l’information apportée par l’image, si celle-ci est absente par ailleurs dans la page.
Le cas des liens composites doit également être précisé ici : il s’agit des liens dont le contenu associe une image (souvent une icône) à un libellé textuel. L’alternative textuelle de l’image doit alors être déterminée en tenant compte de l’information donnée par le libellé : c’est l’association des deux qui doit permettre d’identifier la cible, le rôle et le comportement du lien.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee/
- **API** : `https://api.opquast.com/checklist/117/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
