# Règle Opquast 27

> Les échanges de données sensibles sont sécurisés et signalés comme tels.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 27 |
| **ID** | 54516 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les échanges de données sensibles sont sécurisés et signalés comme tels.

### English
Exchanges of sensitive data are securely transmitted and reported as such.

### Español
Los intercambios de datos confidenciales están securizados y se señalan como tales.

---

## Objectifs

### Français
- Conforter la confiance de l'utilisateur. 
- Permettre à l'utilisateur de saisir des données sensibles en sachant qu'elles seront protégées. 
- Minimiser les risques d'utilisation frauduleuse des données des utilisateurs.
- Renforcer la confiance des utilisateurs sur l’utilisation de leurs données

### English
- Reassure users.
- Allow users to enter sensitive data, safe in the knowledge that They will be protected. 
- Minimize the risk of fraudulent use of user data.

### Español
- Construir la confianza del usuario. 
- Permitir al usuario introducir datos sensibles sabiendo que estarán protegidos. 
-  Minimizar el riesgo de uso fraudulento de los datos de los usuarios.
- Fomentar la confianza de los usuarios en el uso de sus datos.

---

## Métadonnées

### Tags
- Basics

### Thématiques
- Données personnelles

### Phases projet
- Développement
- Editorial

---

## Explication pédagogique

Il est parfaitement possible, pour un informaticien de niveau moyen, d’intercepter des données circulant sur le réseau. Le chiffrement des données constitue une mesure minimale de sécurité.

---

## Solution recommandée

<p>Recourir à un certificat de sécurité informatique dans une version supportée par les versions récentes des navigateurs.</p><p>Recourir à un service tiers d'authentification décentralisé du type OpenID.</p>

---

## Méthode de vérification

<p>Une page sécurisée se reconnaît à son URL qui commence par https:// ou à la présence d'un élément visuel dans le navigateur (apparition d'un cadenas, changement de couleur de la barre de saisie de l'URL).</p><p>Pour tout site proposant d'échanger des données sensibles&nbsp;:</p><ul>
<li>Saisir l'adresse URL du site en http (pas en https), sans être identifié, et vérifier que vous êtes directement redirigé vers la version HTTPS du site et que tous les échanges sont sécurisés ; </li>
					<li>Au minimum, vérifier que les échanges de données sensibles (pages de saisie d'identifiants, de données personnelles ou bancaires, etc.) sont en HTTPS ;</li>
					<li>Dans le cas où les données sont saisies dans une page non sécurisée, vérifier dans le code source du formulaire qu'une adresse en HTTPS est présente au sein de l'attribut action, ce qui prouve que les données sont envoyées vers une page sécurisée. </li>
				</ul><p>Attention, la troisième option n'offre pas un niveau de sécurité équivalent aux deux premières et peut être tolérée dans le cas de données personnelles, voire d'identifiants mais jamais pour des données très sensibles (biométriques ou bancaires, par exemple).</p>

---

## Vulgarisation

Cette règle concerne deux aspects distincts : le fait que les échanges de données soient cryptés (sécurité) et le fait d’en informer l’utilisateur (sécurisation). L’intérêt de crypter les échanges est évident : il s’agit de protéger les données sensibles. Le fait d’en informer les utilisateurs est une mesure complémentaire qui a, quant à elle, pour objectif d’améliorer la confiance qu’ils portent à l’administrateur du service en ligne.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-echanges-de-donnees-sensibles-sont-securises-et-signales-comme-tels/
- **API** : `https://api.opquast.com/checklist/27/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
