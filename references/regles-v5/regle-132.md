# Règle Opquast 132

> Chaque changement de langue est signalé.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 132 |
| **ID** | 54439 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque changement de langue est signalé.

### English
Each language change is identified.

### Español
Se indica cada cambio de idioma.

---

## Objectifs

### Français
- Permettre aux aides techniques d’interpréter correctement les contenus exprimés dans une autre langue. 
- Faciliter le travail des outils de traduction automatique. 
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Enable technical aids to correctly interpret content expressed in another language.
- Simplify the work of machine translation tools.
- Enable web crawlers to extract strings of characters in a given language.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir que las ayudas técnicas interpreten correctamente el contenido expresado en otro idioma. 
-  Facilitar el trabajo de las herramientas de traducción automática. 
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Internationalisation

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Les outils automatiques et les robots qui parcourent vos contenus ne peuvent pas forcément en deviner la langue principale ni ses éventuelles variations. La présence d’un terme en langue étrangère dans une page peut et doit être signalé.

---

## Solution recommandée

<p>Utiliser l'attribut <code>lang</code> et le code de langue adapté pour chaque contenu dont la langue diffère de celle de la page courante. Par exemple : &lt;title lang="en"&gt;<code>Open quality standards</code>&lt;/title&gt; </p><p>Si le contenu dont la langue diffère n'est pas déjà balisé par un élément de la structure HTML existante (titre, lien, citation etc.), il est alors nécessaire d'ajouter un élément spécifique (<code>div</code> ou <code>span</code>) pour spécifier la langue de cet élément (à l'exception du contenu de l'élément <code>title</code> qui ne peut comporter de balisage interne).</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Attributs_universels/lang"><code>lang</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Dans chaque page examinée&nbsp;:</p><ul>
<li>Repérer tous les contenus rédigés dans une autre langue que la langue principale, sans oublier les contenus des attributs HTML restitués à l'utilisateur (tel que celui de l'attribut <code>alt</code> des images)</li><li>Contrôler que la langue de ces contenus est précisée via un attribut <code>lang</code> placé sur l'élément concerné par le changement de langue (titre, lien, item de liste) ou hérité d'un élément parent. </li></ul>

---

## Vulgarisation

Cette règle peut ne pas s’appliquer aux noms propres ni aux termes issus d’une langue étrangère mais qui sont passés dans l’usage courant. Cependant, en cas de doute sur la nécessité de préciser la langue d’un contenu, c’est la question de sa prononciation correcte par une synthèse vocale qui doit l’emporter. Il s’agit de se demander comment sera prononcé ce contenu s’il est considéré comme étant dans la langue par défaut de la page et non dans sa langue propre.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-changement-de-langue-est-signale/
- **API** : `https://api.opquast.com/checklist/132/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
