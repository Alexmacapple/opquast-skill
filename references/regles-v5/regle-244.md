# Règle Opquast 244

> La linéarisation des tableaux utilisés pour la mise en page ne nuit pas à la compréhension des contenus.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 244 |
| **ID** | 54533 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La linéarisation des tableaux utilisés pour la mise en page ne nuit pas à la compréhension des contenus.

### English
Linearising tables used for layout does not impede the understanding of contents

### Español
La versión lineal de una tabla no impide la comprensión de los contenidos

---

## Objectifs

### Français
- Fournir un contenu compréhensible aux utilisateurs dont l'agent utilisateur ou l'aide technique (lecteur d'écran) ne permet pas de restituer la mise en forme initialement prévue à l'aide d'un tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Supply content that is understandable to users whose user agents or technical aids (screen readers) cannot reconstruct the formatting that was initially defined by a table.

### Español
- Proporcionar un contenido comprensible a los usuarios cuyo agente de usuario o ayuda técnica (lector de pantalla) no les permita reproducir el formato inicialmente previsto mediante una tabla.
- Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Structure et code

### Phases projet
- Développement

---

## Explication pédagogique

Une page vocalisée va être lue de manière linéaire, dans l’ordre où son contenu apparaît dans le code HTML. Il arrive alors que la linéarisation des tableaux de mise en page vienne casser le sens de la page.

---

## Solution recommandée

<p>Regrouper dans une même cellule <code>td</code> les informations qui doivent être verticalement associées (ne pas les répartir dans des cellules placées dans des lignes successives du tableau).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/td"><code>td</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque tableau de mise en forme, c'est-à-dire pour chaque tableau ne comportant pas de donnée reliée à des en-têtes de ligne ou de colonne : </p><ul>
<li>Procéder à la linéarisation de l'affichage à l'aide d'un outil de développement.</li>
					<li>Vérifier que le contenu linéarisé reste compréhensible, sans incohérence ni perte d'information.</li>
				</ul>

---

## Vulgarisation

Le recours limité aux tableaux de mise en forme se justifiait lorsque les techniques de mise en page CSS n’étaient pas suffisamment implémentées par tous les navigateurs, ce qui est rarissime aujourd’hui. Cette règle reste cependant pertinente pour contrôler le niveau de risque dans le cas, par exemple, de pages anciennes qu’on souhaite garder en ligne en limitant la charge de correction.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-linearisation-des-tableaux-utilises-pour-la-mise-en-page-ne-nuit-pas-a-la-comprehension-des-contenus/
- **API** : `https://api.opquast.com/checklist/244/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
