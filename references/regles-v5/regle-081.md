# Règle Opquast 81

> En cas de rejet des données saisies dans un formulaire, toutes les données saisies peuvent être modifiées par l'utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 81 |
| **ID** | 54374 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
En cas de rejet des données saisies dans un formulaire, toutes les données saisies peuvent être modifiées par l'utilisateur.

### English
If any data entered in the form are rejected, all the data entered can be modified by the user.

### Español
Si se rechazan los datos introducidos en un formulario, el usuario puede modificar todos los datos introducidos.

---

## Objectifs

### Français
- Laisser la main à l'utilisateur sur la totalité des informations qu'il donne. 
- Faciliter la correction des erreurs commises par l'utilisateur. 
- Permettre à l'utilisateur de modifier des informations sur lesquelles il voudrait revenir. 
- Éviter que l'utilisateur ne quitte le formulaire avant validation définitive.

### English
- Give users control over all of the information that they provide.
- Simplify the correction of mistakes made by users.
- Allow users to edit the information they want to change.
- Prevent the user from leaving the form before it is submitted.

### Español
- Dar el control a los usuarios sobre la totalidad de la información que proporcionan.
- Facilitar la corrección de los errores realizados por el usuario. 
-  Permitir al usuario modificar la información a la que desea volver. 
-  Evitar que el usuario abandone el formulario antes de la validación final.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Il est déjà contrariant de s’être trompé. Mais si en plus il faut tout recommencer parce que l’ensemble des données saisies a été effacé…

---

## Solution recommandée

<p>Stocker toutes les données saisies dans des variables de session afin de pouvoir les afficher de nouveau telles qu'elles ont été saisies dans les champs.</p><p>Rendre possible la modification des champs après rejet des données.</p>

---

## Méthode de vérification

<p>Pour chaque formulaire audité</p><ul>
<li>Provoquer le rejet de la saisie en soumettant les différentes erreurs possibles : absence de saisie d'un champ, non-respect d'un format demandé ou prévisible (format d'adresse mail, de date, etc.), sensibilité à la casse ;</li><li>Puis, vérifier que le formulaire est affiché de nouveau tel qu'il a été rempli, ceci afin de pouvoir éventuellement de le corriger.</li></ul>

---

## Vulgarisation

Cette règle est intéressante aussi bien sur le plan de l’utilisabilité que sur celui de la performance. Elle améliore l’expérience utilisateur, limite le nombre de pages à télécharger et réduit le nombre d’échanges avec le serveur. Elle joue un rôle clé en matière d’accessibilité dès lors que les données réaffichées sont modifiables.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/en-cas-de-rejet-des-donnees-saisies-dans-un-formulaire-toutes-les-donnees-saisies-peuvent-etre-modifiees-par-lutilisateur/
- **API** : `https://api.opquast.com/checklist/81/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
