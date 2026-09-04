#!/usr/bin/env python3
"""
Diagnostic du skill Opquast : ce qui manque pour que tout fonctionne sur cette machine, et comment le corriger.

Usage : python3 scripts/doctor.py [--no-network]

Contrôles : Node et dépendances des deux analyseurs, Chromium de Playwright, Python et jsonschema,
serveur MCP (venv, clé API), accès à l'API Opquast (public et privé), dérive du fichier de règles.
Code de retour : 0 tout est prêt, 1 au moins un élément manquant.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
MCP = Path.home() / "Claude" / "MCP" / "opquast-mcp"
OK, KO, INFO = "ok ", "KO ", "-- "


def run(cmd, cwd=None, timeout=60) -> tuple[int, str]:
    try:
        r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout)
        return r.returncode, (r.stdout + r.stderr).strip()
    except (OSError, subprocess.TimeoutExpired) as exc:
        return 1, str(exc)


def node_version() -> tuple[int, int, int] | None:
    code, out = run(["node", "--version"])
    if code != 0:
        return None
    parts = out.lstrip("v").split(".")
    return tuple(int(p) for p in parts[:3])


def chromium_available() -> bool:
    code, out = run(["node", "-e", "const p=require('playwright');process.stdout.write(p.chromium.executablePath())"], cwd=SKILL / "scripts" / "dom-analyzer")
    return code == 0 and bool(out) and Path(out).exists()


def find_key() -> str:
    env = os.environ.get("OPQUAST_API_KEY", "").strip()
    if env:
        return "variable OPQUAST_API_KEY"
    for path in (Path.home() / "Claude" / ".claude" / "credentials.json", Path.home() / "Claude" / "workflow" / "credentials.json", Path.home() / "Claude" / "config-claude" / "credentials.json"):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        if isinstance(data, dict):
            for name in ("opquast_api_key", "OPQUAST_API_KEY", "opquast"):
                v = data.get(name)
                if isinstance(v, dict):
                    v = v.get("api_key") or v.get("key") or v.get("token")
                if isinstance(v, str) and v.strip():
                    return str(path)
    return ""


def http_status(url: str, key: str = "") -> str:
    req = urllib.request.Request(url, headers={"Authorization": key} if key else {})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return str(resp.status)
    except urllib.error.HTTPError as exc:
        return str(exc.code)
    except (urllib.error.URLError, OSError) as exc:
        return f"injoignable ({getattr(exc, 'reason', exc)})"


def main() -> int:
    network = "--no-network" not in sys.argv
    problems = 0
    lines: list[str] = []

    def report(ok: bool, label: str, fix: str = "", info: bool = False):
        nonlocal problems
        tag = INFO if info else (OK if ok else KO)
        lines.append(f"{tag}{label}")
        if not ok and not info:
            problems += 1
            if fix:
                lines.append(f"     -> {fix}")

    # Node et analyseurs JavaScript
    nv = node_version()
    report(nv is not None and nv >= (18, 0, 0), f"Node.js {'.'.join(map(str, nv)) if nv else 'absent'} (18 minimum)", "installer Node.js 18 ou plus récent")
    for pkg in ("dom-analyzer", "static-analyzer"):
        present = (SKILL / "scripts" / pkg / "node_modules" / ".bin" / "vitest").exists()
        report(present, f"dépendances scripts/{pkg}", f"bash install.sh --dom  (ou : cd scripts/{pkg} && npm ci --ignore-scripts)")
    if (SKILL / "scripts" / "dom-analyzer" / "node_modules" / "playwright").exists():
        report(chromium_available(), "Chromium pour Playwright (analyse DOM)", "bash install.sh --dom  (ou : cd scripts/dom-analyzer && npx playwright install chromium)")
    else:
        report(False, "Chromium pour Playwright (analyse DOM)", "bash install.sh --dom")

    # Python
    report(sys.version_info >= (3, 12), f"Python {sys.version.split()[0]} (3.12 minimum)", "installer Python 3.12")
    try:
        import jsonschema  # noqa: F401
        report(True, "module jsonschema (validate.py)")
    except ImportError:
        report(False, "module jsonschema (validate.py)", "python3 -m pip install jsonschema")

    # Serveur MCP
    if MCP.is_dir():
        report((MCP / ".venv" / "bin" / "python3").exists(), "serveur MCP : environnement virtuel", f"cd {MCP} && uv sync --frozen --group dev")
        where = find_key()
        report(bool(where), f"clé API Opquast ({where or 'introuvable'})", f"printf '%s' \"$CLE\" | python3 {MCP / 'find_key.py'} --set")
    else:
        report(True, "serveur MCP absent de cette machine (facultatif : ~/Claude/MCP/opquast-mcp)", info=True)
        where = find_key()
        report(bool(where), f"clé API Opquast ({where or 'introuvable'})", "écrire {\"opquast_api_key\": \"...\"} dans ~/Claude/.claude/credentials.json (mode 600)")

    # API et dérive
    if network:
        public = http_status("https://api.opquast.com/checklist/public/?version=qualite-numerique")
        report(public == "200", f"API Opquast publique (HTTP {public})", "vérifier la connexion réseau")
        if where:
            key = os.environ.get("OPQUAST_API_KEY", "").strip()
            if not key:
                try:
                    data = json.loads(Path(where).read_text(encoding="utf-8"))
                    key = data.get("opquast_api_key") or data.get("OPQUAST_API_KEY") or ""
                    if isinstance(key, dict):
                        key = key.get("api_key") or key.get("key") or key.get("token") or ""
                except (OSError, ValueError):
                    key = ""
            private = http_status("https://api.opquast.com/checklist/1/?version=qualite-numerique", key)
            report(private == "200", f"API Opquast privée avec la clé (HTTP {private})", "la clé est révoquée ou invalide : en générer une sur https://api.opquast.com/swagger/ puis find_key.py --set")
        code, out = run([sys.executable, str(SKILL / "scripts" / "sync-rules-from-api.py"), "--check"], timeout=120)
        last = out.strip().splitlines()[-1] if out.strip() else ""
        report(code == 0, f"dérive du fichier de règles : {last}", "python3 scripts/sync-rules-from-api.py --dry-run puis --write, puis python3 scripts/validate.py" if code == 1 else "API injoignable, réessayer")
    else:
        report(True, "contrôles réseau ignorés (--no-network)", info=True)

    print("Diagnostic du skill Opquast")
    print("\n".join("  " + l for l in lines))
    print(f"\n{'Tout est prêt.' if problems == 0 else f'{problems} élément(s) à corriger.'}")
    return 0 if problems == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
