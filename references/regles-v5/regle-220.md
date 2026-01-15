# Règle Opquast 220

> Le site propose un fichier sitemap indiquant les contenus à explorer.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 220 |
| **ID** | 54492 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le site propose un fichier sitemap indiquant les contenus à explorer.

### English
The website provides a sitemap file listing the content to be crawled.

### Español
El sitio web proporciona un archivo sitemap que indica el contenido a explorar.

---

## Objectifs

### Français
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation.
- Diminuer l'impact énergétique lié à la consultation du site.

### English
- Provide summary information about all of the available content that is machine-readable.
- Reduce the energy impact related to the consultation of the site.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación
- Disminuir el impacto energético relacionado con la consulta del sitio web.

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
- Editorial

---

## Explication pédagogique

Un fichier sitemap présente aux moteurs de recherche les contenus qu’ils doivent explorer. C’est en quelque sorte un plan du site écrit pour les machines.

---

## Solution recommandée

<p>Créer un fichier <code>sitemap.xml</code> contenant la liste des pages du site à la racine du site. À défaut de respecter le format XML, une simple liste d'URL est acceptée par les moteurs.</p>

---

## Méthode de vérification

<p>Via l'adresse url du site examiné&nbsp;: </p><ul>
<li>Vérifier qu'un fichier <code>sitemap.xml</code> existe à la racine du site, en y accédant directement dans le navigateur avec une URL du type http://example.com/sitemap.xml ; </li>
					<li>À défaut, consulter le fichier <code>robots.txt</code> pour y rechercher une URL spécifique mentionnée sous la forme <code>sitemap: http://example.com/adresse/du/fichier.xml</code>.</li>
				</ul>

---

## Vulgarisation

Le fichier sitemap.xml rend visibles aux robots d’indexation toutes les pages d’un site, notamment celles qui risqueraient de ne pas être détectées habituellement (pages sans lien HTML ou avec du contenu Ajax ou Flash). Il permet d’intervenir sur la fréquence de passage des robots et sur le choix des pages qui vont être lues en priorité. Il donne également la possibilité de fournir des informations sur certains types de contenus (durée d’une vidéo, licence d’une image) En un mot, il facilite le référencement des contenus du site.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-propose-un-fichier-sitemap-indiquant-les-contenus-a-explorer/
- **API** : `https://api.opquast.com/checklist/220/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
