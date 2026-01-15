# Règle Opquast 199

> Les pages utilisant HTTPS ont un entête de transport strict.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 199 |
| **ID** | 54481 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les pages utilisant HTTPS ont un entête de transport strict.

### English
Pages using HTTPS have a strict transport header.

### Español
Las páginas que usan HTTPS tienen una cabecera de transporte estricta

---

## Objectifs

### Français
- Améliorer la sécurité des échanges. 
- Prévenir les risques d’attaques.

### English
- Improve exchange security.
- Preventing the risk of attacks.

### Español
-  Para mejorar la seguridad de los intercambios. /li>
- Prevenir el riesgo de ataques.

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

Selon Wikipédia, que nous nous refusons à paraphraser ici : « HTTP Strict Transport Security (HSTS) est un mécanisme de politique de sécurité proposé pour HTTP, permettant à un serveur web de déclarer à un agent utilisateur (comme un navigateur web), compatible, qu'il doit interagir avec lui en utilisant une connexion sécurisée (comme HTTPS) ». En résumé, cela signifie que votre serveur est configuré pour ne communiquer avec l’utilisateur que de manière chiffrée. Il s’agit donc d’un niveau de sécurité supplémentaire par rapport au fait d’utiliser HTTPS. Non seulement le serveur parle en HTTPS, mais il refuse de parler de toute autre façon.

---

## Solution recommandée

<p>Utiliser pour chaque page l'entête HTTP Strict Transport Security et son paramètre max-age pour spécifier que le navigateur doit convertir toutes les requêtes en HTTP en requêtes HTTPS. </p>

---

## Méthode de vérification

<p>Vérifier que le serveur envoie pour chaque page l'entête HTTP Strict Transport Security avec le paramètre max-age spécifiant la durée pendant laquelle le navigateur doit convertir toutes les requêtes en HTTP en requêtes HTTPS</p>

---

## Vulgarisation

Le respect de cette règle empêche une attaque du type "l'homme du milieu" : elle impose au navigateur de convertir automatiquement toutes les tentatives d'accès HTTP au site en requêtes HTTPS, au lieu d'effectuer une redirection. Ceci empêche un pirate d'exploiter votre requête HTTP initiale, par exemple pour vous rediriger vers un clone du site.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-pages-utilisant-https-ont-un-en-tete-de-transport-strict/
- **API** : `https://api.opquast.com/checklist/199/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
