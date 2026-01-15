# Règle Opquast 25

> Les entêtes envoyés par le serveur spécifient la politique de communication des referrers.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 25 |
| **ID** | 53939 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les entêtes envoyés par le serveur spécifient la politique de communication des referrers.

### English
The headers sent by the server specify the communication policy of the referrers.

### Español
Las cabeceras enviadas por el servidor incluyen la política de comunicación de los referrers

---

## Objectifs

### Français
- Protéger les utilisateurs de la divulgation d’éventuelles informations sensibles concernant leur navigation. 
- Sécuriser le chargement des ressources externes. 
- Maîtriser les informations transmises par le serveur.
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données

### English
- Protect users from disclosing any sensitive information about their navigation.
- Mastering the information sent by the server.
- Strengthen user confidence in the use of their data

### Español
- Proteger a los usuarios de la divulgación de información sensible sobre su navegación. 
-  Asegurar la carga de los recursos externos. 
-  Controlar la información transmitida por el servidor. 
-  Fortalecer la confianza de los usuarios en el uso de sus datos.

---

## Métadonnées

### Tags
- Privacy

### Thématiques
- Données personnelles

### Phases projet
- Développement

---

## Explication pédagogique

Les serveurs web passent leur temps à enregistrer tout un tas d’informations sur les utilisateurs. Ces données sont inscrites dans ce l’on appelle des fichiers logs. C’est très pratique, voire vital pour analyser l’audience, pour repérer des erreurs et c’est essentiel pour les développeurs. En revanche, parmi les infos qui sont transmises en permanence, il y a la page d’origine.

---

## Solution recommandée

<p>Pour chaque page du site, configurer le serveur pour envoyer l'entête HTTP Referrer-Policy avec comme valeur, par ordre de préférence :</p>
<ul><li> <code>no-referrer</code></li><li> <code>same-origin</code></li><li> <code>strict-origin</code></li><li> <code>strict-origin-when-cross-origin</code></li></ul>

---

## Méthode de vérification

<p>Vérifier pour chaque page du site, la présence de l'entête HTTP Referrer-Policy avec comme valeur, par ordre de préférence :</p>
<ul><li> <code>no-referrer</code></li><li> <code>same-origin</code></li><li> <code>strict-origin</code></li><li> <code>strict-origin-when-cross-origin</code></li></ul>

---

## Vulgarisation

L'entête HTTP Referrer-Policy permet de paramétrer précisément le type d'informations communiquées à propos du referer (votre page) au site cible d'un lien, mais surtout le type de site auquel des informations seront communiquées. Vous pouvez interdire toute communication d'information (no-referrer), quelque-soit le site, ou bien réserver l'information aux pages de même origine (same-origin). Vous pouvez limiter la communication à l'origine et aux adresses de detination moins sécurisée (HTTPS vers HTTP, strict-origin), ou etc.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-en-tetes-envoyes-par-le-serveur-specifient-la-politique-de-communication-des-referrers/
- **API** : `https://api.opquast.com/checklist/25/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
