# Règle Opquast 80

> En cas de rejet des données saisies dans un formulaire, les raisons du rejet sont indiquées à l'utilisateur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 80 |
| **ID** | 54474 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
En cas de rejet des données saisies dans un formulaire, les raisons du rejet sont indiquées à l'utilisateur.

### English
If any data entered in the form are rejected, the reason(s) why are indicated to the user.

### Español
Si se rechazan los datos introducidos en un formulario, se indican al usuario los motivos del rechazo.

---

## Objectifs

### Français
- Aider l'internaute à comprendre ce qu'on attend et, ainsi, faciliter le passage à l'étape suivante. 
- Éviter la frustration de l'utilisateur face à une erreur dont il n'aurait pas la solution immédiate.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Help users understand what is expected and, by doing so, facilitate their progression to the next step.
- Prevent user frustration in the face of mistakes for which they don’t have an immediate solution.
- Improve the accessibility of content for people with disabilities.

### Español
- Ayudar al usuario a entender lo que se espera y así facilitar la transición al siguiente paso. 
-  Evitar la frustración del usuario cuando se enfrenta a un error para el que no tendría una solución inmediata.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.

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

Ce qui peut sembler évident pour l’auteur d’un formulaire risque de l’être beaucoup moins pour ses utilisateurs : aidez-les à chaque fois que possible.

---

## Solution recommandée

<p>Pour chaque champ contenant des données rejetées, indiquer la nature de l'erreur et fournir une aide à la correction</p>
<ul><li>Soit en début de formulaire, dans une liste des champs erronés ;</li>
<li>Soit dans le contexte de chaque champ, autant que possible via leur étiquette <code>label</code>.</li></ul>

---

## Méthode de vérification

<p>Pour chaque formulaire examiné&nbsp;:</p>
<ul><li>Soumettre les différentes erreurs possibles dans chaque formulaire absence de saisie d'un champ, non-respect d'un format demandé ou prévisible (format d'adresse mail, de date, etc.), sensibilité à la casse, etc.</li><li>Vérifier, si la saisie est rejetée, que la nature de l'erreur est précisée de manière à fournir l'aide nécessaire à sa correction, par l'un des moyens indiqués dans le paragraphe de mise en oeuvre.</li></ul>

---

## Vulgarisation

La mise en œuvre de cette règle repose essentiellement sur l’utilisation des étiquettes label, explicitement associées aux champs pour identifier ceux qui doivent être corrigés et fournir l’aide nécessaire dans le contexte approprié. De même, pour l’accessibilité dans un lecteur d’écran, le recours à un attribut aria-describedby permet d’associer à l’étiquette label les informations d’aide à la correction qui peuvent alors être gérées en dehors de l’étiquette.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/en-cas-de-rejet-des-donnees-saisies-dans-un-formulaire-les-raisons-du-rejet-sont-indiquees-a-lutilisateur/
- **API** : `https://api.opquast.com/checklist/80/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
