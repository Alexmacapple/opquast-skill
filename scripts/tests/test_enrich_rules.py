"""Tests de non-régression de scripts/enrich-rules.py.

Issus de l'audit ShipGuard du 3 septembre 2026, zone z02 : constats
r1-z02-041, 043, 044, 045, 047 et 048.
Le script n'est jamais exécuté sur rules/opquast-v5.json : tous les tests
passent par l'option --rules et une copie temporaire.
Exécution : python3 -m pytest scripts/tests -q (depuis la racine du skill).
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import subprocess
import sys
from pathlib import Path

import pytest

SKILL = Path(__file__).resolve().parents[2]
ENRICH = SKILL / "scripts" / "enrich-rules.py"
RULES = SKILL / "rules" / "opquast-v5.json"


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


@pytest.fixture
def enrich():
    return load_module(ENRICH, "enrich_rules")


@pytest.fixture
def small_copy(tmp_path):
    """Copie réduite du fichier de règles : 60 règles, dont une sans fiche."""
    data = json.loads(RULES.read_text(encoding="utf-8"))
    data["rules"] = data["rules"][:60]
    data["rules"].append({**data["rules"][0], "id": 999})
    dst = tmp_path / "rules-copie.json"
    dst.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return dst


def run_enrich(rules_path: Path):
    """Exécute enrich-rules.py sur une copie et prouve que le fichier réel n'a pas bougé.

    Garde-fou : tant que le script ignorerait --rules, il réécrirait
    rules/opquast-v5.json. L'empreinte encadre donc chaque exécution.
    """
    avant = hashlib.sha256(RULES.read_bytes()).hexdigest()
    r = subprocess.run(
        [sys.executable, str(ENRICH), "--rules", str(rules_path)],
        capture_output=True,
        text=True,
    )
    apres = hashlib.sha256(RULES.read_bytes()).hexdigest()
    assert avant == apres, "enrich-rules.py a écrit dans rules/opquast-v5.json au lieu de la copie"
    return r


# --- r1-z02-048 : les entités HTML doivent toutes être décodées
@pytest.mark.parametrize(
    "brut, attendu",
    [
        ("&quot;citation&quot;", '"citation"'),
        ("l&#39;exemple", "l'exemple"),
        ("caract&eacute;ristique", "caractéristique"),
        ("suite&hellip;", "suite…"),
        ("l&rsquo;attribut", "l’attribut"),
        ("a &amp; b", "a & b"),
        ("&lt;p&gt;", "<p>"),
    ],
)
def test_clean_html_decodes_entities(enrich, brut, attendu):
    assert enrich.clean_html(brut) == attendu


# --- r1-z02-047 : racine du skill résolue, comme dans sync-rules-from-api.py
def test_skill_root_is_resolved(enrich):
    assert enrich.SKILL_ROOT == enrich.SKILL_ROOT.resolve()


# --- r1-z02-041 : le total de progression vient des données, pas d'un littéral
def test_progress_total_comes_from_data(small_copy):
    r = run_enrich(small_copy)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "/245" not in r.stdout, r.stdout
    assert "/61" in r.stdout, r.stdout


# --- r1-z02-043 : les règles sautées sont comptées et signalées dans le bilan
def test_skipped_rules_are_reported(small_copy):
    r = run_enrich(small_copy)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "1 règle" in r.stdout and "sautée" in r.stdout, r.stdout


# --- r1-z02-045 : saut de ligne final, comme sync-rules-from-api.py
def test_written_file_ends_with_newline(small_copy):
    assert run_enrich(small_copy).returncode == 0
    assert small_copy.read_text(encoding="utf-8").endswith("}\n")


# --- r1-z02-044 : écriture atomique, le fichier existant survit à un échec
def test_atomic_write_preserves_file_on_failure(enrich, tmp_path):
    cible = tmp_path / "donnees.json"
    cible.write_text('{"intact": true}\n', encoding="utf-8")
    with pytest.raises(TypeError):
        enrich.write_json_atomic(cible, {"impossible": {1, 2}})
    assert json.loads(cible.read_text(encoding="utf-8")) == {"intact": True}
    assert list(tmp_path.iterdir()) == [cible], "aucun fichier temporaire ne doit subsister"


def test_atomic_write_replaces_content(enrich, tmp_path):
    cible = tmp_path / "donnees.json"
    cible.write_text('{"ancien": true}\n', encoding="utf-8")
    enrich.write_json_atomic(cible, {"nouveau": True})
    assert json.loads(cible.read_text(encoding="utf-8")) == {"nouveau": True}
    assert cible.read_text(encoding="utf-8").endswith("\n")
