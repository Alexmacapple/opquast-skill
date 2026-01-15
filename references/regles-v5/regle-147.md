# Règle Opquast 147

> Le format des fichiers proposés en téléchargement est indiqué.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 147 |
| **ID** | 54462 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le format des fichiers proposés en téléchargement est indiqué.

### English
The format of the files available for download is indicated.

### Español
Se indica el formato de los archivos descargables.

---

## Objectifs

### Français
- Permettre aux utilisateurs de savoir en temps utile si leurs outils les autorisent à consulter les fichiers proposés en téléchargement. 
- Réduire la charge serveur en évitant les téléchargements inutiles.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Let users know, in a timely manner, whether their tools will allow them to view the downloadable files.
- Reduce server load by avoiding needless downloads.
- Improve the accessibility of content for people with disabilities.

### Español
- Permitir a los usuarios saber de manera oportuna si sus herramientas les permiten ver los archivos ofrecidos para su descarga. 
-  Reducir la carga del servidor evitando descargas innecesarias.
-  Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité
- Écoconception

### Thématiques
- Liens

### Phases projet
- Développement

---

## Explication pédagogique

Pour un internaute, le fait de voir immédiatement le format d’un fichier proposé au téléchargement (PDF, DOC, ODS, ODT, XLS, etc.) va lui permettre de savoir s’il peut ou non lire le fichier avec les logiciels dont il est équipé et le terminal de consultation utilisé.

---

## Solution recommandée

<p>Au minimum, prévoir une page d'aide indiquant le format des fichiers proposés s'il est unique.</p>
<p>Au mieux, indiquer le format pour chaque lien permettant de télécharger un fichier. </p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Pour chaque lien de téléchargement, vérifier qu'il est possible d'en connaître le format via : </p>
<ul>
<li>Une information générique donnée dans une page d'aide ;</li>
<li>Une information donnée dans le contexte du lien&nbsp;: paragraphe ou élément de liste <code>li</code> où il est inclus, titre de section qui le précède, cellule d'en-tête de tableau associée à celle où il est présent ;</li>
<li>L'attribut <code>title</code> du lien reprenant et complétant le libellé de celui-ci ;</li>
<li>Une information donnée dans le libellé du lien ;</li>
<li>Une icône dotée d'un texte alternatif indiquant le format du fichier.</li>
</ul>

---

## Vulgarisation

Cette règle aide les internautes à décider de l’opportunité ou du meilleur moment pour télécharger les fichiers en question. Un internaute qui ne peut pas lire un fichier, soit parce qu’il n’a pas l’extension ou le logiciel nécessaire, soit parce qu’il ne souhaite pas les installer, prendra sa décision en connaissance de cause.
Il est préférable de valider et mettre en place cette règle le plus en amont possible, l’idéal étant lors de la création des gabarits du site.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-format-des-fichiers-proposes-en-telechargement-est-indique/
- **API** : `https://api.opquast.com/checklist/147/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
