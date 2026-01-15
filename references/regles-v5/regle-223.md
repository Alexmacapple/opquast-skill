# Règle Opquast 223

> Le serveur envoie une page d'erreur 404 personnalisée.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 223 |
| **ID** | 54477 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur envoie une page d'erreur 404 personnalisée.

### English
The server sends a customised 404 Not found error page

### Español
El servidor envía una página de error 404 personalizada.

---

## Objectifs

### Français
- Informer l'utilisateur sur l'erreur rencontrée, sur la continuité de fonctionnement du serveur
- Lever le doute sur un éventuel problème lié à sa connexion.

### English
- Inform users of the error encountered and of the server’s continuing operation.
- Inform users that the problem isn't caused by their connectivity.

### Español
- Informar al usuario sobre el error encontrado, sobre la continuidad del funcionamiento del servidor
- Evitar las dudas sobre un posible problema relacionado con su conexión.

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

Les erreurs sont inévitables. Même en vérifiant vos liens toutes les dix minutes, un internaute peut toujours taper indxe.html au lieu de index.html. La page d’erreur 404 est donc l’une des pages les plus importantes de votre site. Certaines agences y apportent un soin tout particulier. Ne l’oubliez pas, c’est un signe de professionnalisme.

---

## Solution recommandée

<p>Modifier la configuration du serveur web pour renvoyer l'utilisateur vers une page personnalisée lorsque la ressource demandée n'existe pas.</p><p>Si la configuration principale du serveur n'est pas directement accessible et si l'environnement le permet, utiliser une configuration locale par répertoire. Par exemple, l'environnement Apache autorise la création d'un fichier <code>.htaccess</code> contenant des directives relatives aux traitements des erreurs : <code>ErrorDocument 404 /mapage404.html</code>.</p>

---

## Méthode de vérification

<p>À partir de n'importe quelle adresse url du site examiné :</p><ul>
<li>Modifier l'adresse URL afin d'obtenir une erreur 404, par exemple, en ajoutant une série caractères aléatoires en fin d'adresse tel que : https://www.exemple.com/dbvdjb </li>
					<li>Vérifier que la page retournée correspond à une page personnalisée, cohérente avec le reste du site, et non pas à la page 404 envoyée par défaut par le serveur (Apache, IIS, Nginx) ; </li>
					<li>Dans le cas de l'utilisation d'un CMS, ce dernier peut vous faire croire qu'il ne renvoie pas la page 404 par défaut, il faudra donc effectuer la même vérification via l'adresse URL d'une image ou d'un fichier CSS ou encore JS pour valider définitivement cette bonne pratique. </li>
				</ul>

---

## Vulgarisation

Sur le Web, les erreurs 404 sont inévitables. C’est une raison de plus pour anticiper leur apparition. La démarche est très simple : prévoyez une page qui s’affichera en cas d’erreur 404. Vos utilisateurs comprendront ainsi la cause de l’erreur et ils sauront que leur connexion n’est pas en cause, que tout est normal et qu’ils peuvent reprendre leur navigation.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-envoie-une-page-derreur-404-personnalisee/
- **API** : `https://api.opquast.com/checklist/223/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
