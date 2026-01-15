# Règle Opquast 96

> Les procédures d’authentification à double facteur peuvent être relancées.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 96 |
| **ID** | 54548 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les procédures d’authentification à double facteur peuvent être relancées.

### English
Two-factor authentication procedures can be restarted.

### Español
Los procedimientos de autenticación de doble factor pueden reiniciarse.

---

## Objectifs

### Français
- Éviter les blocages pendant les procédures d’authentification.
- Réduire les frustrations et les abandons.

### English
- Avoid blockages during authentication procedures.
- Reduce frustration and abandonment.

### Español
- Evitar bloqueos durante los procedimientos de autenticación.
- Reducir la frustración y los abandonos.

---

## Métadonnées

### Tags
- Basics

### Thématiques
- Formulaires

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Les procédures d’authentification complexes sont devenues très fréquentes dans le secteur numérique. Vous vous authentifiez une première fois et vous recevez un code ou des instructions sur un autre appareil ou via un autre moyen d’accès. Le problème, c’est qu’il arrive fréquemment que les utilisateurs ne puissent pas effectuer l’opération dans le délai requis. Il faut donc veiller à ce que l’opération puisse être relancée afin d'éviter tout blocage.

---

## Solution recommandée

<p>Prévoir un mécanisme de régénération et de renvoi (par SMS, mail, application d'authentification) du jeton d'authentification, activable par l'utilisateur via un bouton ou un lien « Renvoyer le code. »</p>
<p>Au-delà de cette règle, il est recommandé de proposer au moins deux moyens d'authentification différents (SMS, e-mail, application d’authentification, etc.) afin de renforcer la résilience du dispositif et l’accessibilité pour l’ensemble des utilisateurs.</p>

---

## Méthode de vérification

Vérifier qu'il est possible, dans le formulaire de connexion, de relancer l'envoi du code de double authentification.

---

## Vulgarisation

Permettre la relance d’une procédure d’authentification à double facteur n’est pas seulement une question de confort pour l’utilisateur, c’est aussi une condition de robustesse du système. Dans la pratique, il est courant qu’un code de validation soit perdu (SMS supprimé, application fermée, délai dépassé). Sans option de renvoi, l’utilisateur peut se retrouver bloqué, ce qui entraîne frustration, perte de confiance et risque d’abandon du service. Du point de vue de la sécurité, la relance doit toutefois être conçue avec précaution : limiter le nombre de tentatives, invalider les anciens codes et tracer les actions permet de prévenir les abus. Enfin, il est recommandé de diversifier les canaux de renvoi (SMS, e-mail, application d’authentification) et de proposer au moins deux moyens d'authentification, afin de renforcer la résilience du dispositif et l’accessibilité pour l’ensemble des profils d’utilisateurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-procedures-dauthentification-a-double-facteur-peuvent-etre-relancees/
- **API** : `https://api.opquast.com/checklist/96/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
