"""Tests de contrat des schémas JSON du skill (schemas/*.json).

Issus de l'audit ShipGuard du 3 septembre 2026, zone z02 : constats
r1-z02-058, 059, 060, 061, 062, 063, 065 et 066.
Exécution : python3 -m pytest scripts/tests -q (depuis la racine du skill).
"""
from __future__ import annotations

import copy
import json
from pathlib import Path

import pytest

jsonschema = pytest.importorskip("jsonschema")

SKILL = Path(__file__).resolve().parents[2]
RULES_SCHEMA = json.loads((SKILL / "schemas" / "rules-schema.json").read_text(encoding="utf-8"))
PROFILES_SCHEMA = json.loads((SKILL / "schemas" / "profiles-schema.json").read_text(encoding="utf-8"))
REPORT_SCHEMA = json.loads((SKILL / "schemas" / "audit-report.json").read_text(encoding="utf-8"))
RULES = json.loads((SKILL / "rules" / "opquast-v5.json").read_text(encoding="utf-8"))
PROFILES = json.loads((SKILL / "rules" / "site-profiles.json").read_text(encoding="utf-8"))


def is_valid(instance, schema) -> bool:
    validator = jsonschema.Draft202012Validator(schema)
    return not list(validator.iter_errors(instance))


def sub_schema(schema: dict, pointer: str) -> dict:
    """Schéma autonome ciblant une définition, sans hériter des contraintes racine."""
    return {
        "$schema": schema["$schema"],
        "$id": schema["$id"],
        "$defs": schema["$defs"],
        "$ref": pointer,
    }


def a_rule() -> dict:
    """Copie profonde d'une règle réelle, donc valide par construction."""
    return copy.deepcopy(RULES["rules"][0])


# --- r1-z02-060 : $defs.rule doit refuser les propriétés inconnues (fautes de frappe)
def test_rule_rejects_unknown_property():
    rule_schema = sub_schema(RULES_SCHEMA, "#/$defs/rule")
    assert is_valid(a_rule(), rule_schema), "la règle de référence doit rester valide"
    typo = a_rule()
    typo["severty"] = "critical"
    assert not is_valid(typo, rule_schema), "une propriété inconnue doit être refusée"


# --- r1-z02-062 : severity est indispensable à la commande --severity
def test_rule_requires_severity():
    rule_schema = sub_schema(RULES_SCHEMA, "#/$defs/rule")
    sans = a_rule()
    sans.pop("severity", None)
    assert not is_valid(sans, rule_schema), "severity doit être obligatoire"


def test_every_rule_carries_a_severity():
    assert all("severity" in r for r in RULES["rules"])


# --- r1-z02-061 : les métadonnées d'enrichissement doivent être typées
@pytest.mark.parametrize(
    "field, bad_value",
    [
        ("enriched", "non"),
        ("enriched_date", 42),
        ("enrichment_fields", None),
        ("enrichment_source", 7),
    ],
)
def test_enrichment_metadata_is_typed(field, bad_value):
    data = {k: v for k, v in RULES.items() if k != "rules"}
    data["rules"] = [a_rule()]
    assert is_valid(data, RULES_SCHEMA), "le fichier de référence doit rester valide"
    data[field] = bad_value
    assert not is_valid(data, RULES_SCHEMA), f"{field} doit être typé"


# --- r1-z02-058 : profiles-schema doit détecter les clés inattendues
def test_profiles_schema_rejects_unknown_root_key():
    assert is_valid(PROFILES, PROFILES_SCHEMA), "site-profiles.json doit rester valide"
    typo = copy.deepcopy(PROFILES)
    typo["fallback_profil"] = "vitrine"
    assert not is_valid(typo, PROFILES_SCHEMA), "une clé racine inconnue doit être refusée"


def test_profiles_schema_rejects_unknown_profile_key():
    typo = copy.deepcopy(PROFILES)
    profil = next(iter(typo["profiles"]))
    typo["profiles"][profil]["regles_critique"] = [1]
    assert not is_valid(typo, PROFILES_SCHEMA), "une clé de profil inconnue doit être refusée"


def test_profiles_schema_rejects_unknown_detection_key():
    typo = copy.deepcopy(PROFILES)
    profil = next(iter(typo["profiles"]))
    typo["profiles"][profil]["detection"]["keyword"] = ["panier"]
    assert not is_valid(typo, PROFILES_SCHEMA), "une clé de détection inconnue doit être refusée"


# --- r1-z02-066 : $id absolu et $ref internes résolvables
def test_report_schema_id_is_absolute():
    for name, schema in (
        ("rules-schema.json", RULES_SCHEMA),
        ("profiles-schema.json", PROFILES_SCHEMA),
        ("audit-report.json", REPORT_SCHEMA),
    ):
        assert schema["$id"].startswith("https://"), f"{name} : $id doit être une URI absolue"
    jsonschema.Draft202012Validator.check_schema(REPORT_SCHEMA)


# --- r1-z02-059 : tout tag de règle doit avoir une destination dans impact
def test_report_impact_covers_every_rule_tag():
    tags = set(RULES_SCHEMA["$defs"]["rule"]["properties"]["tags"]["items"]["enum"])
    impact = set(
        REPORT_SCHEMA["properties"]["recommendations"]["items"]["properties"]["impact"]["items"]["enum"]
    )
    assert tags <= impact, f"tags sans destination dans impact : {sorted(tags - impact)}"


# --- r1-z02-065 : la checklist finale impose le lien vers chaque règle citée
def test_non_conformite_requires_reference_url():
    complete = {
        "rule_id": 118,
        "title": "Chaque image possède une alternative textuelle.",
        "rubrique": "Images et médias",
        "reference_url": "https://checklists.opquast.com/fr/qualite-numerique/118",
    }
    defs_schema = sub_schema(REPORT_SCHEMA, "#/$defs/non_conformite")
    assert is_valid(complete, defs_schema), "une non-conformité complète doit rester valide"
    del complete["reference_url"]
    assert not is_valid(complete, defs_schema), "reference_url doit être obligatoire"


# --- r1-z02-063 : la borne 245 est partagée par trois schémas et le fichier de règles
def test_rule_id_bounds_are_consistent_across_schemas():
    total = RULES["total_rules"]
    bornes = {
        "rules-schema.json": RULES_SCHEMA["$defs"]["rule"]["properties"]["id"]["maximum"],
        "profiles-schema.json/regles_critiques": PROFILES_SCHEMA["$defs"]["profile"]["properties"][
            "regles_critiques"
        ]["items"]["maximum"],
        "profiles-schema.json/regles_exclues": PROFILES_SCHEMA["$defs"]["profile"]["properties"][
            "regles_exclues"
        ]["items"]["maximum"],
        "audit-report.json/non_conformite": REPORT_SCHEMA["$defs"]["non_conformite"]["properties"][
            "rule_id"
        ]["maximum"],
    }
    divergentes = {k: v for k, v in bornes.items() if v != total}
    assert not divergentes, f"bornes désynchronisées de total_rules={total} : {divergentes}"
