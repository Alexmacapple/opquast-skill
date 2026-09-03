/**
 * Audit ShipGuard 2026-09-03, zone z03 — contrat de la CLI index.js.
 *
 * Constats couverts :
 * - r1-z03-017 : la garde startsWith('http') acceptait des chaînes qui ne sont pas des URL http(s) ;
 * - r1-z03-019 : --rules était documenté comme une sélection de règles alors que c'est un filtre de sortie ;
 * - r1-z03-012 : --info doit exposer la version réelle du paquet ;
 * - r1-z03-044 : index.js n'était couvert par aucun test au-delà des codes de sortie.
 */

import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'index.js');
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const run = args => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf-8', timeout: 60000 });

describe('validation d\'URL de la CLI (r1-z03-017)', () => {
  for (const invalide of ['httpfoo://x', 'http-truc', 'httpsss:/x', 'ftp://exemple.fr', 'exemple.fr']) {
    it(`refuse « ${invalide} » avec le code 1`, () => {
      const r = run([invalide]);
      expect(r.status).toBe(1);
      expect(r.stderr).toMatch(/http:\/\/ ou https:\/\/|http:\/\/ or https:\/\//);
    });
  }
});

describe('aide de la CLI (r1-z03-019)', () => {
  it('décrit --rules comme un filtre de sortie, pas comme une sélection de contrôles', () => {
    const r = run(['--help']);
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/--rules/);
    expect(r.stdout.toLowerCase()).toMatch(/filter/);
    expect(r.stdout).not.toMatch(/Comma-separated list of Opquast rule IDs to check/);
  });
});

describe('--info (r1-z03-012, r1-z03-044)', () => {
  it('sort en 0 et expose la version du paquet', () => {
    const r = run(['--info']);
    expect(r.status).toBe(0);
    const info = JSON.parse(r.stdout);
    expect(info.version).toBe(pkg.version);
    expect(info.rulesCount).toBeGreaterThan(0);
    expect(Array.isArray(info.supportedRules)).toBe(true);
  });
});
