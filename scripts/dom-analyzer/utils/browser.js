/**
 * Browser lifecycle management for Playwright
 * Handles launch, context creation, and cleanup
 */

import { chromium } from 'playwright';

let browserInstance = null;
let contextInstance = null;

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
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
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

  const defaultOptions = {
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true
  };

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
 * @param {Object} options - Navigation options
 * @returns {Promise<void>}
 */
export async function navigateAndWait(page, url, options = {}) {
  const defaultOptions = {
    waitUntil: 'networkidle',
    timeout: 30000
  };

  await page.goto(url, {
    ...defaultOptions,
    ...options
  });

  // Additional wait for SPA hydration
  await page.waitForTimeout(1000);
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
  getContext
};
