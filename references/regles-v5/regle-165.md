# Règle Opquast 165

> Le focus clavier n'est ni supprimé ni masqué.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 165 |
| **ID** | 54514 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le focus clavier n'est ni supprimé ni masqué.

### English
Keyboard focus isn't removed or masked.

### Español
El foco del teclado no se suprime ni se oculta.

---

## Objectifs

### Français
- Permettre la navigation au clavier ou via des périphériques d'entrées ou des dispositifs qui ne reposent pas sur la souris.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Allow navigation using the keyboard or input devices or other mechanisms that are not reliant on the mouse.

### Español
-  Habilitar la navegación con el teclado o mediante dispositivos de entrada o dispositivos que no dependen del ratón.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Le focus clavier signale où se trouve le curseur dans une page. Pour le voir pendant que vous naviguez sur un site, appuyez sur la touche Tabulation de votre clavier, vous le verrez changer d’emplacement dans la page. Si vous ne le voyez pas, c’est peut-être que le créateur du site a eu la mauvaise idée de le supprimer ou de le masquer.

---

## Solution recommandée

<p>Veiller à ne pas masquer ou supprimer l'effet visuel de prise de focus qui indique quel est l'élément atteint lors de la navigation au clavier. En particulier, ne pas annuler la valeur par défaut de la propriété CSS <code>outline</code> sans la remplacer par une autre valeur personnalisée ou un effet visuel suffisamment perceptible.</p><p>Ne pas supprimer via Javascript la prise de focus clavier (exploitation de l'événement <code>onblur</code>).</p>

---

## Méthode de vérification

<p>Ce contrôle s'effectue sur l'ensemble des éléments interactifs, prioritairement à l'aide de la touche tabulation et, dans l'interface de certains widgets, à l'aide de touches de déplacement spécifiques (touches flèches). </p><p>Pour chaque élément interactif contenu dans les pages examinées&nbsp;: </p>
<ul>
<li>Vérifier que l'indication visuelle du focus par défaut du navigateur est au moins présente ou qu'une indication visuelle spécifique a été aménagée.</li>
</ul>

---

## Vulgarisation

L’indication du focus clavier est indispensable pour identifier le lien ou le contrôle de formulaire actif lors de la navigation au clavier. Cette indication, dont la forme dépend du navigateur, est généralement discrète et peut sembler difficilement perceptible. Il est possible ou tentant d’en améliorer la visibilité à l’aide des styles CSS (changement de couleurs ou soulignement lors du focus clavier, utilisation d’un changement d’arrière-plan reproduisant le comportement adopté par le navigateur Opera, par exemple). Cependant, cela produit parfois un résultat déroutant ou inattendu pour certains utilisateurs. Il est donc préférable de s’en tenir à la mise en forme par défaut.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-focus-clavier-nest-ni-supprime-ni-masque/
- **API** : `https://api.opquast.com/checklist/165/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
