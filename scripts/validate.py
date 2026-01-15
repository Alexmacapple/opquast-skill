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
        seen_messages = set()
        for error in validator.iter_errors(data):
            if error.message not in seen_messages:
                seen_messages.add(error.message)
                path = " -> ".join(str(p) for p in error.absolute_path)
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
    valid_ids = {rule["id"] for rule in rules_data.get("rules", [])}

    profiles = profiles_data.get("profiles", {})
    for profile_id, profile in profiles.items():
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


def validate_unique_rule_ids(rules_data: dict) -> list[str]:
    """Verify all rule IDs are unique."""
    errors = []
    seen_ids = {}

    for i, rule in enumerate(rules_data.get("rules", [])):
        rule_id = rule.get("id")
        if rule_id in seen_ids:
            errors.append(
                f"Duplicate rule ID {rule_id} at positions {seen_ids[rule_id]} and {i}"
            )
        else:
            seen_ids[rule_id] = i

    return errors


def main():
    # Determine paths
    script_dir = Path(__file__).parent
    base_dir = script_dir.parent

    rules_path = base_dir / "rules" / "opquast-v5.json"
    profiles_path = base_dir / "rules" / "site-profiles.json"
    rules_schema_path = base_dir / "schemas" / "rules-schema.json"
    profiles_schema_path = base_dir / "schemas" / "profiles-schema.json"

    all_errors = []

    print("=" * 60)
    print("Opquast Skill - JSON Validation")
    print("=" * 60)

    # Load schemas
    print("\nLoading schemas...")
    try:
        rules_schema = load_json(rules_schema_path)
        profiles_schema = load_json(profiles_schema_path)
        print("  [OK] Schemas loaded")
    except Exception as e:
        print(f"  [ERROR] Failed to load schemas: {e}")
        sys.exit(1)

    # Load data files
    print("\nLoading data files...")
    try:
        rules_data = load_json(rules_path)
        print(f"  [OK] {rules_path.name}: {len(rules_data.get('rules', []))} rules")
    except Exception as e:
        print(f"  [ERROR] {rules_path.name}: {e}")
        all_errors.append(f"Failed to load {rules_path.name}")
        rules_data = None

    try:
        profiles_data = load_json(profiles_path)
        print(f"  [OK] {profiles_path.name}: {len(profiles_data.get('profiles', []))} profiles")
    except Exception as e:
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
            print(f"\nCoverage summary:")
            print(f"  - Static:              {coverage.get('static', 0)} rules (61%)")
            print(f"  - Requires DOM:        {coverage.get('requires_dom', 0)} rules (20%)")
            print(f"  - Requires interaction:{coverage.get('requires_interaction', 0)} rules (13%)")
            print(f"  - Content quality:     {coverage.get('content_quality', 0)} rules (6%)")
        sys.exit(0)


if __name__ == "__main__":
    main()
