# Règle Opquast 203

> Un dispositif sensibilise l'utilisateur sur le degré de sécurisation du mot de passe qu'il choisit.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 203 |
| **ID** | 54495 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Un dispositif sensibilise l'utilisateur sur le degré de sécurisation du mot de passe qu'il choisit.

### English
A mechanism raises the user's awareness regarding their password's level of security

### Español
Un mecanismo permite que el usuario conozca el nivel de seguridad de su contraseña

---

## Objectifs

### Français
- Informer les utilisateurs sur le niveau de sécurité du mot de passe choisi et donc sur les risques de détournement.

### English
- Inform users of the level of security of their selected passwords and, therefore, the risk of being hacked.

### Español
- Informar a los usuarios sobre el nivel de seguridad de la contraseña elegida y por lo tanto sobre los riesgos de robo.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Sécurité

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Un mot de passe doit avoir un niveau minimum de complexité pour ne pas être facilement deviné à des fins malveillantes. Il est souhaitable d’avertir l’utilisateur si le mot de passe qu’il a choisi n’est pas assez complexe. Certains systèmes permettent même de l’en informer en direct pendant la saisie.

---

## Solution recommandée

<div>La saisie du mot de passe donne lieu à une validation et à un retour indiquant son degré de sécurité, avant soumission définitive du formulaire d’inscription ou de changement de mot de passe.</div>

---

## Méthode de vérification

<div>Pour tout formulaire d’inscription ou de changement de mot de passe :</div><div><ul><li>Saisir un mot de passe et s’assurer que cette saisie donne lieu à une validation et à un retour indiquant son degré de sécurité, et ce, avant la soumission définitive du formulaire.<br></li></ul></div><div>Cette validation peut être plus ou moins exigeante : contrôle du nombre de caractères, de l’absence de l’identifiant du compte dans le mot de passe, du type de caractères présents, etc.&nbsp;</div>

---

## Vulgarisation

La mise en œuvre de cette règle ne vise pas à bloquer la création de compte tant qu’un niveau de sécurité donné n’est pas respecté : l’utilisateur reste libre de ses choix, mais il est informé en temps réel du degré de sécurité de son mot de passe et est invité à le modifier en conséquence.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/un-dispositif-sensibilise-lutilisateur-sur-le-degre-de-securisation-du-mot-de-passe-quil-choisit/
- **API** : `https://api.opquast.com/checklist/203/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
