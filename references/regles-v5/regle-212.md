# Règle Opquast 212

> Un mécanisme de sécurité restreint l'origine des contenus.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 212 |
| **ID** | 54532 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Un mécanisme de sécurité restreint l'origine des contenus.

### English
A security mechanism restricts the origin of content.

### Español
Un mecanismo de seguridad restringe el origen de los contenidos.

---

## Objectifs

### Français
- Réduire les risques d’exécution ou d’affichage d’un contenu non désirable ou d’une source non autorisée.

### English
- Reduce the risk of executing or serving content that is undesirable or that comes from an unauthorized source.

### Español
- Reducir el riesgo de ejecutar o mostrar contenidos indeseables o de fuentes no autorizadas.

---

## Métadonnées

### Tags
- Basics

### Thématiques
- Sécurité

### Phases projet
- Développement

---

## Explication pédagogique

Le serveur envoie une page contenant divers éléments (fichiers JavaScript, CSS, webfonts, etc.) au navigateur, qui va se charger de télécharger et d’afficher le tout, le mieux et le plus vite possible… sans se poser de questions sur la légitimité de ce qu’il fait. Le système nommé Content Security Policy permet d’indiquer au navigateur des règles concernant l’origine de ces contenus. Cela permet de déterminer précisément ce qu’il aura le droit d’exécuter ou d’afficher, et cela renforce donc la sécurité pour les utilisateurs.

---

## Solution recommandée

<div>Activer l’en-tête HTTP Content-Security-Policy avec les directives CSP 1 appropriées :</div><div><ul><li>img-src pour les images ;</li><li>script-src pour le JavaScript ;</li><li>style-src pour les styles CSS ;</li><li>font-src pour les webfonts ;</li><li>etc.</li></ul></div>

---

## Méthode de vérification

<div>Vérifier, à l’aide d’un outil d’inspection des en-têtes HTTP, la présence de l’en-tête Content-Security-Policy.</div>

---

## Vulgarisation

Les navigateurs web sont des programmes dont le fonctionnement est incroyablement complexe. Toutefois, ils ne cherchent pas nécessairement à savoir quelles sources de contenus – JavaScript, CSS, images, etc. – sont bien celles que vous souhaitez voir affichées ou exécutées sur votre site. Avec l’utilisation croissante entre autres de JavaScript, les problèmes dits de cross-site scripting et plus largement de contenus non désirables risquent de survenir.
Indiquez aux navigateurs comment protéger vos visiteurs en définissant une politique restreignant l’origine de vos contenus. Ajoutons à cela que vous aiderez aussi les contributeurs, les développeurs, etc. à mieux respecter vos éventuelles règles à ce propos !

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-propose-un-mecanisme-de-securite-permettant-de-restreindre-lorigine-des-contenus/
- **API** : `https://api.opquast.com/checklist/212/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
