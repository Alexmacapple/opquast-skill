# Règle Opquast 166

> La navigation au clavier permet d'interagir avec l’intégralité des contenus et services.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 166 |
| **ID** | 54483 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La navigation au clavier permet d'interagir avec l’intégralité des contenus et services.

### English
Keyboard navigation allows users to interact with all content and services.

### Español
La navegación con el teclado permite interactuar con todos los contenidos y servicios.

---

## Objectifs

### Français
- Permettre la navigation au clavier pour les utilisateurs ayant une préférence pour cette pratique. 
- Permettre la consultation des contenus et l'utilisation des services indépendamment du périphérique d'entrée, afin de les rendre accessibles aux utilisateurs d'outils d'assistance (lecteurs d'écran, par exemple) qui n'utilisent que le clavier, ou un périphérique plus spécifique reposant sur les mêmes mécanismes que le clavier (bouton poussoir, par exemple).
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Allow keyboard navigation for users with a preference for that practice.
- Allow content to be accessed and services to be used, regardless of the input device, so as to make them accessible by users of technical aids (screen readers, for example) who only utilize the keyboard or a more specific device based on the same mechanisms as a keyboard (like a push button).
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir la navegación con el teclado a los usuarios que prefieran esta práctica. 
-  Permitir la consulta de contenidos y el uso de servicios independientemente del dispositivo de entrada.
-  Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Développement

---

## Explication pédagogique

La souris n’est pas le mode exclusif de navigation sur un site. Les utilisateurs qui ne voient pas l’emplacement du pointeur visuel et ceux qui souhaitent naviguer au clavier doivent pouvoir eux aussi visiter votre site.

---

## Solution recommandée

<p>Recourir à des gestionnaires d'événements universels en cas d'interaction basée sur Javascript (par exemple, <code>onclick</code> pour un lien <code>a</code> ou pour un champ ou contrôle de formulaire) ou, à défaut, compléter les gestionnaires d'événements non universels (<code>onmouseover</code> par exemple) par un second gestionnaire permettant l'accès clavier (<code>onfocus</code> par exemple) ou encore fournir un moyen d'accès alternatif.</p>

---

## Méthode de vérification

<p>Cette vérification s'applique à l'ensemble des éléments interactifs&nbsp;: hyperliens, boutons, champs de formulaires, widgets Javascript, etc. Le mode d'interaction par défaut est la touche tabulation pour atteindre les liens, les champs et les contrôles, puis la touche entrée pour les activer. Dans certains widgets, un mode d'interaction spécifique peut être présent : barre d'espace pour valider, touches flèches pour se déplacer, touche d'échappement pour fermer ou sortir. Autant que possible dans ce cas, ces touches spécifiques devraient être indiquées à l'utilisateur.</p>
<p>Au sein de chaque page examinée : </p><ul>
<li>Vérifier que l'ensemble des interactions, liens, boutons, champs de formulaires, présents dans les pages sont utilisables au clavier, à l'exception de ceux pour lesquels cela n'aurait pas de sens, comme une fonctionnalité de tracé à la souris. </li>
</ul>

---

## Vulgarisation

L’exigence de compatibilité avec la navigation clavier s’applique à toutes les interactions, à l’exception de celles qui reposent exclusivement sur un tracé accompli à l’aide de la souris (par exemple, un dispositif de dessin à main levée). Il s’applique donc, par exemple, aux systèmes de glisser-déposer et à tous les composants d’interface. Deux modes d’interaction au clavier sont possibles. Le premier utilise les touches Tab pour le déplacement et Entrée pour l’activation. Le second recourt aux touches flèches pour le déplacement, barre d’espace pour l’activation, Échap pour l’annulation, etc. Il convient de privilégier le premier mode pour les pages de contenu, les formulaires ou les composants simples. Le second mode devrait être réservé aux composants d’interface plus complexes (ex. datepicker).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-est-integralement-utilisable-au-clavier/
- **API** : `https://api.opquast.com/checklist/166/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
