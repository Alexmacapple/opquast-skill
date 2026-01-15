# Règle Opquast 226

> Le serveur transmet des contenus compressés aux clients qui les acceptent.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 226 |
| **ID** | 54506 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur transmet des contenus compressés aux clients qui les acceptent.

### English
The server transmits compressed contents to the clients which accept them.

### Español
El servidor envia los archivos compridos a los clientes que lo acepten

---

## Objectifs

### Français
- Améliorer la vitesse de rendu de la page. 
- Diminuer les coûts de bande passante.
- Diminuer l'impact énergétique lié à la consultation du site

### English
- Improve the speed of the page’s rendering.
- Reduce bandwidth costs.
- Reduce the energy impact related to the consultation of the site.

### Español
- Mejorar la velocidad de reproducción de la página. 
- Disminuir los costes del ancho de banda.
- Disminuir el impacto energético relacionado con la consulta del sitio web

---

## Métadonnées

### Tags
- Basics
- Écoconception

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Il s’agit d’un moyen particulièrement efficace d’accélérer le temps d’accès à une page et de réduire le coût de bande passante : il est possible de configurer un serveur pour qu’il envoie des pages compressées (dans un format proche de celui d’une archive .zip). Les contenus sont alors « dézippés » à la volée et de manière totalement transparente sur le poste de l’utilisateur.

---

## Solution recommandée

<p>Activer le module Gzip ou Deflate du serveur pour compresser les ressources Javascript, CSS et HTML.</p>

---

## Méthode de vérification

<p>Pour chaque page examinée&nbsp;: </p><ul>
<li>Vérifier la compression des contenus (Gzip) à l'aide d'un outil dédié. </li>
</ul><p>Attention à bien vérifier tous les éléments liés (CSS, JS, HTML) et pas seulement la page en elle-même. Les formats déjà compressés comme les images JPEG ou PNG ou les archives zip, par exemple, ne doivent pas être recompressés.</p><p>Si la taille avant compression d'un élément est inférieure à 1 Ko, il n'est pas nécessaire de le compresser, au risque de voir son poids augmenter.</p>

---

## Vulgarisation

Au vu du contexte favorable de ces dernières années (généralisation des CSS et des frameworks JS ou arrivée de la vidéo d’un côté et augmentation des débits de l’autre), les pages web ont vu leur poids moyen exploser. Le temps d’affichage d’une page est devenu plus dépendant de la qualité du réseau, aux dépens de ceux qui ne bénéficient pas du haut débit ou qui naviguent avec leur mobile. Il est possible de diviser le poids des fichiers de texte de manière très importante en les compressant : le serveur web va zipper les fichiers demandés et le navigateur va les dézipper, diminuant d’autant le temps nécessaire à la transmission des données. Parmi ces fichiers de texte se trouvent toutes les pages HTML, statiques ou dynamiques, les feuilles de styles ou les fichiers de scripts, ce qui représente une grosse partie de la plupart des sites internet. Parmi toutes les actions destinées à accélérer un site, il s’agit sans doute de celle qui a le meilleur résultat bénéfice/coût.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-transmet-des-contenus-compresses-aux-clients-qui-les-acceptent/
- **API** : `https://api.opquast.com/checklist/226/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
