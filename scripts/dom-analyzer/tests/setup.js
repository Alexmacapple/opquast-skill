/**
 * Global test setup - initializes browser before tests
 */

import { launchBrowser, closeBrowser } from '../utils/browser.js';

export async function setup() {
  // Pre-launch browser for faster tests
  await launchBrowser();
  console.log('Browser launched for tests');
}

export async function teardown() {
  await closeBrowser();
  console.log('Browser closed after tests');
}
