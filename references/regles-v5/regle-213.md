# Règle Opquast 213

> Le serveur ne communique pas d'informations sur les logiciels et langages utilisés.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 213 |
| **ID** | 54463 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur ne communique pas d'informations sur les logiciels et langages utilisés.

### English
The server doesn't communicate information on the software and languages used.

### Español
El servidor no proporciona información sobre los programas informáticos y los lenguajes informáticos utilizados

---

## Objectifs

### Français
- Prévenir les risques d’intrusion sur le serveur. 
- Prévenir l’apparition de contenus ou scripts malveillants sur le site.

### English
- Prevent the risk of intrusion on the server. 
- Prevent the appearance of malicious content or scripts on the site.

### Español
- Prevenir el riesgo de intrusión en el servidor. 
-  Prevenir la aparición de contenidos o scripts maliciosos en el sitio web

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

Les vrais informaticiens connaissent la vérité : il n’existe pas de logiciel ou d’outil informatique sécurisé à 100%. Chaque version de logiciel utilisé de manière importante -et c’est le cas de la plupart des logiciels serveurs, systèmes de gestion de contenus et même des formats utilisés sur le web présente un certain nombre de défauts. Utiliser telle ou telle version d’un logiciel peut aiguiller directement une personne mal intentionnée vers une faille de sécurité documentée. Votre serveur peut être configuré pour annoncer à tout le monde qu’il tourne avec la version X du logiciel Y. Ou alors, vous veillez à respecter cette règle et il sera muet comme un carpe.

---

## Solution recommandée

<p>Ne communiquer via les entêtes HTTP envoyés par le serveur aucune information sur les logiciels et langages utilisés côté serveur, en particulier via les entêtes Server, X-Powered-By et X-AspNet-Version.</p>

---

## Méthode de vérification

<p>Vérifier que les les entêtes HTTP envoyés par le serveur ne donnent aucune information sur les logiciels et langages utilisés côté serveur.</p>

---

## Vulgarisation

De nombreux entêtes HTTP peuvent communiquer des informations souvent anodines en apparence, mais susceptibles de fournir des indications utiles aux personnes malveillantes (nom et version des CMS et des logiciels serveurs, d'extension de CMS, modules PHP, etc). Ces entêtes n'ont pas de bénéfice par ailleurs : supprimez-les.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-ne-communique-pas-dinformations-sur-les-logiciels-et-langages-utilises/
- **API** : `https://api.opquast.com/checklist/213/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
