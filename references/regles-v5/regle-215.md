# Règle Opquast 215

> Les opérations sécurisées peuvent être validées par au moins deux moyens.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 215 |
| **ID** | 53994 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les opérations sécurisées peuvent être validées par au moins deux moyens.

### English
Secure operations can be validated by at least two means.

### Español
Las operaciones securizadas pueden validarse por al menos dos medios.

---

## Objectifs

### Français
- Prévenir les risques d’échec des opérations.
- Éviter l'exclusion d'utilisateurs pour des raisons techniques ou matérielles.

### English
- Prevent the risk of operational failure.
- Avoid exclusion of users for technical or material reasons.

### Español
-  Prevenir el riesgo de fallo operacional.
-  Evitar la exclusión de los usuarios por razones técnicas o materiales.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Sécurité

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Le web étant ce qu’il est, les serveurs demandent de plus en plus souvent aux utilisateurs de valider certaines opérations en utilisant leur mobile, notamment. Il arrive cependant que les utilisateurs n’aient pas accès à leur mobile et ne soient donc pas en mesure de valider les opérations en question. C’est notamment le cas pour les personnes en déplacement à l’étranger. Pour éviter cela, proposez une solution de secours qui permettra tout de même de valider l’opération.

---

## Solution recommandée

<p>Pour toute opération sécurisée par un système de type authentification à double facteur ou autre authentification forte, fournir à l'utilisateur au moins deux mécanismes au choix pour l'utiliser (par exemple, authentification par SMS ou par  terminal de validation).<p>

---

## Méthode de vérification

<p>Vérifier pour toute opération sécurisée par un système de type authentification à double facteur ou autre authentification forte, que l'utilisateur a le choix entre au moins deux mécanismes (par exemple, authentification par SMS ou par  terminal de validation).<p>

---

## Vulgarisation

Comme c'est le cas dans de nombreuses règles Opquast, il s'agit de prévenir les risques. Dans ce cas précis, certains utilisateurs peuvent se retrouver dans l'incapacité totale de valider une opération ou une transaction, par exemple faute du terminal spécifique prévu par le service bancaire. Autant anticiper ce cas qui n'est pas si rare et fournir une solution de secours, comme une application bancaire dédiée par exemple.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-propose-au-moins-deux-mecanismes-pour-valider-une-operation-securisee/
- **API** : `https://api.opquast.com/checklist/215/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
