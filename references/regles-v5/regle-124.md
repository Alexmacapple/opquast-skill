# Règle Opquast 124

> Les vidéos sont déclenchées par l'utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 124 |
| **ID** | 54480 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les vidéos sont déclenchées par l'utilisateur.

### English
Videos are user-triggered.

### Español
Los videos son activados por el usuario.

---

## Objectifs

### Français
- Laisser à l’utilisateur le contrôle de l’interface visuelle lors de la consultation du site. 
- Ne pas imposer à l’utilisateur le déclenchement d’un contenu animé.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow the user to control the video content when consulting the site.
- Do not impose for the user the automatic triggering of video or any animated content.
- Improve the accessibility of content for people with disabilities.

### Español
- El usuario tiene el control de la interfaz visual cuando consulta el sitio web.
- No imponer al usuario la activación del contenido animado.

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

Le déclenchement automatique des vidéos est à double tranchant. D’un côté vous « poussez » le contenu vidéo vers vos utilisateurs, vous rendez votre site plus dynamique (jeune, frais, sexy, etc.). De l’autre, vous envoyez des données en quantité importante sans l’accord explicite des utilisateurs, vous prenez le risque d’augmenter le taux de rebond, de nuire à votre référencement. Si vous déclenchez vos vidéos automatiquement (en autoplay), comme le font certains réseaux sociaux, vous prenez le risque de voir certains utilisateurs accéder à des contenus dangereux ou inappropriés pour certains publics, surtout si vous diffusez de la vidéo en direct. Bref, avant de déclencher automatiquement vos vidéos, réfléchissez bien.

---

## Solution recommandée

<p>Ne pas mettre en place des contenus vidéo dont le démarrage est automatique et sans action explicite de l'utilisateur en ce sens.</p><p>Ne pas incorporer dans la page d'éléments déclenchant la lecture d'une vidéo non contrôlable par exemple avec l'élément html <code>vidéo</code> doté de l'attribut <code>autoplay</code> ou sans l'attribut <code>controls</code>.</p>

---

## Méthode de vérification

<p>Dans chaque page comportant un contenu vidéo : </p><ul>
<li>Vérifier l'absence de contenus vidéo activés automatiquement au chargement de la page ;</li>
<li>Vérifier l'absence de contenus vidéos activés de manière imprévisibles suite à une action de l'utilisateur.</li></ul>

---

## Vulgarisation

Le déclenchement automatique d'une vidéo peut être très intrusif pour l'utilisateur, dans de multiples contextes. Il peut également bloquer l'accès au contenu dans le cas d'un utilisateur interagissant avec la page via un lecteur d'écran, dont le son sera fréquemment couvert par celui de la vidéo. Laisser l'initiative du déclenchement des vidéos, image et son, à l'utilisateur, établit d'entrée de jeu un rapport respectueux de ses préférences et de ses besoins.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-videos-sont-declenchees-par-lutilisateur/
- **API** : `https://api.opquast.com/checklist/124/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
