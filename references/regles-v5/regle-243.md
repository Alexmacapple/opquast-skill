# Règle Opquast 243

> Les titres des tableaux de données sont renseignés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 243 |
| **ID** | 54400 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les titres des tableaux de données sont renseignés.

### English
Captions for data tables are provided

### Español
Las tablas de datos disponen de títulos

---

## Objectifs

### Français
- Permettre aux utilisateurs d'aides techniques (lecteurs d'écran) d'identifier aisément la nature des informations fournies par un tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow users of technical aids (like screen readers) to easily identify the nature of the information provided in a table.

### Español
-  Permitir a los usuarios de ayudas técnicas (lectores de pantalla) identificar fácilmente la naturaleza de la información proporcionada por una tabla.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Structure et code

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Un tableau HTML peut être doté d’un titre. Ce dernier peut être affiché ou non, mais, dans tous les cas, sa présence et sa pertinence sont importantes pour la compréhension du tableau.

---

## Solution recommandée

<p>Utiliser et renseigner l'élément HTML <code>caption</code> pour chaque tableau de données.</p><p>Le cas échéant, recourir à un élément <code>caption</code> masqué à l'affichage.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/caption"><code>caption</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque tableau de données&nbsp;:</p><ul>
<li>Vérifier la présence de l'élément <code>caption</code>. Si cet élément est masqué à l'affichage à l'aide d'une classe CSS, vérifier qu'il reste accessible pour les lecteurs d'écran ; </li>
					<li>Contrôler la pertinence de l'élément <code>caption</code> qui doit permettre d'identifier la nature des informations apportées par le tableau.</li>
				</ul><p>Cette vérification peut être partiellement automatisée pour ce qui est de la présence de l'élément de titre <code>caption</code> mais le contrôle de sa pertinence nécessite un examen manuel.</p>

---

## Vulgarisation

L’élément caption correctement renseigné permet en particulier à un outil de synthèse vocale d’énumérer de manière claire et explicite la liste des différents tableaux de données présents dans une page web. À défaut, ces outils restitueront le contenu de la première ligne du tableau, ce qui sera généralement peu explicite.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-titres-des-tableaux-de-donnees-sont-renseignes/
- **API** : `https://api.opquast.com/checklist/243/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
