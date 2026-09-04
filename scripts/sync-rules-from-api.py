#!/usr/bin/env python3
"""
Synchronise rules/opquast-v5.json avec l'API Opquast.

Champs synchronisés depuis l'API : title, tags, rubrique, phases, opquast_id.
Avec --full (clé API requise, checklist étendue) : objectives, solution et
verification sont aussi rafraîchis ; le fichier trace alors
enrichment_source = "api". Sans --full, ces trois champs restent ceux des
fiches references/regles-v5 (enrich-rules.py), source de référence.

Usage :
  python3 scripts/sync-rules-from-api.py --check           # dérive ? (0 aligné, 1 dérive ou anomalie, 2 API/usage)
  python3 scripts/sync-rules-from-api.py --dry-run         # affiche les changements
  python3 scripts/sync-rules-from-api.py --write           # applique
  python3 scripts/sync-rules-from-api.py --write --snapshot fichier.json   # depuis un instantané API
  python3 scripts/sync-rules-from-api.py --check --rules copie.json        # sur un autre fichier

Codes de retour : 0 aligné, écrit, ou --dry-run mené à son terme ; 1 dérive ou
anomalie (écriture refusée) ; 2 API injoignable, fichier local illisible, clé
absente pour --full, ou erreur d'usage.

--dry-run est un mode d'affichage : il retourne 0 même en présence d'anomalies,
et signale alors que --write refusera d'écrire. Utiliser --check pour un
contrôle automatisé. Le refus d'écriture sur anomalie est délibéré et sans
échappatoire : le fichier de règles est la source de vérité unique du skill hors
ligne. Pour expérimenter malgré une anomalie, viser une copie avec --rules.

Clé API (facultative, endpoint étendu) : variable OPQUAST_API_KEY, sinon
credentials.json dans ~/Claude/.claude, ~/Claude/workflow, ~/Claude/config-claude
(champ opquast_api_key, OPQUAST_API_KEY ou opquast, éventuellement imbriqué sous
api_key, key ou token) : même ordre et mêmes règles que MCP/opquast-mcp/find_key.py.
Sans clé, l'endpoint public suffit pour title, tags, rubrique et phases.
"""

from __future__ import annotations

import argparse
import datetime as dt
import html as html_mod
import json
import os
import re
import signal
import sys
import urllib.error
import urllib.request
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent
RULES_FILE = SKILL_ROOT / "rules" / "opquast-v5.json"
SCHEMA_FILE = SKILL_ROOT / "schemas" / "rules-schema.json"
API_BASE = os.environ.get("OPQUAST_API_BASE", "https://api.opquast.com").rstrip("/")
VERSION = "qualite-numerique"
FIELD_NAMES = ("opquast_api_key", "OPQUAST_API_KEY", "opquast")
NESTED_NAMES = ("api_key", "key", "token")
BASE_FIELDS = ("title", "tags", "rubrique", "phases", "opquast_id")
BODY_FIELDS = ("objectives", "solution", "verification")
ORDER_INSENSITIVE_FIELDS = ("tags", "phases")  # listes non ordonnées côté API
EXIT_OK, EXIT_DRIFT, EXIT_INFRA = 0, 1, 2


class ApiError(RuntimeError):
    """Échec d'accès à l'API (réseau, HTTP, clé) : code de retour 2."""


# --- Clé API (parité avec MCP/opquast-mcp/find_key.py) ---


def credential_files() -> list[Path]:
    home = Path(os.environ.get("HOME", str(Path.home())))
    return [
        home / "Claude" / ".claude" / "credentials.json",
        home / "Claude" / "workflow" / "credentials.json",
        home / "Claude" / "config-claude" / "credentials.json",
    ]


def _clean(value) -> str:
    return value.strip() if isinstance(value, str) else ""


def key_from_mapping(data) -> str:
    if not isinstance(data, dict):
        return ""
    for name in FIELD_NAMES:
        value = data.get(name)
        if _clean(value):
            return _clean(value)
        if isinstance(value, dict):
            for nested in NESTED_NAMES:
                if _clean(value.get(nested)):
                    return _clean(value.get(nested))
    return ""


def find_api_key(files: list[Path] | None = None) -> str:
    env = _clean(os.environ.get("OPQUAST_API_KEY"))
    if env:
        return env
    for path in files or credential_files():
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        key = key_from_mapping(data)
        if key:
            return key
    return ""


# --- API ---


def _timeout() -> float:
    try:
        value = float(os.environ.get("OPQUAST_TIMEOUT", "30"))
        return value if value > 0 else 30.0
    except ValueError:
        return 30.0


def fetch(endpoint: str, key: str) -> list:
    url = f"{API_BASE}{endpoint}?version={VERSION}"
    if key and not API_BASE.startswith("https://"):
        # Ne jamais envoyer la clé en clair vers une base non HTTPS (OPQUAST_API_BASE détourné ou de test)
        print(f"Avertissement : {API_BASE} n'est pas en HTTPS, la clé API n'est pas envoyée")
        key = ""
    req = urllib.request.Request(url, headers={"Authorization": key} if key else {})
    try:
        with urllib.request.urlopen(req, timeout=_timeout()) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        raise ApiError(f"API {endpoint} : HTTP {exc.code}") from exc
    except (urllib.error.URLError, ValueError, OSError) as exc:
        raise ApiError(f"API {endpoint} injoignable : {getattr(exc, 'reason', exc)}") from exc
    if not isinstance(data, list):
        raise ApiError(f"API {endpoint} : réponse inattendue ({type(data).__name__} au lieu de liste)")
    return data


def load_api_rules(snapshot: Path | None, full: bool) -> tuple[list[dict], str]:
    if snapshot:
        try:
            data = json.loads(snapshot.read_text(encoding="utf-8"))
        except (OSError, ValueError) as exc:
            raise ApiError(f"instantané illisible : {exc}") from exc
        if isinstance(data, dict) and "rules" in data:
            data = data["rules"]
        if not isinstance(data, list):
            raise ApiError("instantané : liste de règles attendue")
        return data, f"instantané {snapshot.name}"
    key = find_api_key()
    if full and not key:
        raise ApiError("--full exige une clé API (OPQUAST_API_KEY ou credentials.json)")
    endpoint = "/checklist/extended/" if full else "/checklist/public/"
    return fetch(endpoint, key), f"{API_BASE}{endpoint}"


# --- Transformation ---


def fr(rule: dict, field: str):
    value = rule.get(field, {})
    if isinstance(value, dict):
        return value.get("fr", "")
    return value


def fr_list(rule: dict, field: str) -> list[str]:
    value = fr(rule, field)
    if isinstance(value, str):
        return [value.strip()] if value.strip() else []
    return [str(v).strip() for v in value if str(v).strip()] if isinstance(value, list) else []


def html_to_text(html: str) -> str:
    """Conversion HTML → texte déterministe (bibliothèque standard uniquement, même résultat sur tout interpréteur)."""
    if not html:
        return ""
    text = html.replace("\r\n", "\n")
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"<li[^>]*>", "- ", text, flags=re.I)
    text = re.sub(r"</(p|li|ul|ol|div|h[1-6]|tr)>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html_mod.unescape(text).replace("\xa0", " ")
    lines = [re.sub(r"[ \t]+", " ", line).strip() for line in text.split("\n")]
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def allowed_values(schema: dict) -> tuple[set[str], set[str], set[str]]:
    rule = schema["$defs"]["rule"]["properties"]
    rubriques = set(rule["rubrique"]["enum"])
    tags = set(rule["tags"]["items"]["enum"])
    phases = set(rule.get("phases", {}).get("items", {}).get("enum", []))
    return rubriques, tags, phases


def compute_updates(local: dict, api_rules: list[dict], full: bool, schema: dict) -> tuple[list[dict], list[str]]:
    rubriques_ok, tags_ok, phases_ok = allowed_values(schema)
    errors: list[str] = []
    if not phases_ok:
        print("Avertissement : le schéma ne déclare pas d'énumération pour phases, valeurs non contrôlées.")
    by_number: dict = {}
    for r in api_rules:
        n = r.get("number")
        if n in by_number:
            errors.append(f"règle {n} : doublon côté API (deux entrées portent ce numéro)")
        by_number.setdefault(n, r)
    local_numbers = {rule["id"] for rule in local["rules"]}
    for n in sorted(k for k in by_number if isinstance(k, int) and k not in local_numbers):
        errors.append(f"règle {n} : présente côté API mais absente en local")
    changes: list[dict] = []
    for rule in local["rules"]:
        api = by_number.get(rule["id"])
        if not api:
            errors.append(f"règle {rule['id']} absente de l'API")
            continue
        meta = api.get("metadata") or {}
        themes = meta.get("Thématiques") or []
        title = (fr(api, "description") or "").strip()
        new = {
            "title": title,
            "tags": list(meta.get("Tags") or []),
            "rubrique": themes[0] if themes else rule.get("rubrique"),
            "phases": list(meta.get("Phases projet") or []),
            "opquast_id": api.get("id"),
        }
        if not title:
            errors.append(f"règle {rule['id']} : titre vide côté API")
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
            new["objectives"] = fr_list(api, "goal")
            if fr(api, "solution"):
                new["solution"] = html_to_text(fr(api, "solution"))
            if fr(api, "control"):
                new["verification"] = html_to_text(fr(api, "control"))
        for field, value in new.items():
            current = rule.get(field)
            # tags et phases : l'API ne garantit aucun ordre, une permutation n'est pas une dérive
            if field in ORDER_INSENSITIVE_FIELDS and isinstance(current, list) and isinstance(value, list):
                if sorted(current, key=str) == sorted(value, key=str):
                    continue
            if current != value:
                changes.append({"id": rule["id"], "field": field, "old": current, "new": value})
    return changes, errors


def apply(local: dict, changes: list[dict], source: str, full: bool) -> None:
    by_id = {r["id"]: r for r in local["rules"]}
    for change in changes:
        by_id[change["id"]][change["field"]] = change["new"]
    today = dt.date.today().isoformat()
    local["synced_from_api"] = today
    local["api_version"] = VERSION
    local["api_source"] = source
    local["synced_fields"] = list(BASE_FIELDS) + (list(BODY_FIELDS) if full else [])
    if full:
        local["enrichment_source"] = "api"
        local["enriched_date"] = today
        local["enrichment_fields"] = list(BODY_FIELDS)


def write_json_atomic(path: Path, data) -> None:
    """Écrit le JSON dans un temporaire du même répertoire puis remplace atomiquement.

    Une interruption (Ctrl-C, disque plein, SIGTERM) laisse alors le fichier
    d'origine intact au lieu d'un fichier de règles tronqué.
    """
    tmp = path.with_name(path.name + ".tmp")
    try:
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        tmp.replace(path)
    finally:
        if tmp.exists():
            tmp.unlink()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true", help="signale la dérive : 0 aligné, 1 dérive ou anomalie, 2 API")
    mode.add_argument("--dry-run", action="store_true", help="affiche les changements sans écrire")
    mode.add_argument("--write", action="store_true", help="applique les changements")
    parser.add_argument("--snapshot", type=Path, help="fichier JSON d'une réponse API (public ou extended)")
    parser.add_argument("--full", action="store_true", help="synchronise aussi objectives, solution, verification (extended)")
    parser.add_argument("--rules", type=Path, default=RULES_FILE, help="fichier de règles à mettre à jour")
    args = parser.parse_args()

    try:
        local = json.loads(args.rules.read_text(encoding="utf-8"))
        schema = json.loads(SCHEMA_FILE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        print("Fichier de règles manquant. Vérifier l'installation du skill.")  # message promis par SKILL.md
        return EXIT_INFRA
    except (OSError, ValueError) as exc:
        print(f"Fichier local ou schéma illisible : {exc}")
        return EXIT_INFRA
    if not isinstance(local, dict) or not isinstance(local.get("rules"), list):
        print("Fichier local : objet avec une liste rules attendu")
        return EXIT_INFRA
    # r1-z02-036 : aucune règle n'est indexée avant que son identifiant entier soit vérifié
    for position, rule in enumerate(local["rules"]):
        if not isinstance(rule, dict) or not isinstance(rule.get("id"), int):
            print(f"Fichier local : la règle en position {position} n'a pas d'identifiant entier")
            return EXIT_INFRA
    try:
        api_rules, source = load_api_rules(args.snapshot, args.full)
    except ApiError as exc:
        print(str(exc))
        return EXIT_INFRA
    if args.full and args.snapshot and not any("solution" in r for r in api_rules):
        print("--full exige un instantané de la checklist étendue")
        return EXIT_INFRA
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
            print("Dérive détectée : relancer avec --write." if not errors else "Anomalies : corriger la source avant --write.")
            return EXIT_DRIFT
        print("Aucune dérive : le fichier local est aligné sur l'API.")
        return EXIT_OK

    if args.dry_run:
        if errors:
            print("Anomalies présentes : --write refusera d'écrire tant qu'elles subsistent.")
        for change in changes:
            print(f"  #{change['id']} {change['field']}: {json.dumps(change['old'], ensure_ascii=False)[:80]} -> {json.dumps(change['new'], ensure_ascii=False)[:80]}")
        return EXIT_OK

    if errors:
        print("Écriture refusée tant que des anomalies subsistent.")
        return EXIT_DRIFT
    apply(local, changes, source, args.full)
    try:
        write_json_atomic(args.rules, local)
    except OSError as exc:
        print(f"Écriture impossible, fichier d'origine conservé : {exc}")
        return EXIT_INFRA
    print(f"Écrit : {args.rules}")
    return EXIT_OK


if __name__ == "__main__":
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)  # sortie tronquée par head/less sans traceback
    sys.exit(main())
