#!/usr/bin/env python3
"""
Enrichit opquast-v5.json avec les données des fichiers de règles individuels.
Extrait: objectifs, solution, méthode de vérification
"""

import json
import re
import os
from pathlib import Path

SKILL_ROOT = Path(__file__).parent.parent
RULES_DIR = SKILL_ROOT / "references" / "regles-v5"
JSON_FILE = SKILL_ROOT / "rules" / "opquast-v5.json"

def extract_section(content: str, section_name: str) -> str:
    """Extrait le contenu d'une section markdown."""
    pattern = rf"## {re.escape(section_name)}\s*\n(.*?)(?=\n## |\n---|\Z)"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def extract_french_objectives(content: str) -> list[str]:
    """Extrait les objectifs en français."""
    objectives_section = extract_section(content, "Objectifs")
    if not objectives_section:
        return []

    # Chercher la section française
    fr_pattern = r"### Français\s*\n(.*?)(?=\n### |\Z)"
    match = re.search(fr_pattern, objectives_section, re.DOTALL)
    if match:
        text = match.group(1).strip()
    else:
        text = objectives_section

    # Extraire les items de liste
    objectives = []
    for line in text.split('\n'):
        line = line.strip()
        if line.startswith('- '):
            objectives.append(line[2:].strip())

    return objectives

def clean_html(text: str) -> str:
    """Nettoie le HTML pour garder le texte brut."""
    # Remplacer les entités HTML
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    text = text.replace('&amp;', '&')
    text = text.replace('«\xa0', '"').replace('\xa0»', '"')
    text = text.replace('« ', '"').replace(' »', '"')

    # Supprimer les tags HTML mais garder le contenu
    text = re.sub(r'<code>(.*?)</code>', r'`\1`', text)
    text = re.sub(r'<li>(.*?)</li>', r'- \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', '', text)

    # Nettoyer les espaces multiples
    text = re.sub(r'\n\s*\n', '\n', text)
    text = re.sub(r' +', ' ', text)

    return text.strip()

def extract_solution(content: str) -> str:
    """Extrait la solution recommandée."""
    solution = extract_section(content, "Solution recommandée")
    return clean_html(solution)

def extract_verification(content: str) -> str:
    """Extrait la méthode de vérification."""
    verification = extract_section(content, "Méthode de vérification")
    return clean_html(verification)

def process_rule(rule_id: int) -> dict:
    """Traite un fichier de règle et retourne les données enrichies."""
    filename = f"regle-{rule_id:03d}.md"
    filepath = RULES_DIR / filename

    if not filepath.exists():
        print(f"  Fichier non trouvé: {filename}")
        return {}

    content = filepath.read_text(encoding='utf-8')

    return {
        "objectives": extract_french_objectives(content),
        "solution": extract_solution(content),
        "verification": extract_verification(content)
    }

def main():
    print("Enrichissement des règles Opquast...")

    # Charger le JSON existant
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Enrichir chaque règle
    enriched_count = 0
    for rule in data['rules']:
        rule_id = rule['id']
        enrichment = process_rule(rule_id)

        if enrichment:
            rule.update(enrichment)
            enriched_count += 1
            if rule_id % 50 == 0:
                print(f"  Règle {rule_id}/245...")

    # Mettre à jour les métadonnées
    data['enriched'] = True
    data['enriched_date'] = "2026-01-15"
    data['enrichment_fields'] = ["objectives", "solution", "verification"]

    # Sauvegarder
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nTerminé: {enriched_count} règles enrichies")
    print(f"Fichier: {JSON_FILE}")

if __name__ == "__main__":
    main()
