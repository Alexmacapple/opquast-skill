/**
 * Audit ShipGuard 2026-09-03 (r1-z04-005) : les filtres --theme / --rubrique doivent s'appliquer aux violations.
 * bridge.js est importable sans effet de bord depuis r1-z04-001.
 *
 * Audit ShipGuard 2026-09-04 (r1-z04-021) : runUnifiedAnalysis, formatResults et l'analyse des
 * arguments CLI n'étaient couverts par aucun test. La caractérisation ci-dessous tourne
 * entièrement hors réseau (serveur HTTP local sur 127.0.0.1).
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { createServer } from 'http';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { filterViolationsByRules, runUnifiedAnalysis, formatResults, parseCliOptions } from '../../bridge.js';
import { getValidatorInfo } from '../../static-analyzer/validators.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRIDGE = join(__dirname, '..', '..', 'bridge.js');
const rulesJson = JSON.parse(readFileSync(join(__dirname, '..', '..', '..', 'rules', 'opquast-v5.json'), 'utf-8'));

// Page servie localement : lang correct, titre explicite, meta description, pied de page daté,
// et deux manquements volontaires (image sans alt, zoom bloqué) pour produire des violations.
const PAGE = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="description" content="Page de test locale pour le pont d'analyse">
  <meta name="viewport" content="width=device-width, maximum-scale=1.0">
  <title>Page de test du pont d'analyse</title>
</head>
<body>
  <h1>Page de test</h1>
  <p>Contenu de démonstration.</p>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
  <footer>© 2026 Test</footer>
</body>
</html>`;

describe('bridge filters', () => {
  it('keeps only violations of the selected rules', () => {
    const violations = [{ opquastId: 69 }, { opquastId: 182 }, { opquastId: 3 }];
    const rules = [{ id: 69 }, { id: 3 }];
    expect(filterViolationsByRules(violations, rules).map(v => v.opquastId)).toEqual([69, 3]);
  });
});

describe('parseCliOptions (r1-z04-016, r1-z04-017)', () => {
  it('refuse un drapeau à la place de l\'URL', () => {
    const { errors } = parseCliOptions(['--json']);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toMatch(/URL invalide/);
  });

  it('refuse une URL sans schéma http(s)', () => {
    expect(parseCliOptions(['exemple.test']).errors.length).toBeGreaterThan(0);
    expect(parseCliOptions([]).errors.length).toBeGreaterThan(0);
  });

  it('refuse un drapeau consommé comme valeur de --theme ou --rubrique', () => {
    const theme = parseCliOptions(['https://exemple.test', '--theme', '--json']);
    expect(theme.options.theme).toBeNull();
    expect(theme.errors.some(e => e.includes('--theme'))).toBe(true);

    const rubrique = parseCliOptions(['https://exemple.test', '--rubrique']);
    expect(rubrique.options.rubrique).toBeNull();
    expect(rubrique.errors.some(e => e.includes('--rubrique'))).toBe(true);
  });

  it('accepte une invocation correcte', () => {
    const { url, options, errors } = parseCliOptions(['https://exemple.test', '--theme', 'accessibilite', '--dom-only']);
    expect(errors).toEqual([]);
    expect(url).toBe('https://exemple.test');
    expect(options.theme).toBe('accessibilite');
    expect(options.domOnly).toBe(true);
  });

  it('sort en 2 avec un message quand l\'URL est un drapeau (CLI)', () => {
    const r = spawnSync(process.execPath, [BRIDGE, '--json'], { encoding: 'utf-8', timeout: 60000 });
    expect(r.status).toBe(2);
    expect(r.stderr).toMatch(/URL invalide/);
  });
});

describe('formatResults (r1-z04-015, r1-z04-019, r1-z04-020)', () => {
  const capture = (results) => {
    const lines = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => { lines.push(args.join(' ')); });
    try {
      formatResults(results);
    } finally {
      spy.mockRestore();
    }
    return lines.join('\n');
  };

  const baseResults = (overrides = {}) => ({
    url: 'https://exemple.test',
    timestamp: '2026-09-04T00:00:00.000Z',
    success: true,
    analysis: { dom: null, static: null, heuristic: null },
    summary: { totalRules: 245, violations: [], coverage: {} },
    ...overrides
  });

  it('affiche 0 règle restante et non le total applicable', () => {
    const out = capture(baseResults({
      summary: {
        totalRules: 245,
        violations: [],
        coverage: { static: { applicable: 160, remaining: 0, note: '' } }
      }
    }));
    expect(out).toContain('Static Rules: 0 remaining');
    expect(out).not.toContain('160 remaining');
  });

  it('n\'annonce pas une absence limitée au DOM alors que le compteur agrège les deux lanes', () => {
    const out = capture(baseResults());
    expect(out).toMatch(/No violations found \(DOM analysis and static heuristics\)/);
    expect(out).not.toContain('No DOM violations found');
  });

  it('distingue les lanes dans le titre du bloc de violations', () => {
    const out = capture(baseResults({
      summary: {
        totalRules: 245,
        coverage: {},
        violations: [
          { opquastId: 118, title: 'Image sans alternative', severity: 'critical', lane: 'dom', nodes: [{ html: '<img>' }] },
          { opquastId: 193, title: 'Zoom bloqué', severity: 'critical', lane: 'static-heuristic', details: 'Viewport bloque le zoom utilisateur' }
        ]
      }
    }));
    expect(out).toContain('Violations (2: 1 DOM, 1 static heuristics)');
  });

  it('imprime le détail des violations heuristiques au lieu de « Elements: 0 »', () => {
    const out = capture(baseResults({
      summary: {
        totalRules: 245,
        coverage: {},
        violations: [
          { opquastId: 193, title: 'Zoom bloqué', severity: 'critical', lane: 'static-heuristic', details: 'Viewport bloque le zoom utilisateur' }
        ]
      }
    }));
    expect(out).toContain('Details: Viewport bloque le zoom utilisateur');
    expect(out).not.toContain('Elements: 0');
  });
});

describe('runUnifiedAnalysis sur un serveur local (r1-z04-013, r1-z04-014, r1-z04-021)', () => {
  let server;
  let base;

  beforeAll(async () => {
    server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(PAGE);
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}/`;
  });

  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  it('dérive totalRules et le nombre de validateurs du référentiel, pas de constantes', async () => {
    const results = await runUnifiedAnalysis(base);

    expect(results.success).toBe(true);
    expect(results.summary.totalRules).toBe(rulesJson.total_rules);
    expect(results.summary.totalRules).toBe(rulesJson.rules.length);
    expect(results.summary.coverage.heuristic.validators).toBe(getValidatorInfo().validators);
    expect(results.analysis.heuristic.validators).toBe(getValidatorInfo().validators);
  });

  it('agrège les deux lanes et détecte le zoom bloqué côté heuristique', async () => {
    const results = await runUnifiedAnalysis(base);

    const heuristiques = results.summary.violations.filter(v => v.lane === 'static-heuristic');
    expect(heuristiques.some(v => v.opquastId === 193)).toBe(true);
    expect(results.summary.violations.every(v => typeof v.source === 'string')).toBe(true);
    expect(results.summary.coverage.static.remaining).toBeLessThanOrEqual(results.summary.coverage.static.applicable);
  }, 60000);
});
