# Règle Opquast 126

> Les animations, sons et clignotements peuvent être mis en pause.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 126 |
| **ID** | 54437 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les animations, sons et clignotements peuvent être mis en pause.

### English
Video content and animations, sounds and flashes can be paused.

### Español
Las animaciones, los sonidos y los destellos pueden ser pausados.

---

## Objectifs

### Français
- Laisser à l'utilisateur le contrôle des animations lors de la consultation du contenu. 
- Ne pas perturber l'attention en imposant des éléments pouvant gêner celle-ci. 
- Permettre la consultation pas à pas d'animations séquentielles ou de contenus sonores.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Give the user control over video and any animations when viewing content.
- Do not distract the user’s attention by forcing elements on them that might annoy them.
- Allow sequential animations and sound content to be accessed step by step.
- Improve the accessibility of content for people with disabilities.

### Español
- Dejar que el usuario controle las animaciones cuando vea el contenido. 
-  No molestar al usuario imponiendo elementos que puedan perturbarle. 
- Permitir la consulta paso a paso de animaciones secuenciales o contenidos de sonido.
-  Mejorar la accesibilidad de los contenidos para las personas discapacitadas.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Images et médias

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Au début, ça va, et puis au bout d’un moment, ça énerve. Il fut un temps où, au moins dans certains navigateurs, la touche Échap interrompait les GIF animés, sans toutefois permettre de les consulter pas à pas. Mais ce temps semble révolu, et surtout, mieux vaut demander aux administrateurs de sites de ne pas faire aux autres ce qu’ils ne voudraient pas qu’on leur fasse : outre les GIF animés, il y a les contenus défilants, les machins qui clignotent, etc. Sans compter les grosses basses qui font sursauter tout l’open space.

---

## Solution recommandée

<p>Dès lors qu'une animation visuelle a une durée de plus de 5 secondes ou qu'un son a une durée de plus de 3 secondes, doter systématiquement l'objet multimédia des moyens de contrôle nécessaires&nbsp;: démarrage, arrêt, muet ou volume.</p><p>Ne pas utiliser de graphismes animés non contrôlables, ou encore partiellement contrôlables par l'utilisateur (images gif animées en particulier).</p>

---

## Méthode de vérification

<p>Dans chaque page contenant une animation visuelle d'une durée de plus de 5 secondes ou un son d'une durée de plus de 3 secondes :</p><ul>
<li>Contrôler la possibilité de stopper l'animation, le son ou le clignotement (pause, redémarrage, volume sonore le cas échéant).</li>
</ul><p>Il existe une grande variété de moyens techniques permettant d'inclure une animation dans une page : balisage, propriété CSS, images animées, Javascript, SVG, etc. La vérification de cette bonne pratique nécessite donc un examen au cas par cas de chaque page concernée.</p>

---

## Vulgarisation

Pour certains publics, le déclenchement automatique d’animations ou de sons au chargement de la page rend la consultation et la lecture du contenu très difficiles, voire impossibles. Les animations imposées ne sont à vrai dire guère appréciées par les internautes : le minimum est donc d’autoriser leur interruption. Pour leur part, les animations et sons déclenchés par l’utilisateur nécessitent également de pouvoir être contrôlés afin d’en faciliter la consultation.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-animations-sons-et-clignotements-peuvent-etre-mis-en-pause/
- **API** : `https://api.opquast.com/checklist/126/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
