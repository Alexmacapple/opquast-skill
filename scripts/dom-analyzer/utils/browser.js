/**
 * Browser lifecycle management for Playwright
 * Handles launch, context creation, and cleanup
 */

import { chromium } from 'playwright';

let browserInstance = null;
let contextInstance = null;

/** Drapeau d'environnement lu de façon tolérante (1, true, yes, on) */
function envFlag(name) {
  return ['1', 'true', 'yes', 'on'].includes(String(process.env[name] || '').trim().toLowerCase());
}

/**
 * Arguments de lancement de Chromium.
 * Audit ShipGuard 2026-09-03 (r1-z03-032) : le bac à sable reste actif par défaut, l'analyseur naviguant
 * vers des URL non maîtrisées. OPQUAST_CHROMIUM_NO_SANDBOX=1 rétablit les drapeaux pour les environnements
 * conteneurisés ou les CI qui l'exigent.
 * @returns {string[]}
 */
export function getLaunchArgs() {
  const args = ['--disable-dev-shm-usage'];

  if (envFlag('OPQUAST_CHROMIUM_NO_SANDBOX')) {
    args.unshift('--no-sandbox', '--disable-setuid-sandbox');
  }

  return args;
}

/**
 * Options par défaut du contexte navigateur.
 * Audit ShipGuard 2026-09-03 (r1-z03-033) : les certificats invalides ne sont plus acceptés en silence.
 * OPQUAST_IGNORE_HTTPS_ERRORS=1 permet d'auditer une préproduction en certificat auto-signé.
 * @returns {Object}
 */
export function getContextDefaults() {
  return {
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: envFlag('OPQUAST_IGNORE_HTTPS_ERRORS')
  };
}

/**
 * Délai de stabilisation appliqué après la navigation.
 * Audit ShipGuard 2026-09-03 (r1-z03-034) : la valeur par défaut reste 1 s pour ne pas modifier la fenêtre
 * d'observation des checks DOM, mais elle est désormais réglable (options.settleDelay, puis OPQUAST_SETTLE_DELAY).
 * @param {Object} options
 * @returns {number} délai en millisecondes
 */
export function getSettleDelay(options = {}) {
  if (Number.isFinite(options.settleDelay)) {
    return Math.max(0, options.settleDelay);
  }

  const raw = process.env.OPQUAST_SETTLE_DELAY;
  if (raw !== undefined && raw !== '' && Number.isFinite(Number(raw))) {
    return Math.max(0, Number(raw));
  }

  return 1000;
}

/**
 * Launch browser (singleton pattern for reuse)
 * @param {Object} options - Launch options
 * @returns {Promise<Browser>}
 */
export async function launchBrowser(options = {}) {
  if (browserInstance) {
    return browserInstance;
  }

  const defaultOptions = {
    headless: true,
    args: getLaunchArgs()
  };

  browserInstance = await chromium.launch({
    ...defaultOptions,
    ...options
  });

  return browserInstance;
}

/**
 * Create a new browser context with sensible defaults
 * @param {Object} options - Context options
 * @returns {Promise<BrowserContext>}
 */
export async function createContext(options = {}) {
  const browser = await launchBrowser();

  const defaultOptions = getContextDefaults();

  if (contextInstance) {
    // Ne pas écraser un contexte ouvert sans le fermer (audit ShipGuard 2026-09-03, r1-z03-029)
    await contextInstance.close().catch(() => {});
    contextInstance = null;
  }

  contextInstance = await browser.newContext({
    ...defaultOptions,
    ...options
  });

  return contextInstance;
}

/**
 * Navigate to URL and wait for page to be ready
 * @param {Page} page - Playwright page
 * @param {string} url - URL to navigate to
 * @param {Object} options - Navigation options (options de page.goto, plus settleDelay en millisecondes)
 * @returns {Promise<void>}
 */
export async function navigateAndWait(page, url, options = {}) {
  // settleDelay est une option de ce module, pas de Playwright : la retirer avant de la transmettre à page.goto
  const { settleDelay, ...gotoOptions } = options;

  const defaultOptions = {
    waitUntil: 'networkidle',
    timeout: 30000
  };

  await page.goto(url, {
    ...defaultOptions,
    ...gotoOptions
  });

  // Attente de stabilisation (hydratation des SPA), réglable depuis l'audit (r1-z03-034)
  const delay = getSettleDelay(options);
  if (delay > 0) {
    await page.waitForTimeout(delay);
  }
}

/**
 * Close browser and cleanup
 * @returns {Promise<void>}
 */
export async function closeBrowser() {
  try {
    if (contextInstance) {
      await contextInstance.close();
    }
  } finally {
    contextInstance = null;
    try {
      if (browserInstance) {
        await browserInstance.close();
      }
    } finally {
      browserInstance = null;
    }
  }
}

/**
 * Get current browser instance
 * API publique programmatique : non appelée par la CLI, couverte par tests/z03-*.test.js (r1-z03-038)
 * @returns {Browser|null}
 */
export function getBrowser() {
  return browserInstance;
}

/**
 * Get current context instance
 * @returns {BrowserContext|null}
 */
export function getContext() {
  return contextInstance;
}

export default {
  launchBrowser,
  createContext,
  navigateAndWait,
  closeBrowser,
  getBrowser,
  getContext,
  getLaunchArgs,
  getContextDefaults,
  getSettleDelay
};
