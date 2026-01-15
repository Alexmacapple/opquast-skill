# Règle Opquast 167

> La navigation au clavier s'effectue dans un ordre prévisible.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 167 |
| **ID** | 54174 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La navigation au clavier s'effectue dans un ordre prévisible.

### English
Keyboard navigation is set up in a predictable order.

### Español
La navegación con el teclado se realiza en un orden predecible.

---

## Objectifs

### Français
- Faciliter la navigation au clavier.
- Permettre aux utilisateurs de clavier de se doter de repères de navigation.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Enable keyboard navigation.
- Not to confuse the user.
- Improve the accessibility of content for people with disabilities.

### Español
- Facilitar la navegación con el teclado.
-  Permitir a los usuarios de teclado tener referencias de navegación.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Développement

---

## Explication pédagogique

De nombreux utilisateurs naviguent sans souris, avec les touches de leur clavier : facilitez-leur la vie.

---

## Solution recommandée

<p>Organiser les contenus dans l'ordre linéaire du code HTML de manière à regrouper et ordonner logiquement les liens et les contrôles de formulaires qui apparaissent les uns à la suite des autres à l'affichage et ordonner logiquement les principaux blocs de navigation et de contenu composant la page.</p>
<p>Le cas échéant, et en dernier ressort, recourir à l'attribut HTML <code>tabindex</code> pour créer un ordre de navigation au clavier spécifique, différent de l'ordre par défaut issu de l'organisation des liens et des contrôles de formulaires dans le code.</p>
<p>Gérer spécifiquement l'ordre de navigation au clavier en cas de fenêtre modale ou de widget.</p>

---

## Méthode de vérification

<p>Ce contrôle s'effectue sur l'ensemble des éléments interactifs, prioritairement à l'aide de la touche tabulation et, dans l'interface de certains widgets, à l'aide de touches de déplacement spécifiques (touches flèches) : </p>
<ul>
<li>Naviguer au clavier puis vérifier que l'ordre de passage d'un élément à un autre est identique entre les différentes pages ; </li>
<li>Vérifier que l'ordre de passage est adapté au contenu concerné. Par exemple, la navigation clavier dans une pseudo-popup javascript commence par son bouton de fermeture
</li>
<li>Contrôler que l'ordre est prévisible par l'utilisateur : sauf exceptions, cet ordre doit être aussi proche que possible de l'ordre de lecture, par exemple haut-bas et gauche-droite pour les écritures lisibles de gauche à droite.</li>
</ul>

---

## Vulgarisation

Le caractère prévisible de l’ordre de navigation au clavier ne signifie pas forcément qu’elle s’effectue rigoureusement dans le sens gauche-droite et haut-bas entre les différents blocs. Il peut être tout à fait satisfaisant, par exemple dans une page où la colonne centrale de contenu est flanquée de chaque côté par une colonne de navigation, d’aller de la colonne de gauche à la colonne de droite avant d’atteindre la colonne centrale, c’est-à-dire de suivre un ordre « navigation » puis « zone de contenu ».
La navigation dans un menu horizontal (onglets par exemple) devrait cependant systématiquement commencer à gauche (sauf si le contenu est dans une langue se lisant de droite à gauche).
L’un des principaux ennemis de l’ordre de navigation au clavier est la mise en page CSS basée sur le positionnement absolu des éléments, indépendamment de leur ordre dans le code HTML.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible/
- **API** : `https://api.opquast.com/checklist/167/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
