# Workflow - Opquast Skill

## Development Cycle

```
SPEC → PLAN → IMPLEMENT → TEST → COMMIT
```

## Quality Gates

### Before Commit
- [ ] SKILL.md syntaxe valide (frontmatter YAML)
- [ ] JSON valide (rules/, schemas/)
- [ ] Scripts Python exécutables
- [ ] Documentation à jour

### Before Release
- [ ] Tous les tests passent
- [ ] README.md à jour
- [ ] CHANGELOG ou docs/phase-X.md
- [ ] Version tag (vX.Y.Z)

## Commit Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, refactor, test, chore
Scopes: rules, skill, scripts, schemas, docs
```

### Examples
```
feat(rules): add RGAA 4.1 mapping
fix(skill): correct profile detection for SaaS
docs(phases): document phase 4 CI/CD integration
refactor(scripts): improve HTML cleaning in enrich-rules.py
```

## Versioning

- **Major** (X.0.0): Breaking changes, new standards
- **Minor** (0.X.0): New features, new phases
- **Patch** (0.0.X): Bug fixes, doc updates

## Testing Strategy

### Manual Testing
```bash
# Tester une règle
/opquast --regle 42

# Tester un audit
/opquast https://example.com

# Tester un profil
/opquast https://shop.example.com  # Should detect e-commerce
```

### Automated Testing (Phase 4)
- Validation JSON schema
- Script execution
- Integration tests

## Branch Strategy

- `main`: Production-ready
- `feature/<name>`: New features
- `fix/<name>`: Bug fixes
