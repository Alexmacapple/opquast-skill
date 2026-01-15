# Règle Opquast 103

> Le titre de chaque page permet d'identifier son contenu.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 103 |
| **ID** | 54522 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le titre de chaque page permet d'identifier son contenu.

### English
Each page provides a title that enables one to identify its content

### Español
El título de cada página permite identificar su contenido.

---

## Objectifs

### Français
- Permettre aux utilisateurs d'identifier immédiatement la nature des contenus de chaque page dans les onglets, les favoris, dans la fenêtre du navigateur ou encore dans les lecteurs d'écran.
- Améliorer le référencement des pages et leur présentation dans les moteurs de recherche.
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Allow users to immediately identify the nature of each page’s content in tabs, favorites, windows, browser histories, and screen readers.
- Improve the pages’ SEO and their presentation in search engine results.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios identificar inmediatamente la naturaleza del contenido de cada página en pestañas, marcadores, en la ventana del navegador o en los lectores de pantalla.
- Mejorar la referenciación de las páginas y su presentación en los motores de búsqueda.
- Mejorar el posicionamiento de los contenidos para las personas discapacitadas. 
- Mejorar la inclusión de contenidos por los motores de búsqueda y las herramientas de información.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- SEO

### Thématiques
- Identification et contact

### Phases projet
- Editorial

---

## Explication pédagogique

Identifier le site en regardant le titre d’une page, c’est bien, mais comprendre très vite la nature du contenu d’une page, c’est encore mieux. Et ce ne sont pas les moteurs de recherche qui diront le contraire.

---

## Solution recommandée

<p>Rédiger le contenu de l'élément <code>title</code> de chaque page de manière à ce qu'il décrive, de la façon la plus concise possible, le contenu ou la fonction de la page , y compris à la suite d'une requête Ajax modifiant de manière essentielle le contenu de la page.</p><p>Préciser quelle est l'étape en cours d'un processus dans l'élément title des pages. Par exemple, inscrire «&nbsp;Étape 3 de votre inscription&nbsp;» dans l'élément <code>title</code> de la page correspondant à la troisième étape d'un formulaire d'inscription. </p><p>Préciser, dans le cas de l'affichage d'une série de résultats de recherche, quel est l'intervalle de résultats affiché dans la page courante. Par exemple, « Résultats 10 à 19 de la recherche sur “Foo”&nbsp;».</p><p>Préciser l'état dans le titre d'une page de demande de confirmation ou d'annulation lors de la soumission d'un formulaire (exemple : «&nbsp;Demande de confirmation de suppression - Mes documents&nbsp;»).</p>

---

## Méthode de vérification

<p>Dans toutes les pages du site, y compris dans les pages d'un processus ou d'une série de résultats de recherche, ou encore dans les pages dont le contenu peut être modifié de manière majeure via Ajax :</p><ul>
<li>Vérifier que chaque titre de page (élément <code>title</code>) permet d'identifier le contenu ou la fonction de la page.</li>
				</ul>

---

## Vulgarisation

La gestion complète des titres des pages successives d’un processus (formulaire en étapes) ou d’une série de résultats (recherche) est particulièrement importante pour les utilisateurs de lecteurs d’écran. En effet, c’est la première information lue par la synthèse vocale au chargement de la page. Elle les assure donc rapidement de la bonne marche d’un processus ou de la pertinence de leurs actions.
Par ailleurs, on rencontre parfois une utilisation particulière de l’élément title : certains sites y font figurer, outre le titre de page, tout ou partie du rubriquage ou de l’arborescence où se trouve la page concernée. À vrai dire, il semble préférable de réserver cette information au fil d’Ariane.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-titre-de-chaque-page-permet-didentifier-son-contenu/
- **API** : `https://api.opquast.com/checklist/103/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
