# Règle Opquast 206

> Les entêtes envoyés par le serveur désactivent la détection automatique du type MIME de chaque ressource.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 206 |
| **ID** | 54260 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les entêtes envoyés par le serveur désactivent la détection automatique du type MIME de chaque ressource.

### English
The headers sent by the server disable automatic detection of each resource’s MIME type.

### Español
Las cabeceras enviadas por el servidor desactivan la detección automática del tipo de extensión MIME de cada recurso

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

Ne cherchez pas, le mime n’a rien à voir avec Marcel Marceau, c’est simplement un identifiant permettant d’indiquer le format des données sur Internet. La détection automatique de ce format peut rendre possible l’envoi de contenus dangereux vers le poste des utilisateurs. Dans la mesure où cette détection automatique n’est pas vitale, désactivez-la.

---

## Solution recommandée

<div>Configurer le serveur pour adresser l’en-tête X-Content-Type-Options avec la valeur nosniff.</div>

---

## Méthode de vérification

<div>Vérifier, à l’aide d’un outil d’inspection des en-têtes HTTP, la présence de l’en-tête X-Content-Type-Options avec la valeur nosniff.</div>

---

## Vulgarisation

Au départ, le type MIME était prévu pour gérer facilement les échanges de fichiers par courriel. Cependant, il sert également pour identifier les types de fichiers échangés avec le protocole HTTP. Alors qu’au départ, le type MIME servait à traiter des questions d’interopérabilité et d’échange de fichiers, il a aujourd’hui également un rôle important en matière de sécurité. Contrairement à ce qu’on pourrait supposer, il n’est cependant pas avisé de laisser au navigateur le soin de deviner le type MIME d’une ressource : il est trop facile pour un serveur malveillant de le duper.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-en-tetes-envoyes-par-le-serveur-desactivent-la-detection-automatique-du-type-mime-de-chaque-ressource/
- **API** : `https://api.opquast.com/checklist/206/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
