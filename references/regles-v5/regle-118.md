# Règle Opquast 118

> Chaque image porteuse d'information est dotée d'une alternative textuelle appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 118 |
| **ID** | 54494 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque image porteuse d'information est dotée d'une alternative textuelle appropriée.

### English
Each information-carrying image has an appropriate text alternative.

### Español
Cada imagen que contiene información tiene un texto alternativo apropiado

---

## Objectifs

### Français
- Permettre aux utilisateurs placés dans des contextes où les images ne sont pas perceptibles (navigateur texte, lecteur d'écran, navigateur avec images désactivées) de comprendre le sens des images qu'ils ne peuvent voir. 
- Permettre aux robots d'exploiter l'information véhiculée par les images (référencement, indexation, traduction automatique des alternatives d’images texte).
- Permettre l'affichage d'un texte pendant le chargement des images.
- Améliorer l’accessibilité des contenus aux personnes handicapées.
-  Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Allow users in environments where images are not seen (text browsers, screen readers or browsers with the images disabled) 
- Understand the meaning of the images that they cannot see.
- Enable bots to exploit the information carried by the images (to reference, index and perform machine translation on the image text alternatives).
- Enable the display of relevant text while images are loading.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Permitir a los usuarios situados en contextos donde las imágenes no son perceptibles (navegador de texto, lector de pantalla, navegador con imágenes deshabilitadas) entender el significado de las imágenes que no pueden ver. 
-  Permitir a los robots explotar la información transmitida por las imágenes (referencia, indexación, traducción automática de alternativas de imagen-texto).
-  Permitir la visualización del texto mientras se cargan las imágenes.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.
-  Mejorar la consideración del contenido por parte de los motores de búsqueda y las herramientas de indexación

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

Certaines images ne se contentent pas d’être jolies ou moches. Elles apportent de vraies informations. C’est le cas du texte mis en image, mais aussi d’images présentant des informations visuelles nécessaires ou utiles à la compréhension du contenu. Dans ce cas, faites-en sorte que les informations ne soient pas perdues lorsque l’image est désactivée.

---

## Solution recommandée

<div><ul><li>Donner à chaque élément img concerné un attribut alt reproduisant l’information.</li><li>Donner à chaque élément area concerné un attribut alt reproduisant l’information.</li><li>Reproduire l’information dans le contenu de chaque élément object concerné.</li><li>Reproduire l’information dans le contenu de chaque élément canvas concerné.</li><li>Reproduire l’information dans un libellé textuel associé à chaque élément svg concerné par le biais de son attribut aria-label ou de la balise desc.</li></ul></div><div>Dans le cas d’une image complexe qui ne peut être résumée de manière concise dans une alternative textuelle, le détail de l’information doit être apporté en complément à l’aide d’une description étendue :</div><div><ul><li>soit via l’attribut longdesc de l’image indiquant l’URL de la description,</li><li>soit via un lien adjacent à l’image jouant le même rôle,</li><li>soit dans le contenu de la page, dans le contexte immédiat de l’image. Dans ce dernier cas, l’alternative peut signaler la présence de cette description et y renvoyer.</li></ul></div><div><br></div>

---

## Méthode de vérification

<div><ul><li>Vérifier que l’attribut alt de chaque élément img concerné reproduit l’information portée par l’image.</li><li>Vérifier que l’attribut alt de chaque élément area concerné reproduit l’information portée par l’image.</li><li>Vérifier que le contenu de chaque élément object concerné reproduit l’information portée par l’image.</li><li>Vérifier que le contenu de chaque élément canvas concerné reproduit l’information portée par l’image.</li><li>Vérifier que chaque élément svg concerné est associé à un libellé textuel reproduisant l’information portée par l’image par le biais de son attribut aria-label ou de la balise desc.</li><li>Vérifier la présence et la pertinence de la description étendue le cas échéant.<br></li></ul></div>

---

## Vulgarisation

Le niveau de détail à apporter dans l’alternative textuelle d’une image de contenu est parfois difficile à décider. Il faut garder en mémoire qu’une alternative de type alt doit rester concise. Il n’y a pas de limite chiffrée normative, mais on peut retenir 120 caractères comme étant le maximum à ne pas dépasser, sauf impossibilité à quelques caractères près.
Lorsque l’alternative ne suffit pas à résumer l’information clé, il faut alors se tourner, en complément, vers les différentes possibilités de description étendue. C’est typiquement le cas, par exemple, d’un organigramme ou d’un diagramme. Pour ce dernier, la description étendue la plus appropriée est généralement un tableau contenant les données représentées par le diagramme : au-delà de l’accessibilité, ceci profitera à de nombreux utilisateurs souhaitant les réexploiter.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee/
- **API** : `https://api.opquast.com/checklist/118/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
