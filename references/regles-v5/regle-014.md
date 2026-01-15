# Règle Opquast 14

> Les contenus ne détournent pas de caractères pour simuler une mise en forme visuelle.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 14 |
| **ID** | 54555 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les contenus ne détournent pas de caractères pour simuler une mise en forme visuelle.

### English
The content does not misuse characters to simulate visual formatting.

### Español
Los contenidos no desvían caracteres para simular un formato visual.

---

## Objectifs

### Français
- Permettre la bonne restitution des contenus dans les lecteurs d’écran.
- Favoriser l’indexation des contenus par les moteurs de recherche.
- Favoriser la prise en compte des contenus par des briques d’intelligence artificielle.

### English
- Enable content to be rendered correctly in screen readers.
- Promote content indexing by search engines.
- Promote content recognition by artificial intelligence components.

### Español
- Permitir la correcta reproducción de los contenidos en los lectores de pantalla.
- Favorecer la indexación de los contenidos por parte de los motores de búsqueda.
- Favorecer la consideración de los contenidos por parte de los componentes de inteligencia artificial.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Contenus

### Phases projet
- Editorial

---

## Explication pédagogique

Certains outils de production de contenus, notamment ceux qui permettent de publier sur les réseaux sociaux, ne permettent pas de mettre en forme les contenus avec des options comme le gras ou l’italique. Pour contourner cette impossibilité, il est possible d’utiliser des caractères Unicode mathématiques et autres, qui simulent de la mise en forme. Le rendu visuel de ce genre de contenus est certes plus varié, mais il rend les contenus incompréhensibles dans les lecteurs d’écran et plus généralement pour les outils chargés d’indexer ou de manipuler les contenus.

---

## Solution recommandée

Utiliser les fonctions natives des éditeurs de contenus pour obtenir du gras, de l'italique, etc. Lorsque que ces outils n’existent pas, ne pas détourner de caractères pour simuler des mises en formes visuelles.

---

## Méthode de vérification

Vérifier que les contenus ne contiennent pas de caractères Unicode détournés (non alphabétiques en particulier) qui simulent des mises en formes visuelles.

---

## Vulgarisation

Cette technique de détournement de caractères a quelquefois été utilisée pour un autre usage encore plus problématique : les caractères Unicode étant autorisés dans les noms de domaine, il est possible de simuler de faux domaines web contenant un ou plusieurs caractères Unicode avec un rendu similaire à celui d’une police normale et de se servir de ce faux nom de domaine pour récupérer des informations personnelles et faire ce que l’on appelle du phishing.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-contenus-ne-detournent-pas-de-caracteres-pour-simuler-une-mise-en-forme-visuelle/
- **API** : `https://api.opquast.com/checklist/14/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
