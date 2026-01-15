# Règle Opquast 233

> Le codage de caractères utilisé est UTF-8.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 233 |
| **ID** | 54381 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le codage de caractères utilisé est UTF-8.

### English
The character encoding is UTF-8.

### Español
El juego de caracteres utilizado es UTF-8.

---

## Objectifs

### Français
- Recourir à un jeu de caractères international. 
- Prévenir les défauts d’affichage. 
- Faciliter la manipulation des contenus par les utilisateurs et les développeurs.

### English
- Use an international character set.
- Prevent display faults.
- Simplify content manipulation by users and developers.

### Español
-  Utilizar un conjunto de caracteres internacionales. 
-  Prevenir los errores de visualización. 
- Facilitar la manipulación del contenido por parte de los usuarios y desarrolladores.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Structure et code

### Phases projet
- Développement

---

## Explication pédagogique

UTF-8 est le codage de caractères universel par excellence. Il permet d’afficher une quantité considérable de caractères. En l’utilisant systématiquement, vous vous éviterez bien des problèmes.

---

## Solution recommandée

<p>Configurer le serveur et les bases de données de manière à utiliser UTF-8.</p><p>Choisir des outils (logiciels de développement, frameworks, CMS, outils de production de contenu) compatibles avec UTF-8.</p>

---

## Méthode de vérification

<p>Cette vérification s’effectue en trois temps. Pour chaque page examinée :</p><ul><li>Vérifier l’indication du jeu de caractères donnée par l’en-tête HTTP content-type envoyée par le serveur, à l'aide d'un outil dédié.</li><li>Vérifier, le cas échéant, la conformité à cet en-tête de l’élément meta http-equiv="Content-Type" dans le code HTML des pages.</li><li>Vérifier que le contenu des pages est effectivement encodé en UTF-8 (absence de caractères inattendus ou erronés), par exemple en soumettant la page à une validation HTML auprès du validateur du W3C (validator.w3.org).</li></ul><p>L’outil Internationalization Checker du W3C (validator.w3.org/i18n-checker/) permet de combiner ces trois étapes.</p>

---

## Vulgarisation

La prise en charge d’UTF-8 est aujourd’hui universelle. L’utilisation de ce jeu de caractères améliore la compatibilité du site et de ses contenus. Elle facilite les exports, les imports et les migrations de contenus. C’est en fait une mesure de prévention des risques.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-codage-de-caracteres-utilise-est-utf-8/
- **API** : `https://api.opquast.com/checklist/233/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
