# Règle Opquast 190

> Une famille générique de police est indiquée comme dernier élément de substitution.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 190 |
| **ID** | 54378 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Une famille générique de police est indiquée comme dernier élément de substitution.

### English
A generic font family is listed as the last alternative in font family lists.

### Español
Se indica un conjunto de fuentes por defecto como último elemento de sustitución

---

## Objectifs

### Français
- Permettre aux contenus de s'afficher correctement, même lorsque les polices prévues ne sont pas présentes sur le système de l'utilisateur.

### English
- Enable your content to display correctly,
- even when the planned fonts don’t exist on a user’s system.

### Español
-  Permitir que el contenido se muestre correctamente, incluso cuando las fuentes previstas no están presentes en el sistema del usuario.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Sur votre système, tout va bien, l’affichage de vos polices est parfait. Mais que se passe-t-il pour les utilisateurs qui n’ont pas une de vos polices installées sur leur matériel ? C’est le moment d’appeler la police de substitution (serif, sans-serif ou autre, à vous de choisir).

---

## Solution recommandée

<p>Dans chaque feuille de style CSS, indiquer la famille générique de police appropriée dans les propriétés <code>font-family</code> ou <code>font</code>&nbsp;:</p><ul>
<li>Pour les polices serif, ou à empattements (du type Times Roman), spécifier en dernier la famille de police générique serif. Dans l'exemple suivant, le terme «&nbsp;serif&nbsp;» a été correctement ajouté comme dernier élément de la liste des polices <code>font-family: Georgia, "Bookman Old Style", serif</code>.</li>
					<li>Pour les polices sans serif, ou sans empattements (du type Arial), spécifier en dernier la famille de police générique sans-serif. Par exemple&nbsp;: <code>font-family: Optima, "Trebuchet MS", sans-serif</code>; </li>
					<li>Pour les polices monospace (du type Courier), spécifier en dernier la famille de police générique monospace. Par exemple, <code>font-family: Courier, monospace </code>; </li>
					<li>De même, utiliser les familles génériques cursive et fantasy pour les polices manuscrites et fantaisies.</li>
				</ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/CSS/font"><code>font</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/font-family"><code>font-family</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans toutes les feuilles de style CSS (pour tous les media : screen, print, etc.)&nbsp;:</p><ul>
<li>Vérifier à l'aide d'un outil de développement d'un navigateur que chaque propriété <code>font</code> ou <code>font-family</code> contient l'un des termes relatifs aux familles génériques de police : <code>serif</code>, <code>sans-serif</code>, <code>monospace</code>, <code>cursive</code> ou <code>fantasy</code> ;</li>
					<li>Contrôler que ces termes sont situés en fin de liste pour chaque propriété <code>font</code> ou <code>font-family</code> ;</li>
					<li>S'assurer de la pertinence de la famille générique indiquée : <code>serif</code> pour les polices à empattements, <code>sans-serif</code> pour les polices sans empattements, <code>monospace</code>, <code>cursive</code> ou <code>fantasy</code> dans des cas particuliers. </li>
				</ul><p>La vérification peut également être effectuée en validant la page HTML à l'aide du validateur CSS du W3C (<a href="http://jigsaw.w3.org/css-validator/">http://jigsaw.w3.org/css-validator/</a>) qui avertit alors en cas d'absence de familles de police générique.</p>

---

## Vulgarisation

En pratique, les deux principales familles génériques utilisées sont serif et sans-serif. La famille monospace est généralement réservée à des contenus spécifiques, comme les exemples de code informatique.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/une-famille-generique-de-police-est-indiquee-comme-dernier-element-de-substitution/
- **API** : `https://api.opquast.com/checklist/190/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
