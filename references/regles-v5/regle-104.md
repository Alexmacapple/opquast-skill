# Règle Opquast 104

> Le code source des pages contient un appel valide à une icône de favori.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 104 |
| **ID** | 54503 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le code source des pages contient un appel valide à une icône de favori.

### English
The source code of the pages contains a valid call to a favourite icon (“favicon”)

### Español
El código fuente de las páginas contiene una llamada válida a un favicono

---

## Objectifs

### Français
- Améliorer l'identification visuelle du site et de ses pages. 
- Faciliter l'identification dans le navigateur et dans les favoris ou signets. 
- Permettre l'affichage, l'appel, et la mémorisation éventuelle de l'icône de favori par tous les navigateurs.

### English
- Improve the visual identification of the site and its pages.
- Facilitate identification in the browser and the favorites or bookmarks.
- Enable all browsers to display, call and, potentially, memorize the favicon.

### Español
- Mejorar la identificación visual del sitio web y de sus páginas. 
- Facilitar la identificación en el navegador y en los marcadores o favoritos. 
-  Habilitar la visualización, llamada, y eventual memorización del icono del marcador por todos los navegadores.

---

## Métadonnées

### Tags
- Basics

### Thématiques
- Identification et contact

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

L’icône de favori est la petite image qui s’affiche dans votre navigateur et dans vos marque-pages ou favoris. Elle mérite d’être bien traitée, car elle joue un rôle important dans l’identification durable de votre site.

---

## Solution recommandée

<p>Selon le format choisi pour l'icône et son emplacement, utiliser un lien du type&nbsp;:</p><ul>
<li>&lt;link rel="icon" type="image/png" href="/img/favicon.png"/&gt; (format png, mais aussi jpg, gif, etc.) ;</li>
<li>&lt;link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" /&gt; (format ico Microsoft seul reconnu par Internet Explorer).</li></ul>

---

## Méthode de vérification

<p>Dans le code source de chaque page examinée&nbsp;:</p><ul>
<li>Vérifier, à l'aide d'un outil de développement web ou d'un inspecteur de code, que l'élément <code>link rel</code> est présent dans l'en-tête de page <code>head</code> ;</li>
<li>Vérifier que sa syntaxe est de la forme : </li>
</ul>
<p>&lt;link rel="icon" type="image/png" href="/img/favicon.png"/&gt; pour les formats png, mais aussi jpg, gif, etc. ;</p><p>ou &lt;link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" /&gt; pour le format ico Microsoft.</p>

---

## Vulgarisation

Associée à des titres de page complets et bien organisés (titre du contenu – nom du site), l’icône de favori (favicon) facilite considérablement la consultation dans plusieurs onglets d’un navigateur graphique. En effet, en son absence, c’est l’icône par défaut proposée par le navigateur qui s’affichera, ce qui diminue l’identification du site visité.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori/
- **API** : `https://api.opquast.com/checklist/104/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
