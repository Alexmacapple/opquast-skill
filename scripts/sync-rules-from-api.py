#!/usr/bin/env python3
"""
Synchronise rules/opquast-v5.json avec l'API Opquast.

Champs synchronisés depuis l'API : title, tags, rubrique, phases, opquast_id.
Les champs objectives, solution et verification (issus des fiches
references/regles-v5) ne sont pas modifiés, sauf avec --full (checklist
étendue, clé API requise).

Usage :
  python3 scripts/sync-rules-from-api.py --check           # dérive ? (code retour 1 si oui)
  python3 scripts/sync-rules-from-api.py --dry-run         # affiche les changements
  python3 scripts/sync-rules-from-api.py --write           # applique
  python3 scripts/sync-rules-from-api.py --write --snapshot fichier.json   # depuis un instantané API

Clé API (facultative, endpoint étendu) : variable OPQUAST_API_KEY, sinon
opquast_api_key dans ~/Claude/.claude/credentials.json (même ordre que
MCP/opquast-mcp/run.sh). Sans clé, l'endpoint public suffit pour title,
tags, rubrique et phases.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import signal
import sys
import urllib.error
import urllib.request
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
RULES_FILE = SKILL_ROOT / "rules" / "opquast-v5.json"
SCHEMA_FILE = SKILL_ROOT / "schemas" / "rules-schema.json"
API_BASE = os.environ.get("OPQUAST_API_BASE", "https://api.opquast.com")
VERSION = "qualite-numerique"
CREDENTIAL_FILES = [
    Path.home() / "Claude" / ".claude" / "credentials.json",
    Path.home() / "Claude" / "workflow" / "credentials.json",
    Path.home() / "Claude" / "config-claude" / "credentials.json",
]
SYNCED_FIELDS = ("title", "tags", "rubrique", "phases", "opquast_id")


def find_api_key() -> str:
    key = os.environ.get("OPQUAST_API_KEY", "").strip()
    if key:
        return key
    for path in CREDENTIAL_FILES:
        if not path.is_file():
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        for name in ("opquast_api_key", "OPQUAST_API_KEY", "opquast"):
            value = data.get(name)
            if isinstance(value, dict):
                value = value.get("api_key") or value.get("key") or value.get("token")
            if isinstance(value, str) and value.strip():
                return value.strip()
    return ""


def fetch(endpoint: str, key: str) -> list[dict]:
    url = f"{API_BASE}{endpoint}?version={VERSION}"
    req = urllib.request.Request(url, headers={"Authorization": key} if key else {})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        raise SystemExit(f"API {endpoint} : HTTP {exc.code}") from exc
    except urllib.error.URLError as exc:
        raise SystemExit(f"API {endpoint} injoignable : {exc.reason}") from exc


def load_api_rules(snapshot: Path | None, full: bool) -> tuple[list[dict], str]:
    if snapshot:
        data = json.loads(snapshot.read_text(encoding="utf-8"))
        if isinstance(data, dict) and "rules" in data:
            data = data["rules"]
        return data, f"instantané {snapshot}"
    key = find_api_key()
    if full and not key:
        raise SystemExit("--full exige une clé API (OPQUAST_API_KEY ou credentials.json)")
    endpoint = "/checklist/extended/" if (full and key) else "/checklist/public/"
    return fetch(endpoint, key), f"{API_BASE}{endpoint}"


def fr(rule: dict, field: str):
    value = rule.get(field, {})
    if isinstance(value, dict):
        return value.get("fr", "")
    return value


def html_to_text(html: str) -> str:
    try:
        from markdownify import markdownify as md  # type: ignore
        return md(html, strip=["img"]).strip()
    except ImportError:
        import html as html_mod
        import re
        text = re.sub(r"<li>", "- ", html)
        text = re.sub(r"</(p|li|ul|ol|div|br)>", "\n", text)
        text = re.sub(r"<[^>]+>", "", text)
        return re.sub(r"\n{3,}", "\n\n", html_mod.unescape(text)).strip()


def allowed_values(schema: dict) -> tuple[set[str], set[str], set[str]]:
    rule = schema["$defs"]["rule"]["properties"]
    rubriques = set(rule["rubrique"]["enum"])
    tags = set(rule["tags"]["items"]["enum"])
    phases = set(rule.get("phases", {}).get("items", {}).get("enum", []))
    return rubriques, tags, phases


def compute_updates(local: dict, api_rules: list[dict], full: bool, schema: dict) -> tuple[list[dict], list[str]]:
    rubriques_ok, tags_ok, phases_ok = allowed_values(schema)
    by_number = {r.get("number"): r for r in api_rules}
    changes: list[dict] = []
    errors: list[str] = []
    for rule in local["rules"]:
        api = by_number.get(rule["id"])
        if not api:
            errors.append(f"règle {rule['id']} absente de l'API")
            continue
        meta = api.get("metadata", {})
        themes = meta.get("Thématiques", [])
        new = {
            "title": (fr(api, "description") or "").strip(),
            "tags": list(meta.get("Tags", [])),
            "rubrique": themes[0] if themes else rule.get("rubrique"),
            "phases": list(meta.get("Phases projet", [])),
            "opquast_id": api.get("id"),
        }
        if len(themes) != 1:
            errors.append(f"règle {rule['id']} : {len(themes)} thématique(s) côté API {themes}")
        if new["rubrique"] not in rubriques_ok:
            errors.append(f"règle {rule['id']} : rubrique inconnue du schéma « {new['rubrique']} »")
        for tag in new["tags"]:
            if tag not in tags_ok:
                errors.append(f"règle {rule['id']} : tag inconnu du schéma « {tag} »")
        if phases_ok:
            for phase in new["phases"]:
                if phase not in phases_ok:
                    errors.append(f"règle {rule['id']} : phase inconnue du schéma « {phase} »")
        if full:
            new["objectives"] = [g.strip() for g in (fr(api, "goal") or []) if g.strip()]
            if fr(api, "solution"):
                new["solution"] = html_to_text(fr(api, "solution"))
            if fr(api, "control"):
                new["verification"] = html_to_text(fr(api, "control"))
        for field, value in new.items():
            if rule.get(field) != value:
                changes.append({"id": rule["id"], "field": field, "old": rule.get(field), "new": value})
    return changes, errors


def apply(local: dict, changes: list[dict], source: str) -> None:
    by_id = {r["id"]: r for r in local["rules"]}
    for change in changes:
        by_id[change["id"]][change["field"]] = change["new"]
    local["synced_from_api"] = dt.date.today().isoformat()
    local["api_version"] = VERSION
    local["api_source"] = source
    local["synced_fields"] = list(SYNCED_FIELDS)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true", help="signale la dérive, code retour 1 si écart")
    mode.add_argument("--dry-run", action="store_true", help="affiche les changements sans écrire")
    mode.add_argument("--write", action="store_true", help="applique les changements")
    parser.add_argument("--snapshot", type=Path, help="fichier JSON d'une réponse API (public ou extended)")
    parser.add_argument("--full", action="store_true", help="synchronise aussi objectives, solution, verification (extended)")
    parser.add_argument("--rules", type=Path, default=RULES_FILE, help="fichier de règles à mettre à jour")
    args = parser.parse_args()

    local = json.loads(args.rules.read_text(encoding="utf-8"))
    schema = json.loads(SCHEMA_FILE.read_text(encoding="utf-8"))
    api_rules, source = load_api_rules(args.snapshot, args.full)
    if args.full and args.snapshot and not any("solution" in r for r in api_rules):
        raise SystemExit("--full exige un instantané de la checklist étendue")
    changes, errors = compute_updates(local, api_rules, args.full, schema)

    print(f"Source : {source}")
    print(f"Règles : {len(api_rules)} côté API, {len(local['rules'])} en local")
    if errors:
        print("Anomalies :")
        for err in errors:
            print(f"  - {err}")
    by_field: dict[str, int] = {}
    for change in changes:
        by_field[change["field"]] = by_field.get(change["field"], 0) + 1
    print("Changements : " + (", ".join(f"{k} {v}" for k, v in sorted(by_field.items())) or "aucun"))

    if args.check:
        if errors or changes:
            print("Dérive détectée : relancer avec --write.")
            return 1
        print("Aucune dérive : le fichier local est aligné sur l'API.")
        return 0

    if args.dry_run:
        for change in changes:
            print(f"  #{change['id']} {change['field']}: {json.dumps(change['old'], ensure_ascii=False)[:80]} -> {json.dumps(change['new'], ensure_ascii=False)[:80]}")
        return 0

    if errors:
        print("Écriture refusée tant que des anomalies subsistent.")
        return 1
    apply(local, changes, source)
    args.rules.write_text(json.dumps(local, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Écrit : {args.rules}")
    return 0


if __name__ == "__main__":
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # sortie tronquée par head/less sans traceback
    sys.exit(main())
