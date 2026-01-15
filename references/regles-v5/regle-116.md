# Règle Opquast 116

> Chaque image décorative est dotée d'une alternative textuelle appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 116 |
| **ID** | 54436 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque image décorative est dotée d'une alternative textuelle appropriée.

### English
Each decorative image has an appropriate text alternative.

### Español
Cada imagen decorativa tiene un texto alternativo apropiado

---

## Objectifs

### Français
- Éviter aux utilisateurs placés dans des contextes où les images ne sont pas perceptibles (navigateur texte, lecteur d’écran, navigateur avec images désactivées) d’être perturbés par des informations sur des images qui leur sont inutiles. 
- Fournir aux robots d’indexation uniquement des informations pertinentes.
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Prevent users in environments where images are not seen (text browsers, screen readers or browsers with the images disabled) from being bothered by information about images that are unimportant to them.
- Provide only pertinent information to web crawlers.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Evitar que los usuarios sean molestados, en contextos donde las imágenes no son perceptibles (navegador de texto, lector de pantalla, navegador con imágenes desactivadas), por la información sobre las imágenes que no necesitan. 
- Proveer a los robots de indexación únicamente información relevante.
- Mejorar la accesibilidad del contenido para las personas con discapacidad. 
- Mejorar la consideración del contenido por los motores de búsqueda y las herramientas de indexación.

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

Savez-vous qu’il est possible d’écouter une page ? C’est ce que font toutes les personnes équipées d’un logiciel lecteur d’écran, ce qui est souvent le cas des personnes malvoyantes et non-voyantes. Ce logiciel leur lit les pages web. Si vous avez indiqué une alternative textuelle pour chaque image décorative, celle-ci sera systématiquement lue. Mais au bout de la vingtième fois que le lecteur d’écran aura prononcé les mots « Puce bleue », l’utilisateur sera peut-être énervé. Dans la plupart des cas, l'alternative textuelle appropriée pour une image décorative sera un attribut ou un contenu vide.

---

## Solution recommandée

<div>D’une manière générale, si un code (un attribut HTML, par exemple) est prévu pour l’alternative, il doit être présent, mais en restant vide. Pour les cas les plus courants :</div><div><ul><li>Donner à chaque élément img décoratif un attribut alt vide (alt="").</li><li>Donner à chaque élément area décoratif un attribut alt vide.</li><li>Laisser vide le contenu de chaque élément object concerné (entre les balises &lt;object&gt; et &lt;/object&gt;).</li><li>Laisser vide le contenu de chaque élément canvas concerné.</li><li>Ne donner à chaque élément svg concerné aucun attribut ARIA qui lui confère un label (aria-labelledby, aria-describedby, etc.).</li></ul></div>

---

## Méthode de vérification

<div>Cette vérification s’effectue dans le code HTML généré à l’aide d’un inspecteur de code ou d’une barre d’outils dédiée :</div><div><ul><li>Tester au préalable la présence des attributs alt en vérifiant la validité du code HTML généré, par exemple avec le validateur du W3C (le validateur HTML signale les images privées d’alternative) : chaque image décorative doit avoir un attribut alt (présent mais vide).</li><li>Vérifier que chaque image img ne véhiculant pas d’information nécessaire à la compréhension du contenu a bien un alt vide.</li><li>Vérifier les éventuels autres objets graphiques du type object, canvas dont le contenu (entre les balises ouvrantes et fermantes) doit être vide.</li><li>Vérifier les éventuels autres éléments du type svg susceptibles de recevoir une alternative via un attribut ARIA.</li></ul></div>

---

## Vulgarisation

Identifier les images dites « décoratives » est plus délicat qu’il n’y paraît :
•Pour la plupart, elles devraient bien sûr être des images CSS, absentes du code HTML.
•Il peut cependant subsister dans le code HTML des puces, des bordures, etc.
•Et, surtout, une image qui ne fait que reproduire une information présente par ailleurs dans la page sous forme textuelle, ou qui vient l’illustrer, est à sa manière une image décorative.
La première règle à retenir, en cas de doute, est : une éventuelle perte d’information à la marge sera-t-elle bloquante ? En production de contenu, peut-on privilégier la rédaction textuelle de l’information que l’image viendra uniquement illustrer ? Dans ce cas, l’image peut être gérée par défaut comme une image décorative dotée systématiquement d’une alternative vide (mais toujours modifiable par le rédacteur en cas de nécessité).
La deuxième règle essentielle est que les images décoratives ne sont pas l’occasion de mettre dans votre code des mots-clés supposés être utiles au référencement, surtout pas !
Enfin, n’oubliez pas non plus une dernière règle d’or : une image qui est le seul contenu d’un lien ou d’un bouton ne peut en aucun cas être décorative et dotée d’une alternative vide !

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee/
- **API** : `https://api.opquast.com/checklist/116/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
