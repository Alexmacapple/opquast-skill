"""Tests de non-régression de scripts/sync-rules-from-api.py et scripts/validate.py.
Issus de l'audit ShipGuard du 3 septembre 2026 (logic-a01-*, logic-p02-*, r1-z02-*).
Exécution : python3 -m pytest scripts/tests -q (depuis la racine du skill)."""
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path

import pytest

SKILL = Path(__file__).resolve().parents[2]
SYNC = SKILL / "scripts" / "sync-rules-from-api.py"
VALIDATE = SKILL / "scripts" / "validate.py"
RULES = SKILL / "rules" / "opquast-v5.json"
FIND_KEY = Path.home() / "Claude" / "MCP" / "opquast-mcp" / "find_key.py"


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


@pytest.fixture
def sync():
    return load_module(SYNC, "sync_rules")


@pytest.fixture
def rules_copy(tmp_path):
    dst = tmp_path / "rules.json"
    dst.write_text(RULES.read_text(encoding="utf-8"), encoding="utf-8")
    return dst


def snapshot_from_rules(rules_path: Path) -> list[dict]:
    """Instantané API minimal reconstruit depuis le fichier local (aligné par construction)."""
    data = json.loads(rules_path.read_text(encoding="utf-8"))
    return [{"id": r.get("opquast_id", 50000 + r["id"]), "number": r["id"], "description": {"fr": r["title"]}, "goal": {"fr": r.get("objectives", [])},
             "metadata": {"Tags": r.get("tags", []), "Thématiques": [r["rubrique"]], "Phases projet": r.get("phases", [])}} for r in data["rules"]]


def run_sync(args, env=None):
    e = {**os.environ, "HOME": "/nonexistent-home"}
    for k in ("OPQUAST_API_KEY",):
        e.pop(k, None)
    if env:
        e.update(env)
    return subprocess.run([sys.executable, str(SYNC), *args], capture_output=True, text=True, env=e)


# --- logic-a01-001 : description vide -> anomalie, écriture refusée
def test_empty_title_is_an_anomaly(rules_copy, tmp_path):
    snap = snapshot_from_rules(rules_copy)
    snap[0]["description"]["fr"] = ""
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snap), encoding="utf-8")
    r = run_sync(["--write", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 1 and "titre vide" in r.stdout
    assert json.loads(rules_copy.read_text())["rules"][0]["title"] != ""


# --- logic-a01-002 : règle API absente en local -> anomalie
def test_api_rule_missing_locally_is_reported(rules_copy, tmp_path):
    snap = snapshot_from_rules(rules_copy)
    snap.append({**snap[0], "number": 999, "description": {"fr": "Règle fantôme."}})
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snap), encoding="utf-8")
    r = run_sync(["--check", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 1 and "999" in r.stdout and "absente en local" in r.stdout


# --- logic-a01-003 : doublon de numéro côté API -> anomalie
def test_duplicate_api_number_is_reported(rules_copy, tmp_path):
    snap = snapshot_from_rules(rules_copy)
    snap.append({**snap[0], "description": {"fr": "DOUBLON CONTRADICTOIRE."}})
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snap), encoding="utf-8")
    r = run_sync(["--write", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 1 and "doublon" in r.stdout.lower()


# --- idempotence et alignement sur instantané cohérent
def test_check_passes_on_aligned_snapshot(rules_copy, tmp_path):
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snapshot_from_rules(rules_copy)), encoding="utf-8")
    r = run_sync(["--check", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 0, r.stdout + r.stderr


# --- logic-a01-006 : API injoignable -> code 2, distinct de la dérive
def test_unreachable_api_exits_2(rules_copy):
    r = run_sync(["--check", "--rules", str(rules_copy)], env={"OPQUAST_API_BASE": "http://127.0.0.1:9", "OPQUAST_TIMEOUT": "2"})
    assert r.returncode == 2


# --- logic-a01-004 : --full trace la provenance des corps de règles
def test_full_records_enrichment_source(rules_copy, tmp_path, sync):
    snap = snapshot_from_rules(rules_copy)
    for s in snap:
        s["solution"] = {"fr": "<p>Solution API</p>"}; s["control"] = {"fr": "<p>Contrôle API</p>"}
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snap), encoding="utf-8")
    r = run_sync(["--write", "--full", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 0, r.stdout + r.stderr
    data = json.loads(rules_copy.read_text())
    assert set(data["synced_fields"]) >= {"title", "tags", "rubrique", "phases", "opquast_id", "objectives", "solution", "verification"}
    assert data["enrichment_source"] == "api" and data["enriched_date"] == data["synced_from_api"]


# --- logic-a01-005 : conversion HTML déterministe, gère <br>
def test_html_to_text_is_deterministic_and_handles_br(sync):
    html = "<p>Ligne A<br>Ligne B</p><ul>\r\n<li>item&nbsp;1</li>\r\n<li>item 2</li></ul>"
    out = sync.html_to_text(html)
    assert "Ligne A\nLigne B" in out and "- item 1" in out and "- item 2" in out
    assert sync.html_to_text(html) == out


# --- logic-a01-008 : goal.fr sous forme de chaîne -> liste
def test_goal_string_is_normalised(rules_copy, tmp_path, sync):
    snap = snapshot_from_rules(rules_copy)
    for s_ in snap:
        s_["solution"] = {"fr": "<p>s</p>"}; s_["control"] = {"fr": "<p>c</p>"}
    snap[0]["goal"] = {"fr": "Objectif unique en chaîne."}
    sp = tmp_path / "snap.json"; sp.write_text(json.dumps(snap), encoding="utf-8")
    r = run_sync(["--write", "--full", "--snapshot", str(sp), "--rules", str(rules_copy)])
    assert r.returncode == 0
    assert json.loads(rules_copy.read_text())["rules"][0]["objectives"] == ["Objectif unique en chaîne."]


# --- logic-p02-001 : parité de la recherche de clé avec MCP/opquast-mcp/find_key.py
@pytest.mark.skipif(not FIND_KEY.is_file(), reason="find_key.py du MCP absent sur cette machine")
def test_key_lookup_parity_with_mcp(sync, tmp_path):
    fk = load_module(FIND_KEY, "find_key")
    cases = [{"opquast_api_key": "a.b"}, {"opquast": {"api_key": 5, "key": "k.k"}}, {"opquast": {"token": "t.t"}}, {"opquast_api_key": "   "}, {"OPQUAST_API_KEY": " e.e "}, [], {"autre": "x"}]
    for i, content in enumerate(cases):
        p = tmp_path / f"c{i}.json"; p.write_text(json.dumps(content), encoding="utf-8")
        assert sync.key_from_mapping(content) == fk.key_from_mapping(content), content
        assert sync.find_api_key([p]) == fk.find_api_key([p]), content


# --- logic-a01-007 : validate.py accepte un chemin de fichier
def test_validate_accepts_rules_path(rules_copy):
    data = json.loads(rules_copy.read_text()); data["rules"][0]["title"] = ""
    rules_copy.write_text(json.dumps(data), encoding="utf-8")
    r = subprocess.run([sys.executable, str(VALIDATE), "--rules", str(rules_copy)], capture_output=True, text=True)
    assert r.returncode == 1 and "FAILED" in r.stdout


# --- r1-z02 : pourcentages calculés, pas codés en dur
def test_validate_percentages_are_computed():
    r = subprocess.run([sys.executable, str(VALIDATE)], capture_output=True, text=True)
    assert r.returncode == 0, r.stdout
    assert "160 rules (65%)" in r.stdout and "33 rules (13%)" in r.stdout and "44 rules (18%)" in r.stdout


# --- r1-z02-022 : cohérence de detection_priority et fallback_profile
def test_validate_checks_profile_metadata(tmp_path):
    profiles = json.loads((SKILL / "rules" / "site-profiles.json").read_text(encoding="utf-8"))
    profiles["detection_priority"].append("inexistant")
    profiles["fallback_profile"] = "fantome"
    p = tmp_path / "profiles.json"; p.write_text(json.dumps(profiles), encoding="utf-8")
    r = subprocess.run([sys.executable, str(VALIDATE), "--profiles", str(p)], capture_output=True, text=True)
    assert r.returncode == 1 and "inexistant" in r.stdout and "fantome" in r.stdout
