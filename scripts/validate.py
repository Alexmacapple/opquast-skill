#!/usr/bin/env python3
"""
Opquast Skill - JSON Validation Script
Validates rules and profiles JSON files against their schemas.
"""

import json
import sys
from pathlib import Path

try:
    import jsonschema
    from jsonschema import validate, ValidationError
except ImportError:
    print("Error: jsonschema package required. Install with: pip install jsonschema")
    sys.exit(1)


def load_json(filepath: Path) -> dict:
    """Load and parse JSON file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def validate_schema(data: dict, schema: dict, name: str) -> list[str]:
    """Validate data against schema, return list of errors."""
    errors = []
    try:
        validate(instance=data, schema=schema)
    except ValidationError as e:
        errors.append(f"{name}: {e.message}")
        # Get all validation errors
        validator = jsonschema.Draft202012Validator(schema)
        # l'erreur qui a déclenché l'exception est déjà rapportée : la pré-inscrire évite de la compter deux fois
        seen = {(" -> ".join(str(p) for p in e.absolute_path), e.message)}
        for error in validator.iter_errors(data):
            path = " -> ".join(str(p) for p in error.absolute_path)
            key = (path, error.message)  # dédoublonnage par emplacement ET message : deux violations distinctes restent visibles
            if key not in seen:
                seen.add(key)
                errors.append(f"  {path}: {error.message}" if path else f"  {error.message}")
    return errors


def validate_coverage_counts(rules_data: dict) -> list[str]:
    """Verify coverage counts match actual rule categories."""
    errors = []
    coverage = rules_data.get("coverage", {})
    rules = rules_data.get("rules", [])

    # Count actual categories
    actual_counts = {
        "static": 0,
        "requires_dom": 0,
        "requires_interaction": 0,
        "content_quality": 0
    }

    for rule in rules:
        if not isinstance(rule, dict):
            continue
        category = rule.get("category")
        if category in actual_counts:
            actual_counts[category] += 1

    # Compare with declared coverage
    for category, declared in coverage.items():
        actual = actual_counts.get(category, 0)
        if declared != actual:
            errors.append(
                f"Coverage mismatch for '{category}': "
                f"declared={declared}, actual={actual}"
            )

    # Check total
    total_declared = rules_data.get("total_rules", 0)
    total_actual = len(rules)
    if total_declared != total_actual:
        errors.append(
            f"Total rules mismatch: declared={total_declared}, actual={total_actual}"
        )

    return errors


def validate_rule_ids(rules_data: dict, profiles_data: dict) -> list[str]:
    """Verify all rule_id references in profiles are valid."""
    errors = []
    valid_ids = {
        rule.get("id")
        for rule in rules_data.get("rules", [])
        if isinstance(rule, dict) and rule.get("id") is not None
    }

    profiles = profiles_data.get("profiles", {})
    if not isinstance(profiles, dict):
        return [f"'profiles' must be an object, got {type(profiles).__name__}"]
    for profile_id, profile in profiles.items():
        if not isinstance(profile, dict):
            errors.append(f"Profile '{profile_id}': object expected, got {type(profile).__name__}")
            continue
        # Check regles_critiques
        for rule_id in profile.get("regles_critiques", []):
            if rule_id not in valid_ids:
                errors.append(
                    f"Profile '{profile_id}': invalid regles_critiques {rule_id}"
                )

        # Check regles_exclues
        for rule_id in profile.get("regles_exclues", []):
            if rule_id not in valid_ids:
                errors.append(
                    f"Profile '{profile_id}': invalid regles_exclues {rule_id}"
                )

    return errors


def validate_profile_meta(profiles_data: dict) -> list[str]:
    """detection_priority et fallback_profile doivent référencer des profils existants."""
    errors = []
    profiles = profiles_data.get("profiles", {})
    if not isinstance(profiles, dict):
        return [f"'profiles' must be an object, got {type(profiles).__name__}"]
    for name in profiles_data.get("detection_priority", []):
        if name not in profiles:
            errors.append(f"detection_priority references unknown profile '{name}'")
    fallback = profiles_data.get("fallback_profile")
    if fallback is not None and fallback not in profiles:
        errors.append(f"fallback_profile references unknown profile '{fallback}'")
    missing = [name for name in profiles if name not in profiles_data.get("detection_priority", [])]
    if missing:
        errors.append(f"profiles absent from detection_priority: {', '.join(missing)}")
    return errors


def validate_unique_rule_ids(rules_data: dict) -> list[str]:
    """Verify all rule IDs are unique."""
    errors = []
    seen_ids = {}

    for i, rule in enumerate(rules_data.get("rules", [])):
        if not isinstance(rule, dict):
            errors.append(f"Rule at position {i}: object expected, got {type(rule).__name__}")
            continue
        rule_id = rule.get("id")
        if rule_id in seen_ids:
            errors.append(
                f"Duplicate rule ID {rule_id} at positions {seen_ids[rule_id]} and {i}"
            )
        else:
            seen_ids[rule_id] = i

    return errors


def main():
    import argparse
    script_dir = Path(__file__).parent
    base_dir = script_dir.parent
    parser = argparse.ArgumentParser(description="Valide opquast-v5.json et site-profiles.json contre leurs schémas.")
    parser.add_argument("--rules", type=Path, default=base_dir / "rules" / "opquast-v5.json", help="fichier de règles à valider (défaut : rules/opquast-v5.json)")
    parser.add_argument("--profiles", type=Path, default=base_dir / "rules" / "site-profiles.json", help="fichier de profils à valider")
    args = parser.parse_args()

    rules_path = args.rules
    profiles_path = args.profiles
    rules_schema_path = base_dir / "schemas" / "rules-schema.json"
    profiles_schema_path = base_dir / "schemas" / "profiles-schema.json"
    report_schema_path = base_dir / "schemas" / "audit-report.json"

    all_errors = []

    print("=" * 60)
    print("Opquast Skill - JSON Validation")
    print("=" * 60)

    # Load schemas
    print("\nLoading schemas...")
    try:
        rules_schema = load_json(rules_schema_path)
        profiles_schema = load_json(profiles_schema_path)
        for name, schema in (("rules-schema.json", rules_schema), ("profiles-schema.json", profiles_schema), ("audit-report.json", load_json(report_schema_path))):
            jsonschema.Draft202012Validator.check_schema(schema)  # le schéma lui-même doit être valide (audit-report.json n'était validé par rien)
        print("  [OK] Schemas loaded and well-formed")
    except (OSError, json.JSONDecodeError, jsonschema.exceptions.SchemaError) as e:
        print(f"  [ERROR] Failed to load schemas: {e}")
        sys.exit(1)

    # Load data files
    print("\nLoading data files...")
    try:
        rules_data = load_json(rules_path)
        print(f"  [OK] {rules_path.name}: {len(rules_data.get('rules', []))} rules")
    except (OSError, json.JSONDecodeError) as e:
        print(f"  [ERROR] {rules_path.name}: {e}")
        all_errors.append(f"Failed to load {rules_path.name}")
        rules_data = None

    try:
        profiles_data = load_json(profiles_path)
        print(f"  [OK] {profiles_path.name}: {len(profiles_data.get('profiles', {}))} profiles")
    except (OSError, json.JSONDecodeError) as e:
        print(f"  [ERROR] {profiles_path.name}: {e}")
        all_errors.append(f"Failed to load {profiles_path.name}")
        profiles_data = None

    # Validate against schemas
    print("\nValidating schemas...")

    if rules_data:
        errors = validate_schema(rules_data, rules_schema, "opquast-v5.json")
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] opquast-v5.json: {len(errors)} schema errors")
        else:
            print("  [OK] opquast-v5.json schema valid")

    if profiles_data:
        errors = validate_schema(profiles_data, profiles_schema, "site-profiles.json")
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] site-profiles.json: {len(errors)} schema errors")
        else:
            print("  [OK] site-profiles.json schema valid")

    # Validate coverage counts
    print("\nValidating coverage counts...")
    if rules_data:
        errors = validate_coverage_counts(rules_data)
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] {len(errors)} coverage mismatches")
        else:
            print("  [OK] Coverage counts match")

    # Validate unique IDs
    print("\nValidating unique rule IDs...")
    if rules_data:
        errors = validate_unique_rule_ids(rules_data)
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] {len(errors)} duplicate IDs")
        else:
            print("  [OK] All rule IDs unique")

    # Validate profile metadata
    print("\nValidating profile metadata...")
    if profiles_data:
        errors = validate_profile_meta(profiles_data)
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] {len(errors)} profile metadata issue(s)")
        else:
            print("  [OK] detection_priority and fallback_profile consistent")

    # Validate rule references in profiles
    print("\nValidating rule references...")
    if rules_data and profiles_data:
        errors = validate_rule_ids(rules_data, profiles_data)
        if errors:
            all_errors.extend(errors)
            print(f"  [FAIL] {len(errors)} invalid references")
        else:
            print("  [OK] All rule references valid")

    # Summary
    print("\n" + "=" * 60)
    if all_errors:
        print(f"VALIDATION FAILED: {len(all_errors)} error(s)")
        print("=" * 60)
        for error in all_errors:
            print(f"  - {error}")
        sys.exit(1)
    else:
        print("VALIDATION PASSED")
        print("=" * 60)
        if rules_data:
            coverage = rules_data.get("coverage", {})
            total = len(rules_data.get("rules", [])) or 1
            def pct(key):
                return round(100 * coverage.get(key, 0) / total)
            print(f"\nCoverage summary ({total} rules):")
            print(f"  - Static:              {coverage.get('static', 0)} rules ({pct('static')}%)")
            print(f"  - Requires DOM:        {coverage.get('requires_dom', 0)} rules ({pct('requires_dom')}%)")
            print(f"  - Requires interaction:{coverage.get('requires_interaction', 0)} rules ({pct('requires_interaction')}%)")
            print(f"  - Content quality:     {coverage.get('content_quality', 0)} rules ({pct('content_quality')}%)")
        sys.exit(0)


if __name__ == "__main__":
    main()
