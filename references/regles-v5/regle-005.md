# Règle Opquast 5

> La première occurrence d'une abréviation ou d'un acronyme dans le corps de chaque page donne accès à sa signification.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 5 |
| **ID** | 54406 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La première occurrence d'une abréviation ou d'un acronyme dans le corps de chaque page donne accès à sa signification.

### English
The first occurrence of an abbreviation or an acronym in the body of any page gives access to an explanation of its meaning.

### Español
La primera aparición de una abreviatura o acrónimo en cada página da acceso a su significado.

---

## Objectifs

### Français
- Permettre à l’utilisateur d’accéder rapidement à la signification d’un sigle. 
- Permettre l’exploitation du contenu par un robot (pour l’établissement d’un index des sigles). 
- Favoriser le référencement du contenu.
- Améliorer l’accessibilité des contenus aux personnes handicapées.

### English
- Allow users to quickly understand the meaning of an acronym.
- Enable bots to exploit the content (in order to establish an index of abbreviations).
- Foster referencing of the content.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios entender rápidamente el significado de un acrónimo.
- Permitir a los robots indexar el contenido (con el fin de establecer un índice de abreviaturas).
- Favorecer el posicionamiento del contenido.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidades 

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Contenus

### Phases projet
- Conception
- Développement
- Editorial

---

## Explication pédagogique

SIG, TVA, AVT, VAT, DTC, XML… les abréviations, sigles et acronymes pullulent sur le web, notamment dans les domaines techniques et administratifs. En les explicitant, vous rendez un fier service à vos utilisateurs et vous améliorez votre référencement.

---

## Solution recommandée

<p>Au moins lors de la première apparition d’un sigle, acronyme ou abréviation dans la page, il s’agira de veiller à recourir à au moins l’une des méthodes ci-dessous :</p><p></p><ul><li>Expliciter sa signification au sein même du texte, par exemple : « une DTD (déclaration de type de document) ».</li><li>Fournir un lien donnant accès à sa signification dans une page de glossaire ou via un affichage dynamique (bulle d’aide JavaScript).</li><li>Baliser avec l’élément HTML <code>abbr</code> et renseigner l’attribut <code>title</code> de celui-ci pour indiquer sa signification.</li></ul>
<p>La bonne pratique ne fait cette exigence que pour la première occurrence dans la page : cela peut être fait ou non pour les suivantes.</p>

---

## Méthode de vérification

<p>Dans chaque page examinée, identifier visuellement chaque sigle, abréviation ou acronyme présent dans la page, puis vérifier, pour sa première occurrence dans la page, la présence, au moins :</p>
<ul>
<li>de sa signification immédiatement indiquée dans le contexte, par exemple entre parenthèses,</li>
<li>d’un lien sur le sigle donnant accès à sa signification, par exemple dans un glossaire, </li>
<li>ou de l’élément <code>abbr</code> doté d’un attribut <code>title</code> explicitant sa signification.</li>
</ul>

---

## Vulgarisation

Lorsqu’un sigle est employé de manière répétée dans un même contenu, il est souvent préférable d’en expliciter seulement la première occurrence. La présence d’un glossaire sur le site est une démarche qui peut être retenue indépendamment des autres techniques indiquées ici : le glossaire facilite la consultation et la maîtrise par l’utilisateur d’un éventuel vocabulaire spécialisé. Il servira aussi éventuellement de support à la fonctionnalité de bulle d’aide JavaScript. Enfin, cette dernière présente un avantage important par rapport au mécanisme de tooltip natif des éléments abbr et acronym : l’affichage du sens du sigle sera accessible au clavier.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-premiere-occurrence-dune-abreviation-ou-dun-acronyme-dans-le-corps-de-chaque-page-donne-acces-a-sa-signification/
- **API** : `https://api.opquast.com/checklist/5/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
