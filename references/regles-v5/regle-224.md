# Règle Opquast 224

> Le serveur envoie une page d'interdiction 403 personnalisée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 224 |
| **ID** | 54486 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur envoie une page d'interdiction 403 personnalisée.

### English
The server sends a customised 403 “Forbidden” error page.

### Español
El servidor envía una página personaliza de error 403 prohibido

---

## Objectifs

### Français
- Rassurer l'internaute sur le fait qu'il est toujours dans le même site. 
- Permettre à l'administrateur du site de mettre des éléments de guidage pour l'utilisateur. 
- Informer l'utilisateur sur l'erreur rencontrée, sur la continuité de fonctionnement du serveur et mettre hors de cause sa connexion.

### English
- Reassure users that they are still on the same website.
- Allow the webmaster to provide guidance to your users.
- Inform users of the error encountered and of the server’s continuing operation.
- Inform users that the problem isn't caused by their connectivity.

### Español
- Asegurar al usuario que sigue estando en el mismo sitio web. 
-  Permitir al administrador del sitio web poner elementos de orientación para el usuario. 
- Informar al usuario sobre el error encontrado, sobre la continuidad del funcionamiento del servidor y evitar las dudas sobre un posible problema relacionado con su conexión.

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Serveur et performances

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Lorsque l’internaute essaye de consulter une page interdite (demande d’affichage du contenu d’un répertoire, par exemple), le serveur n’envoie pas une page 404 (not found) mais 403 (forbidden), fort peu sympathique. Comme dans le cas de l’erreur 404, cette page peut être personnalisée aux couleurs du site visité.

---

## Solution recommandée

<p>Modifier la configuration du serveur web pour renvoyer l'utilisateur vers une page personnalisée lorsque l'accès à la ressource demandée n'est pas autorisé.</p><p>Si la configuration principale du serveur n'est pas directement accessible et si l'environnement le permet, utiliser une configuration locale par répertoire. Par exemple, l'environnement Apache autorise la création d'un fichier <code>.htaccess</code> contenant des directives relatives aux traitements des erreurs : <code>ErrorDocument 403 /mapage403.html</code>.</p>

---

## Méthode de vérification

<p>Pour chaque site audité :</p><ul>
<li>Obtenir une page d'erreur 403, pour cela, vous pouvez retirer la dernière partie de l'adresse url d'une des images du site pour ne garder que le nom des répertoires présents entre les slashs de cette adresse, par exemple : https://www.exemple/com/img/. La page affichée devrait alors être une page d'erreur 403.</li>
					<li>Vérifier que la page retournée ne correspond pas à la page 403 renvoyée par défaut par le serveur (Apache, IIS, Nginx) mais bien à une page d'erreur personnalisée, dont le graphisme est cohérent avec l'ensemble du site.</li></ul>

---

## Vulgarisation

Le cas de figure est similaire à celui de la page d’erreur 404 personnalisée ; rendre disponible le menu principal de navigation dans cette page d’erreur personnalisée rendra service aux utilisateurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-envoie-une-page-dinterdiction-403-personnalisee/
- **API** : `https://api.opquast.com/checklist/224/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
