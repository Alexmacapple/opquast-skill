# Règle Opquast 135

> Le serveur respecte l'ordre préférentiel de langues des outils de consultation.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 135 |
| **ID** | 54389 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le serveur respecte l'ordre préférentiel de langues des outils de consultation.

### English
The server respects the preferential order of languages specified by user agents.

### Español
El servidor respeta el orden de preferencia de idioma de las herramientas de consulta

---

## Objectifs

### Français
- Envoyer prioritairement à l’utilisateur la version de la page correspondant à la langue qu’il a indiquée dans les préférences de son outil de consultation.

### English
- Priority is given to sending the user the version of the page corresponding to the language he or she has indicated in the preferences the user agent tool.

### Español
- Enviar al usuario hacia la versión de la página correspondiente al idioma que ha indicado en las preferencias de su herramienta de consulta.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Internationalisation

### Phases projet
- Développement

---

## Explication pédagogique

Chaque requête auprès d’un serveur peut comporter des informations concernant les préférences de langue. Chaque internaute peut classer ses langues préférées dans son navigateur. Le serveur doit proposer les contenus en respectant l’ordre demandé par l’utilisateur. Si celui-ci indique le français, puis l’espagnol, puis l’anglais, le serveur devra servir la page en français si elle existe, sinon en espagnol si elle existe, et sinon en anglais si elle existe.

---

## Solution recommandée

<p>Utiliser la négociation de contenu disponible selon le serveur, en testant les valeurs de l'en-tête HTTP accept-language.</p>

---

## Méthode de vérification

<p>Pour un site disponible en plusieurs langues (français et anglais, par exemple)&nbsp;:</p><ul>
<li>Modifier les options de votre navigateur pour choisir votre langue favorite : sélectionner, par exemple, l'anglais en tant que langue préférée ;</li>
					<li>Taper l'URL principale du site dans ce même navigateur et vérifier que les contenus de la page sont disponibles dans la langue retenue comme favorite. Dans notre exemple, la version anglaise devrait être automatiquement renvoyée.</li>
					<li>Effectuer le même test en choisissant une autre langue favorite dans les options du navigateur.</li>
				</ul>

---

## Vulgarisation

Le respect de cette règle donne à l’utilisateur immédiatement accès aux contenus internationalisés dans la langue de son choix (dans la mesure où son navigateur est paramétré selon ses préférences).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-serveur-respecte-lordre-preferentiel-de-langues-des-outils-de-consultation/
- **API** : `https://api.opquast.com/checklist/135/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
