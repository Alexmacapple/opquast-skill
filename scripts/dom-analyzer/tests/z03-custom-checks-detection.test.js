/**
 * Audit ShipGuard 2026-09-03, zone z03 — détection des checks custom Playwright.
 *
 * Constats couverts :
 * - r1-z03-024 : offsetParent === null classait les éléments position:fixed comme masqués (règle 166) ;
 * - r1-z03-025 : la règle 238 n'inspectait que l'attribut inline oncontextmenu ;
 * - r1-z03-026 : le sélecteur de la règle 139 omettait des éléments textuels courants ;
 * - r1-z03-045 : les styles d'outline capturés avant le focus n'étaient jamais comparés (règle 165) ;
 * - r1-z03-027 : le check de focus déplaçait le focus pendant les autres checks, sans le restaurer ;
 * - r1-z03-028 : la mesure des cibles (règle 186) est désormais groupée en une seule évaluation ;
 * - r1-z03-039 : formatViolation doit produire exactement la sortie de createCustomCheckResult.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { launchBrowser, createContext, closeBrowser } from '../utils/browser.js';
import { runCustomCheck, runCustomChecks } from '../checks/custom-checks.js';
import { createCustomCheckResult } from '../utils/opquast-mapper.js';

const wrap = body => `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Fixture z03</title></head><body>${body}</body></html>`;

describe('checks custom (zone z03)', () => {
  let context;

  beforeAll(async () => {
    await launchBrowser();
    context = await createContext();
  });

  afterAll(async () => {
    if (context) await context.close().catch(() => {});
    await closeBrowser();
  });

  const withPage = async (html, fn) => {
    const page = await context.newPage();
    await page.setContent(wrap(html));
    try {
      return await fn(page);
    } finally {
      await page.close().catch(() => {});
    }
  };

  describe('règle 166 : visibilité réelle des éléments interactifs (r1-z03-024)', () => {
    it('contrôle les éléments position:fixed et ignore les éléments réellement masqués', async () => {
      const result = await withPage(
        `<div id="barre" onclick="void 0" style="position:fixed;top:0;left:0;width:100px;height:40px">Barre fixe</div>
         <div id="cache" onclick="void 0" style="display:none">Masqué</div>
         <div id="invisible" onclick="void 0" style="visibility:hidden">Invisible</div>
         <button>OK</button>`,
        page => runCustomCheck(page, 166)
      );

      expect(result).not.toBeNull();
      const html = result.nodes.map(n => n.html).join('\n');
      expect(html).toContain('barre');
      expect(html).not.toContain('cache');
      expect(html).not.toContain('invisible');
      expect(result.nodes).toHaveLength(1);
    });
  });

  describe('règle 238 : blocage effectif du menu contextuel (r1-z03-025)', () => {
    it('détecte un blocage posé par addEventListener', async () => {
      const result = await withPage(
        `<p>Contenu</p><script>document.addEventListener('contextmenu', e => e.preventDefault());<\/script>`,
        page => runCustomCheck(page, 238)
      );

      expect(result).not.toBeNull();
      expect(result.opquastId).toBe(238);
      expect(result.nodes.length).toBeGreaterThan(0);
    });

    it('détecte un handler inline qui délègue à une fonction externe', async () => {
      const result = await withPage(
        `<script>function blockMenu(e) { e.preventDefault(); }<\/script>
         <div id="protege" oncontextmenu="blockMenu(event)">Zone protégée</div>`,
        page => runCustomCheck(page, 238)
      );

      expect(result).not.toBeNull();
      expect(result.nodes.map(n => n.html).join('\n')).toContain('protege');
    });

    it('ne signale rien sur une page sans blocage', async () => {
      const result = await withPage('<p>Contenu libre</p><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="">', page => runCustomCheck(page, 238));
      expect(result).toBeNull();
    });
  });

  describe('règle 139 : sélecteur élargi (r1-z03-026)', () => {
    it('détecte un soulignement sur strong et figcaption hors lien', async () => {
      const result = await withPage(
        `<p><strong id="fort" style="text-decoration:underline">Important</strong></p>
         <figure><figcaption id="legende" style="text-decoration:underline">Légende</figcaption></figure>
         <a href="#" style="text-decoration:underline">Lien souligné (conforme)</a>`,
        page => runCustomCheck(page, 139)
      );

      expect(result).not.toBeNull();
      const html = result.nodes.map(n => n.html).join('\n');
      expect(html).toContain('fort');
      expect(html).toContain('legende');
    });
  });

  describe('règle 165 : indicateur de focus spécifique au focus (r1-z03-045)', () => {
    it('signale un outline permanent qui ne change pas à la prise de focus', async () => {
      const result = await withPage(
        `<style>
           button.permanent { outline: 2px solid red; }
           button.permanent:focus { outline: 2px solid red; }
           button.anneau { outline: none; }
           button.anneau:focus { outline: 3px solid blue; }
         </style>
         <button class="permanent" id="permanent">Permanent</button>
         <button class="anneau" id="anneau">Anneau</button>`,
        page => runCustomCheck(page, 165)
      );

      expect(result).not.toBeNull();
      expect(result.nodes).toHaveLength(1);
      expect(result.nodes[0].html).toContain('permanent');
    });
  });

  describe('règle 186 : mesure groupée des cibles (r1-z03-028)', () => {
    it('applique les mêmes seuils qu\'avant le regroupement', async () => {
      const result = await withPage(
        `<style>
           .petit { width: 30px; height: 20px; display: inline-block; }
           .bon { width: 48px; height: 48px; display: inline-block; }
           .minuscule { width: 5px; height: 5px; display: inline-block; }
         </style>
         <button class="petit" id="petit">S</button>
         <button class="bon" id="bon">OK</button>
         <button class="minuscule" id="minuscule"></button>
         <button id="masque" style="display:none">H</button>`,
        page => runCustomCheck(page, 186)
      );

      expect(result).not.toBeNull();
      expect(result.nodes).toHaveLength(1);
      expect(result.nodes[0].html).toContain('petit');
      expect(result.nodes[0].failureSummary).toContain('30x20px');
      expect(result.nodes[0].failureSummary).toContain('44x44px');
    });
  });

  describe('runCustomChecks : isolation du check de focus (r1-z03-027)', () => {
    it('restaure le focus initial après la suite complète', async () => {
      const active = await withPage(
        '<input id="premier"><button id="bouton">b</button><a href="#">lien</a>',
        async page => {
          await page.evaluate(() => document.getElementById('premier').focus());
          await runCustomChecks(page);
          return page.evaluate(() => (document.activeElement ? document.activeElement.id : null));
        }
      );

      expect(active).toBe('premier');
    });
  });

  describe('format des violations (r1-z03-039)', () => {
    it('produit exactement la structure de createCustomCheckResult', async () => {
      const result = await withPage('<input tabindex="5" id="ordre">', page => runCustomCheck(page, 167));

      expect(result).not.toBeNull();
      expect(result).toEqual(createCustomCheckResult(167, { nodes: result.nodes }));
      expect(Object.keys(result)).toEqual(Object.keys(createCustomCheckResult(167, { nodes: result.nodes })));
    });
  });
});
