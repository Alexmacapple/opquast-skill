# Règle Opquast 73

> L'utilisateur est averti lorsqu'une saisie est sensible à la casse.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 73 |
| **ID** | 54433 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'utilisateur est averti lorsqu'une saisie est sensible à la casse.

### English
The user is warned whenever a field is case-sensitive.

### Español
Se notifica al usuario cuando una entrada es sensible a mayúsculas.

---

## Objectifs

### Français
- Éviter le risque d'erreur et donc éviter à l'utilisateur de devoir remplir plusieurs fois un même champ. 
- Éviter l'incompréhension de l'utilisateur qui pense avoir rempli correctement le champ et qui le voit signalé en erreur.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Prevent the risk of mistakes and, as a result, prevent the user from having to fill out the same field several times.
- Prevent confusion in users who think they correctly completed the field, but see it marked as an error.
- Improve the accessibility of content for people with disabilities.

### Español
- Evitar el riesgo de error y por lo tanto evitar que el usuario tenga que rellenar el mismo campo varias veces. 
-  Evitar la incomprensión del usuario que cree haber rellenado el campo correctamente y lo ve indicado como error.
-  Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Il est agaçant de devoir recommencer une saisie pour une erreur aussi simple à éviter. Mais encore fallait-il être au courant qu’il fallait taper uniquement en majuscules.

---

## Solution recommandée

<p>Si la saisie attendue est sensible à la casse, préciser dans l'étiquette associée au champ qu'elle doit être réalisée en majuscules ou en minuscules selon le cas.</p>

---

## Méthode de vérification

<p>Pour chaque formulaire</p>
<ul><li>Détecter les champs dont la saisie est sensible à la casse en inscrivant le texte demandé en majuscules puis en minuscules et contrôler si, dans l'un des deux cas, la saisie est rejetée ;</li><li>En cas de rejet de la saisie à cause de sa casse, vérifier que l'étiquette associée à chaque champ, via l'élément <code>label</code> ou dans l'attribut <code>aria-label</code>, informe l'utilisateur de cette sensibilité.</li></ul>

---

## Vulgarisation

Cette règle joue parfois un rôle majeur, en particulier dans l’ergonomie des captchas graphiques. C’est également le cas pour la saisie des identifiants et mots de passe.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/lutilisateur-est-averti-lorsquune-saisie-est-sensible-a-la-casse/
- **API** : `https://api.opquast.com/checklist/73/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
