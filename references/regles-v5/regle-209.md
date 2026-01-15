# Règle Opquast 209

> Le serveur n'envoie pas la liste des fichiers des répertoires n'ayant pas de page d'index.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 209 |
| **ID** | 54136 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur n'envoie pas la liste des fichiers des répertoires n'ayant pas de page d'index.

### English
The server does not send the file listing of directories with no index page.

### Español
El servidor no envia el listado del contenido del directorio cuando no existe una página de inicio

---

## Objectifs

### Français
- Éviter l'affichage de listes de fichiers contenus dans un répertoire. 
- Améliorer la sécurité du serveur. 
- Limiter les risques d'intrusion.

### English
- Prevent the display of lists of files contained in a directory.
- improve the server’s security.
- Reduce the risk of intrusion.

### Español
-  Evitar mostrar listas de archivos contenidos en un directorio. 
- Mejorar la seguridad del servidor.  
- Limita los riesgos de intrusión.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Sécurité

### Phases projet
- Développement

---

## Explication pédagogique

Lorsqu’un répertoire du site ne contient pas de page d’accueil en front (le répertoire des images du site, par exemple), il arrive qu’il soit possible d’afficher son contenu. Par exemple, en cas de non-respect de cette bonne pratique, une URL comme domaine.com/ doc/ peut permettre l’accès à la liste complète des documents du site, et ce, même s’ils ne sont pas en ligne. C’est embêtant, n’est-ce pas ?

---

## Solution recommandée

<p>Configurer le serveur pour qu'il ne renvoie pas la liste des fichiers présents dans un répertoire. Pour Apache, ajouter par exemple <code>options –indexes</code> dans le <code>.htaccess</code>.</p>

---

## Méthode de vérification

<p>Pour chaque site audité&nbsp;:</p><ul>
<li>Contrôler que l'appel à un répertoire sans page par défaut – comme le répertoire des images, des scripts JS ou des feuilles de style – ne renvoie pas la liste du contenu de ce dossier (cette action peut en revanche mener à une page d'erreur ou à une redirection).</li>
				</ul>

---

## Vulgarisation

De nombreux fichiers qui ne sont pas directement liés à la navigation sur votre site se trouvent dans son arborescence : configuration serveur, liste de mots de passe, documents utilisés lors de la réalisation du site et oubliés lors de la mise en ligne... Il est a priori impossible d’y accéder, sauf à connaître leur URL, c’est-à-dire leur nom et leur emplacement. Si vous oubliez de protéger les répertoires n’ayant pas de page d’index, vous accéderez ainsi à ces fichiers sensibles. Il existe suffisamment de personnes à la recherche de ce type d’informations pour éviter que vous leur fournissiez involontairement des éléments utiles à leurs recherches.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-nenvoie-pas-la-liste-des-fichiers-des-repertoires-nayant-pas-de-page-dindex/
- **API** : `https://api.opquast.com/checklist/209/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
