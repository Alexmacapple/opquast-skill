#!/usr/bin/env node

/**
 * Authentication Helper for Opquast Bridge
 *
 * Opens a browser window for manual login, then saves the authentication state
 * (cookies, localStorage) to a file that can be reused with bridge.js.
 *
 * Usage:
 *   node scripts/auth-helper.js https://example.com/login --output auth-state.json
 *   node scripts/auth-helper.js https://example.com/login --output auth-state.json --wait-for "/dashboard"
 *
 * Then use with bridge:
 *   node scripts/bridge.js https://example.com/protected --auth-state auth-state.json
 */

import { chromium } from './dom-analyzer/node_modules/playwright/index.mjs';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Authentication Helper for Opquast Bridge

Usage:
  node scripts/auth-helper.js <login-url> [options]

Options:
  --output <file>     Save auth state to file (default: .opquast-auth.json)
  --wait-for <path>   Wait for URL to contain this path after login (e.g., "/dashboard")
  --timeout <ms>      Max time to wait for login (default: 300000 = 5 minutes)
  --help, -h          Show this help

Examples:
  # Basic usage - login manually, close browser when done
  node scripts/auth-helper.js https://uranus.bhub.cloud/login

  # Auto-detect login success when redirected to dashboard
  node scripts/auth-helper.js https://uranus.bhub.cloud/login --wait-for "/dashboard"

  # Custom output file
  node scripts/auth-helper.js https://example.com/login --output my-auth.json

After authentication, use with bridge.js:
  node scripts/bridge.js https://uranus.bhub.cloud/dashboard --auth-state .opquast-auth.json
`);
    process.exit(0);
  }

  const loginUrl = args[0];

  // Parse options
  let outputFile = '.opquast-auth.json';
  let waitForPath = null;
  let timeout = 300000; // 5 minutes

  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    outputFile = args[outputIdx + 1];
  }

  const waitForIdx = args.indexOf('--wait-for');
  if (waitForIdx !== -1 && args[waitForIdx + 1]) {
    waitForPath = args[waitForIdx + 1];
  }

  const timeoutIdx = args.indexOf('--timeout');
  if (timeoutIdx !== -1 && args[timeoutIdx + 1]) {
    timeout = parseInt(args[timeoutIdx + 1], 10);
  }

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║            Opquast Authentication Helper                     ║
╠══════════════════════════════════════════════════════════════╣
║  1. A browser window will open                               ║
║  2. Log in to your account                                   ║
║  3. ${waitForPath ? `Authentication will be saved when URL contains "${waitForPath}"` : 'Close the browser when done (or press Ctrl+C)'}
╚══════════════════════════════════════════════════════════════╝
`);

  console.log(`Opening: ${loginUrl}`);
  console.log(`Auth state will be saved to: ${outputFile}\n`);

  let browser = null;

  try {
    // Launch browser in HEADED mode (visible)
    browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized']
    });

    const context = await browser.newContext({
      viewport: null, // Full window
      ignoreHTTPSErrors: true
    });

    const page = await context.newPage();

    // Navigate to login page
    await page.goto(loginUrl, { waitUntil: 'networkidle' });

    if (waitForPath) {
      // Wait for URL to change to expected path (indicates successful login)
      console.log(`Waiting for URL to contain "${waitForPath}"...`);
      console.log('(Login in the browser window)\n');

      try {
        await page.waitForURL(`**${waitForPath}**`, { timeout });
        console.log(`✓ Login detected! URL now contains "${waitForPath}"`);
      } catch (e) {
        console.error(`✗ Timeout waiting for "${waitForPath}". Login may have failed.`);
        await browser.close();
        process.exit(1);
      }
    } else {
      // Wait for browser to be closed manually
      console.log('Login in the browser window, then CLOSE the browser to save auth state.\n');
      console.log('(Or press Ctrl+C to cancel)\n');

      // Wait for browser to disconnect (user closed it)
      await new Promise((resolve) => {
        browser.on('disconnected', resolve);
      });
      console.log('\n✓ Browser closed.');
    }

    // Save storage state (cookies + localStorage)
    const storageState = await context.storageState();

    // Add metadata
    const authState = {
      version: '1.0',
      createdAt: new Date().toISOString(),
      loginUrl,
      storageState
    };

    await writeFile(outputFile, JSON.stringify(authState, null, 2));
    console.log(`\n✓ Authentication state saved to: ${outputFile}`);
    console.log(`\nUsage with bridge.js:`);
    console.log(`  node scripts/bridge.js <protected-url> --auth-state ${outputFile}`);

    // Close browser if still open
    if (browser.isConnected()) {
      await browser.close();
    }

  } catch (error) {
    console.error(`\n✗ Error: ${error.message}`);
    if (browser && browser.isConnected()) {
      await browser.close();
    }
    process.exit(1);
  }
}

main();
