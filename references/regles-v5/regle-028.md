# Règle Opquast 28

> Les données sensibles ne sont pas transmises en clair dans les URL.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 28 |
| **ID** | 54427 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les données sensibles ne sont pas transmises en clair dans les URL.

### English
Sensitive data is not transmitted unencrypted through URLs.

### Español
Los datos sensibles no se transmiten de forma visible en las urls.

---

## Objectifs

### Français
- Éviter que des données sensibles ne soient publiques et stockées en clair aux différentes étapes de l'accès à la page (FAI, proxy, serveur web, historique du navigateur, services tiers…). 
- Permettre à l'utilisateur de saisir des données sensibles en sachant qu'elles seront protégées et confidentielles.
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données

### English
- Prevent sensitive data from being made public or stored Unencrypted at any stage in accessing a page (ISP, proxy, web Server, browser history, third-party services, etc.).
- Allow users to enter sensitive data, safe in the knowledge that They will be protected and kept confidential.

### Español
- Evitar que los datos sensibles sean públicos y se almacenen en texto claro en las diferentes etapas de acceso a la página (ISP, proxy, servidor web, historial de navegación, servicios de terceros...). 
-  Permitir al usuario introducir datos sensibles sabiendo que estarán protegidos y serán confidenciales.
-  Reforzar la confianza de los usuarios en el uso de sus datos.

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Données personnelles

### Phases projet
- Développement

---

## Explication pédagogique

Des données personnelles peuvent être transmises et interceptées par l’intermédiaire des URL. Des adresses du type https://domaine.com/index.html?motpasse=lapin sont à proscrire. Elles sont en effet faciles à repérer sur Internet ou dans les statistiques d’audience.

---

## Solution recommandée

<p>Envoyer les données de formulaire sensibles par la méthode <code>POST</code>.</p><p>Ne pas inscrire de données sensibles dans l'URL d'un lien.</p>

---

## Méthode de vérification

<p>Lors de manipulations dans le site telles que connexion à un compte, saisie de données personnelles, achat, etc., vérifier qu'aucune des données saisies n'apparaît en clair dans l'URL via les trois contrôles suivants&nbsp;:</p><ul>
<li>Vérifier que l'identification n'aboutit pas à une page du typelogin.php?user=machin@password=123 ;</li>
					<li>Contrôler aussi que les pages ne comportent pas de liens contenant ce type d'informations. Il est en effet possible de faire un lien du type http://user:pass@example.com/ ou ftp://user:pass@example.com/. Ceci est bien évidemment très fortement déconseillé et doit être banni. </li>
					<li>Examiner également que l'identifiant de la session n'est pas transmis dans l'URL, ce qui donne des URL du type page.php?SESSIONID=123abc456def. Toute personne récupérant cet identifiant, y compris en lisant par-dessus l'épaule de l'utilisateur, aurait accès à son compte. </li>
				</ul><p>Il est important de faire ces tests en activant et désactivant les cookies du navigateur, certains outils (frameworks, CMS) ayant la fâcheuse habitude de transmettre les informations en clair dans le second cas.</p>

---

## Vulgarisation

Rien n’est plus facile à intercepter qu’une URL (adresse web). Les adresses que vous visitez circulent sur le réseau, apparaissent dans les historiques des serveurs (logs), sont mentionnées dans vos favoris, dans les réseaux sociaux. Aucune information sensible ne doit y être indiquée.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-donnees-sensibles-ne-sont-pas-transmises-en-clair-dans-les-url/
- **API** : `https://api.opquast.com/checklist/28/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
