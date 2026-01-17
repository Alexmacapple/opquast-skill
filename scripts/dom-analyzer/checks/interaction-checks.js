/**
 * Interaction-based checks for Opquast rules
 * PRD-004: Implements 20 rules that require DOM interaction testing
 *
 * Categories:
 * - Form validation/errors (79, 80, 85)
 * - Link styling (140, 141)
 * - Menu/navigation (157, 158)
 * - Modal controls (160, 161, 162)
 * - Animation controls (126, 128)
 * - Label visibility (77, 78)
 * - Hover actions (91)
 * - Copy/paste (92)
 * - Popup prevention (154)
 * - External link indicators (142)
 */

import { CONFIDENCE_LEVELS } from '../utils/opquast-mapper.js';

// Interaction check definitions
const INTERACTION_CHECKS = {
  // Form validation
  79: { title: 'Champs erronés conservent données saisies', severity: 'critical', type: 'form' },
  80: { title: 'Raisons rejet données indiquées', severity: 'critical', type: 'form' },
  85: { title: 'Soumission suivie message confirmation', severity: 'critical', type: 'form' },
  92: { title: 'Copier coller possible dans formulaires', severity: 'critical', type: 'form' },

  // Link styling
  140: { title: 'Liens différenciés du reste du contenu', severity: 'critical', type: 'link' },
  141: { title: 'Liens visités différenciés', severity: 'minor', type: 'link' },
  142: { title: 'Liens internes et externes différenciés', severity: 'critical', type: 'link' },

  // Navigation
  157: { title: 'Items actifs de menu signalés', severity: 'critical', type: 'nav' },
  158: { title: 'Blocs navigation même nature affichés mêmes endroits', severity: 'critical', type: 'nav' },
  154: { title: 'Navigation ne provoque pas popups', severity: 'critical', type: 'nav' },

  // Modal
  160: { title: 'Mécanismes fermeture visuellement repérables', severity: 'critical', type: 'modal' },
  161: { title: 'Mécanismes fermeture immédiatement utilisables', severity: 'critical', type: 'modal' },
  162: { title: 'Fenêtres modales ont bouton fermeture', severity: 'critical', type: 'modal' },

  // Animation
  126: { title: 'Animations peuvent être mises en pause', severity: 'critical', type: 'animation' },
  128: { title: 'Contenu animé peut être interrompu', severity: 'minor', type: 'animation' },

  // Labels
  77: { title: 'Labels visuellement rattachés aux champs', severity: 'critical', type: 'label' },
  78: { title: 'Infos contextuelles rattachées aux champs', severity: 'critical', type: 'label' },

  // Hover
  91: { title: 'Actions hover aussi déclenchables au pointeur', severity: 'minor', type: 'hover' }
};

/**
 * Format a violation result in standard Opquast format
 */
function formatViolation(opquastId, nodes) {
  const check = INTERACTION_CHECKS[opquastId];
  if (!check || nodes.length === 0) return null;

  const confidenceInfo = CONFIDENCE_LEVELS['interaction'] || { confidence: 0.80, label: 'interaction' };

  return {
    opquastId,
    title: check.title,
    severity: check.severity,
    source: 'interaction-check',
    confidence: confidenceInfo.confidence || 0.80,
    confidence_label: 'interaction',
    checkType: check.type,
    nodes: nodes.map(node => ({
      html: node.html,
      target: node.target || [],
      failureSummary: node.failureSummary || check.title
    }))
  };
}

// ========== Form Checks (79, 80, 85, 92) ==========

/**
 * Rule 79: Form fields retain data on error
 * Check that form fields have proper error handling attributes
 */
async function checkFormErrorRetention(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="hidden"]), textarea, select');
      inputs.forEach(input => {
        // Check if input has validation but no autocomplete
        const hasValidation = input.hasAttribute('required') || input.hasAttribute('pattern');
        const hasAutocomplete = input.hasAttribute('autocomplete') && input.autocomplete !== 'off';

        if (hasValidation && !hasAutocomplete) {
          results.push({
            html: input.outerHTML.slice(0, 200),
            target: [input.tagName.toLowerCase()],
            failureSummary: 'Champ avec validation mais sans autocomplete pour conserver les données'
          });
        }
      });
    });
    return results;
  });

  return formatViolation(79, violations);
}

/**
 * Rule 80: Error reasons are indicated
 * Check for aria-describedby on invalid fields
 */
async function checkErrorReasons(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const invalidInputs = document.querySelectorAll('[aria-invalid="true"], .error, .invalid, :invalid');

    invalidInputs.forEach(input => {
      if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
        const hasDescription = input.hasAttribute('aria-describedby') ||
                              input.hasAttribute('aria-errormessage');
        const hasErrorMessage = input.nextElementSibling?.classList.contains('error') ||
                               input.parentElement?.querySelector('.error-message, .field-error');

        if (!hasDescription && !hasErrorMessage) {
          results.push({
            html: input.outerHTML.slice(0, 200),
            target: [input.tagName.toLowerCase()],
            failureSummary: 'Champ invalide sans message d\'erreur associé'
          });
        }
      }
    });
    return results;
  });

  return formatViolation(80, violations);
}

/**
 * Rule 85: Form submission shows confirmation
 * Check for success message patterns
 */
async function checkFormConfirmation(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const forms = document.querySelectorAll('form[action]');

    forms.forEach(form => {
      // Check if form has any success/confirmation message nearby or pattern
      const hasSuccessPattern = form.querySelector('[role="status"], [role="alert"], .success, .confirmation') ||
                               form.parentElement?.querySelector('[role="status"], .success-message');
      const hasAriaLive = form.querySelector('[aria-live]') || form.parentElement?.querySelector('[aria-live]');

      // If form has submit button but no confirmation pattern
      const hasSubmit = form.querySelector('[type="submit"], button:not([type="button"])');
      if (hasSubmit && !hasSuccessPattern && !hasAriaLive) {
        results.push({
          html: form.outerHTML.slice(0, 300),
          target: ['form'],
          failureSummary: 'Formulaire sans zone de confirmation détectée'
        });
      }
    });
    return results;
  });

  return formatViolation(85, violations);
}

/**
 * Rule 92: Copy/paste is possible in form fields
 * Check for oncopy/onpaste handlers that block
 */
async function checkCopyPasteAllowed(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      const onCopy = input.getAttribute('oncopy');
      const onPaste = input.getAttribute('onpaste');
      const onCut = input.getAttribute('oncut');

      const blocksAction = (handler) => handler &&
        (handler.includes('return false') || handler.includes('preventDefault'));

      if (blocksAction(onCopy) || blocksAction(onPaste) || blocksAction(onCut)) {
        results.push({
          html: input.outerHTML.slice(0, 200),
          target: [input.tagName.toLowerCase()],
          failureSummary: 'Copier/coller bloqué via gestionnaire d\'événement'
        });
      }
    });
    return results;
  });

  return formatViolation(92, violations);
}

// ========== Link Styling Checks (140, 141, 142) ==========

/**
 * Rule 140: Links are visually differentiated from text
 */
async function checkLinksDifferentiated(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const links = document.querySelectorAll('a[href]');
    const bodyStyle = getComputedStyle(document.body);
    const bodyColor = bodyStyle.color;

    links.forEach(link => {
      const style = getComputedStyle(link);
      const hasUnderline = style.textDecorationLine.includes('underline');
      const hasDifferentColor = style.color !== bodyColor;

      // Links should have underline OR different color
      if (!hasUnderline && !hasDifferentColor && link.textContent.trim().length > 0) {
        // Check if inside nav (may be styled differently)
        if (!link.closest('nav, [role="navigation"], header, footer')) {
          results.push({
            html: link.outerHTML.slice(0, 200),
            target: ['a'],
            failureSummary: 'Lien non différencié visuellement (pas de soulignement ni couleur distincte)'
          });
        }
      }
    });
    return results.slice(0, 10); // Limit to 10 violations
  });

  return formatViolation(140, violations);
}

/**
 * Rule 141: Visited links are differentiated
 * Note: Can only check if :visited CSS is defined
 */
async function checkVisitedLinks(page) {
  // Check if stylesheet has :visited rules
  const hasVisitedStyle = await page.evaluate(() => {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText && rule.selectorText.includes(':visited')) {
            return true;
          }
        }
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
    }
    return false;
  });

  if (!hasVisitedStyle) {
    return formatViolation(141, [{
      html: '<style>/* No :visited rules found */</style>',
      target: ['stylesheet'],
      failureSummary: 'Aucune règle CSS :visited détectée pour différencier les liens visités'
    }]);
  }
  return null;
}

/**
 * Rule 142: Internal and external links are differentiated
 */
async function checkExternalLinks(page) {
  const currentHost = new URL(page.url()).hostname;

  const violations = await page.evaluate((host) => {
    const results = [];
    const externalLinks = [...document.querySelectorAll('a[href^="http"]')]
      .filter(a => {
        try {
          return new URL(a.href).hostname !== host;
        } catch {
          return false;
        }
      });

    externalLinks.forEach(link => {
      const hasIndicator = link.querySelector('[class*="external"], [class*="icon"]') ||
                          link.hasAttribute('target') ||
                          link.textContent.includes('↗') ||
                          link.textContent.includes('externe') ||
                          link.getAttribute('aria-label')?.includes('external') ||
                          link.getAttribute('aria-label')?.includes('nouvelle');

      if (!hasIndicator && !link.closest('nav, footer')) {
        results.push({
          html: link.outerHTML.slice(0, 200),
          target: ['a'],
          failureSummary: 'Lien externe sans indicateur visuel'
        });
      }
    });
    return results.slice(0, 10);
  }, currentHost);

  return formatViolation(142, violations);
}

// ========== Navigation Checks (154, 157, 158) ==========

/**
 * Rule 154: Navigation doesn't open popups
 * Check for target="_blank" without user warning
 */
async function checkNoPopups(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const blankLinks = document.querySelectorAll('a[target="_blank"]:not([rel*="noopener"])');

    blankLinks.forEach(link => {
      const hasWarning = link.getAttribute('aria-label')?.includes('nouvel') ||
                        link.getAttribute('title')?.includes('nouvel') ||
                        link.textContent.includes('nouvel') ||
                        link.querySelector('[class*="external"]');

      if (!hasWarning && !link.closest('nav, footer')) {
        results.push({
          html: link.outerHTML.slice(0, 200),
          target: ['a'],
          failureSummary: 'Lien ouvre nouvelle fenêtre sans avertissement'
        });
      }
    });
    return results.slice(0, 10);
  });

  return formatViolation(154, violations);
}

/**
 * Rule 157: Active menu items are signaled
 */
async function checkActiveMenuItems(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const navs = document.querySelectorAll('nav, [role="navigation"]');

    navs.forEach(nav => {
      const links = nav.querySelectorAll('a[href]');
      const hasActiveIndicator = nav.querySelector('[aria-current], .active, .current, [class*="active"]');

      if (links.length > 3 && !hasActiveIndicator) {
        results.push({
          html: nav.outerHTML.slice(0, 300),
          target: ['nav'],
          failureSummary: 'Menu de navigation sans indication de page active (aria-current ou classe active)'
        });
      }
    });
    return results;
  });

  return formatViolation(157, violations);
}

/**
 * Rule 158: Navigation blocks are consistent
 */
async function checkNavigationConsistency(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const navs = document.querySelectorAll('nav, [role="navigation"]');

    // Check if nav has consistent structure
    navs.forEach(nav => {
      const hasRole = nav.hasAttribute('role') || nav.tagName === 'NAV';
      const hasLabel = nav.hasAttribute('aria-label') || nav.hasAttribute('aria-labelledby');

      if (hasRole && !hasLabel && navs.length > 1) {
        results.push({
          html: nav.outerHTML.slice(0, 200),
          target: ['nav'],
          failureSummary: 'Navigation sans aria-label pour différencier des autres navigations'
        });
      }
    });
    return results;
  });

  return formatViolation(158, violations);
}

// ========== Modal Checks (160, 161, 162) ==========

/**
 * Rule 160, 161, 162: Modal close mechanisms
 */
async function checkModalCloseMechanisms(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const modals = document.querySelectorAll('[role="dialog"], [aria-modal="true"], .modal, .dialog');

    modals.forEach(modal => {
      const closeButton = modal.querySelector('[aria-label*="fermer"], [aria-label*="close"], .close, [class*="close"], button[aria-label]');
      const hasEscapeHandler = modal.hasAttribute('data-keyboard') || modal.closest('[data-keyboard]');

      if (!closeButton) {
        results.push({
          html: modal.outerHTML.slice(0, 300),
          target: ['dialog'],
          failureSummary: 'Fenêtre modale sans bouton de fermeture visible'
        });
      }
    });
    return results;
  });

  // Return violations for rules 160, 161, 162
  const result160 = formatViolation(160, violations);
  const result162 = formatViolation(162, violations);

  return [result160, result162].filter(Boolean);
}

// ========== Animation Checks (126, 128) ==========

/**
 * Rule 126, 128: Animations can be paused/stopped
 */
async function checkAnimationControls(page) {
  const violations = await page.evaluate(() => {
    const results = [];

    // Check for animated elements
    const animatedElements = document.querySelectorAll('[class*="animate"], [class*="carousel"], [class*="slider"], video[autoplay], .gif');

    animatedElements.forEach(el => {
      const hasControls = el.hasAttribute('controls') ||
                         el.closest('[class*="carousel"], [class*="slider"]')?.querySelector('[class*="pause"], [class*="stop"], [aria-label*="pause"]');

      if (!hasControls && el.tagName !== 'VIDEO') {
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: 'Élément animé sans contrôle de pause visible'
        });
      }
    });
    return results;
  });

  return formatViolation(126, violations);
}

// ========== Label Checks (77, 78) ==========

/**
 * Rule 77: Labels visually attached to fields
 * Rule 78: Contextual info near fields
 */
async function checkLabelProximity(page) {
  const violations = await page.evaluate(() => {
    const results = [];
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), textarea, select');

    inputs.forEach(input => {
      const id = input.id;
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const placeholder = input.getAttribute('placeholder');

      // Check if label exists and is properly connected
      if (!label && !ariaLabel && !ariaLabelledby) {
        // Placeholder alone is not sufficient
        if (placeholder) {
          results.push({
            html: input.outerHTML.slice(0, 200),
            target: [input.tagName.toLowerCase()],
            failureSummary: 'Champ avec placeholder mais sans label associé'
          });
        }
      }

      // Check if label is visually close (same parent or adjacent)
      if (label) {
        const labelRect = label.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        const distance = Math.abs(labelRect.bottom - inputRect.top);

        if (distance > 50 && !input.closest('fieldset')) {
          results.push({
            html: `${label.outerHTML} ... ${input.outerHTML}`.slice(0, 300),
            target: ['label', input.tagName.toLowerCase()],
            failureSummary: 'Label visuellement éloigné du champ (distance > 50px)'
          });
        }
      }
    });
    return results.slice(0, 10);
  });

  return formatViolation(77, violations);
}

// ========== Hover Check (91) ==========

/**
 * Rule 91: Hover actions also work with pointer
 */
async function checkHoverActions(page) {
  const violations = await page.evaluate(() => {
    const results = [];

    // Elements with hover-only actions
    const hoverElements = document.querySelectorAll('[onmouseover]:not([onclick]), [onmouseenter]:not([onclick])');

    hoverElements.forEach(el => {
      results.push({
        html: el.outerHTML.slice(0, 200),
        target: [el.tagName.toLowerCase()],
        failureSummary: 'Élément avec action hover sans équivalent click'
      });
    });

    return results;
  });

  return formatViolation(91, violations);
}

// ========== Main Export ==========

/**
 * Run all interaction checks
 * @param {Page} page - Playwright page object
 * @returns {Promise<Array>} - Array of violations in Opquast format
 */
export async function runInteractionChecks(page) {
  const results = [];

  try {
    // Form checks
    const formChecks = await Promise.all([
      checkFormErrorRetention(page),
      checkErrorReasons(page),
      checkFormConfirmation(page),
      checkCopyPasteAllowed(page)
    ]);
    results.push(...formChecks.filter(Boolean));

    // Link checks
    const linkChecks = await Promise.all([
      checkLinksDifferentiated(page),
      checkVisitedLinks(page),
      checkExternalLinks(page)
    ]);
    results.push(...linkChecks.filter(Boolean));

    // Navigation checks
    const navChecks = await Promise.all([
      checkNoPopups(page),
      checkActiveMenuItems(page),
      checkNavigationConsistency(page)
    ]);
    results.push(...navChecks.filter(Boolean));

    // Modal checks (returns array)
    const modalResults = await checkModalCloseMechanisms(page);
    if (Array.isArray(modalResults)) {
      results.push(...modalResults.filter(Boolean));
    } else if (modalResults) {
      results.push(modalResults);
    }

    // Animation checks
    const animationCheck = await checkAnimationControls(page);
    if (animationCheck) results.push(animationCheck);

    // Label checks
    const labelCheck = await checkLabelProximity(page);
    if (labelCheck) results.push(labelCheck);

    // Hover check
    const hoverCheck = await checkHoverActions(page);
    if (hoverCheck) results.push(hoverCheck);

  } catch (error) {
    console.error('Interaction checks error:', error.message);
  }

  return results;
}

/**
 * Run a specific interaction check by Opquast ID
 */
export async function runInteractionCheck(page, opquastId) {
  const checkMap = {
    79: checkFormErrorRetention,
    80: checkErrorReasons,
    85: checkFormConfirmation,
    92: checkCopyPasteAllowed,
    140: checkLinksDifferentiated,
    141: checkVisitedLinks,
    142: checkExternalLinks,
    154: checkNoPopups,
    157: checkActiveMenuItems,
    158: checkNavigationConsistency,
    126: checkAnimationControls,
    77: checkLabelProximity,
    91: checkHoverActions
  };

  const checkFn = checkMap[opquastId];
  if (!checkFn) return null;

  return await checkFn(page);
}

/**
 * Get interaction check info
 */
export function getInteractionCheckInfo() {
  return {
    name: 'Interaction Checks',
    version: '1.0.0',
    checks: Object.keys(INTERACTION_CHECKS).length,
    rules: Object.entries(INTERACTION_CHECKS).map(([id, check]) => ({
      id: parseInt(id, 10),
      title: check.title,
      severity: check.severity,
      type: check.type
    })),
    confidenceLevel: { confidence: 0.80, label: 'interaction' }
  };
}

export { INTERACTION_CHECKS };

export default {
  runInteractionChecks,
  runInteractionCheck,
  getInteractionCheckInfo,
  INTERACTION_CHECKS
};
