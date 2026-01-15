# Règle Opquast 200

> Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 200 |
| **ID** | 54392 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.

### English
Pages using the HTTPS protocol do not offer HTTP resources.

### Español
Las páginas que utilizan HTTPS no proporcionan recursos HTTP.

---

## Objectifs

### Français
- Prévenir les alertes de type "site non sécurisé" dans les outils de consultation.
- Améliorer la sécurité pour l’ensemble des ressources du site.

### English
- Prevent alerts on the users' side.
- Improve safety for all site resources.

### Español
- Prevenir alertas del tipo "sitio no seguro" en las herramientas de consulta.
- Mejorar la seguridad de todos los recursos del sitio web.

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

Lorsque les utilisateurs naviguent sur les sites proposant HTTPS, les utilisateurs voient s’afficher un cadenas. Lorsque le site propose dans la même page certaines ressources en HTTP et d’autres en HTTPS, le navigateur pourra afficher une alerte de sécurité concernant le site visité. Lorsque vous proposez un site en HTTPS, veillez bien à ce que toutes les ressources appelées soient également en HTTPS

---

## Solution recommandée

<p>Pour chaque page du site envoyée par le serveur en HTTPS, fournir toutes les ressources qui la composent (images, fichiers CSS, JS, etc.) via le protocole HTTPS et non via HTTP.</p>

---

## Méthode de vérification

<p>Pour chaque page du site envoyée par le serveur en HTTPS, vérifier qu'aucune des ressources qui la composent (images, fichiers CSS, JS, etc.) n'est fournie via le protocole HTTP.</p>

---

## Vulgarisation

Une ressource HTTP dans une page utilisant le protocole HTTPS peut être une faille de sécurité potentielle.  En respectant cette règle, vous éviterez que le navigateur affiche des alertes de sécurité susceptibles de dissuader l'utilisateur de poursuivre sa visite.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http/
- **API** : `https://api.opquast.com/checklist/200/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
