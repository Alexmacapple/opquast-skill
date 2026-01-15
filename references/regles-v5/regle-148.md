# Règle Opquast 148

> La taille des fichiers internes proposés en téléchargement est indiquée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 148 |
| **ID** | 54499 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
La taille des fichiers internes proposés en téléchargement est indiquée.

### English
The size of the internal files available for downloading is indicated.

### Español
Se indica el tamaño de los archivos descargables.

---

## Objectifs

### Français
- Informer de façon préventive les utilisateurs sur la quantité de données à télécharger. 
- Permettre aux utilisateurs de différer le téléchargement en connexion bas débit ou mobile.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Provide advance notice to the users on the quantity of data that will be downloaded, as a
- Preventive measure.
- Allow users to wait to download the file over a low-speed or mobile connection.
- Improve the accessibility of content for people with disabilities.

### Español
- Informar a los usuarios de manera proactiva sobre la cantidad de datos que van a descargar. 
-  Permitir a los usuarios aplazar la descarga en cuando no disponen de banda ancha rápida o conexión móvil.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Basics
- Accessibilité
- Écoconception

### Thématiques
- Liens

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Cette mention de la taille des fichiers va permettre aux internautes de décider du meilleur moment pour télécharger un document. Par exemple, un internaute dans un contexte de mobilité ou disposant d’une connexion bas débit pourra choisir de reporter, voire de ne pas lancer, le téléchargement d’un fichier.

---

## Solution recommandée

<p>Au minimum, prévoir une page d'aide indiquant le poids moyen ou maximum pour l'ensemble des fichiers proposés.</p><p>Au mieux, indiquer le poids lors de chaque lien permettant de télécharger un fichier.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque lien de téléchargement, vérifier qu'il est possible d'en connaître le poids&nbsp;:</p><ul>
<li>Via une information générique donnée dans une page d'aide ; </li>
					<li>Via une information donnée dans le contexte du lien&nbsp;: paragraphe ou élément de liste <code>li</code> où il est inclus, titre de section qui le précède, cellule d'en-tête de tableau associée à celle où il est présent ; </li>
					<li>Via l'attribut <code>title</code> du lien reprenant et complétant le libellé de celui-ci ; </li>
					<li>Ou via une information donnée dans le libellé du lien. </li>
				</ul>

---

## Vulgarisation

La validation de cette règle gagne considérablement à être réalisée le plus en amont possible, notamment dès la phase de prototypage. De cette façon, les prototypes et toutes les phases ultérieures prévoiront la façon dont cette information doit être restituée. Il est également à noter que certains systèmes de gestion de contenus automatisent l’ajout de ces informations.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/la-taille-des-fichiers-internes-proposes-en-telechargement-est-indiquee/
- **API** : `https://api.opquast.com/checklist/148/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
