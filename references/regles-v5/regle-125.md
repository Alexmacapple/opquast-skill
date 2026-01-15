# Règle Opquast 125

> Les sons sont déclenchés par l'utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 125 |
| **ID** | 54519 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les sons sont déclenchés par l'utilisateur.

### English
Sounds are user-triggered.

### Español
Los sonidos son activados por el usuario.

---

## Objectifs

### Français
- Laisser à l'utilisateur le contrôle du son lors de la consultation du site. 
- Ne pas surprendre l'utilisateur par la diffusion inattendue d'un contenu audio. 
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Give the user control over the visual and auditory interface when visiting a website.
- Do not surprise the user by unexpectedly playing audio content.
- Improve the accessibility of content for people with disabilities.

### Español
- Dejar que el usuario controle el sonido cuando visite el sitio web.
- No sorprender al usuario con un contenido de audio inesperado. 
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- Écoconception

### Thématiques
- Images et médias

### Phases projet
- Développement

---

## Explication pédagogique

Il est 23 heures, les enfants dorment, vous naviguez sur Internet et, brutalement, un site déclenche un son tonitruant. Vous sursautez, puis vous cherchez fébrilement comment couper le son, car, oui, vous aviez oublié d’éteindre vos enceintes. C’est du vécu, n’est-ce pas ? Alors, ne déclenchez pas de son automatiquement dans votre site. S’il vous plaît.

---

## Solution recommandée

<p>Ne pas mettre en place des contenus audio dont le démarrage est automatique et sans action explicite de l'utilisateur en ce sens.</p><p>Ne pas incorporer dans la page d'éléments déclenchant la lecture d'un son non contrôlable par exemple avec l'élément html <code>audio</code> doté de l'attribut <code>autoplay</code> ou sans l'attribut <code>controls</code>.</p>

---

## Méthode de vérification

<p>Dans chaque page comportant un contenu audio : </p><ul>
<li>Vérifier l'absence de contenus audio activés automatiquement au chargement de la page ;</li>
<li>Vérifier l'absence de contenus audio activés de manière imprévisibles suite à une action de l'utilisateur.</li></ul>

---

## Vulgarisation

Le démarrage automatique d’un contenu audio est fréquemment vécu comme particulièrement intrusif ou dérangeant par les utilisateurs. C’est aussi le cas lorsque leurs actions dans la page (activation d’un lien par exemple) produit de manière inattendue le déclenchement d’un contenu sonore. Toute action de ce type doit être entièrement sous le contrôle de l’utilisateur, qu’il faut, si nécessaire, avertir au préalable du comportement de l’interface.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-sons-sont-declenches-par-lutilisateur/
- **API** : `https://api.opquast.com/checklist/125/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
