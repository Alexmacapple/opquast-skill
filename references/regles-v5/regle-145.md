# Règle Opquast 145

> Les numéros de téléphone sont activables via le protocole approprié.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 145 |
| **ID** | 53931 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Les numéros de téléphone sont activables via le protocole approprié.

### English
Telephone numbers can be enabled using the appropriate protocol.

### Español
Los números de teléfono pueden ser activados a través del protocolo apropiado.

---

## Objectifs

### Français
- Faciliter l’utilisation des numéros de téléphone, notamment sur les terminaux mobiles.

### English
- Facilitate easier use of telephone numbers, particularly on mobile devices.

### Español
- Facilitar el uso de los números de teléfono, especialmente en los terminales móviles.

---

## Métadonnées

### Tags
- Accessibilité
- Mobile

### Thématiques
- Liens

### Phases projet
- Développement

---

## Explication pédagogique

En contexte mobile, lorsque cette bonne pratique est respectée, le simple clic sur un numéro ouvre les fonctionnalités téléphoniques de votre mobile. C’est pratique ! Alors, certes, en contexte desktop, l’inconvénient est que cela provoque l’ouverture de logiciels comme Skype. Mais il existe des ruses pour faire en sorte de l’éviter.

---

## Solution recommandée

<p>Baliser les numéros de téléphone avec un lien <code>a</code> doté d’un attribut <code>href</code> du type <code>href="tel:+xx x xx xx xx xx"</code>.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/a">élément <code>a</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Vérifier, dans le code HTML généré, le balisage des numéros de téléphone sous la forme a <code>href="tel:+xx x xx xx xx xx"</code>.</p>

---

## Vulgarisation

Le recours à l’instruction media query aide à gérer plus finement l’affichage des numéros activables sur mobiles et inactifs (ou activables avec le protocole callto propre à Skype) sur desktop.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/les-numeros-de-telephone-sont-activables-via-le-protocole-approprie/
- **API** : `https://api.opquast.com/checklist/145/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
