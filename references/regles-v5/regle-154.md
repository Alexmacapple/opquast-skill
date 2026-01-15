# Règle Opquast 154

> La navigation ne provoque pas l'ouverture de popups.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 154 |
| **ID** | 54377 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La navigation ne provoque pas l'ouverture de popups.

### English
Navigating does not cause pop-ups to open.

### Español
La navegación no provoca la apertura de ventanas emergentes.

---

## Objectifs

### Français
- Permettre à l'utilisateur de naviguer sur le site sans avoir d'opération spécifique à effectuer pendant la navigation.
- Éviter à des utilisateurs d'aides techniques d'être désorientés par l'ouverture d'une nouvelle fenêtre qui ne sera pas toujours aisément perceptible et qui perturbe notamment l'utilisation de l'historique de navigation ou qui masquera dans un lecteur d'écran la fenêtre principale.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Allow users to navigate the website without having to perform any particular actions during their navigation.
- Prevent users of technical aids from becoming disoriented when a new window opens, which will not always be perceptible and which disrupts the use of the browsing history, in particular, or hides the main window on a screen reader.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Permite al usuario navegar por el sitio sin tener que realizar ninguna operación específica mientras navega. 
-  Evitar la desorientación de los usuarios con ayudas técnicas al abrir una nueva ventana que no siempre será fácilmente perceptible y que perturbará el uso del historial de navegación o que ocultará la ventana principal en un lector de pantalla.
-  Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité
- Écoconception

### Thématiques
- Navigation

### Phases projet
- Conception

---

## Explication pédagogique

Vous les avez certainement reconnues, il s’agit de l’une des pestes du web : les popups. Elles ont presque disparu et peu de gens les regrettent. Certes, elles ont été remplacées par les popins (interstitiels), qui viennent vous perturber dans les pages et non dans une nouvelle page… Mais occupons-nous d’une seule chose à la fois.

---

## Solution recommandée

<p>Ne pas utiliser d'ouverture automatique de fenêtres popup (événement d'ouverture de fenêtre lors du chargement d'une page) sur les pages internes du site.</p>

---

## Méthode de vérification

<p>Cette bonne pratique est à vérifier manuellement à l'occasion de l'ensemble des autres tests, en prenant soin de désactiver toute éventuelle fonctionnalité de blocage des popups dans le navigateur utilisé.</p><p>Dans toutes les pages internes du site&nbsp;:</p><ul>
<li>Vérifier que la navigation dans les pages internes du site ne déclenche pas l'ouverture automatique de nouvelles fenêtres.</li>
</ul>

---

## Vulgarisation

Cette règle peut être étendue aux pseudo pop-up réalisées à l’aide de fenêtres modales, en particulier publicitaires.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-navigation-sur-le-site-ne-provoque-pas-louverture-de-popups/
- **API** : `https://api.opquast.com/checklist/154/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
