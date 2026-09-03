/**
 * Global test setup - initializes browser before tests.
 * Sans navigateur installé, les tests purs restent exécutables : l'échec de lancement est signalé, pas fatal (r1-z05-015).
 */

import { launchBrowser, closeBrowser } from '../utils/browser.js';

export async function setup() {
  try {
    await launchBrowser();
    console.log('Browser launched for tests');
  } catch (error) {
    console.warn(`Browser not available for tests (${error.message.split('\n')[0]}) : browser-based tests will fail, pure tests still run`);
  }
}

export async function teardown() {
  await closeBrowser().catch(() => {});
  console.log('Browser closed after tests');
}
