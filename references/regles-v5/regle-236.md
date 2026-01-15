# Règle Opquast 236

> Chaque identifiant HTML n'est utilisé qu'une seule fois par page.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 236 |
| **ID** | 54451 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque identifiant HTML n'est utilisé qu'une seule fois par page.

### English
Each HTML ID is only used once per page.

### Español
Cada identificador HTML se utiliza sólo una vez por página.

---

## Objectifs

### Français
- Éviter les erreurs de restitution du contenu ou d’interaction via les scripts. 
- Limiter les risques d’interprétation hasardeuse du Document Object Model (DOM) par des agents utilisateurs différents.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Prevent content reproduction errors and interaction errors via scripts.
- Limit the risk of random interpretation of the Document Object Model (DOM) by different user agents.
- Improve the accessibility of content for people with disabilities.

### Español
-  Evitar los errores en la restitución del contenido o la interacción a través de scripts. 
- Limitar los riesgos de la interpretación peligrosa del Modelo de Objeto de Documento (DOM) por los diferentes agentes usuarios.
- Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Structure et code

### Phases projet
- Développement

---

## Explication pédagogique

Un site web n’est pas prévu pour un navigateur particulier. Il va être affiché dans divers outils de consultation dont les comportements, en cas d’erreur dans le code, seront très variés. Éviter les erreurs de code, c’est donc prévenir les problèmes d’affichage. Alors, certes, la conformité absolue aux standards du W3C n’est pas toujours nécessaire. En revanche, la présence multiple d’un même identifiant dans une page peut avoir un impact bloquant au moins en termes d’accessibilité.

---

## Solution recommandée

<div>La solution la plus radicale consiste à s’assurer de la validité complète du code source des pages, à l’aide d’un validateur tel que http://validator.w3.org. Cette solution conduit cependant à tenir compte de l’ensemble des erreurs de validation du code source qui n’entrent pas dans le champ de cette bonne pratique. Pour s’en tenir au seul champ de cette bonne pratique, on veillera à éviter toute valeur dupliquée d’un attribut <code>id</code> dans une même page HTML.</div>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Attributs_universels/id"><code>id</code> sur MDN</a></p>

---

## Méthode de vérification

<div>Soumettre la page au validateur HTML du W3C (validator.w3.org) ou un autre outil de validation de code et vérifier que chaque valeur d’attribut <code>id</code> est unique dans la page.</div>

---

## Vulgarisation

Les erreurs de validité du code HTML ont des effets très variables pour l’utilisateur, compte tenu notamment du comportement des navigateurs susceptibles de corriger à la volée la syntaxe. Cette erreur spécifique portant sur les attributs ID est la plus immédiatement pénalisante. C’est le cas en particulier pour les utilisateurs d’un lecteur d’écran, lequel va dépendre de ces attributs pour associer correctement chaque champ d’un formulaire à son étiquette. Cependant, c’est plus largement le cas lorsque le fonctionnement d’un composant interactif est perturbé, dès lors que le script concerné repose sur ces attributs, ou si le rendu affiché en dépend.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-identifiant-html-nest-utilise-quune-seule-fois-par-page/
- **API** : `https://api.opquast.com/checklist/236/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
