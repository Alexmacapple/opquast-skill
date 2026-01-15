# Règle Opquast 26

> Aucune information n’est exposée sur l’existence d’un compte utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 26 |
| **ID** | 54553 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Aucune information n’est exposée sur l’existence d’un compte utilisateur.

### English
No information is displayed regarding the existence of a user account.

### Español
No se muestra ninguna información sobre la existencia de una cuenta de usuario.

---

## Objectifs

### Français
- Prévenir les tentatives d’usurpation de comptes ou d’identité,
- Améliorer la sécurité des utilisateurs et utilisatrices.

### English
- Prevent attempts to hijack accounts or steal identities,
- Improve user security.

### Español
- Prevenir los intentos de usurpación de cuentas o identidades.
- Mejorar la seguridad de los usuarios y usuarias.

---

## Métadonnées

### Tags
- Privacy

### Thématiques
- Données personnelles

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

De très nombreux sites utilisent des identifiants personnels pour la connexion. Cela peut être des pseudonymes, des noms et le plus fréquemment des adresses de courriel. Des personnes mal intentionnées peuvent tenter de se connecter avec certains identifiants prévisibles, et exploiter la réponse du site pour déterminer l’existence d’un compte. Une fois vérifié qu’un compte existe, il devient possible de tenter de se connecter avec différents mots de passe ou via une attaque par force brute. Pour éviter cela, le site doit éviter de révéler qu'un identifiant est associé à un compte.

---

## Solution recommandée

En réponse à une tentative de création de compte, de connexion (ou une série de tentatives), ou à une demande de renvoi du mot de passe, ne pas afficher de messages du type :
<ul>
<li>« Cet email est déjà utilisé »</li>
<li>« Mot de passe incorrect »</li>
<li>« Veuillez suivre la procédure de réinitialisation du mot de passe envoyée par mail »</li> 
<li>« Compte verrouillé »</li> 
</ul>
Privilégier les messages du type :
<ul>
<li>« Si vous avez déjà un compte, utilisez la récupération de mot de passe. »</li>
<li>« Identifiants incorrects. Veuillez vérifier votre adresse et mot de passe. »</li> 
<li>« Si un compte existe pour cette adresse, un email de réinitialisation a été envoyé. »</li> 
<li>« Impossible de se connecter. Réessayer plus tard ou utilisez la récupération de mot de passe. »</li> 
</ul>

---

## Méthode de vérification

Vérifier qu'aucune information n'est donnée sur l'existence d'un compte utilisateur lors de tentatives de création de compte, de connexion ou de récupération du mot de passe.

---

## Vulgarisation

Cette règle dépasse la simple restriction technique et engage directement la manière dont le système communique avec l’utilisateur. La formulation des messages d’interface constitue ici un enjeu majeur : chaque retour, qu’il s’agisse d’une erreur de connexion, d’une demande de réinitialisation de mot de passe ou d’une inscription, doit être rédigé de manière neutre et homogène, afin de ne pas révéler si un compte existe ou non. Même des détails apparemment mineurs – comme un message différent pour « mot de passe incorrect » versus « compte inexistant » – peuvent être exploités pour des attaques d’énumération d’utilisateurs. Il s'agit donc de concevoir des messages universels, clairs pour l’utilisateur mais sans indice discriminant, tout en préservant l’ergonomie et la compréhension fonctionnelle.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/aucune-information-nest-exposee-sur-lexistence-dun-compte-utilisateur/
- **API** : `https://api.opquast.com/checklist/26/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
