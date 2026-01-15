# Phase 3 - Analyse DOM Dynamique

> Extension optionnelle pour vérifier les 33 règles nécessitant un navigateur headless

**Date** : 2026-01-15
**Statut** : En cours (Track: phase3_dom_20260115)
**Council Review** : 2026-01-15 - Approuvé avec modifications

---

## Objectif

Étendre la couverture du skill de 60% à 81% en ajoutant la vérification des règles `requires_dom` via Puppeteer ou Playwright.

---

## Règles concernées (52)

### Présentation et CSS (15 règles)

| Règle | Description | Vérification |
|-------|-------------|--------------|
| 77 | Étiquette formulaire visuellement rattachée | Position CSS label/input |
| 78 | Informations contextuelles visuellement rattachées | Position CSS aide/champ |
| 138 | Liens de même nature ont apparence identique | Computed styles des liens |
| 139 | Soulignement réservé aux liens | `text-decoration` sur non-liens |
| 140 | Liens visuellement différenciés | Contraste lien/texte |
| 141 | Liens visités différenciés | `:visited` styles |
| 142 | Liens internes/externes différenciés | Icônes ou styles différents |
| 143 | Liens accès limité différenciés | Indication visuelle |
| 180 | Charte graphique cohérente | Analyse couleurs/fonts |
| 181 | Information pas uniquement par couleur | Autres indicateurs visuels |
| 182 | Contraste suffisant | Ratio WCAG (4.5:1 / 3:1) |
| 183 | Contenu OK sans styles | Désactiver CSS |
| 186 | Taille éléments cliquables suffisante | 44x44px minimum |
| 191 | Texte non justifié | `text-align: justify` |
| 196 | Impression sans navigation | `@media print` |

### Navigation et interaction (18 règles)

| Règle | Description | Vérification |
|-------|-------------|--------------|
| 91 | Actions hover aussi par focus | Events focus/hover |
| 124 | Vidéos déclenchées par utilisateur | Autoplay detection |
| 125 | Sons déclenchés par utilisateur | Audio autoplay |
| 126 | Animations peuvent être mises en pause | Controls présents |
| 127 | Animations ne bloquent pas navigation | Navigation possible |
| 128 | Contenu animé interruptible | Pause/stop disponible |
| 129 | Sélection qualité vidéo | Options qualité |
| 153 | Accès immédiat si pas public spécifique | Pas de splash screen |
| 154 | Pas de popups à la navigation | Détection popups |
| 157 | Items menu actifs signalés | `aria-current` ou style |
| 158 | Blocs navigation même emplacement | Position consistante |
| 160 | Fermeture fenêtres visuellement rattachée | Position bouton close |
| 161 | Fermeture fenêtres immédiate | Pas de délai |
| 162 | Bouton fermeture explicite modales | Bouton visible |
| 163 | Fermeture même emplacement | Position consistante |
| 165 | Focus clavier visible | `:focus` styles |
| 166 | Navigation clavier complète | Tab navigation |
| 167 | Ordre navigation clavier prévisible | Tab order logique |

### Structure (3 règles)

| Règle | Description | Vérification |
|-------|-------------|--------------|
| 237 | Copie contenu non bloquée | `user-select: none` |
| 238 | Menu contextuel non bloqué | `oncontextmenu` |
| 244 | Linéarisation tableaux OK | Display table sans CSS |

---

## Architecture proposée

### Option A : Script Node.js standalone

```
scripts/
└── dom-analyzer/
    ├── package.json
    ├── index.js           # Point d'entrée
    ├── checks/
    │   ├── contrast.js    # Règle 182
    │   ├── focus.js       # Règles 165-167
    │   ├── clickable.js   # Règle 186
    │   └── ...
    └── utils/
        ├── browser.js     # Gestion Puppeteer
        └── wcag.js        # Calculs WCAG
```

### Option B : MCP Server

```
mcp-servers/
└── opquast-dom/
    ├── package.json
    ├── server.js          # MCP server
    └── tools/
        ├── check-contrast.js
        ├── check-focus.js
        └── ...
```

### Option C : Intégration Playwright Test

```
tests/
└── opquast/
    ├── playwright.config.ts
    └── checks/
        ├── contrast.spec.ts
        ├── focus.spec.ts
        └── ...
```

---

## Dépendances

```json
{
  "dependencies": {
    "puppeteer": "^22.0.0",
    "color-contrast-checker": "^2.1.0"
  }
}
```

Ou avec Playwright :

```json
{
  "dependencies": {
    "@playwright/test": "^1.41.0"
  }
}
```

---

## Vérifications clés

### 1. Contraste (Règle 182)

```javascript
async function checkContrast(page) {
  const elements = await page.$$('body *');
  const issues = [];

  for (const el of elements) {
    const styles = await el.evaluate(e => {
      const cs = getComputedStyle(e);
      return {
        color: cs.color,
        background: cs.backgroundColor,
        fontSize: cs.fontSize
      };
    });

    const ratio = calculateContrastRatio(styles.color, styles.background);
    const required = parseFloat(styles.fontSize) >= 18 ? 3 : 4.5;

    if (ratio < required) {
      issues.push({ element: el, ratio, required });
    }
  }

  return issues;
}
```

### 2. Focus visible (Règle 165)

```javascript
async function checkFocusVisible(page) {
  const focusables = await page.$$('a, button, input, select, textarea, [tabindex]');
  const issues = [];

  for (const el of focusables) {
    await el.focus();

    const hasFocusStyle = await el.evaluate(e => {
      const before = getComputedStyle(e);
      e.blur();
      const after = getComputedStyle(e);

      return before.outline !== after.outline ||
             before.boxShadow !== after.boxShadow ||
             before.border !== after.border;
    });

    if (!hasFocusStyle) {
      issues.push(el);
    }
  }

  return issues;
}
```

### 3. Taille cliquable (Règle 186)

```javascript
async function checkClickableSize(page) {
  const clickables = await page.$$('a, button, [role="button"], input[type="submit"]');
  const issues = [];

  for (const el of clickables) {
    const box = await el.boundingBox();

    if (box && (box.width < 44 || box.height < 44)) {
      issues.push({ element: el, width: box.width, height: box.height });
    }
  }

  return issues;
}
```

---

## Intégration avec le skill

### Workflow étendu

```
1. Analyse statique (Phase 1-2)
   ↓
2. Si --dom ou profil critique
   ↓
3. Lancer navigateur headless
   ↓
4. Exécuter checks DOM
   ↓
5. Fusionner résultats
   ↓
6. Rapport unifié
```

### Commande proposée

```bash
/opquast https://example.com --dom
```

### Format de sortie étendu

```markdown
## Règles DOM vérifiées

### Règle 182 : Contraste suffisant ❌

**3 éléments non conformes :**

| Élément | Ratio | Requis |
|---------|-------|--------|
| `.hero h1` | 2.8:1 | 4.5:1 |
| `nav a` | 3.2:1 | 4.5:1 |
| `.footer p` | 2.1:1 | 4.5:1 |

**Recommandation :** Augmenter le contraste des textes

### Règle 165 : Focus clavier visible ❌

**5 éléments sans indicateur de focus :**
- `nav a` (liens navigation)
- `.card button` (boutons cartes)

**Recommandation :** Ajouter `outline` ou `box-shadow` sur `:focus`
```

---

## Estimation

| Tâche | Complexité |
|-------|------------|
| Setup Puppeteer/Playwright | Faible |
| Check contraste | Moyenne |
| Check focus | Moyenne |
| Check taille cliquable | Faible |
| Check navigation clavier | Élevée |
| Intégration skill | Moyenne |
| Tests | Moyenne |

---

## Prérequis

1. Node.js 18+
2. Chromium (installé par Puppeteer)
3. ~500MB espace disque

---

## Alternatives

### Sans headless browser

Certaines règles peuvent être partiellement vérifiées via CSS statique :

| Règle | Vérification partielle |
|-------|------------------------|
| 139 | Chercher `text-decoration` dans CSS |
| 191 | Chercher `text-align: justify` |
| 237 | Chercher `user-select: none` |
| 238 | Chercher `oncontextmenu` dans HTML |

### Outils externes

- **axe-core** : Accessibilité automatisée
- **Pa11y** : Tests accessibilité CLI
- **Lighthouse** : Audit complet

---

## Décision

**Council Review (2026-01-15)** : Approuvé avec modifications

### Architecture validée : Playwright + axe-core

| Décision | Justification Council |
|----------|----------------------|
| Playwright (pas Puppeteer) | Multi-browser, auto-wait, API accessibility |
| axe-core intégré | Évite réimplémentation WCAG risquée |
| Approche hybride | axe pour checks techniques, custom pour focus |

### Changements vs plan initial

```diff
- Puppeteer
+ Playwright (@playwright/test)

- wcag.js manuel (calculs contraste)
+ @axe-core/playwright (engine validé)

- Tous checks custom
+ Hybride: axe-core + custom focus checks
```

**Priorité** : Haute (valeur ajoutée validée par Council)

---

## Prochaines étapes

**Track actif** : `conductor/tracks/phase3_dom_20260115/`

### Phase 1: Setup Infrastructure
- [ ] Créer `scripts/dom-analyzer/` structure
- [ ] Setup package.json (Playwright + axe-core)
- [ ] Créer `browser.js` (lifecycle)
- [ ] Créer `opquast-mapper.js` (axe → Opquast)

### Phase 2: Checks axe-core
- [ ] Règle 182: Contraste (`color-contrast`)
- [ ] Règle 186: Taille cliquable (`target-size`)
- [ ] Règles 139-143: Liens
- [ ] Règles 237-238: user-select, contextmenu

### Phase 3: Checks Custom Playwright
- [ ] Règles 165-167: Focus clavier (state machine)
- [ ] Règles 124-128: Médias/animations

### Phase 4-5: Intégration & Tests
- [ ] Flag `--dom` dans SKILL.md
- [ ] Tests sur 5 sites réels
- [ ] Documentation

---

*Document mis à jour le 2026-01-15 - Council reviewed - Skill Opquast v1.4.0*
