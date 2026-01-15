# Règle Opquast 221

> Le serveur ne force pas la redirection vers la version ou l'application mobile.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 221 |
| **ID** | 54247 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur ne force pas la redirection vers la version ou l'application mobile.

### English
The server does not force redirects from the desktop version to the mobile version or application.

### Español
El servidor no redirecciona de la versión de escritorio a la versión móvil

---

## Objectifs

### Français
- Laisser le choix à l’utilisateur de la version ayant ses préférences.
- Améliorer la compatibilité avec les terminaux mobiles

### English
- leave the choice of version to the users and their own personal preferences.
- Reduce the energy impact related to the consultation of the site.

### Español
-  Dejar que el usuario elija la versión con sus preferencias.
- Mejorar la compatibilidad con los dispositivos móviles

---

## Métadonnées

### Tags
- Mobile

### Thématiques
- Serveur et performances

### Phases projet
- Développement

---

## Explication pédagogique

Il est parfaitement possible de détecter un contexte d’usage et de proposer aux utilisateurs de terminaux mobiles une version du site dédiée, et de faire de même pour les utilisateurs desktop, équipés d’un ordinateur classique. Le problème, c’est que certains utilisateurs peuvent avoir besoin d’une version spécifique, soit qu’ils ne trouvent pas ce qu’ils cherchent sur la version mobile, soit que celle-ci soit moins pratique. Laissez vos utilisateurs libres de passer outre le choix que vous leur proposez par défaut.

---

## Solution recommandée

<div>Ne pas rediriger côté serveur vers la version mobile (en dynamic serving ou en cas de version mobile dédiée) sans possibilité pour l’utilisateur de désactiver cette redirection.</div>

---

## Méthode de vérification

<div>Contrôler manuellement qu’il est possible d’accéder à la version desktop depuis un périphérique mobile.</div>

---

## Vulgarisation

Les redirections forcées sont à double tranchant. Elles peuvent rendre service en accélérant l’accès à certaines ressources en fonction du contexte mobile ou non, mais elles ont presque toujours des effets secondaires très ennuyeux. Il devient notamment impossible d’accéder à la version faisant l’objet de la redirection. Or, que ce soit pour des raisons de contenu, de contexte ou de besoin, l’accès à cette version s’avère parfois nécessaire ou présente des avantages pour certains utilisateurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-ne-force-pas-la-redirection-vers-la-version-ou-lapplication-mobile/
- **API** : `https://api.opquast.com/checklist/221/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
