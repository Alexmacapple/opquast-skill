# Règle Opquast 22

> La connexion à tous les services proposés est possible avec les mêmes identifiants.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 22 |
| **ID** | 54424 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La connexion à tous les services proposés est possible avec les mêmes identifiants.

### English
Connection to all the services offered is possible with the same identifiers.

### Español
La conexión a todos los servicios ofrecidos es posible con los mismos datos identificativos

---

## Objectifs

### Français
- Permettre aux utilisateurs d’utiliser et de mémoriser des identifiants uniques.
- Accélérer la connexion et améliorer l’expérience utilisateur.
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données

### English
- Allow users to retain or store unique identifiers.
- Accelerate connection and improve the user experience.
- Strengthen user confidence in the use of their data

### Español
- Acelerar el inicio de sesión y mejorar la experiencia del usuario..
- Fortalecer la confianza de los usuarios en el uso de sus datos

---

## Métadonnées

### Tags
- Accessibilité
- Privacy

### Thématiques
- Données personnelles

### Phases projet
- Développement

---

## Explication pédagogique

Certaines entités proposent plusieurs sites web et plusieurs espaces privés nécessitant une identification. Cette bonne pratique vérifie que l’utilisateur peut utiliser les mêmes identifiants pour accéder à tous les services proposés.

---

## Solution recommandée

Si le site propose plusieurs services nécessitant chacun un accès authentifié, mutualiser le même jeu d'identifiant/mot de passe et le cas échéant les mêmes moyens d'authentification à double facteur ou renforcée pour tous ces services.

---

## Méthode de vérification

Si le site propose plusieurs services nécessitant chacun un accès authentifié, vérifier que le même jeu d'identifiant/mot de passe et le cas échéant les mêmes moyens d'authentification à double facteur ou renforcée peuvent être utilisés pour tous ces services.

---

## Vulgarisation

Cette règle pose la question de l'approche Single Sign On (SSO) sur des outils multisites ou multienvironnements. La solution de facilité est d'utiliser un système d'authentification unique fourni par un prestataire (Google, linkedin, facebook...) ou un État (France Connect..) mais attention, faites en sorte de ne pas dépendre exclusivement de ce système d'authentification unique. L'une des règles de la check-list 2020 précise bien "La création de compte est possible sans recours à un système d'identification tiers.". À la première défaillance du SSO tiers, vous serez heureux d'avoir votre propre système d'identification idéalement sur tous vos sites si vous êtes concernés.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-connexion-a-tous-les-services-proposes-est-possible-avec-les-memes-identifiants/
- **API** : `https://api.opquast.com/checklist/22/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
