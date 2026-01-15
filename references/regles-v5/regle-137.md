# Règle Opquast 137

> Le libellé de chaque lien décrit sa fonction ou la nature du contenu vers lequel il pointe.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 137 |
| **ID** | 54508 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le libellé de chaque lien décrit sa fonction ou la nature du contenu vers lequel il pointe.

### English
Each link’s label describes either its function or the nature of the content of its target.

### Español
El texto asociado a cada enlace describe la función o la naturaleza del contenido al que dirige.

---

## Objectifs

### Français
- Permettre aux utilisateurs d'identifier précisément la nature du lien et d'éviter des actions erronées. 
- Permettre aux outils d'indexation d'associer un libellé à une ressource. 
- Permettre aux lecteurs d'écran d'en indiquer la cible de façon explicite et d'éviter de désorienter les utilisateurs.
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Allow users to accurately identify the nature of the link and prevent incorrect actions.
- Enable indexing tools to associate a label with a resource.
- Allow screen readers to explicitly indicate the target and, as a result, to prevent user disorientation.
- Improve the way content is taken into account by search engines and indexing tools.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios identificar con precisión la naturaleza del vínculo y evitar acciones erróneas. 
-  Habilitar las herramientas de indexación para asociar una etiqueta con un recurso. 
-  Permitir que los lectores de pantalla indiquen explícitamente el objetivo y evitar confundir a los usuarios. 
-  Mejorar la accesibilidad del contenido para las personas con discapacidad. 
- Mejorar la consideración del contenido por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- SEO

### Thématiques
- Liens

### Phases projet
- Editorial

---

## Explication pédagogique

Pour s’en tenir à des contre-exemples fréquents de cette bonne pratique : les libellés de liens « Cliquer ici » et « Lire la suite » ne vous donnent aucune idée de l’endroit où vous allez vous rendre en cliquant dessus.

---

## Solution recommandée

<p>Indiquer sans ambiguïté le contenu de la page cible du lien, la fonction du lien ou son comportement, le cas échéant, dans le libellé des liens (portion de texte située entre les balises &lt;a href="URL"&gt; et &lt;/a&gt; ou dans l'alternative textuelle de l'image placée entre ces balises, éventuellement combinée au libellé textuel).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/img"><code>img</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans le code source de chaque lien texte ou image-lien</p><ul>
<li>Vérifier que le libellé du lien désigne explicitement la nature ou la fonction du contenu visé, ou encore la fonction spécifique du lien ;</li>
<li>Contrôler, dans le cas d'images-liens, que l'attribut <code>alt</code> de l'image joue ce rôle.</li></ul>

---

## Vulgarisation

Si le libellé textuel à lui seul (le contenu textuel qui se trouve entre les balises de l’élément a) ne permet pas d’obtenir un lien explicite, alors l’attribut title ne doit pas se contenter de contenir une éventuelle précision : il doit reprendre le libellé avant de le compléter. Par exemple, on n’utilisera pas title="nouvelle fenêtre", mais title="libellé du lien (nouvelle fenêtre)".
En effet, les aides techniques peuvent restituer indépendamment le libellé seul, le title seul, une combinaison des deux, le plus long des deux, etc. On ne peut donc compter sur la combinaison d’informations différentes données séparément par le libellé et le title pour obtenir à coup sûr un résultat explicite.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe/
- **API** : `https://api.opquast.com/checklist/137/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
