# Règle Opquast 219

> La racine du site contient des instructions pour les robots d'indexation.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 219 |
| **ID** | 54505 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La racine du site contient des instructions pour les robots d'indexation.

### English
The website’s root contains instructions for web crawlers.

### Español
La raíz del sitio web contiene instrucciones para los robots de indexación

---

## Objectifs

### Français
- Permettre un référencement ciblé. 
- Améliorer le guidage des outils de recherche. 
- Diminuer l'impact énergétique lié à la consultation du site. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Enable targeted referencing.
- Improve guidance for search tools.
- Reduce the energy impact related to the consultation of the site.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
-  Permitir el posicionamiento específico. 
- Mejorar la orientación de las herramientas de búsqueda. 
- Disminuir el impacto energético relacionado con la consulta del sitio web. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Basics
- Écoconception
- SEO

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Les robots sont des programmes informatiques qui analysent et parcourent vos pages. Les plus connus sont ceux des moteurs de recherche, qui indexent les contenus. Ces robots peuvent recevoir des instructions pour les guider dans leur indexation, il suffit de mettre en place un fichier appelé robots.txt à la racine de votre site et de respecter une syntaxe particulière dans ce fichier.

---

## Solution recommandée

<p>Pour définir les répertoires, fichiers ou types de fichiers non indexables, utiliser les instructions <code>user-agent</code> et <code>disallow</code> dans un fichier texte unique appelé <code>robots.txt</code>, placé dans le répertoire racine du site.</p><p>Alternativement, pour agir au niveau d'une page spécifique, utiliser dans celle-ci la balise <code>meta name="robots" content="attribut1, attribut2" </code> : </p><ul>
<li>attribut1 peut prendre les valeurs <code>index</code> (indexer cette page) ou <code>noindex</code> (ne pas indexer cette page) ;</li>
					<li>attribut2 peut prendre les valeurs <code>follow</code> (suivre les liens contenus dans cette page) ou <code>nofollow</code> (ne pas suivre les liens).</li>
				</ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta"><code>meta</code> sur MDN</a></p>

---

## Méthode de vérification

<p>À partir de l'adresse URL de votre site : </p><ul>
<li>Accéder tout d'abord à l'adresse du fichier robots.txt, à la racine du site, en tapant par exemple http://example.com/robots.txt dans la barre d'adresse du navigateur ; </li>
					<li>Vérifier la présence du fichier <code>robots.txt</code> placé dans le répertoire racine du site ; </li>
					<li>Vérifier la validité de la syntaxe du fichier <code>robots.txt</code> à l'aide des indications données par les moteurs de recherche </li>
				</ul><p>En l'absence de fichier <code>robots.txt</code> vérifier la présence et la validité de la balise <code>meta name="robots" content="attribut1, attribut2"</code> dans chaque page.</p>

---

## Vulgarisation

Le référencement est depuis quelques années une des composantes majeures d’un site web. S’adresser aux moteurs de recherche pour qu’ils mettent en avant les informations désirées est donc essentiel.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-racine-du-site-contient-des-instructions-pour-les-robots-dindexation/
- **API** : `https://api.opquast.com/checklist/219/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
