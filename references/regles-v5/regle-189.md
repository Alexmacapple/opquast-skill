# Règle Opquast 189

> Les pictogrammes typographiques sont dotés d'une alternative appropriée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 189 |
| **ID** | 54173 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les pictogrammes typographiques sont dotés d'une alternative appropriée.

### English
Typographic symbols have an appropriate alternative.

### Español
Los simbolos tipográficos tienen un texto alternativo apropiado

---

## Objectifs

### Français
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation.

### English
- Enable users in environments where the CSS fonts used to display symbols are not reproduced (text browsers, screen readers or browsers with the images disabled) to understand the meanings of those symbols.
- Enable bots to exploit the information carried by those symbols (to reference, index and perform machine translation on the alternatives).
- Improve the accessibility of content for people with disabilities.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Accessibilité
- SEO

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Le recours aux web fonts (polices de caractères téléchargeables) a considérablement facilité le recours à une astuce technique très appréciée du point de vue des performances : remplacer les images de diverses icônes par un caractère UTF-8 graphique obtenu grâce à une police spécifique. Ceci comporte cependant des risques importants, notamment en matière d’accessibilité, si vous ne veillez pas à ménager une alternative textuelle à ce caractère détourné de son sens par défaut.

---

## Solution recommandée

<p>Fournir un contenu masqué à l’affichage via CSS pour chaque information portée par le recours à une police de caractères spécifique.</p>

---

## Méthode de vérification

<div>Examiner directement le code pour vérifier que chaque icône affichée via une police de caractères est dotée d’une alternative dans le contenu HTML.</div>

---

## Vulgarisation

Un pictogramme typographique repose sur l'utilisation d'un caractère arbitraire en guise de contenu, l'icône étant produite via la police de caractère appliquée. Ce caractère n'a aucun sens s'il est restitué à l'utilisateur d'un lecteur d'écran, ni du point de vue du référencement. Il est donc nécessaire, par exemple, d'inclure dans le contenu du lien un libellé explicite masqué à l'affichage.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-pictogrammes-typographiques-sont-dotes-dune-alternative-appropriee/
- **API** : `https://api.opquast.com/checklist/189/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
