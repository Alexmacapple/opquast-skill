# Règle Opquast 232

> Le code source de chaque page contient une métadonnée qui définit le jeu de caractères.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 232 |
| **ID** | 54450 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le code source de chaque page contient une métadonnée qui définit le jeu de caractères.

### English
Each page’s source code contains metadata which defines the character set used.

### Español
El código fuente de cada página contiene metadatos que definen el juego de caracteres

---

## Objectifs

### Français
- Permettre un affichage hors ligne correct des pages en indiquant au navigateur quel est le jeu de caractères utilisé.
- Prévenir le risque de problèmes d’affichage de caractères lié à un fonctionnement parfois hasardeux des mécanismes de rattrapage des navigateurs quand ils ne disposent pas de l’information nécessaire via l’entête HTTP content-type.
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Display pages offline correctly, by telling the browser which character set was used.
- Prevent the risk of character display problems associated with the sometimes unsure functioning of browsers’ catch-up mechanisms when they don’t receive the necessary information from the HTTP content-type header.
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
-  Habilitar la correcta visualización sin conexión de las páginas indicando al navegador qué juego de caracteres se utiliza.
-  Prevenir el riesgo de problemas de visualización de caracteres relacionados con el funcionamiento, a veces peligroso, de los mecanismos de recuperación de los navegadores cuando no tienen la información necesaria a través del encabezado de HTTP content-type.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Structure et code

### Phases projet
- Développement

---

## Explication pédagogique

Au hasard de votre navigation, vous avez certainement rencontré des bizarreries d’affichage sur certains caractères, des points d’interrogation dans des petits carrés, par exemple. C’est sans doute que les administrateurs des sites où vous les avez trouvées ne respectaient pas cette bonne pratique.

---

## Solution recommandée

<p>L’élément meta est renseigné en fonction de l’encodage effectif du document et de son type MIME sous la forme :</p>
<ul><li><code>meta charset="utf-8"</code> en HTML5 </li>
				</ul>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta"><code>meta</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Ce critère peut être vérifié par l’examen du code source, à l’aide d'un outil de développement. Pour chaque page :</p><ul><li>Vérifier la présence de l’élément meta http-equiv="Content- Type" ou charset.</li><li>Vérifier la pertinence du jeu de caractères indiqué dans son attribut content ou charset.</li></ul>

---

## Vulgarisation

Cette information doit être avant tout délivrée via l’entête HTTP content-type adressé par le serveur au navigateur. Cet en-tête HTTP est prioritaire sur l’élément meta, qui ne fait qu’en rappeler le contenu. Néanmoins, l’élément meta joue un rôle clé lors d’une consultation hors ligne ou si l’en-tête HTTP fait défaut.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres/
- **API** : `https://api.opquast.com/checklist/232/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
