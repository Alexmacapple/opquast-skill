/**
 * Custom Playwright-based checks for Opquast rules
 * Implements 8 rules that cannot be covered by axe-core
 */

import { CUSTOM_CHECKS, createCustomCheckResult } from '../utils/opquast-mapper.js';

/**
 * Format a violation result in standard Opquast format
 * PRD-002: Includes confidence scoring for custom checks
 * Audit ShipGuard 2026-09-03 (r1-z03-039) : la structure était réimplémentée ici au lieu d'appeler
 * createCustomCheckResult, seule source du format prévue par PRD-002.
 */
function formatViolation(opquastId, nodes) {
  const check = CUSTOM_CHECKS[opquastId];
  if (!check || nodes.length === 0) return null;

  return createCustomCheckResult(opquastId, {
    nodes: nodes.map(node => ({
      html: node.html,
      target: node.target || [],
      failureSummary: node.failureSummary || check.title
    }))
  });
}

// ========== CSS Checks (139, 191, 237) ==========

/**
 * Rule 139: Underline reserved for links
 * Check that text-decoration: underline is only used on links
 */
async function checkUnderlineReserved(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    // Check all text elements that are not links
    // Sélecteur élargi après l'audit (r1-z03-026) : strong, em, figcaption, dt, dd, blockquote, button,
    // summary et caption étaient ignorés. Limite connue et non couverte ici : un soulignement produit par
    // border-bottom ou par un pseudo-élément ::after reste invisible pour getComputedStyle.
    const selector = 'p, span, div, h1, h2, h3, h4, h5, h6, li, td, th, label, strong, em, b, i, small, figcaption, dt, dd, blockquote, button, summary, caption';
    document.querySelectorAll(selector).forEach(el => {
      const style = getComputedStyle(el);
      if (style.textDecorationLine.includes('underline')) {
        // Exclude if it's inside a link
        if (!el.closest('a') && !el.closest('u')) {
          results.push({
            html: el.outerHTML.slice(0, 200),
            target: [el.tagName.toLowerCase()],
            failureSummary: `Element uses underline but is not a link`
          });
        }
      }
    });
    return results;
  });

  return formatViolation(139, violations);
}

/**
 * Rule 191: Text is not justified
 * Check that text-align: justify is not used
 */
async function checkTextNotJustified(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const textElements = 'p, div, article, section, main, li, td, th';
    document.querySelectorAll(textElements).forEach(el => {
      const style = getComputedStyle(el);
      if (style.textAlign === 'justify') {
        // Une seule violation par sous-arbre : la valeur héritée du parent n'est pas re-signalée (audit ShipGuard 2026-09-03, r1-z03-049)
        const parent = el.parentElement;
        if (parent && getComputedStyle(parent).textAlign === 'justify') return;
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: `Text is justified (text-align: justify)`
        });
      }
    });
    return results;
  });

  return formatViolation(191, violations);
}

/**
 * Rule 237: Copy is not blocked
 * Check that user-select: none is not used on content
 */
async function checkCopyNotBlocked(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    // Check body and main content areas
    const contentElements = 'body, main, article, section, p, div';
    document.querySelectorAll(contentElements).forEach(el => {
      const style = getComputedStyle(el);
      if (style.userSelect === 'none' || style.webkitUserSelect === 'none') {
        // Idem : user-select hérité du parent déjà signalé (r1-z03-048)
        const parent = el.parentElement;
        if (parent) {
          const ps = getComputedStyle(parent);
          if (ps.userSelect === 'none' || ps.webkitUserSelect === 'none') return;
        }
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: `Content copy is blocked (user-select: none)`
        });
      }
    });
    return results;
  });

  return formatViolation(237, violations);
}

// ========== Attribute Check (238) ==========

/**
 * Rule 238: Context menu is not blocked
 * Check that oncontextmenu is not used to block right-click
 */
async function checkContextMenuNotBlocked(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const seen = new Set();

    const report = (el, failureSummary) => {
      if (!el || seen.has(el)) return;
      seen.add(el);
      results.push({
        html: el.outerHTML.slice(0, 200),
        target: [el.tagName.toLowerCase()],
        failureSummary
      });
    };

    const inlineTargets = Array.from(document.querySelectorAll('[oncontextmenu]'));

    // Détection effective du blocage (audit ShipGuard 2026-09-03, r1-z03-025) : la forme moderne
    // addEventListener('contextmenu', e => e.preventDefault()) et les handlers inline qui délèguent à une
    // fonction externe sont invisibles depuis le DOM. On déclenche un événement annulable et on observe
    // s'il est annulé. Sondes bornées : le document, les porteurs d'un attribut inline, puis les 20
    // premières images (cible classique du blocage du clic droit).
    const probes = [
      document.body,
      ...inlineTargets,
      ...Array.from(document.querySelectorAll('img')).slice(0, 20)
    ];

    for (const el of probes) {
      if (!el) continue;
      const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      if (!el.dispatchEvent(event)) {
        report(el, 'Context menu is blocked: the contextmenu event is cancelled');
      }
    }

    // Filet statique : un attribut inline explicitement bloquant, même si l'événement n'a pas pu être annulé
    for (const el of inlineTargets) {
      const handler = el.getAttribute('oncontextmenu');
      if (handler && (handler.includes('return false') || handler.includes('preventDefault'))) {
        report(el, 'Context menu is blocked via oncontextmenu');
      }
    }

    return results;
  });

  return formatViolation(238, violations);
}

// ========== Focus Checks (165, 166, 167) ==========

/**
 * Rule 165: Focus is visible
 * Check that focused elements have visible focus indicator
 */
async function checkFocusVisible(page) {
  const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const elements = await page.locator(focusableSelector).all();
  const violations = [];

  // Ce check déplace le focus : mémoriser l'élément actif pour le rétablir ensuite (audit ShipGuard, r1-z03-027)
  const previouslyFocused = await page.evaluateHandle(() => document.activeElement);

  // Limit to first 30 elements for performance (la limite est signalée sur stderr quand elle s'applique)
  const toCheck = elements.slice(0, 30);
  let inconclusive = 0;

  for (const el of toCheck) {
    try {
      // Get styles before focus
      const beforeStyles = await el.evaluate(e => {
        const s = getComputedStyle(e);
        return {
          outline: s.outlineStyle,
          outlineWidth: s.outlineWidth,
          boxShadow: s.boxShadow,
          border: s.border
        };
      });

      // Focus the element
      await el.focus();

      // Get styles after focus
      const afterStyles = await el.evaluate(e => {
        const s = getComputedStyle(e);
        return {
          outline: s.outlineStyle,
          outlineWidth: s.outlineWidth,
          boxShadow: s.boxShadow,
          border: s.border
        };
      });

      // Check if there's a visible focus indicator
      // Audit ShipGuard 2026-09-03 (r1-z03-045) : beforeStyles.outline et outlineWidth étaient collectés puis
      // jamais comparés, si bien qu'un outline permanent (non spécifique au focus) passait pour un indicateur valide.
      const outlineChanged = afterStyles.outline !== beforeStyles.outline
        || afterStyles.outlineWidth !== beforeStyles.outlineWidth;
      const hasOutline = afterStyles.outline !== 'none' && afterStyles.outlineWidth !== '0px' && outlineChanged;
      const hasBoxShadow = afterStyles.boxShadow !== 'none' && afterStyles.boxShadow !== beforeStyles.boxShadow;
      const hasBorderChange = afterStyles.border !== beforeStyles.border;

      if (!hasOutline && !hasBoxShadow && !hasBorderChange) {
        const html = await el.evaluate(e => e.outerHTML.slice(0, 200));
        violations.push({
          html,
          target: [await el.evaluate(e => e.tagName.toLowerCase())],
          failureSummary: 'Focus indicator is not visible'
        });
      }
    } catch (e) {
      // Élément non focalisable ou détaché : compté comme non évaluable plutôt que conforme (r1-z03-020)
      inconclusive++;
    }
  }

  // Restauration de l'état du document avant de rendre la main aux autres checks (r1-z03-027)
  await previouslyFocused
    .evaluate(el => {
      if (el && typeof el.focus === 'function') {
        el.focus();
      } else if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    })
    .catch(() => {});
  await previouslyFocused.dispose().catch(() => {});

  if (inconclusive > 0) {
    console.error(`[custom-checks] règle 165 : ${inconclusive} élément(s) non évaluable(s) sur ${toCheck.length} (ignorés, pas conformes)`);
  }
  if (elements.length > toCheck.length) {
    console.error(`[custom-checks] règle 165 : contrôle limité aux ${toCheck.length} premiers éléments focalisables sur ${elements.length}`);
  }

  return formatViolation(165, violations);
}

/**
 * Rule 166: Site is fully keyboard navigable
 * Check that all interactive elements can be reached by keyboard
 */
async function checkKeyboardNavigable(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    // Find interactive elements that should be keyboard accessible
    const interactiveSelector = 'a[href], button, input, select, textarea, [onclick], [role="button"], [role="link"]';
    document.querySelectorAll(interactiveSelector).forEach(el => {
      const tabindex = el.getAttribute('tabindex');

      // offsetParent === null valait aussi pour position:fixed et pour body (audit ShipGuard, r1-z03-024) :
      // barres de navigation fixes, boutons flottants et bandeaux de consentement échappaient au contrôle.
      const style = getComputedStyle(el);
      const isHidden = style.display === 'none' || style.visibility === 'hidden' || el.getClientRects().length === 0;

      // Skip hidden elements
      if (isHidden) return;

      // Élément cliquable non nativement focalisable et sans tabindex : inatteignable au clavier (r1-z03-023)
      const nativelyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(el.tagName.toLowerCase()) && (el.tagName.toLowerCase() !== 'a' || el.hasAttribute('href'));
      if (!nativelyFocusable && tabindex === null) {
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: 'Clickable element is not natively focusable and has no tabindex'
        });
        return;
      }

      // Check if element is not focusable (tabindex=-1 without role handling)
      if (tabindex === '-1' && !el.closest('[role="dialog"]') && !el.closest('[role="menu"]')) {
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: 'Interactive element has tabindex="-1" and may not be keyboard accessible'
        });
      }
    });
    return results;
  });

  return formatViolation(166, violations);
}

/**
 * Rule 167: Tab order is predictable
 * Check that tabindex values > 0 are not used (disrupts natural order)
 */
async function checkTabOrder(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('[tabindex]').forEach(el => {
      const tabindex = parseInt(el.getAttribute('tabindex'), 10);
      if (tabindex > 0) {
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: `Positive tabindex (${tabindex}) disrupts natural tab order`
        });
      }
    });
    return results;
  });

  return formatViolation(167, violations);
}

// ========== Target Size Check (186) ==========

/**
 * Rule 186: Clickable elements have sufficient size
 * Check that interactive elements are at least 44x44 pixels
 */
async function checkTargetSize(page) {
  const interactiveSelector = 'a[href], button, input:not([type="hidden"]), select, [role="button"], [onclick]';

  // Mesure groupée en une seule évaluation (audit ShipGuard 2026-09-03, r1-z03-028) : la boucle précédente
  // coûtait un boundingBox() plus deux evaluate() par élément, soit des milliers d'allers-retours CDP sur une
  // page riche. Seuils, sélecteur et éléments inspectés sont inchangés.
  const measured = await page.evaluate(selector => {
    return Array.from(document.querySelectorAll(selector)).map(el => {
      const measurable = el.getClientRects().length > 0;
      const rect = measurable ? el.getBoundingClientRect() : null;

      return {
        measurable,
        width: rect ? rect.width : 0,
        height: rect ? rect.height : 0,
        html: el.outerHTML.slice(0, 200),
        tagName: el.tagName.toLowerCase()
      };
    });
  }, interactiveSelector);

  const violations = [];
  let inconclusiveTargets = 0;

  for (const element of measured) {
    // Élément non mesurable : compté comme non évaluable plutôt que conforme (r1-z03-021)
    if (!element.measurable) {
      inconclusiveTargets++;
      continue;
    }

    if (element.width < 44 || element.height < 44) {
      // Skip very small elements that might be icons inside larger clickable areas
      if (element.width < 10 || element.height < 10) continue;

      violations.push({
        html: element.html,
        target: [element.tagName],
        failureSummary: `Target size is ${Math.round(element.width)}x${Math.round(element.height)}px (minimum: 44x44px)`
      });
    }
  }

  if (inconclusiveTargets > 0) {
    console.error(`[custom-checks] règle 186 : ${inconclusiveTargets} élément(s) non mesurable(s) (ignorés, pas conformes)`);
  }

  return formatViolation(186, violations);
}

// ========== Main Export ==========

/**
 * Run all custom Playwright checks
 * @param {Page} page - Playwright page object
 * @returns {Promise<Array>} - Array of violations in Opquast format
 */
export async function runCustomChecks(page) {
  const results = [];

  // Ordonnancement issu de l'audit ShipGuard 2026-09-03 (r1-z03-027) : checkFocusVisible déplaçait le focus
  // pendant que les autres checks lisaient les styles calculés de la même page. Les lectures pures du DOM
  // sont désormais groupées d'abord, les checks qui modifient l'état du document passent ensuite, seuls.

  // 1. Lectures pures du DOM, sans effet de bord : parallélisables sans interférence
  const domChecks = await Promise.all([
    checkUnderlineReserved(page),
    checkTextNotJustified(page),
    checkCopyNotBlocked(page),
    checkKeyboardNavigable(page),
    checkTabOrder(page)
  ]);
  results.push(...domChecks.filter(Boolean));

  // 2. Mesure de géométrie : lecture seule, mais après les lectures de style
  const targetCheck = await checkTargetSize(page);
  if (targetCheck) results.push(targetCheck);

  // 3. Déclenche un événement contextmenu : exécuté seul
  const attrCheck = await checkContextMenuNotBlocked(page);
  if (attrCheck) results.push(attrCheck);

  // 4. Déplace le focus : exécuté seul, en dernier, focus restauré par le check lui-même
  const focusCheck = await checkFocusVisible(page);
  if (focusCheck) results.push(focusCheck);

  return results;
}

/**
 * Run a specific custom check by Opquast ID
 * API publique programmatique : non appelée par la CLI, couverte par les tests (r1-z03-038)
 * @param {Page} page - Playwright page object
 * @param {number} opquastId - Opquast rule ID
 * @returns {Promise<Object|null>} - Violation result or null
 */
export async function runCustomCheck(page, opquastId) {
  const checkMap = {
    139: checkUnderlineReserved,
    191: checkTextNotJustified,
    237: checkCopyNotBlocked,
    238: checkContextMenuNotBlocked,
    165: checkFocusVisible,
    166: checkKeyboardNavigable,
    167: checkTabOrder,
    186: checkTargetSize
  };

  const checkFn = checkMap[opquastId];
  if (!checkFn) return null;

  return await checkFn(page);
}

export default {
  runCustomChecks,
  runCustomCheck
};
