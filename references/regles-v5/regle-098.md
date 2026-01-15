# Règle Opquast 98

> Les boutons désactivés ne sont pas masqués aux lecteurs d'écran.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 98 |
| **ID** | 54551 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les boutons désactivés ne sont pas masqués aux lecteurs d'écran.

### English
Disabled buttons are not hidden from screen readers.

### Español
Los botones desactivados no se ocultan a los lectores de pantalla.

---

## Objectifs

### Français
- Veiller à ce que les actions possibles ou indisponibles pendant la saisie d'un formulaire soient compréhensibles pour tous les utilisateurs.
- Ne pas créer d’incohérence entre ce qui est affiché et ce qui est utilisable.
- Expliciter pour tous les utilisateurs la présence et l’état d’une bouton d’action, quel que soit le mode d’accès.

### English
- Ensure that forms are understandable in a screen reader.
- Inform the user about actions that are possible or unavailable while filling out a form.

### Español
- Asegurarse de que los formularios sean comprensibles en un lector de pantalla.
- Informar al usuario sobre las acciones posibles o no disponibles durante la introducción de datos en un formulario.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Un bouton de validation désactivé et grisé, dans un formulaire que vous n’avez pas encore suffisamment rempli, cela semble très intuitif. Ce choix ergonomique est possible, quoique délicat. Mais notamment pour des utilisateurs d’outils d’accessibilité (et pas seulement eux), c’est une toute autre affaire. Si vous décidez de le faire, pour répondre à des besoins spécifiques bien réfléchis, prenez toutes les précautions nécessaires.

---

## Solution recommandée

<p>Pour que l’interface soit compréhensible, l’élément et son statut (désactivé/activé) doivent être restitués quel que soit le mode d’interaction (outils d'assistance ou non). L’action étant empêchée jusqu'au moment où le formulaire peut être validé, la raison et l'état du bouton doivent être explicites&nbsp;:</p>
<ul>
<li>Ne pas utiliser l’attribut HTML <code>disabled</code>, pour que l’utilisateur ne soit pas déconcerté par l’éventuelle absence de bouton de soumission, notamment quand un bouton (visible pour certains) n'est plus atteignable lors de la navigation au clavier,</li>
<li>Utiliser l’attribut <code>aria-disabled="true"</code> pour que le bouton reste perceptible, atteignable et signalé comme tel,</li>
<li>Utiliser JavaScript pour bloquer l’action sur le bouton  au clic et au clavier, puis sa réactivation,</li> 
<li>Utiliser <code>aria-describedby</code> ou <code>aria-label</code> pour expliquer pourquoi le bouton est indisponible/disponible. </li>
<li>Utiliser JavaScript pour expliquer pourquoi le bouton "grisé" est indisponible lors du survol ou de l'accès clavier, via un tooltip ou autre. </li>
</ul>

---

## Méthode de vérification

Vérifier que les boutons désactivés en cours de saisie n'utilisent pas l'attribut <code>disabled</code>, et qu'ils sont correctement restitués de façon compréhensible à chaque état de l'utilisation du formulaire, que ce soit visuellement, lors de la navigation au clavier, ou via un lecteur d'écran ou autre.

---

## Vulgarisation

L’attribut disabled a pour effet de rendre un bouton inactif, mais il présente un inconvénient majeur : certains lecteurs d’écran ignorent totalement les éléments marqués ainsi et ne les annoncent pas à l’utilisateur. Résultat : une personne non-voyante ne saura même pas qu’une action est prévue à cet endroit de l’interface. Pour éviter cette perte d’information, il est recommandé d’utiliser plutôt aria-disabled="true", qui conserve le bouton dans le flux accessible tout en signalant clairement qu’il n’est pas activable. Cette approche garantit que l’information « bouton désactivé » est transmise correctement, assurant une expérience cohérente entre utilisateurs voyants et non-voyants, et renforçant ainsi l’accessibilité et la transparence de l’interface.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-boutons-desactives-ne-sont-pas-masques-aux-lecteurs-decran/
- **API** : `https://api.opquast.com/checklist/98/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
