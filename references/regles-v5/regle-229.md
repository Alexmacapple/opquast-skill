# Règle Opquast 229

> Les feuilles de style internes sont minifiées.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 229 |
| **ID** | 54501 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les feuilles de style internes sont minifiées.

### English
Style sheets are minified.

### Español
Las hojas de estilo del sitio web están minificados

---

## Objectifs

### Français
- Minimiser la quantité de données à télécharger par l'utilisateur. 
- Améliorer les performances.
- Diminuer l'impact énergétique lié à la consultation du site
- Accélérer la vitesse d'affichage des pages. 
- Améliorer les performances. 
- Diminuer la quantité de données à télécharger.
- Diminuer l'impact énergétique lié à la consultation du site

### English
- Minimize the quantity of data for users to download.
- Improve performance.
- Reduce the energy impact related to the consultation of the site.
- Speed up the display of your pages.
- Improve performance.
- Reduce the quantity of data to download.
- Reduce the energy impact related to the consultation of the site.

### Español
- Minimizar la cantidad de datos a descargar por el usuario. 
- Mejorar el rendimiento.
- Disminuir el impacto energético de la consulta del sitio web.
- Acelerar la velocidad de visualización de la página. 
- Mejorar el rendimiento. 
- Disminuir la cantidad de datos a descargar.
- Disminuir el impacto energético relacionado con la consulta del sitio web.

---

## Métadonnées

### Tags
- Basics
- Écoconception

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Il est possible de diminuer la taille des feuilles de styles CSS sans nuire au rendu final. Cette opération, appelée minification, réduit la quantité de données à télécharger et contribue à améliorer les performances.

---

## Solution recommandée

<p>Supprimer les espaces non nécessaires et les commentaires dans les fichiers CSS en recourant à des outils dédiés.</p>

<p>Supprimer les espaces non nécessaires ainsi que les commentaires dans les fichiers Javascript, en recourant à des outils dédiés.</p>

---

## Méthode de vérification

<p>Pour l'ensemble du site </p><ul>
<li>Vérifier manuellement au sein de tous les fichiers CSS qu'aucun retour ligne, commentaire, indentation ou saut de ligne n'est présent.</li>
					<li>Ou identifier la liste des fichiers CSS non minifiés à l'aide d'outils de développement (navigateurs, outils en ligne, etc.) </li>
				</ul>

<p>Pour l'ensemble du site&nbsp;:</p><ul>
<li>Vérifier manuellement au sein de tous les fichiers Javascript qu'aucun retour ligne, indentation ou saut de ligne n'est présent.</li>
					<li>Ou identifier la liste des scripts Javascript non minifiés à l'aide d'outils de développement (navigateurs, outils en ligne, etc.).</li>
				</ul>

---

## Vulgarisation

Il est possible et conseillé de réduire la taille des fichiers de styles au moment de leur envoi par le serveur. Cette opération est automatisable. Elle permet de gagner en performance et, dans ce domaine, chaque milliseconde compte.

Cette amélioration est tout à fait similaire à celle indiquée par la règle précédente pour les styles. Elle est également automatisable.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-feuilles-de-style-du-site-sont-minifiees/
- **API** : `https://api.opquast.com/checklist/229/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
