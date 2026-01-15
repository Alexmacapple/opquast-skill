# Règle Opquast 4

> Les dates sont présentées dans des formats explicites.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 4 |
| **ID** | 54404 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les dates sont présentées dans des formats explicites.

### English
Dates are presented in an explicit format.

### Español
Las fechas se presentan en formatos explícitos.

---

## Objectifs

### Français
- Éviter aux utilisateurs les risques de méprise sur le sens d’une date. 
- Faciliter la compréhension et la réutilisation des contenus concernés.

### English
- Prevent users from misinterpreting the meaning of a date.
- Simplify the comprehension and reuse of the relevant content.

### Español
- Impedir que los usuarios malinterpreten el significado de una fecha.
- Simplificar la comprensión y la reutilización de los contenidos adecuados.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Contenus

### Phases projet
- Conception
- Editorial

---

## Explication pédagogique

Le 12/11/10 fait-il référence au 12 novembre 2010 (format de date européen) ou au 11 décembre 2010 (format américain) ? À vous de faire en sorte que vos utilisateurs n’aient jamais à se poser cette question.

---

## Solution recommandée

<ul>
<li>S’assurer que le mois est écrit en toutes lettres (« décembre ») ou en abrégé (« déc. »), mais pas au format numérique.</li>
<li>Indiquer les 4 chiffres de l’année.</li>
</ul>
<p>Cette exigence doit être prévue dans les systèmes de gestion de contenu où la datation est automatisée.</p>

---

## Méthode de vérification

<p>Identifier les pages comportant des dates, et pour chacune des dates trouvées :</p>
<ul>
<li>Vérifier que le mois n’est pas indiqué dans un format numérique, mais en lettre (complet ou abrégé).</li>
<li>Vérifier que l’année est indiquée sur quatre chiffres et non deux.</li>
</ul>
<p>Les dates à saisir par l’utilisateur final dans les formulaires ne sont pas concernées par cette bonne pratique : leur format, quel qu'il soit, est considéré comme suffisamment explicite, dès lors que la saisie s’effectue via un datepicker ou bien manuellement mais avec une indication du format attendu (du type "JJ/MM/AA").</p>

---

## Vulgarisation

Le Web est par nature un outil international, mais les formats de date varient selon les langues (par exemple, le format JJ/MM/AA est courant en Europe, tandis que les États-Unis utilisent le format MM/JJ/AA et le Japon le format AA/MM/JJ). Le recours à un format de date neutre et normalisé (le format AAAA-MM-JJ d’ISO 8601) a le défaut d’être souvent déroutant pour l’utilisateur. Le recours à la détection de l’en-tête HTTP accept-language pour décliner le format de date selon les préférences linguistiques paramétrées dans le navigateur donne également parfois des résultats surprenants (par exemple, une date au format japonais dans une page en français pour un utilisateur francophone accédant au site depuis un cybercafé à Tokyo). La solution du format de date explicite apparaît donc la plus robuste pour éviter toute ambiguïté.
Elle a aussi l’avantage de rendre une date immédiatement compréhensible pour les utilisateurs d’aides techniques d’accessibilité, sans aucune ambiguïté liée au réglage de leur logiciel, bien que ce point ne soit pas prévu par les recommandations d’accessibilité WCAG.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-dates-sont-presentees-dans-des-formats-explicites/
- **API** : `https://api.opquast.com/checklist/4/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
