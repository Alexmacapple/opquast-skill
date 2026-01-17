/**
 * Custom Playwright-based checks for Opquast rules
 * Implements 8 rules that cannot be covered by axe-core
 */

import { CUSTOM_CHECKS, CONFIDENCE_LEVELS } from '../utils/opquast-mapper.js';

/**
 * Format a violation result in standard Opquast format
 * PRD-002: Includes confidence scoring for custom checks
 */
function formatViolation(opquastId, nodes) {
  const check = CUSTOM_CHECKS[opquastId];
  if (!check || nodes.length === 0) return null;

  const confidenceInfo = CONFIDENCE_LEVELS['custom-check'];

  return {
    opquastId,
    title: check.title,
    severity: check.severity,
    // PRD-002: Confidence scoring
    source: 'custom-check',
    confidence: confidenceInfo.confidence,
    confidence_label: confidenceInfo.label,
    // Check details
    checkType: check.type,
    nodes: nodes.map(node => ({
      html: node.html,
      target: node.target || [],
      failureSummary: node.failureSummary || check.title
    }))
  };
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
    const selector = 'p, span, div, h1, h2, h3, h4, h5, h6, li, td, th, label';
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
    // Check for oncontextmenu attribute
    document.querySelectorAll('[oncontextmenu]').forEach(el => {
      const handler = el.getAttribute('oncontextmenu');
      // Check if it returns false or prevents default
      if (handler && (handler.includes('return false') || handler.includes('preventDefault'))) {
        results.push({
          html: el.outerHTML.slice(0, 200),
          target: [el.tagName.toLowerCase()],
          failureSummary: `Context menu is blocked via oncontextmenu`
        });
      }
    });
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

  // Limit to first 30 elements for performance
  const toCheck = elements.slice(0, 30);

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
      const hasOutline = afterStyles.outline !== 'none' && afterStyles.outlineWidth !== '0px';
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
      // Element may not be focusable or visible, skip
    }
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
      const isHidden = el.offsetParent === null;

      // Skip hidden elements
      if (isHidden) return;

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
  const elements = await page.locator(interactiveSelector).all();
  const violations = [];

  for (const el of elements) {
    try {
      const box = await el.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        // Skip very small elements that might be icons inside larger clickable areas
        if (box.width < 10 || box.height < 10) continue;

        const html = await el.evaluate(e => e.outerHTML.slice(0, 200));
        violations.push({
          html,
          target: [await el.evaluate(e => e.tagName.toLowerCase())],
          failureSummary: `Target size is ${Math.round(box.width)}x${Math.round(box.height)}px (minimum: 44x44px)`
        });
      }
    } catch (e) {
      // Element may not be visible, skip
    }
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

  // CSS Checks
  const cssChecks = await Promise.all([
    checkUnderlineReserved(page),
    checkTextNotJustified(page),
    checkCopyNotBlocked(page)
  ]);
  results.push(...cssChecks.filter(Boolean));

  // Attribute Check
  const attrCheck = await checkContextMenuNotBlocked(page);
  if (attrCheck) results.push(attrCheck);

  // Focus/Keyboard Checks
  const focusChecks = await Promise.all([
    checkFocusVisible(page),
    checkKeyboardNavigable(page),
    checkTabOrder(page)
  ]);
  results.push(...focusChecks.filter(Boolean));

  // Target Size Check
  const targetCheck = await checkTargetSize(page);
  if (targetCheck) results.push(targetCheck);

  return results;
}

/**
 * Run a specific custom check by Opquast ID
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
