# Règle Opquast 217

> Le domaine de messagerie est authentifié

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 217 |
| **ID** | 54591 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le domaine de messagerie est authentifié

### English
The email domain is authenticated

### Español
El dominio de correo electrónico está autenticado.

---

## Objectifs

### Français
- Protéger les utilisateurs contre les courriels frauduleux ou usurpés,
- Améliorer la délivrabilité des emails légitimes (newsletters, confirmations, alertes),
- Renforcer la réputation et la fiabilité du domaine émetteur,
- Réduire le risque que les emails soient classés comme spam,
- Respecter les exigences des principaux fournisseurs de messagerie,
- Surveiller les emails envoyés avec le nom de domaine.

### English
- Protect users from fraudulent or spoofed emails,
- Improve the deliverability of legitimate emails (newsletters, confirmations, alerts),
- Strengthen the reputation and reliability of the sending domain,
- Reduce the risk of emails being classified as spam,
- Comply with the requirements of major email providers,
- Monitor emails sent with the domain name.

### Español
- Proteger a los usuarios contra correos electrónicos fraudulentos o suplantados.
- Mejorar la capacidad de entrega de correos electrónicos legítimos (boletines informativos, confirmaciones, alertas).
- Reforzar la reputación y la fiabilidad del dominio emisor.
- Reducir el riesgo de que los correos electrónicos se clasifiquen como spam.
- Cumplir los requisitos de los principales proveedores de correo electrónico.
- Supervisar los correos electrónicos enviados con el nombre de dominio.

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

Les mails envoyés aux utilisateurs ont une importance capitale pour la qualité des expériences en ligne. Il faut donc veiller à ce que ceux-ci arrivent bien, ne partent pas en spam et que les serveurs de mails associés au site ou à l’application soient considérés comme de confiance sur toute la chaîne de transmission et de réception des mails. Pour cela, il est essentiel d’authentifier correctement le domaine de messagerie.

---

## Solution recommandée

Pour chaque domaine utilisé pour l'envoi d’emails :
<ul>
<li>SPF : Ajouter un enregistrement TXT dans le DNS du domaine listant les serveurs autorisés à envoyer des mails pour ce domaine,</li>
<li>DKIM : Configurer la signature cryptographique des emails émis via une clé privée, et publier la clé publique dans le DNS du domaine,</li>
<li>DMARC : Définir une politique (none, quarantine, reject) et spécifier une adresse de retour pour les rapports, via un enregistrement DNS.</li>
</ul>

---

## Méthode de vérification

Pour chaque domaine utilisé pour l'envoi d’emails :
<ul>
<li>Utiliser des outils de test de configuration DNS (ex : https://mxtoolbox.com, https://dmarcian.com),</li>
<li>Vérifier que les enregistrements SPF, DKIM et DMARC sont présents et correctement configurés,</li>
<li>Analyser les en-têtes des e-mails reçus pour confirmer la bonne application des signatures,</li>
<li>S’assurer que les politiques définies (notamment DMARC) sont cohérentes avec les pratiques d’envoi du site.</li>
</ul>

---

## Vulgarisation

Authentifier le domaine utilisé pour l’envoi des e-mails d’un site est une étape cruciale pour limiter le spam, le phishing et l’usurpation d’identité. Sans cette authentification, les messages peuvent être interceptés par les filtres anti-spam, ou pire, les utilisateurs peuvent recevoir de faux e-mails semblant provenir du site, avec des risques élevés de fraude. Les standards tels que SPF, DKIM et DMARC permettent de prouver que les serveurs autorisés à envoyer des messages au nom du domaine sont bien légitimes. Une bonne configuration améliore la délivrabilité des e-mails (moins de messages perdus dans les spams), protège la réputation de la marque et renforce la confiance des utilisateurs. Dans un contexte où l’ingénierie sociale est l’un des vecteurs d’attaque les plus répandus, cette mesure n’est pas un luxe mais une exigence de sécurité et de crédibilité.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-domaine-de-messagerie-est-authentifie/
- **API** : `https://api.opquast.com/checklist/217/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
