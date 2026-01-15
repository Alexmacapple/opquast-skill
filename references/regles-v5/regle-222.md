# Règle Opquast 222

> Le serveur envoie un code HTTP 404 pour les ressources non trouvées.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 222 |
| **ID** | 54379 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur envoie un code HTTP 404 pour les ressources non trouvées.

### English
The server sends a 404 HTTP error code for resources not found

### Español
El servidor envía un código de error HTTP 404 para los recursos no encontrados

---

## Objectifs

### Français
- Permettre la détection automatisée des URL erronées.
-  Transmettre au navigateur une information sûre.
- Diminuer l'impact énergétique lié à la consultation du site. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### English
- Enable the automated detection of incorrect URLs.
- Send reliable information to the browser.
- Reduce the energy impact related to the consultation of the site.
- Improve the way content is taken into account by search engines and indexing tools.

### Español
-  Habilitar la detección automatizada de URLs erróneos.
-  Transmitir información segura al navegador.
-  Disminuir el impacto energético relacionado con la consulta del sitio. 
- Mejorar la forma en la que el contenido es identificado por los motores de búsqueda y las herramientas de indexación.

---

## Métadonnées

### Tags
- Écoconception
- SEO

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Il ne s’agit pas seulement d’informer votre visiteur d’une erreur d’adresse : c’est aussi utile pour différents outils, tels que les moteurs de recherche. L’appel d’une adresse en erreur devrait systématiquement donner lieu à une réponse 404 (not found) par le serveur. Curieusement, dans certains cas, le serveur ou le CMS utilisé renvoient une page d’erreur 404 accompagnée d’un code 200 (qui signifie « OK, tout va bien »).

---

## Solution recommandée

<p>Modifier la configuration du serveur web pour renvoyer l'utilisateur vers une page personnalisée lorsque la ressource demandée n'existe pas.</p><p>Si la configuration principale du serveur n'est pas directement accessible et si l'environnement le permet, utiliser une configuration locale par répertoire. Par exemple, l'environnement Apache autorise la création d'un fichier <code>.htaccess</code> contenant des directives relatives aux traitements des erreurs : <code>ErrorDocument 404 /mapage.html</code>.</p>

---

## Méthode de vérification

<p>Pour chaque site examiné&nbsp;:</p><ul>
<li>Taper l'adresse URL du site suivie de caractères aléatoires (du type http://www.example.com/lsghlshdgkjsdgk).</li>
<li>Vérifier à l'aide d'un outil de développement que le statut indiqué est bien <code>404 not found</code>. </li>
</ul>

---

## Vulgarisation

Cette règle doit être tout particulièrement appliquée dans les cas où aucune page d’erreur spécifique n’est renvoyée mais où on est redirigé vers l’accueil en cas d’erreur.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-envoie-un-code-http-404-pour-les-ressources-non-trouvees/
- **API** : `https://api.opquast.com/checklist/222/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
