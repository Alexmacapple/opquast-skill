# Règle Opquast 162

> Les nouvelles fenêtres dimensionnées et les fenêtres modales sont dotées d'un bouton de fermeture explicite.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 162 |
| **ID** | 54192 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les nouvelles fenêtres dimensionnées et les fenêtres modales sont dotées d'un bouton de fermeture explicite.

### English
Newly dimensioned windows and modal windows are equipped with an explicit close button.

### Español
Las ventanas de nueva dimensión y las ventanas modales tienen un botón de cierre explícito.

---

## Objectifs

### Français
- Donner aux utilisateurs des indications explicites pour fermer une fenêtre ou une boîte modale. 
- Accélérer l’accès aux contenus.

### English
- Give users explicit information.
- Speed up access to the content.

### Español
- Dar a los usuarios instrucciones explícitas sobre cómo cerrar una ventana o caja modal. 
- Acelerar el acceso a los contenidos..

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Fermer une fenêtre de navigateur vous semble évident ? Ce n’est pas le cas pour tous les utilisateurs, certains (seniors, malvoyants, usagers mobiles ou débutants) peuvent avoir des difficultés. Alors, pensez à eux.

---

## Solution recommandée

<p>Placer, dans chaque fenêtre dimensionnée ou modale, un bouton ou un lien avec un libellé explicite pour la fermeture et associer ce bouton à une action de fermeture.</p>

---

## Méthode de vérification

<p>Pour chaque fenêtre «&nbsp;réelle&nbsp;» (popup dimensionnée) ou chaque fenêtre simulée affichée en surimpression du contenu (fenêtre modale), et ce, quelle que soit la technologie utilisée : </p>
<ul>
<li>Vérifier que le corps des fenêtres dimensionnées et des fenêtres modales contient un bouton ou un lien permettant de les fermer ; </li>
<li>Vérifier que le libellé du bouton ou du lien de fermeture est explicite.</li>
</ul>
<p>Les fenêtres dont la fermeture ne se fait qu'implicitement, par exemple via la touche d'échappement, invalident cette bonne pratique.</p>

---

## Vulgarisation

Les modes de fermeture des fenêtres modales peuvent être très divers (touche Échap, clic en dehors de la fenêtre, etc.), mais seront souvent peu connus a priori des utilisateurs.
Le bouton ou lien de fermeture d’une fenêtre modale est généralement le premier lien atteint lors de la navigation au clavier après l’affichage de la fenêtre. Le bouton, si c’est le choix retenu, est une icône de navigation qui devrait être dotée d’une légende explicite.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-nouvelles-fenetres-dimensionnees-et-les-fenetres-modales-sont-dotees-dun-bouton-de-fermeture-explicite/
- **API** : `https://api.opquast.com/checklist/162/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
