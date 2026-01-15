# Règle Opquast 120

> Les objets inclus sont dotés d'une alternative textuelle appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 120 |
| **ID** | 54386 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les objets inclus sont dotés d'une alternative textuelle appropriée.

### English
Included objects have an appropriate text alternative.

### Español
Los objetos incluidos tienen un texto alternativo apropiado

---

## Objectifs

### Français
- Fournir un accès à l'information pour les utilisateurs dont le navigateur ou la plateforme ne supporte pas l'inclusion d'objets ou les technologies utilisées dans les objets inclus. 
- Faciliter l'exploitation de ces contenus par les robots (référencement en particulier).
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- provide access to the information to users whose browsers or platforms don’t support the inclusion of objects or the technologies used by the included objects.
- facilitate the exploitation of that content by bots (especially web crawlers).
- simplify the presentation and/or reuse of the included content.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Proporcionar un acceso a la información a los usuarios cuyo navegador o plataforma no soporta la inclusión de objetos o las tecnologías utilizadas en los objetos incluidos. 
- Facilitar la explotación de estos contenidos por los robots (refiriéndose en particular).
- Mejorar la accesibilidad de los contenidos a las personas discapacitadas. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Images et médias

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Une vidéo, un objet Flash (oui il y en a encore), un contenu audio peuvent être impossibles à consulter dans certains contextes. Une alternative permet d’accéder à leur contenu.

---

## Solution recommandée

<p>Indiquer l'alternative des objets inclus via l'une des solutions suivantes :</p><ul>
<li>Le contenu de l'élément HTML <code>object</code> ;</li>
					<li>Le contenu de l'élément HTML <code>noembed</code> ;</li>
					<li>Un contenu présent immédiatement avant ou après l'objet ;</li>
					<li>Un lien vers une page fournissant le contenu alternatif, placé immédiatement avant ou après l'objet.</li>
				</ul>

---

## Méthode de vérification

<p>Cette vérification nécessite la détection des éléments <code>object</code> et <code>embed</code>, en tenant compte de leur éventuelle génération via Javascript. Pour chaque page contenant un de ces éléments : </p><ul>
<li>Désactiver le support des technologies tierces dans le navigateur.</li>
					<li>S'assurer que l'information alternative est présente et affichée, ou qu'elle est accessible grâce à un lien présent dans le contexte immédiat de chaque objet.</li>
				</ul>

---

## Vulgarisation

L’alternative d’un objet inclus peut être de nature très variable, depuis la simple transcription de l’information au format HTML jusqu’à un formulaire (ou une série de formulaires) en cas d’objet interactif ou de service en ligne, en passant par un lien vers un contenu ou un service équivalent

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-objets-inclus-sont-dotes-dune-alternative-textuelle-appropriee/
- **API** : `https://api.opquast.com/checklist/120/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
