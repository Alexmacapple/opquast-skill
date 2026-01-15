# Règle Opquast 141

> Les liens visités et non visités sont visuellement différenciés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 141 |
| **ID** | 54421 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les liens visités et non visités sont visuellement différenciés.

### English
Visited and unvisited links are visually differentiated.

### Español
Los enlaces visitados y no visitados se diferencian visualmente.

---

## Objectifs

### Français
- Faciliter l'identification des contenus déjà visités. 
- Faciliter l'identification des contenus restant à découvrir. 
- Inciter à la découverte de nouveaux contenus

### English
- Facilitate the identification of content that has already been visited.
- Facilitate the identification of content that has yet to be explored.
- Encourage users to navigate to new pages.

### Español
- Facilitar la identificación de contenidos previamente consultados. 
- Facilitar la identificación del contenido aún por consultar. 
- Incitar el descubrimiento de nuevos contenidos.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Liens

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Par défaut, les feuilles de styles des navigateurs prévoient des couleurs différentes pour les liens visités et non visités. Il est fort légitime de changer ce bleu et ce mauve fort peu seyants, mais pourquoi ne pas maintenir cette différence utile au visiteur ?

---

## Solution recommandée

<p>En dehors des menus de navigation, ne pas appliquer les mêmes styles CSS par défaut pour les liens non visités (sélecteurs <code>a</code> ou <code>a:link</code>) et pour les liens visités (sélecteur <code>a:visited</code>). Pour ce faire&nbsp;: soit prévoir un rendu spécifique pour les liens visités, soit ne pas indiquer de règle de rendu pour ceux-ci (le style par défaut du navigateur pourra alors s'appliquer sans difficulté).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/CSS/:visited"><code>:visited</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/:link"><code>:link</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans chaque page contenant des hyperliens&nbsp;:</p>
<ul>
<li>Contrôler la présence et l'utilisation du sélecteur <code>:visited</code> dans les feuilles de style CSS et l'utilisation d'un style différent de celui appliqué à <code>a</code> ou <code>a:link</code> ou bien ;
</li>
<li>Contrôler l'absence du sélecteur <code>:visited</code> dans les feuilles de style CSS pour laisser le style par défaut du navigateur s'appliquer</li>
</ul>

---

## Vulgarisation

Ce comportement est natif dans l’immense majorité des navigateurs graphiques : par défaut, les hyperliens visités se distinguent de ceux non visités. De nombreux administrateurs appliquent les mêmes styles pour les deux classes correspondantes et suppriment cette information utile dont l’utilisateur devrait garder le contrôle.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-napplique-pas-le-meme-style-aux-liens-visites-et-non-visites/
- **API** : `https://api.opquast.com/checklist/141/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
