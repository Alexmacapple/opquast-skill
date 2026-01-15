# Règle Opquast 216

> L'affichage de la barre d'adresse du navigateur n'est pas bloqué.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 216 |
| **ID** | 54547 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
L'affichage de la barre d'adresse du navigateur n'est pas bloqué.

### English
The browser address bar display is not blocked.

### Español
La barra de direcciones del navegador no está bloqueada.

---

## Objectifs

### Français
- Limiter les risques d’interception d’identifiants et de mots de passe,
- Limiter les usurpations de domaines,
- Renforcer l’identification et la confiance en ligne.

### English
_Non spécifié_

### Español
_Non spécifié_

---

## Métadonnées

### Tags
- Basics

### Thématiques
- Sécurité

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Certains sites affichent les formulaires de connexion dans des fenêtres séparées, sans la barre d’adresse du navigateur. Ces fenêtres isolées, sans affichage de l'URL, peuvent être utilisées pour récupérer les identifiants de connexion, sans que les utilisateurs et utilisatrices aient de moyens de se rendre compte qu’ils ne sont pas sur le bon site (phishing). De manière générale, il est toujours utile de savoir sur quel site l’on se trouve.

---

## Solution recommandée

Ne pas utiliser les techniques d'ouverture de popup permettant de masquer la barre d'adresse de la fenêtre. Par exemple, window.open() avec les options location= "no", toolbar="no", fullscreen ou kiosk.

---

## Méthode de vérification

Vérifier pour chaque fenêtre ouverte la présence visible de la barre d'adresse du navigateur.

---

## Vulgarisation

Empêcher l’affichage de la barre d’adresse du navigateur constitue une pratique risquée, car elle prive l’utilisateur d’un repère essentiel pour vérifier l’identité et la sécurité du site. La barre d’adresse permet notamment de contrôler le protocole utilisé (HTTP/HTTPS), le certificat de sécurité et le nom de domaine. La masquer revient à limiter la capacité de l’internaute à détecter une tentative de phishing ou un site frauduleux. Par ailleurs, certains navigateurs mobiles réduisent déjà l’espace visible de la barre d’adresse pour optimiser l’affichage, mais celle-ci doit rester accessible à tout moment. Les concepteurs de sites et d’applications web doivent donc s’abstenir de tout contournement visant à cacher cet élément, afin de garantir la transparence, la confiance et la sécurité des utilisateurs.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/laffichage-de-la-barre-dadresse-du-navigateur-nest-pas-bloque/
- **API** : `https://api.opquast.com/checklist/216/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
