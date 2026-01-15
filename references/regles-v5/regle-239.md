# Règle Opquast 239

> Aucune redirection ou rafraîchissement automatique côté client n'est imposée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 239 |
| **ID** | 54524 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Aucune redirection ou rafraîchissement automatique côté client n'est imposée.

### English
No automatic redirection or auto-refresh is imposed on the client side.

### Español
No se impone ninguna redirección ni actualización automática del lado cliente.

---

## Objectifs

### Français
- Laisser à l’utilisateur le contrôle de son navigateur et de son interface de consultation
- Éviter des coupures ou des pertes d’information en cours de lecture, notamment pour les utilisateurs équipés de lecteurs d’écran qu’un rafraîchissement ou une redirection temporisée interromprait lors de la consultation.
- Ne pas pénaliser la consultation du contenu en mobilité lorsque la qualité du réseau est variable sur une courte échelle de temps.
- Permettre à l’utilisateur d’éviter un surcroît non désiré de coût d’utilisation des données mobiles.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Allow users to maintain control over their work environments and prevent cut-offs or losses of information while reading, particularly for users with screen readers whose functions would be interrupted by a timed refresh or redirect.
- Do not penalize mobile users trying to access content when their network signal is variable over short periods of time.
- Prevent unwanted increases in the cost to users of using mobile data.

### Español
- Dejar que el usuario controle su navegador y la interfaz de navegación
- Evitar las interrupciones o la pérdida de información durante la lectura, especialmente para los usuarios equipados con lectores de pantalla que se verían interrumpidos por un refresco o una redirección cronometrada durante la consulta.
- No penalizar la consulta de contenidos móviles cuando la calidad de la red es variable en una escala de tiempo corta.
- Permitir al usuario evitar un aumento indeseado del costo de la utilización de los datos móviles.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Structure et code

### Phases projet
- Développement

---

## Explication pédagogique

Les redirections côté client affichent brièvement une première page puis envoient automatiquement l’utilisateur vers une autre page. Le rafraîchissement automatique recharge automatiquement la page courante sans que l’utilisateur en fasse la demande.

---

## Solution recommandée

<p>Ne pas utiliser l’élément <code>meta http-equiv="refresh"</code>.</p><p>Fournir à l’utilisateur un moyen de désactiver les éventuels rafraîchissements automatiques et les redirections créées :</p><ul><li>en JavaScript ;</li><li>via un élément <code>object, embed ou applet</code> ;</li><li>ou via un <code>en-tête HTTP refresh</code>.</li>
				</ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta"><code>meta</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque page examinée :</p><ul><li>Vérifier, à l’aide d’un inspecteur de code, l’absence de l’élément <code>meta http-equiv="refresh"</code>.</li><li>Vérifier que la consultation de la page ne révèle aucun rafraîchissement automatique ni aucune redirection côté client qui ne soient désactivables auparavant via l’interface du site (sans devoir faire appel à une éventuelle fonctionnalité propre au navigateur).</li></ul><p>La détection de l’élément <code>meta http-equiv="refresh"</code> est aisée en observant le code source de la page. En revanche, la diversité des dispositifs JavaScript de rafraîchissement automatique impose de procéder également à un contrôle via la consultation de la page dans le navigateur. Ce contrôle peut être facilité si le navigateur offre une option interdisant certains de ces rafraîchissements et affiche alors un bandeau d’alerte. Mais seule l’observation de la page permet une détection à coup sûr.</p>

---

## Vulgarisation

Les redirections et rafraîchissements de pages côté client supposent que l’utilisateur disposera du temps nécessaire pour prendre connaissance du contenu avant leur déclenchement. Or, ce temps est très souvent sous-estimé, notamment pour des utilisateurs d’aides techniques, pour lesquels la consultation de la page est plus lente. Le rechargement de la page en cours de lecture ramène par exemple l’utilisateur d’un lecteur d’écran au tout début du contenu et le contraint à rechercher le passage qu’il était en train de lire. De même, l’utilisateur d’un mobile ayant fait défiler la page en cours devra répéter la manipulation. Enfin, la redirection sans que l’utilisateur ait eu le temps de prendre connaissance du message d’avertissement sera déroutante et agaçante. Il est donc nécessaire, si ces mécanismes sont utilisés, de permettre leur désactivation.
Les sites de presse usent et abusent pour la plupart des rafraîchissements automatiques. Le contenu éditorial est ainsi régulièrement actualisé. Le fait que chaque rafraîchissement donne lieu à l’affichage de nouvelles publicités est sans doute une autre raison moins avouable de cet état de fait

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-nimpose-pas-de-redirection-ou-de-rafraichissement-automatique-cote-client/
- **API** : `https://api.opquast.com/checklist/239/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
