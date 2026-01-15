# Règle Opquast 119

> Les vignettes et aperçus ne sont pas des images de taille supérieure redimensionnées côté client.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 119 |
| **ID** | 54180 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les vignettes et aperçus ne sont pas des images de taille supérieure redimensionnées côté client.

### English
Thumbnails and previews are not larger images resized on the client side.

### Español
Las miniaturas y las vistas previas no son imágenes más grandes redimensionadas del lado cliente.

---

## Objectifs

### Français
- Diminuer la quantité de données à télécharger. 
- Améliorer la vitesse d’affichage de la page. 
- Diminuer l'impact énergétique lié à la consultation du site.

### English
- Decrease the amount of data to download. 
- Improve page display speed. 
- Decrease the energy impact related to the consultation of the site.

### Español
- Disminuir la cantidad de datos a descargar. 
- Mejorar la velocidad de visualización de la página. 
- Disminuir el impacto energético relacionado con la consulta del sitio web. 

---

## Métadonnées

### Tags
- Écoconception

### Thématiques
- Images et médias

### Phases projet
- Développement

---

## Explication pédagogique

Le langage HTML permet d’indiquer pour une image des dimensions différentes de celles de l’image d’origine. Cela permet notamment de faire des vignettes et aperçus d’image. Par exemple, vous pouvez parfaitement afficher une image carrée de 100 pixels de côté alors qu’il s’agit d’une image carrée de 5000 pixels de côté dont vous vous êtes contenté de redimensionner l’affichage en HTML. L’affichage est petit mais la quantité de données à télécharger reste la même. Et cela nuit directement aux performances du site.

---

## Solution recommandée

<p>Utiliser, pour les vignettes de prévisualisation d'images, des versions spécifiques de celles-ci et non les images originales redimensionnées via leurs attributs HTML ou leurs propriétés CSS.</p>

---

## Méthode de vérification

<p>Pour toutes les images HTML présentes dans le code source ou générées via javascript&nbsp;:</p><ul>
<li>Vérifier qu'elles ne sont pas dotées de propriétés CSS <code>height</code> ou <code>width</code> qui modifient la taille apparente des images par rapport à leurs dimensions réelles. Pour cela, utiliser  désactiver tous les styles CSS à l'aide d'un outil de développement web  pour repérer les images dont les dimensions changent après désactivation des styles CSS. </li>
					<li>Contrôler également que les dimensions indiquées dans les attributs <code>width</code> et <code>height</code> du code HTML généré correspondent aux dimensions réelles de l'image à l'aide d'un outils de développement.</li>
				</ul><p>Par exemple, on invalidera donc&nbsp;: </p><ul>
<li>Une image du type &lt;img height="300" width="600" class="thumb"/&gt; si la classe <code>.thumb</code> impose les propriétés CSS <code>height: 100px</code> et <code>width: auto</code>. </li>
					<li>Une image du type &lt;img height="100" width="200"/&gt; si les dimensions réelles de l'image sont 300 px de haut et 600 px de large.</li>
				</ul>

---

## Vulgarisation

"
L'objectif clé est de ne pas pénaliser des utilisateurs en forçant le téléchargement de ressources inutilement lourdes. Cette règle peut être appréciée à la marge si la perte de performance est réduite. L'utilisation de l'attribut <code> srcset</code> permet de fournir au navigateur une liste d'images de tailles et résolutions différentes, qui servira ainsi l'image la plus adaptée au media de consultation. "

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client/
- **API** : `https://api.opquast.com/checklist/119/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
