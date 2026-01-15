# Règle Opquast 218

> L'adresse du site fonctionne avec et sans préfixe www.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 218 |
| **ID** | 54468 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'adresse du site fonctionne avec et sans préfixe www.

### English
The address of the website and of its subdomains works with and without a www prefix.

### Español
Las direcciones del sitio web y de sus subdominios funcionan con y sin el prefijo www

---

## Objectifs

### Français
- Permettre aux utilisateurs de rejoindre la page d'accueil du site même lorsqu'ils oublient de taper le préfixe www.
- Diminuer l'impact énergétique lié à la consultation du site

### English
- Allow users to reach the site’s homepage, even if they forget to enter the “www” prefix
- Reduce the energy impact related to the consultation of the site

### Español
- Permitir a los usuarios llegar a la página principal del sitio web incluso cuando se olviden de escribir el prefijo www.
- Disminuir el impacto energético de la consulta del sitio web.

---

## Métadonnées

### Tags
- Écoconception

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Lorsque l’on saisit directement des termes de format domaine.com, certains navigateurs transforment en https://www.domaine.com, d’autres en https://domaine.com Il arrive fréquemment que cette dernière adresse renvoie une erreur, même sur de très gros sites. Pensez-y.

---

## Solution recommandée

<p>Configurer le serveur de façon à ce qu'il gère les adresses sans www (acheminement).</p>

---

## Méthode de vérification

<p>Sur quelques unes des pages examinées&nbsp;:</p><ul>
<li>Enlever le préfixe «www» dans l'adresse de la page, au sein de la barre d'URL de votre navigateur </li>
<li>Vérifier que vous avez toujours accès au site. </li>
</ul>
<p>Attention : certains navigateurs masquent par défaut le préfixe www. Le test devra donc se faire en ajoutant http:// ou https://devant l'adresse tout en omettant le préfixe, par exemple : https://opquast.com. </p>

---

## Vulgarisation

Les navigateurs n’ont pas tous le même comportement lorsque l’on saisit uniquement l’URL domaine.com. Certains ajoutent automatiquement la chaîne http://www. avant le domaine, d’autres laissent la requête telle quelle et appellent http://domaine.com. Dans ce dernier cas, il arrive fréquemment que le site conduise à une page d’erreur, ou pire, que le serveur ne réponde pas. C’est évidemment à éviter. Il faut également penser au cas où seul le nom de domaine a été communiqué à l’utilisateur : il ne pensera pas forcément à essayer avec ou sans www si l’un des deux accès ne fonctionne pas.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/ladresse-du-site-fonctionne-avec-et-sans-prefixe-www/
- **API** : `https://api.opquast.com/checklist/218/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
