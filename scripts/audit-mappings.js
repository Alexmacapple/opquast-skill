#!/usr/bin/env node

/**
 * Audit script to verify axe-core → Opquast ID mappings
 * Checks coherence between opquast-mapper.js and opquast-v5.json
 */

import { AXE_TO_OPQUAST } from './dom-analyzer/utils/opquast-mapper.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load rules JSON
const rulesPath = join(__dirname, '..', 'rules', 'opquast-v5.json');
const rulesJson = JSON.parse(readFileSync(rulesPath, 'utf-8'));
const rulesById = Object.fromEntries(rulesJson.rules.map(r => [r.id, r]));

console.log('=== AUDIT DES MAPPINGS AXE-CORE → OPQUAST ===\n');

const issues = [];
let verified = 0;

Object.entries(AXE_TO_OPQUAST).forEach(([axeRule, mapping]) => {
  const opquastRule = rulesById[mapping.opquastId];

  if (!opquastRule) {
    issues.push({
      axeRule,
      opquastId: mapping.opquastId,
      issue: 'ID_NOT_FOUND'
    });
    console.log(`❌ ${axeRule} → ${mapping.opquastId}: ID NON TROUVÉ`);
    return;
  }

  // Check title coherence (look for common significant words)
  const mapperTitle = mapping.title.toLowerCase();
  const jsonTitle = opquastRule.title.toLowerCase();

  const mapperWords = mapperTitle.split(/\s+/).filter(w => w.length > 3);
  const jsonWords = jsonTitle.split(/\s+/).filter(w => w.length > 3);
  const commonWords = mapperWords.filter(w =>
    jsonWords.some(jw => jw.includes(w) || w.includes(jw))
  );

  if (commonWords.length === 0) {
    issues.push({
      axeRule,
      opquastId: mapping.opquastId,
      issue: 'TITLE_MISMATCH',
      mapperTitle: mapping.title,
      jsonTitle: opquastRule.title
    });
    console.log(`⚠️  ${axeRule} → ${mapping.opquastId}: TITRE DIFFÉRENT`);
    console.log(`   Mapper: ${mapping.title}`);
    console.log(`   JSON:   ${opquastRule.title}`);
  } else {
    verified++;
    console.log(`✓  ${axeRule} → ${mapping.opquastId}: OK`);
  }
});

console.log(`\n=== RÉSUMÉ ===`);
console.log(`Total mappings: ${Object.keys(AXE_TO_OPQUAST).length}`);
console.log(`Vérifiés OK: ${verified}`);
console.log(`Issues: ${issues.length}`);

if (issues.length > 0) {
  console.log(`\n=== ISSUES À CORRIGER ===`);
  issues.forEach(i => {
    console.log(`\n${i.axeRule} → ${i.opquastId}:`);
    console.log(`  Issue: ${i.issue}`);
    if (i.mapperTitle) console.log(`  Mapper: "${i.mapperTitle}"`);
    if (i.jsonTitle) console.log(`  JSON: "${i.jsonTitle}"`);
  });
  process.exit(1);
} else {
  console.log(`\n✅ Tous les mappings sont cohérents!`);
  process.exit(0);
}
