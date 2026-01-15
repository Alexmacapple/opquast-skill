# Règle Opquast 181

> L'information n'est pas véhiculée uniquement par la couleur.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 181 |
| **ID** | 54470 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'information n'est pas véhiculée uniquement par la couleur.

### English
Information is not conveyed by color alone.

### Español
La información no se comunica sólo por el color.

---

## Objectifs

### Français
- Permettre l’accès à l’information pour les utilisateurs dont le navigateur, la plateforme, l’aide technique ou encore le handicap (comme le daltonisme) ne permettent pas de visualiser ou de différencier les couleurs. 
- Rendre l’information accessible aux robots d’indexation.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Enable access to information for users whose browsers, platforms, technical aids or disabilities (such as color blindness) prevent them from viewing or differentiating between colors
- Make information accessible by web crawlers.
- Improve content accessibility for people with disabilities.

### Español
-  Permitir el acceso a la información a los usuarios cuyo navegador, plataforma, ayuda técnica o discapacidad (como el daltonismo) no les permite ver o diferenciar los colores. 
- Hacer la información accesible a los robots de indexación.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Présentation

### Phases projet
- Conception

---

## Explication pédagogique

Cette règle consiste à ne pas faire référence à un contenu ou à une fonctionnalité uniquement par sa couleur. Par exemple, le caractère obligatoire d’un champ de formulaire signalé en rouge pourra ne pas être perçu par tous.

---

## Solution recommandée

<p>Fournir un complément à la couleur pour véhiculer l’information qu’elle porte. Ce complément, indépendant de la couche de mise en forme CSS, peut être de plusieurs ordres :</p><p></p><ul><li>Prévoir un balisage sémantique (strong, em, etc.) ;</li><li>Ajouter des mentions textuelles (astérisque signalant un champ obligatoire) ;</li><li>Ajouter des hachures, motifs, bordures, etc. dans les cartes et les graphiques.</li></ul><p></p><ul>
				</ul>

---

## Méthode de vérification

<p>La vérification nécessite de comparer visuellement deux versions de la page : la version normale et une version où les couleurs seront désactivées. Elle est donc plus aisée à mener avec un double écran. Pour chaque page examinée :</p><p></p><ul><li>Désactiver le support de la couleur via votre barre d’outils de test puis passer les images en niveau de gris.</li><li>Vérifier par comparaison si la version sans couleurs présente des pertes d’information. Ce sera par exemple le cas dans un menu de navigation où la rubrique en cours ne se différencie que par sa couleur, ou encore dans une carte dont les zones sont de simples aplats de couleur sans bordure ni motifs.</li></ul><p></p><p>Attention : l’information peut parfois être présente indépendamment de la couleur dans un attribut title, provoquant l’apparition d’une infobulle au survol du contenu. L’accès à l’infobulle depuis le clavier n’étant à ce jour pas possible par défaut dans tous les navigateurs, cette solution doit être écartée.</p>

---

## Vulgarisation

l ne s’agit évidemment pas ici de limiter ou de proscrire l’usage de la couleur comme support de l’information : elle joue un rôle essentiel dans l’ergonomie des contenus et des interfaces web. En revanche, le respect de cette règle garantit que l’information ne sera jamais dépendante de la capacité à percevoir les couleurs ou de la possibilité de restituer correctement la couche de mise en forme de l’interface.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/linformation-nest-pas-vehiculee-uniquement-par-la-couleur/
- **API** : `https://api.opquast.com/checklist/181/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
