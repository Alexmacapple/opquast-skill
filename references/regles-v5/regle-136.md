# Règle Opquast 136

> Chaque lien est doté d'un intitulé dans le code source.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 136 |
| **ID** | 54491 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque lien est doté d'un intitulé dans le code source.

### English
Each link has a title in the source code.

### Español
Cada enlace tiene un texto asociado en el código fuente.

---

## Objectifs

### Français
- Éviter aux utilisateurs d'avoir uniquement une URL peu compréhensible en guise de libellé. 
- Éviter les liens qui deviennent invisibles lorsque les styles CSS ou les images d'arrière-plan ne sont pas pris en compte.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Prevent users from only having a hard-to-understand URL as a label.
- Avoid links that become invisible when CSS styles or background images are not handled.
- Improve the accessibility of content for people with disabilities.

### Español
- Evitar que los usuarios tengan sólo una URL ininteligible como etiqueta. 
-  Evitar los enlaces que se vuelven invisibles cuando no se tienen en cuenta los estilos CSS o las imágenes de fondo.
- Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Liens

### Phases projet
- Développement

---

## Explication pédagogique

Un lien se compose au minimum d’une URL et d’un libellé. Si vous ne saisissez pas de libellé, vous avez un lien, certes, mais qui n'a pas de sens et qui risque de ne pas être perçu ou d’être incorrectement compris par les utilisateurs et les moteurs de recherche.

---

## Solution recommandée

<p>Donner à chaque lien un libellé textuel (entre les balises ouvrantes et fermantes de l'élément <code>a</code>) ou, si nécessaire, via l'alternative textuelle d'un élément <code>img</code> ou <code>object</code>, etc. </p><p>Ne pas masquer à l'affichage le libellé textuel de l'élément <code>a</code> pour le remplacer par un effet de style CSS (image d'arrière-plan).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a></p>

---

## Méthode de vérification

<p>La détection des liens vides nécessite l'examen du code généré afin de contrôler le contenu effectivement présent dans la balise <code>a</code>, dans l'alternative de la balise <code>img</code> en cas d'image-lien ou encore dans l'alternative des éléments <code>object</code> et <code>embed</code>, etc. </p><p>Dans chaque page examinée&nbsp;: </p><ul>
<li>Vérifier que chaque lien texte a un libellé affiché lorsque les styles CSS sont désactivés.</li>
<li>Contrôler que chaque lien image a un libellé affiché lorsque les images sont désactivées ; </li>
</ul><p>Dans le cas des liens HTML, il faut également vérifier que le libellé est affiché lorsque les couleurs seules sont désactivées.</p>

---

## Vulgarisation

Il existe heureusement diverses techniques considérées comme accessibles et robustes, quand on ne souhaite pas créer un lien graphique avec un élément HTML dédié, comme img. Elles consistent à produire un libellé textuel dans l’élément a puis à le masquer à l’affichage pour le remplacer, par exemple, par une image d’arrière-plan CSS ou un autre type de contenu généré : déplacement du contenu en dehors de la zone d’affichage à l’aide d’un positionnement, ou d’une indentation, jeu sur la taille du texte, sur la couleur, superpositions, etc. Quoi qu’il en soit, chacun de vos liens (ou boutons) devra avoir un libellé dans le code.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-lien-est-dote-dun-intitule-dans-le-code-source/
- **API** : `https://api.opquast.com/checklist/136/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
