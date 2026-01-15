# Règle Opquast 72

> Le format de saisie des champs de formulaire qui le nécessitent est indiqué

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 72 |
| **ID** | 54432 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le format de saisie des champs de formulaire qui le nécessitent est indiqué

### English
The input format for form fields which require it is indicated.

### Español
El formato de entrada de los campos del formulario que lo requieren está indicado.

---

## Objectifs

### Français
- Limiter le risque d'erreurs de saisie. 
- Limiter les risques associés à l'envoi de données erronées ou impossibles à exploiter. 
- Éviter que l'utilisateur ne renonce à poursuivre faute d'information sur la saisie attendue.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Reduce the risk of input errors.
- Reduce the risks associated with sending incorrect or unusable data.
- Prevent the user from giving up, for lack of information about the expected input.
- Improve the accessibility of content for people with disabilities.

### Español
- Limitar el riesgo de errores de entrada. 
- Limitar los riesgos asociados al envío de datos erróneos o inutilizables. 
- Impedir que el usuario renuncie de continuar por falta de información sobre la entrada de datos esperada. 
- Mejorar la accesibilidad de los contenidos para las personas con discapacitad.

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

Évitons de transformer une saisie de date, de monnaie ou autre en jeu de devinette (avec ou sans tiret ? L’année ou le mois d’abord ? Avec ou sans les centimes ? Etc.). Et les champs de mots de passe, alors ? Faut-il un chiffre, une lettre en majuscule, une invocation magique ?

---

## Solution recommandée

<p>Indiquer quel est le format de saisie attendue via l'étiquette associée au champ. Par exemple : <code>&lt;label for="mail"&gt;</code>Adresse email (du type mail@exemple.com)<code>&lt;/label&gt;</code></p>

---

## Méthode de vérification

<p>Pour chaque formulaire&nbsp;:</p><ul><li>Soumettre différentes erreurs possibles dans chaque formulaire : non-respect d’un format demandé ou prévisible (format d’adresse e-mail, de date, etc.), afin de détecter les champs pour lesquels un format de saisie spécifique est imposé.</li><li>Vérifier, à l’aide d’un inspecteur de code, que l’étiquette associée à chaque champ concerné en indique le format attendu dans l’élément label ou via un attribut ARIA.</li></ul>

---

## Vulgarisation

Le point clé de cette pratique est l’association de cette information avec l’étiquette explicitement balisée du champ (élément label for ou attribut title du champ). Cependant, tout comme pour l’indication du caractère obligatoire d’un champ ou les aides à la saisie, l’information peut être rendue plus accessible pour les lecteurs d’écran grâce à l’attribut aria-labelledby lorsqu’elle n’est pas délivrée dans cette étiquette.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique/
- **API** : `https://api.opquast.com/checklist/72/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
