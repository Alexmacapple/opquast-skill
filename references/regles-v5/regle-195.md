# Règle Opquast 195

> Des styles dédiés à l'impression sont proposés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 195 |
| **ID** | 54490 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Des styles dédiés à l'impression sont proposés.

### English
Styles dedicated to printing are offered.

### Español
Se ofrecen estilos específicos para impresión.

---

## Objectifs

### Français
- Permettre l'impression des contenus sous une forme appropriée au support.

### English
- Allow content to be printed in a form that is appropriate to the medium.

### Español
-  Permitir la impresión del contenido en una forma adecuada al medio.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- Écoconception

### Thématiques
- Présentation

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Il est parfaitement possible de prévoir la façon dont le contenu d’une page doit s’imprimer sur papier. Les feuilles de styles pour le média print sont là pour ça.

---

## Solution recommandée

<p>Fournir une feuille de style spécifique pour le type de media print, par exemple sous la forme : &lt;<code>link rel="stylesheet" type="text/css" href="print.css" media="print" /&gt;</code>.</p><p>Les styles d'impression peuvent corriger une feuille de style globale (feuille de style pour le media all ou sans mention du media) ou bien s'appliquer seuls pour le media print si la feuille de style d'affichage est appelée en précisant le media print.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/link"><code>link</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/style"><code>style</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Cette règle peut être évaluée rapidement en testant l'aperçu avant impression dans le navigateur, mais sa confirmation nécessite l'examen du code pour détecter la présence d'un style d'impression pour le media print, qui peut être&nbsp;: </p><ul>
<li>Sous forme d'une balise du type &lt;link rel="stylesheet" type="text/css" media="print" href="print.css" /&gt; ;</li>
					<li>Sous forme d'une balise du type &lt;style media="print" type="text/css"&gt;…&lt;/style&gt; ;</li>
					<li>Sous forme d'une règle <code>@media print {…}</code> dans une CSS interne ou externe ;</li>
					<li>Ou sous forme d'une règle <code>@import url("print.css")</code> <code>print;</code> dans une CSS interne ou externe.</li>
				</ul>

---

## Vulgarisation

Une feuille de styles d’impression dispense de publier une version HTML spécifique pour l’impression. Elle peut notamment :
•adapter la typographie au support papier : passage de polices de texte en serif, dimensionnement des tailles de caractères en points, augmentation éventuelle de l’interlignage ;
•ne conserver que le contenu propre des pages, en masquant les blocs de navigation, en adaptant les en-têtes et pieds de pages ;
•enrichir le contenu en générant pour chaque lien la mention de son URL (dans la propriété content et le pseudo-élément :after).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-propose-des-styles-dedies-a-limpression/
- **API** : `https://api.opquast.com/checklist/195/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
