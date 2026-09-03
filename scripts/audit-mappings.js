#!/usr/bin/env node

/**
 * Audit script to verify axe-core → Opquast ID mappings and custom checks
 * Strict coherence between opquast-mapper.js and opquast-v5.json (titles and severities must be equal).
 * Audit ShipGuard 2026-09-03 (r1-z04-004) : la comparaison par mot commun laissait passer des titres faux.
 * Usage : npm run audit:mappings (depuis scripts/) ou node scripts/audit-mappings.js
 */

import { AXE_TO_OPQUAST, CUSTOM_CHECKS } from './dom-analyzer/utils/opquast-mapper.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rulesPath = join(__dirname, '..', 'rules', 'opquast-v5.json');
const rulesJson = JSON.parse(readFileSync(rulesPath, 'utf-8'));
const rulesById = Object.fromEntries(rulesJson.rules.map(r => [r.id, r]));

console.log('=== AUDIT DES MAPPINGS AXE-CORE ET CHECKS CUSTOM → OPQUAST ===\n');

const issues = [];
let verified = 0;

function checkEntry(label, opquastId, entry) {
  const rule = rulesById[opquastId];
  if (!rule) {
    issues.push({ label, opquastId, issue: 'ID_NOT_FOUND' });
    console.log(`❌ ${label} → ${opquastId}: ID NON TROUVÉ`);
    return;
  }
  const problems = [];
  if (entry.title !== rule.title) problems.push({ issue: 'TITLE_MISMATCH', mapper: entry.title, json: rule.title });
  if (entry.severity !== rule.severity) problems.push({ issue: 'SEVERITY_MISMATCH', mapper: entry.severity, json: rule.severity });
  if (problems.length === 0) {
    verified++;
    console.log(`✓  ${label} → ${opquastId}: OK`);
    return;
  }
  problems.forEach(p => {
    issues.push({ label, opquastId, ...p });
    console.log(`⚠️  ${label} → ${opquastId}: ${p.issue}`);
    console.log(`   Mapper: ${p.mapper}`);
    console.log(`   JSON:   ${p.json}`);
  });
}

Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => checkEntry(axeRule, mapping.opquastId, mapping));
Object.entries(CUSTOM_CHECKS).forEach(([id, check]) => checkEntry(`custom ${id}`, Number(id), check));

const total = Object.keys(AXE_TO_OPQUAST).length + Object.keys(CUSTOM_CHECKS).length;
console.log(`\n=== RÉSUMÉ ===`);
console.log(`Total entrées: ${total}`);
console.log(`Vérifiées OK: ${verified}`);
console.log(`Issues: ${issues.length}`);

if (issues.length > 0) {
  console.log(`\n=== ISSUES À CORRIGER ===`);
  issues.forEach(i => {
    console.log(`\n${i.label} → ${i.opquastId}: ${i.issue}`);
    if (i.mapper !== undefined) console.log(`  Mapper: "${i.mapper}"`);
    if (i.json !== undefined) console.log(`  JSON: "${i.json}"`);
  });
  process.exit(1);
} else {
  console.log(`\n✅ Tous les mappings sont cohérents avec le référentiel.`);
  process.exit(0);
}
