# Règle Opquast 245

> Les tableaux de données ne sont pas simulés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 245 |
| **ID** | 54464 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les tableaux de données ne sont pas simulés.

### English
Data tables are not simulated.

### Español
Las tablas de datos nos estan simuladas.

---

## Objectifs

### Français
- Permettre aux utilisateurs d’accéder à des tableaux exploitables par leur agent utilisateur et restitués de manière compréhensible dans tous les cas.
- Améliorer l’accessibilité des contenus aux personnes handicapées.
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Give users access to tables that are exploitable by their user agents and that can be reproduced in a way that will always be understandable. 
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios acceder a las tablas que pueden ser utilizadas por su agente de usuario y reproducidas de forma comprensible en todos los casos.
- Mejorar la accesibilidad del contenido para las personas con discapacidad. 
- Mejorar la inclusión del contenido por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- Écoconception
- SEO

### Thématiques
- Structure et code

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Il peut être tentant, pour aller plus vite, de scanner un tableau présent dans un document bureautique et de coller l’image dans la page web, ou de simuler visuellement des tableaux en insérant des espaces entre des données. Mais c’est en fait une très mauvaise idée : le contenu de ces tableaux ne sera ni indexable par les moteurs de recherche, ni consultable pour différents utilisateurs.

---

## Solution recommandée

<p>Utiliser systématiquement l’élément <code>table</code> et les éléments associés <code>tr, td, th, caption</code> pour baliser les tableaux de données, et non des images reproduisant le tableau.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/table"><code>table</code> sur MDN</a></p>

<p>Utiliser systématiquement l'élément <code>table</code> et les éléments associés <code>tr, td, th, caption</code>, pour baliser les tableaux de données, et non des artifices reposant sur des accumulations d'espaces insécables ou de caractères graphiques tels que les pipes (lignes verticales « | »).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/table"><code>table</code> sur MDN</a></p>

---

## Méthode de vérification

<div>S’assurer qu’aucun tableau de données n’est géré sous forme d’image.</div>

<p>Pour chaque contenu affiché sous forme de tableau de données (c'est-à-dire associant des cellules de données à des en-têtes de ligne ou de colonnes) : </p><ul>
<li>S'assurer que celui-ci est balisé avec les éléments HTML <code>tr</code> (ligne), <code>td</code> (cellule de données), <code>th</code> (en-tête de ligne ou de colonne) et <code>caption</code> (titre du tableau), par exemple à l'aide d'un outil de développement.</li>
				</ul>

---

## Vulgarisation

Ces tableaux sont généralement issus d’une capture d’écran d’un document bureautique. On pourrait certes songer à fournir une alternative textuelle à l’image, mais cela reviendrait à créer le tableau de données HTML ; autant publier directement celui-ci.

Un tableau de données réalisé en simulant la mise en colonnes revient en fait à produire un contenu pratiquement dénué de sens, en particulier pour un outil de synthèse vocale.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-tableaux-de-donnees-ne-sont-pas-remplaces-par-des-images/
- **API** : `https://api.opquast.com/checklist/245/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
