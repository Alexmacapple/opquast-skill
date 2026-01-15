# Règle Opquast 93

> Les éléments d'une liste déroulante qui peuvent être regroupés le sont de manière appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 93 |
| **ID** | 54435 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les éléments d'une liste déroulante qui peuvent être regroupés le sont de manière appropriée.

### English
The items in a drop-down list are grouped together appropriately, where applicable.

### Español
Los elementos de una lista desplegable que pueden agruparse se agrupan de forma adecuada.

---

## Objectifs

### Français
- Permettre aux aides techniques de restituer à l’utilisateur une liste dont l’organisation est clairement perceptible et qui facilite le passage d’un élément de la liste à un autre. 
- Favoriser un rendu approprié des listes déroulantes complexes dans tous les navigateurs.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow technical aids to return a list to the user whose organization is clear to see; and that simplifies moving from one item on the list to another.
- Foster the accurate rendering of complex drop-down lists in every browser.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir que las ayudas técnicas devuelvan al usuario una lista cuya organización sea claramente perceptible y que facilite el paso de un elemento a otro de la misma lista. 
- Promover la representación apropiada de listas desplegables complejas en todos los navegadores.
- Mejorar la accesibilidad del contenido para las personas con discapacidades.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Le contenu de certaines listes déroulantes est suffisamment homogène pour se suffire à lui-même, mais, dans certains cas, la liste sera plus aisée à consulter en étant mieux organisée. Dans ce cas, l’élément optgroup est votre ami.

---

## Solution recommandée

<p>Utiliser l'élément <code>optgroup</code> pour baliser les regroupements thématiques d'éléments option dans les listes <code>select</code>.</p><p>Utiliser l'attribut <code>label</code> de l'élément <code>optgroup</code> pour afficher l'étiquette de chaque regroupement.</p>

---

## Méthode de vérification

<p>Pour chaque liste déroulante&nbsp;:</p><ul>
<li>Ouvrir chaque liste (<code>select</code>) pour détecter celles qui nécessiteraient un regroupement d'éléments <code>option</code>, par exemple des regroupements de modèles de voitures classés par marques ou des regroupements de villes réalisés par département ; </li>
					<li>Vérifier, en examinant le code source à l'aide de Firebug, que chaque série d'éléments <code>option</code> qui devraient être regroupés est balisée avec l'élément <code>optgroup</code> ;</li>
					<li>Vérifier que chaque élément <code>optgroup</code> est doté d'un attribut <code>label</code> associant un libellé pertinent au groupe d'options concerné.</li>
				</ul>

---

## Vulgarisation

On utilise fréquemment des artifices purement visuels pour organiser la mise en forme d’une longue liste select comportant plusieurs catégories option : en particulier, la présence d’éléments fictifs du type <option .></option>. L’élément optgroup et son attribut label répondent en fait exactement à ce besoin, mais de manière accessible et sémantique.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-elements-dune-liste-deroulante-qui-peuvent-etre-regroupes-le-sont-de-maniere-appropriee/
- **API** : `https://api.opquast.com/checklist/93/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
