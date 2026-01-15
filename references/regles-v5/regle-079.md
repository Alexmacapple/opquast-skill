# Règle Opquast 79

> En cas de rejet des données saisies dans un formulaire, les champs contenant les données rejetées sont indiqués à l'utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 79 |
| **ID** | 54485 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
En cas de rejet des données saisies dans un formulaire, les champs contenant les données rejetées sont indiqués à l'utilisateur.

### English
If any data entered in the form are rejected, the fields containing the rejected data are indicated for the user.

### Español
Si se rechazan los datos introducidos en un formulario, se indican al usuario los campos que contienen los datos rechazados.

---

## Objectifs

### Français
- Donner un retour à l'utilisateur sur l'action qu'il vient d'effectuer. 
- Guider l'utilisateur directement vers les éléments sur lesquels il doit agir.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Provide feedback to users on the actions they just performed.
- Guide users directly to the items with which they must interact.
- Improve the accessibility of content for people with disabilities."

### Español
- Dar información al usuario sobre la acción que acaba de realizar. 
- Guiar al usuario directamente a los elementos sobre los que debe actuar.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Remplir un formulaire n’est pas toujours une tâche aisée : évitez à vos utilisateurs de devoir également partir à la recherche de leurs erreurs éventuelles.

---

## Solution recommandée

<p>Faire figurer en début de formulaire un message indiquant que tout ou partie des champs nécessite une correction de la saisie précédente. Indiquer également cette information dans l'élément <code>title</code> de la page.</p><p>Ajouter éventuellement au message en début de formulaire la liste des champs à corriger.</p><p>Indiquer explicitement dans l'étiquette de chaque champ concerné qu'il doit être corrigé.</p>

---

## Méthode de vérification

<p>Pour chaque formulaire&nbsp;:</p><ul>
<li>Soumettre différentes erreurs possibles dans chaque formulaire telles que absence de saisie d'un champ obligatoire, non-respect d'un format demandé ou prévisible (format d'adresse mail, de date, etc.), sensibilité à la casse.</li>
					<li>Puis, vérifier que l'utilisateur est informé de la présence d'erreurs à corriger au moins dans l'élément <code>title</code> de la page et que chaque champ erroné est signalé via son étiquette. </li></ul>

---

## Vulgarisation

L’indication des champs à corriger et l’aide éventuelle à la correction doivent figurer autant que possible dans les étiquettes label associées à chaque champ concerné. Pour faciliter un affichage du message à droite du champ ou en dessous de celui-ci, un balisage possible dans ce cas est le suivant :
<label for="foo"...>
Texte de l’étiquette
<input id="foo"...>
Texte du message d’erreur
</label>
Pour aller plus loin dans l’accessibilité des signalements d’erreurs, il est également recommandé de recourir à l’attribut aria-invalid. L’usage de l’attribut aria-describedby est également tout à fait pertinent.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/en-cas-de-rejet-des-donnees-saisies-dans-un-formulaire-les-champs-contenant-les-donnees-rejetees-sont-indiques-a-lutilisateur/
- **API** : `https://api.opquast.com/checklist/79/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
