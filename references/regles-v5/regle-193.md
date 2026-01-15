# Règle Opquast 193

> Les fonctionnalités de zoom ne sont pas bloquées.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 193 |
| **ID** | 54103 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les fonctionnalités de zoom ne sont pas bloquées.

### English
The zoom features are not blocked.

### Español
Las funciones de zoom no están bloqueadas.

---

## Objectifs

### Français
- Permettre aux utilisateurs d’adapter le rendu à leurs besoins ou à leurs préférences en recourant au zoom graphique.
- Améliorer la compatibilité avec les terminaux mobiles. 
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow users to adapt the rendering to their needs or preferences, by means of the graphic zoom.
- Improve your positioning in web crawlers that take this criterion into account.
- Improve compatibility with mobile terminals.

### Español
- Permitir a los usuarios adaptar la representación a sus necesidades o preferencias usando el zoom gráfico.
-  Mejorar la compatibilidad con los dispositivos móviles. 
- Mejorar la accesibilidad del contenido para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité
- Mobile

### Thématiques
- Présentation

### Phases projet
- Développement

---

## Explication pédagogique

Il est toujours très décevant, face à un texte trop petit affiché sur sa tablette ou son smartphone, de s’apercevoir qu’on ne peut pas l’agrandir.

---

## Solution recommandée

<div>Ne pas utiliser de mécanisme bloquant le zoom, et en particulier, ne pas utiliser les attributs minimum-scale, maximum-scale et user-scalable de l’élément meta viewport.</div>

---

## Méthode de vérification

<div>Vérifier sur un périphérique tactile qu’il est possible d’agrandir la vue avec la commande de zoom tactile du navigateur.</div>

---

## Vulgarisation

Il est tentant de croire que la mise en forme adaptée aux différents types de terminaux mobiles permettrait de se passer de cette fonctionnalité de zoom, en garantissant la lisibilité du contenu dans tous les contextes. Pourtant, il est toujours risqué de supposer à ce point que l’on maîtrise les besoins de l’utilisateur et la capacité d’un rendu figé à y répondre : mieux vaut admettre que l’affichage ne sera pas exactement ce que l’on a prévu, afin d’être sûr qu’il sera entièrement consultable.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-site-ne-bloque-pas-les-fonctionnalites-de-zoom-du-navigateur/
- **API** : `https://api.opquast.com/checklist/193/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
