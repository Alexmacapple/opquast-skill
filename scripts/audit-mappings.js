#!/usr/bin/env node

/**
 * Audit script to verify axe-core → Opquast ID mappings and custom checks
 * Strict coherence between opquast-mapper.js and opquast-v5.json (titles and severities must be equal).
 * Audit ShipGuard 2026-09-03 (r1-z04-004) : la comparaison par mot commun laissait passer des titres faux.
 *
 * Garde jumelle : dom-analyzer/tests/mapping-coherence.test.js applique le MÊME critère (égalité
 * stricte des titres et des sévérités) dans la suite vitest. Les deux doivent rester alignés :
 * ce script sert d'audit manuel et lisible, le test sert de garde-fou automatique (r1-z04-053).
 *
 * Usage : npm run audit:mappings (depuis scripts/) ou node scripts/audit-mappings.js
 */

import { checkMappingCoherence } from './dom-analyzer/utils/mapping-coherence.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rulesPath = join(__dirname, '..', 'rules', 'opquast-v5.json');
const rulesJson = JSON.parse(readFileSync(rulesPath, 'utf-8'));
const rulesById = Object.fromEntries(rulesJson.rules.map(r => [r.id, r]));

console.log('=== AUDIT DES MAPPINGS AXE-CORE ET CHECKS CUSTOM → OPQUAST ===\n');

const { checked, issues } = checkMappingCoherence(rulesById);

console.log(`Entrées contrôlées: ${checked}`);
console.log(`Vérifiées OK: ${checked - new Set(issues.map(i => i.label)).size}`);
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
