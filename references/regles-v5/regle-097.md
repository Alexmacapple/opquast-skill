# Règle Opquast 97

> Les champs permettant l'autocomplétion sont signalés dans le code source.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 97 |
| **ID** | 54589 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les champs permettant l'autocomplétion sont signalés dans le code source.

### English
Fields that support autocompletion are marked in the source code.

### Español
Los campos que permiten el autocompletado están señalados en el código fuente.

---

## Objectifs

### Français
- Améliorer l’accessibilité.
- Faciliter l’expérience utilisateur.

### English
- Improve accessibility.
- Facilitate the user experience.

### Español
- Mejorar la accesibilidad.
- Facilitar la experiencia del usuario.

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

L’autocomplétion consiste à fournir des suggestions au fur et à mesure de la saisie. Cela peut être des suggestions de requêtes dans un champ de recherche ou encore des suggestions associées à un début de saisie dans un autre champ. Il est possible de signaler ce type de champ dans le code source, ce qui va permettre une utilisation optimale, notamment pour les personnes équipées de lecteurs d’écran.

---

## Solution recommandée

Utiliser l'attribut <code>autocomplete</code> du champ de saisie, renseigné avec la valeur normalisée correspondant au contenu du champ. Par exemple :
<ul>
<li>username : identifiant de connexion,</li>
<li>email : adresse mail,</li>
<li>tel : numéro de téléphone,</li>
<li>country-name : nom du pays,</li>
<li>cc-name : nom figurant sur une carte bancaire,</li>
<li>cc-number : numéro de carte bancaire.</li>
</ul>

---

## Méthode de vérification

Vérifier pour chaque champ de saisie concerné la présence de l'attribut <code>autocomplete</code> renseigné avec la valeur normalisée correspondant au contenu du champ.

---

## Vulgarisation

L’attribut autocomplete est un standard simple mais essentiel pour guider le navigateur dans la saisie automatique des formulaires. Bien l’utiliser permet non seulement de fluidifier l’expérience utilisateur, mais aussi de renforcer la cohérence et l’accessibilité des données saisies. Cette pratique a un impact direct sur la qualité perçue d’un site : un formulaire correctement balisé se remplit plus vite, réduit les erreurs de saisie et limite l’abandon de parcours, notamment dans l’e-commerce. Sur le plan de la sécurité, il est important de désactiver l’autocomplétion (autocomplete="off") uniquement pour les champs sensibles (mots de passe, codes uniques), afin de ne pas priver inutilement l’utilisateur d’un confort attendu.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-champs-permettant-lautocompletion-sont-signales-dans-le-code-source/
- **API** : `https://api.opquast.com/checklist/97/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
