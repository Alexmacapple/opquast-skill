/**
 * Audit ShipGuard 2026-09-03 (r1-z03-003, r1-z04-003, r1-z03-016) : une analyse échouée doit sortir en 2, pas en 0,
 * et --rules doit refuser les valeurs non numériques.
 */
import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'index.js');
const run = (args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf-8', timeout: 60000 });

describe('CLI exit codes', () => {
  it('exits 2 when the analysis fails (unreachable URL)', () => {
    const r = run(['http://127.0.0.1:9/', '--json']);
    expect(r.status).toBe(2);
    const out = JSON.parse(r.stdout);
    expect(out.success).toBe(false);
  });

  it('exits 1 on non-numeric --rules', () => {
    const r = run(['http://127.0.0.1:9/', '--rules', 'abc']);
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/--rules/);
  });

  it('exits 0 on --help without a browser', () => {
    expect(run(['--help']).status).toBe(0);
  });
});
