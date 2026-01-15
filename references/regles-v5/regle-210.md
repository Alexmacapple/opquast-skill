# Règle Opquast 210

> Le serveur envoie les informations d'activation de protection cross site scripting.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 210 |
| **ID** | 54382 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur envoie les informations d'activation de protection cross site scripting.

### English
The server sends activation information for protection against cross-site scripting.

### Español
El servidor envía la información de activación para la protección contra el cross-site scripting.

---

## Objectifs

### Français
- Réduire les risques de téléchargement d’un contenu dangereux dissimulé.

### English
- Reduce the risk of downloading dangerous hidden content.

### Español
- Reducir el riesgo de descargar contenido peligroso oculto.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Sécurité

### Phases projet
- Développement

---

## Explication pédagogique

Le cross-site scripting est une attaque qui consiste à injecter et exécuter un contenu –malveillant – sur une page. Certains navigateurs ont des mécanismes intégrés de filtres pour protéger contre certains types de ces attaques, mécanismes qui peuvent malheureusement être désactivés. Pour empêcher que votre site puisse faire courir ce genre de risques aux utilisateurs, il est donc conseillé de forcer la présence de l’entête de protection et de jouer la sécurité maximale pour le visiteur en bloquant la totalité du contenu de la page.

---

## Solution recommandée

<div>Configurer le serveur pour l’envoi de l’entête HTTP X-XSS-Protection avec la valeur 1; mode=block.</div>

---

## Méthode de vérification

<div>Vérifier, à l’aide d’un outil d’inspection des en-têtes HTTP, la présence de X-XSS-Protection avec la valeur 1; mode=block.</div>

---

## Vulgarisation

En matière de sécurité, on ne prend jamais assez de précautions. Comme certaines de ces attaques dites de cross-site scripting sont détectables par les navigateurs, autant ne pas hésiter une seconde et utiliser cet atout au maximum : même si certains navigateurs proposent de nettoyer le contenu dangereux (sanitize), il vaut mieux ne prendre aucun risque et leur indiquer explicitement d’activer ces filtres et de bloquer l’intégralité de la page.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-envoie-les-informations-dactivation-de-protection-cross-site-scripting/
- **API** : `https://api.opquast.com/checklist/210/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
