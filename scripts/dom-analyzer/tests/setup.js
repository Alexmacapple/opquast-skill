/**
 * Configuration globale des tests (globalSetup de vitest.config.js).
 *
 * Ce module ne pré-lance plus de navigateur (audit ShipGuard 2026-09-04, r1-z04-060) : globalSetup
 * s'exécute dans le processus principal de vitest tandis que les tests tournent dans un worker
 * « forks » distinct. Le singleton `browserInstance` de utils/browser.js n'est donc pas partagé
 * entre les deux registres de modules : le navigateur pré-lancé restait ouvert et inutilisé pendant
 * toute la suite, chaque fichier de test rappelant launchBrowser() de son côté.
 *
 * Rôle restant : vérifier que le binaire Chromium de Playwright est présent et, sinon, afficher la
 * commande d'installation plutôt qu'une trace Playwright brute au premier test (r1-z04-061).
 */

import { existsSync } from 'fs';
import { chromium } from 'playwright';
import { closeBrowser, getBrowser } from '../utils/browser.js';

export async function setup() {
  try {
    const executable = chromium.executablePath();
    if (!executable || !existsSync(executable)) {
      console.warn('Navigateur Playwright introuvable : lancer « npm run install-browsers » (npx playwright install chromium). Les tests qui exigent un navigateur vont échouer ; les tests purs restent exécutables.');
      return;
    }
    console.log(`Navigateur Playwright disponible : ${executable}`);
  } catch (error) {
    console.warn(`Vérification du navigateur impossible (${error.message.split('\n')[0]}) : les tests qui exigent un navigateur vont échouer ; les tests purs restent exécutables.`);
  }
}

export async function teardown() {
  // Filet de sécurité : ne ferme que si le processus principal détient réellement une instance.
  try {
    if (getBrowser()) {
      await closeBrowser();
      console.log('Browser closed after tests');
    }
  } catch (error) {
    console.warn(`Fermeture du navigateur impossible : ${error.message}`);
  }
}
