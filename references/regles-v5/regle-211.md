# Règle Opquast 211

> Le serveur envoie les informations indiquant les domaines autorisés à intégrer ses pages dans des cadres.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 211 |
| **ID** | 54167 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur envoie les informations indiquant les domaines autorisés à intégrer ses pages dans des cadres.

### English
The server sends information that indicates which domains are allowed to embed its pages in frames

### Español
El servidor indica los dominios autorizados para incrustar sus páginas en marcos.

---

## Objectifs

### Français
- Réduire les risques d’utilisation trompeuse du contenu.

### English
- Reduce the risk of your content being used in misleading ways.

### Español
- Reducir el riesgo de uso engañoso del contenido.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Sécurité

### Phases projet
- Développement

---

## Explication pédagogique

Les cadres permettent d’afficher des morceaux de pages web à l’intérieur d’une page web. C’est par exemple le cas d’un cadre affichant une publicité dans une autre page web. Votre site peut également être embarqué depuis une autre page, par exemple pour le tester avec certains services. Cela peut aussi être fait avec de mauvaises intentions, notamment pour faire croire à un utilisateur peu prudent qu’il est bien sur votre site : il faut donc empêcher ce risque.

---

## Solution recommandée

<div>Configurer le serveur pour l’envoi de l’en-tête HTTP X-Frame-Options avec la valeur deny (pour interdire toute inclusion de la page dans un cadre, quel qu’en soit le site) ou sameorigin (pour limiter les inclusions à des cadres du même nom de domaine que la page). La valeur allow-from (pour limiter les inclusions à des URL spécifiques) ne bénéficie pas, en revanche, à l’heure où nous écrivons ces lignes, d’un support suffisant.</div>

---

## Méthode de vérification

<div>Vérifier à l’aide d’un outil d’inspection des en-têtes HTTP la présence de X-Frame-Options avec la valeur deny ou sameorigin.</div>

---

## Vulgarisation

Vous avez pensé à de nombreuses options – parfois très pointues – pour votre site du point de vue de sa sécurité. Toutefois, n’oubliez pas que ce dernier peut être tout simplement intégré dans un cadre (frame ou iframe) sans que vous en ayez nécessairement connaissance.
Comme il est possible que cela soit mis en place pour des raisons malveillantes – une attaque dite de clickjacking (détournement des clics sur une page en apparence sûre) – il est important protéger le site en définissant les règles qui permettent ou non cette intégration.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-envoie-les-informations-indiquant-les-domaines-autorises-a-integrer-ses-pages-dans-des-cadres/
- **API** : `https://api.opquast.com/checklist/211/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
