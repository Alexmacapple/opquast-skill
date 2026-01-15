# Règle Opquast 207

> Le serveur indique le type MIME de chaque ressource.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 207 |
| **ID** | 54380 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur indique le type MIME de chaque ressource.

### English
The server indicates each resource’s MIME type.

### Español
El servidor indica la extensión MIME de cada recurso

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

Le fait d’indiquer le type MIME de chaque ressource permet au navigateur de l’utilisateur de récupérer des contenus correctement identifiés, et de fermer la porte à l’envoi de certains contenus dangereux.

---

## Solution recommandée

<div>Configurer le serveur pour adresser pour chaque ressource (texte, image, script, etc.) l’en-tête ContentType renseigné avec le type MIME approprié, par exemple :</div><div><ul><li>text/html ;</li><li>application/pdf.</li></ul></div>

---

## Méthode de vérification

<div>Vérifier, à l’aide d’un outil d’inspection des en-têtes HTTP, la présence de ContentType avec la valeur correspondant au type de ressource.</div>

---

## Vulgarisation

Les types MIME sont en quelque sorte un moyen pour les fichiers d’être correctement compris et identifiés par le navigateur. Un fichier SVG qui ne contient pourtant que du texte doit par exemple être identifié comme une image. Les navigateurs se retrouvent parfois devant un type MIME erroné ou non défini pour un contenu ; ces incertitudes sont sources de risques pour le fonctionnement et la sécurité. Comme dans le cas de la règle 194, les navigateurs ne doivent pas avoir à jouer aux devinettes sur ce sujet ; ne laissez donc aucune place aux incertitudes.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-indique-le-type-mime-de-chaque-ressource/
- **API** : `https://api.opquast.com/checklist/207/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
