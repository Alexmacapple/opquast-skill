# Règle Opquast 185

> Un contenu qui doit être restitué dans un lecteur d'écran ne lui est pas dissimulé.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 185 |
| **ID** | 54444 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Un contenu qui doit être restitué dans un lecteur d'écran ne lui est pas dissimulé.

### English
Content that needs to be reproduced by screen readers is not hidden from them.

### Español
El contenido que tiene ser reproducido en un lector de pantalla no está oculto para este lector de pantalla.

---

## Objectifs

### Français
- Faciliter l’adaptation du rendu au média (mobile ou autre) ou aux besoins de l’utilisateur (agrandissement de la taille des caractères, modification des couleurs, de la police, de la graisse, de la justification, etc.). 
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Ensure the correct reproduction of masked content to be read by screen readers.
- Improve the accessibility of content for people with disabilities.

### Español
- Facilitar la adaptación de la visualizacion del texto a los medios (móviles u otros) o a las necesidades del usuario (ampliación del tamaño de la letra, cambio de colores, tipografía, gordura, justificación, etc.).
- Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Certaines propriétés CSS permettent de rendre certains contenus invisibles à l’écran. Le problème est que ces contenus risquent de disparaître aussi pour des utilisateurs qui ont besoin de les consulter. Sachez donc les masquer avec les bons outils.

---

## Solution recommandée

<p>Sauf si le contenu concerné est destiné à être rendu visible et perceptible sur action de l’utilisateur (onglets, menus déroulants, etc.) :</p><ul><li>Ne pas utiliser les propriétés display et visibility pour masquer le contenu.</li><li>Ne pas utiliser l’attribut HTML hidden pour masquer le contenu.</li><li>Ne pas donner au contenu un attribut ARIA aria-hidden="true".</li><li>Ne pas utiliser le paramètre wmode d’un objet Flash avec les valeurs transparent ou opaque.</li></ul><p></p><div>Utiliser :</div><div><ul><li>les propriétés CSS permettant de positionner le contenu en dehors de la zone d’affichage du navigateur (position, text- indent) ou de le rogner (clip) ;</li><li>les propriétés ARIA permettant d’associer un libellé à un contenu (aria-label, aria-labelledby, aria-describedby) ;</li><li>ou, dans le cas d’une étiquette de champ de formulaire, l’attribut title de celui-ci.</li></ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/CSS/display"><code>display</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/CSS/visibility"><code>visibility</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans le code généré et dans les feuilles de styles CSS des pages examinées :</p><p></p><ul><li>Détecter, à l’aide d’un inspecteur de code, des contenus qui seraient masqués à l’affichage (en dehors de ceux destinés à être rendus visibles sur action de l’utilisateur).</li><li>Vérifier qu’aucun de ces contenus n’utilise les techniques indiquées dans la mise en œuvre s’ils sont destinés à être restitués dans un lecteur d’écran.</li></ul><p></p><ul>
				</ul>

---

## Vulgarisation

Une page web peut généralement se passer de contenus qui seraient masqués à l’affichage et qui sont réservés aux lecteurs d’écran. En effet, sauf exception, l’information pertinente est la même pour tous les utilisateurs. Il existe d’autre part des moyens spécifiques permettant de gérer des informations masquées visuellement mais qui doivent tout de même être accessibles.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/un-contenu-qui-doit-etre-restitue-dans-un-lecteur-decran-ne-lui-est-pas-dissimule/
- **API** : `https://api.opquast.com/checklist/185/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
