# Règle Opquast 228

> Les entêtes envoyés par le serveur contiennent les informations relatives au jeu de caractères employé.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 228 |
| **ID** | 54449 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les entêtes envoyés par le serveur contiennent les informations relatives au jeu de caractères employé.

### English
Headers sent by the server contain information pertaining to the character set used

### Español
Las cabeceras enviadas por el servidor indican el juego de caracteres utilizados

---

## Objectifs

### Français
- Permettre au navigateur de choisir le bon encodage des caractères pour afficher la page.
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Allow the browser to choose the right character encoding to display the page.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Permitir al navegador elegir la codificación de caracteres correcta para mostrar la página.
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- SEO

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Un serveur web ne peut pas vous servir un verre, il va vous servir des pages web. Et avant de vous les servir, il va vous donner des tas d’informations, dans ce qu’on appelle les entêtes (headers). Ici est exposée une des informations que doit contenir l’entête d’une page pour garantir un rendu fiable.

---

## Solution recommandée

<p>Le paramètre <code>charset</code> de l'entête HTTP content-type est renseigné sous la forme : <code>Content-Type: text/html; charset=utf-8</code> (utf-8 étant ici un exemple), en fonction du jeu de caractères effectivement utilisé par le document et de son type MIME.</p>

---

## Méthode de vérification

<p>Pour chaque page examinée&nbsp;: </p><ul>
<li>Vérifier la présence du <code>charset</code> dans le champ content-type renvoyé par le serveur avec un outil dédié ; </li>
					<li>Vérifier que le jeu de caractères déclaré correspond effectivement au jeu de caractères utilisé par le document. En présence de caractères non corrects à la place des accents ou autres, la bonne pratique sera certainement invalidée. </li>
				</ul>

---

## Vulgarisation

Cette règle a pour objectif d’améliorer la compatibilité du site avec les navigateurs du marché. Son application prévient les défaillances d’affichage, notamment pour les caractères spéciaux et accentués.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-en-tetes-envoyes-par-le-serveur-contiennent-les-informations-relatives-au-jeu-de-caracteres-employe/
- **API** : `https://api.opquast.com/checklist/228/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
