#!/usr/bin/env python3
"""
Enrichit opquast-v5.json avec les données des fichiers de règles individuels.
Extrait: objectifs, solution, méthode de vérification
"""

import argparse
import datetime
import html as html_mod
import json
import re
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
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
    # Supprimer les tags HTML mais garder le contenu
    text = re.sub(r'<code>(.*?)</code>', r'`\1`', text)
    text = re.sub(r'<li>(.*?)</li>', r'- \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', '', text)

    # Décoder toutes les entités APRÈS la suppression des balises : une entité
    # décodée en « < » ou « > » ne peut alors plus être confondue avec du balisage.
    # html.unescape couvre un sur-ensemble strict des remplacements manuels d'origine
    # (&quot;, &#39;, &eacute;, &hellip;, &rsquo;, entités numériques).
    text = html_mod.unescape(text).replace('\xa0', ' ')
    text = text.replace('« ', '"').replace(' »', '"')

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

def write_json_atomic(path: Path, data) -> None:
    """Écrit le JSON dans un temporaire du même répertoire puis remplace atomiquement.

    Même motif que scripts/sync-rules-from-api.py : une interruption laisse le
    fichier d'origine intact plutôt qu'un fichier de règles tronqué. Le saut de
    ligne final aligne les deux scripts et évite un diff parasite en alternance.
    """
    tmp = path.with_name(path.name + ".tmp")
    try:
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        tmp.replace(path)
    finally:
        if tmp.exists():
            tmp.unlink()


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

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Injecte objectives, solution et verification depuis les fiches references/regles-v5."
    )
    parser.add_argument(
        "--rules",
        type=Path,
        default=JSON_FILE,
        help="fichier de règles à enrichir (défaut : rules/opquast-v5.json)",
    )
    args = parser.parse_args()

    print("Enrichissement des règles Opquast...")

    # Charger le JSON existant
    try:
        data = json.loads(args.rules.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print("Fichier de règles manquant. Vérifier l'installation du skill.")
        return 2
    except (OSError, ValueError) as exc:
        print(f"Fichier de règles illisible : {exc}")
        return 2
    if not isinstance(data, dict) or not isinstance(data.get('rules'), list):
        print("Fichier de règles : objet avec une liste rules attendu")
        return 2

    # Enrichir chaque règle
    total = len(data['rules'])
    enriched_count = 0
    skipped: list[int] = []
    for rule in data['rules']:
        rule_id = rule['id']
        enrichment = process_rule(rule_id)

        # Ne jamais écraser des données existantes par une extraction vide (section renommée, fiche absente)
        if enrichment and any(enrichment.values()):
            rule.update({k: v for k, v in enrichment.items() if v})
            enriched_count += 1
            if rule_id % 50 == 0:
                print(f"  Règle {rule_id}/{total}...")
        else:
            skipped.append(rule_id)

    # Mettre à jour les métadonnées
    data['enriched'] = True
    data['enriched_date'] = datetime.date.today().isoformat()
    data['enrichment_source'] = "fiches references/regles-v5"
    data['enrichment_fields'] = ["objectives", "solution", "verification"]

    # Sauvegarder
    try:
        write_json_atomic(args.rules, data)
    except OSError as exc:
        print(f"Écriture impossible, fichier d'origine conservé : {exc}")
        return 2

    print(f"\nTerminé: {enriched_count} règles enrichies sur {total}")
    if skipped:
        # r1-z02-043 : un lot ne se termine jamais en silence sur des règles sautées
        apercu = ", ".join(str(i) for i in skipped[:10]) + ("…" if len(skipped) > 10 else "")
        print(f"Attention: {len(skipped)} règle(s) sautée(s), fiche absente ou vide : {apercu}")
    print(f"Fichier: {args.rules}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
