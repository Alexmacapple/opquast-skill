# Règle Opquast 24

> Les alias mail contenant le signe + sont acceptés

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 24 |
| **ID** | 54425 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les alias mail contenant le signe + sont acceptés

### English
Email aliases containing the + sign are accepted.

### Español
Se aceptan los alias de correo electrónico que contengan el signo +.

---

## Objectifs

### Français
- Permettre aux utilisateurs d’utiliser des comptes mails dédiés à un usage spécifique.
- Permettre aux utilisateurs de tracer la diffusion de leurs adresses mail. 
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données

### English
- Allow users to use mail accounts dedicated to a specific use.
- Allow users to trace the spread of their email addresses.
- Strengthen user confidence in the use of their data

### Español
- Permitir a los usuarios utilizar las cuentas de correo electrónico dedicadas a un uso específico.
-  Permitir a los usuarios seguir la difusión de sus direcciones de correo electrónico. 
- Fortalecer la confianza de los usuarios en el uso de sus datos.

---

## Métadonnées

### Tags
- Privacy

### Thématiques
- Données personnelles

### Phases projet
- Développement

---

## Explication pédagogique

Un alias ou alias mail est une adresse électronique qui redirige vers une autre préexistante. Les messages envoyés à l'alias sont directement transférés, sans passer par une boîte de courrier électronique. Cette règle veille à ce que les adresses mail de la forme nom+xxx@domaine.fr soient acceptées par le site. Cela permet aux utilisateurs d’utiliser un mail dédié à un usage spécifique sans créer de compte mail supplémentaire. Cela permet aussi d’améliorer la traçabilité lorsque l’adresse est cédée à des tiers.

---

## Solution recommandée

<p>Pour toute validation d'une adresse mail saisie par l'utilisateur, accepter les adresses du type <code>foo.bar+truc@example.com</code></p>

---

## Méthode de vérification

<p>Vérifier, pour chaque saisie d'une adresse mail saisie par l'utilisateur, que les  adresses du type <code>foo.bar+truc@example.com</code> sont acceptées et sont fonctionnelles (utilisation comme identifiant, réception d'un mail envoyé par le site, etc.)</p>

---

## Vulgarisation

Les standards en matière d'adresse mails sont définis par l'IETF dans ce que l'on appelle des RFC (Request For Comments). La RFC 3696 (2004) précise que le signe + fait partie des caractères qui peuvent être utilisés dans une adresse mail. La RFC 5523 (2008) indique que "Une façon courante d'encoder les informations "détaillées" dans la partie locale (à gauche du @) consiste à ajouter une "séquence de caractères séparateurs", comme "+", pour former une frontière entre les sous-parties "utilisateur" (partie locale d'origine) et "détaillées" de l'adresse, tout comme le caractère "@" forme la frontière entre la partie locale et le domaine."

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-accepte-les-alias-mail-contenant-le-signe/
- **API** : `https://api.opquast.com/checklist/24/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
