# Règle Opquast 242

> Les cellules des tableaux de données sont reliées à leurs entêtes.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 242 |
| **ID** | 54399 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les cellules des tableaux de données sont reliées à leurs entêtes.

### English
Cells in data tables are linked to their headers

### Español
Las celdas de las tablas de datos están vinculadas a sus cabeceras

---

## Objectifs

### Français
- Permettre aux aides techniques de restituer l'information contenue dans les tableaux de données de manière compréhensible, en indiquant à l'utilisateur les relations logiques entre contenu et entêtes du tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow technical aids to return the information contained in data tables in a comprehensible way, by informing users of the logical relationships between the table’s content and headers. 

### Español
-  Permitir que las ayudas técnicas hagan comprensible la información contenida en los cuadros de datos, indicando al usuario las relaciones lógicas entre el contenido y los encabezamientos de los cuadros.
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

Certains internautes vocalisent les contenus web grâce à des aides techniques. Un tableau très clair à l’écran peut devenir totalement incompréhensible en mode vocal. Il est pourtant assez facile de prévoir ce cas de figure.

---

## Solution recommandée

<p>Utiliser l'élément HTML <code>th</code> et son attribut <code>scope</code> pour baliser les cellules d'en-têtes et expliciter leur portée (<code>scope</code> de valeur <code>col</code> pour un en-tête de colonne, de valeur <code>row</code> pour un en-tête de ligne).</p><p>Pour les en-têtes qui ne s'appliquent qu'à une partie d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut <code>id</code> pour l'élément <code>th</code> et de l'attribut <code>headers</code> pour les éléments <code>td</code> avec les valeurs appropriées&nbsp;:</p><ul>
<li>Donner à chaque en-tête (élément <code>th</code>) un attribut <code>id</code> (par exemple, <code>id="foo"</code>) ;</li>
					<li>Utiliser l'attribut <code>headers</code> dans chaque cellule (élément <code>td</code>) pour indiquer les en-têtes associées (par exemple, <code>headers="foo"</code> pour chaque cellule rattachée à l'en-tête ayant l'attribut <code>id="foo"</code>).</li>
				</ul>

<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/th"><code>th</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/td"><code>td</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans le code généré des tableaux de données&nbsp;:</p><ul>
<li>Vérifier l'utilisation systématique de l'élément <code>th</code> pour baliser les en-têtes de ligne ou de colonne ;</li>
					<li>Pour les en-têtes s'appliquant à la totalité d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut <code>scope</code> doté de la valeur appropriée (<code>row</code> pour une ligne ou <code>col</code> pour une colonne) ;</li>
					<li>Pour les en-têtes qui ne s'appliquent qu'à une partie d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut <code>id</code> pour l'élément <code>th</code> et de l'attribut <code>headers</code> pour les éléments <code>td</code> avec les valeurs appropriées&nbsp;:</li>
					<li>Chaque en-tête (élément <code>th</code>) doit être dotée d'un attribut <code>id</code> (par exemple, <code>id="foo"</code>) ;</li>
					<li>L'attribut headers doit être utilisée dans chaque cellule (élément <code>td</code>) pour indiquer les en-têtes associées (par exemple, <code>headers="foo" </code>pour chaque cellule rattachée à l'en-tête ayant l'attribut <code>id="foo"</code>).</li>
				</ul>

---

## Vulgarisation

Les difficultés d’utilisation de la technique id/headers invitent actuellement à privilégier les tableaux simples (quitte à morceler le cas échéant un tableau complexe en plusieurs tableaux simples) pour tirer parti du déploiement plus simple de la technique des scope. La prise en charge de scope dans les aides techniques a été plus tardive que celle des id/headers, mais peut à présent être considérée comme suffisante pour s’en tenir à cette solution quand le type de tableau l’autorise. Il faut aussi se souvenir qu’un tableau complexe risque fort d’être obscur pour tous les utilisateurs, indépendamment du problème d’accessibilité au sens strict : autant les éviter autant que possible au profit de tableaux plus simples.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-cellules-des-tableaux-de-donnees-sont-reliees-a-leurs-en-tetes/
- **API** : `https://api.opquast.com/checklist/242/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
