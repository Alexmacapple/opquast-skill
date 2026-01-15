# Règle Opquast 214

> Le contrôle d'intégrité des ressources tierces est présent et valide.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 214 |
| **ID** | 54087 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Le contrôle d'intégrité des ressources tierces est présent et valide.

### English
Integrity control of third party resources is present and valid.

### Español
El control de integridad de los recursos de terceros existe y es válido.

---

## Objectifs

### Français
- Prévenir les risques de diffusion de code malveillant. 
- Limiter les risques associés à la diffusion de code malveillant : désindexation, plaintes, etc.

### English
- Prevent the appearance of malicious content or scripts on the site

### Español
- Prevenir el riesgo de propagación de código malicioso. 
- Limitar los riesgos asociados a la difusión de códigos maliciosos, desindexación, quejas...

---

## Métadonnées

### Tags
_Aucun tag_

### Thématiques
- Sécurité

### Phases projet
- Développement

---

## Explication pédagogique

Il est possible de vérifier que les ressources tierces (fichiers scripts, feuilles de style…) n’ont pas été modifiées pour y insérer du code malveillant. Pour ceci, le client web (navigateur, notamment) va vérifier en permanence que les fichiers envoyés sont les bons fichiers. Cette bonne pratique incite à la mise en place de cette mesure de sécurité.

---

## Solution recommandée

<p>Utiliser l'attribut integrity de chaque élément <code>link</code> et <code>script</code> (appelant un fichier externe) pour fournir au navigateur le hachage cryptographique (hachage SRI) auquel le fichier doit correspondre.</p>
<p>En savoir plus: <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/link"><code>link</code> sur MDN</a> - <a href="https://developer.mozilla.org/fr/docs/Web/HTML/Element/script"><code>script</code> sur MDN</a></p>

---

## Méthode de vérification

<p>Vérifier pour chaque élément <code>link </code>et <code>script</code> (appelant un fichier externe) la présence de l'attribut <code>integrity</code> indiquant le hachage cryptographique (hachage SRI) auquel le fichier concerné doit correspondre.</p>

---

## Vulgarisation

Le contrôle d'intégrité des ressources tierces ne se fait évidemment pas au coup par coup. Vous allez devoir générer une valeur d'attribut associée à un script ou un lien et insérer le contrôle d'intégrité dans la page en associant la valeur générée de l'attribut integrity dans votre page. Si le navigateur détecte que le fichier correspondant a été modifié ou corrompu, il refusera d'exécuter le script ou d'appliquer la feuille de style et retournera aux utilisateurs une alerte de sécurité.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/le-controle-dintegrite-des-ressources-tierces-est-present-et-valide/
- **API** : `https://api.opquast.com/checklist/214/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
