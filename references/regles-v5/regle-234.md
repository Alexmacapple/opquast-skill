# Règle Opquast 234

> Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 234 |
| **ID** | 54513 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le contenu de chaque page est organisé selon une structure de titres et sous-titres hiérarchisée.

### English
Each page’s content is organized according to a hierarchical structure of headings and sub-headings.

### Español
El contenido de cada página se organiza según una estructura jerárquica de etiquetas de encabezado

---

## Objectifs

### Français
- Permettre aux utilisateurs qui le souhaitent de visualiser la structure du contenu de la page et d’y naviguer. 
- Permettre aux machines et aux outils d’indexation d’extraire le plan de chaque page. 
- Améliorer le référencement en facilitant l’interprétation du contenu par les robots d’indexation.

### English
- Allow interested users to view and navigate through the structure of the page’s content.
- Enable machines and indexing tools to extract each page’s map.
- Improve SEO by simplifying the content’s interpretation by web crawlers.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
-  Permitir a los usuarios ver y navegar por la estructura del contenido de la página si así lo desean. 
-  Habilitar las máquinas y herramientas de indexación para extraer el mapa de cada página. 
- Mejorar el posicionamiento facilitando la interpretación del contenido mediante robots de indexación.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- SEO

### Thématiques
- Structure et code

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Les titres et sous-titres permettent aux navigateurs, moteurs et outils de vocalisation de restituer la structure d’une page. Ainsi, les utilisateurs peuvent accéder directement au contenu qui les intéresse.

---

## Solution recommandée

<p>Structurer le document en titres et sous-titres à l’aide des éléments HTML h1 à h6.</p><p>Veiller à ce que la structure ne comporte pas de « trous » : un titre de niveau h2 ne doit pas être suivi d’un titre h4, h5 ou h6, par exemple.</p><p>Veiller à ce que chaque page comporte au moins un titre de niveau 1 avec l’élément h1.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/Heading_Elements"><code>h1</code>... <code>h6</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans chaque page, contrôler successivement :</p><ul><li>la présence d’au moins un élément h1 correspondant au titre de la section principale du contenu de la page ;</li><li>la présence de sous-titres h2 à h6 (si nécessaire) correspondant aux titres des sous-sections de contenu principal de la page ;</li><li>l’absence d’interruption dans la succession descendante des titres h1 à h6, c’est-à-dire par exemple l’absence de titre h1 suivi d’un titre h3.</li></ul><p>La vérification doit s’effectuer en tenant compte d’éventuels éléments de titres masqués à l’affichage ou bien de titres générés par JavaScript. On peut, à cet effet, utiliser la fonction d’affichage de la table des matières de la page disponible dans certains outils de développement.</p>

---

## Vulgarisation

La présence d’un titrage rigoureux des sections de contenu permet notamment aux outils d’extraire une table des matières du document, qu’ils utiliseront pour naviguer dans celui-ci.
Le titrage de niveau h1 n’est pas nécessairement unique dans une page : en fonction de la nature et de l’organisation des contenus, on peut être amené à y placer plusieurs éléments h1. Enfin, les éléments de navigation nécessitent rarement d’être titrés : les titres de sections sont plus souvent réservés au contenu propre de la page.
Le mécanisme d’incrémentation automatique des niveaux de titrage prévu par HTMLS (outline) pose encore, à l’heure où nous écrivons ces lignes, trop de problèmes pour être conforme du point de vue de l’accessibilité, même s’il peut être satisfaisant par ailleurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-contenu-de-chaque-page-est-organise-selon-une-structure-de-titres-et-sous-titres-hierarchisee/
- **API** : `https://api.opquast.com/checklist/234/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
