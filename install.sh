#!/bin/bash

# ============================================================
# Opquast Skill - Script d'installation pour Claude Code
# ============================================================

set -euo pipefail

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Répertoires
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -z "${HOME:-}" ] || [ ! -d "$HOME" ]; then
    echo "Erreur: HOME non défini ou inexistant. Installation annulée." >&2
    exit 1
fi
SKILLS_DIR="$HOME/.claude/skills"
SKILL_NAME="opquast-skill"

# Fichiers et répertoires livrés par l'installation en mode copie (r1-z02-055).
# Exclus volontairement : .git, .gitignore, conductor/, deliberations/, docs/,
# ralph-council/ (dont ralph-council/archive/, artefacts de délibération), qui sont des artefacts de développement.
INSTALL_INCLUDE=(SKILL.md README.md install.sh rules schemas scripts references)

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Opquast Skill - Installation              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Option --dom : installe seulement les dépendances de l'analyse DOM (npm ci + Chromium), sans installer le skill
if [ "${1:-}" = "--dom" ]; then
    echo -e "${BLUE}Installation des dépendances de l'analyse DOM...${NC}"
    command -v node >/dev/null 2>&1 || { echo -e "${RED}Node.js est requis (18 minimum).${NC}"; exit 1; }
    for pkg in dom-analyzer static-analyzer; do
        echo "  npm ci dans scripts/$pkg (lockfile, sans scripts d'installation)"
        (cd "$SCRIPT_DIR/scripts/$pkg" && npm ci --ignore-scripts --no-audit --no-fund)
    done
    echo "  Chromium pour Playwright"
    (cd "$SCRIPT_DIR/scripts/dom-analyzer" && npx playwright install chromium)
    echo -e "${GREEN}✓ Analyse DOM prête. Diagnostic complet : python3 scripts/doctor.py${NC}"
    exit 0
fi

# Le skill est déjà enregistré s'il vit sous un répertoire .claude/skills :
# l'installer une seconde fois créerait deux dossiers de même nom sous deux
# répertoires de skills et rendrait la résolution indéterminée côté Claude Code.
# L'option --dom est traitée plus haut : elle n'installe aucun skill et reste
# donc utilisable depuis une source déjà enregistrée.
case "$SCRIPT_DIR" in
    */.claude/skills/*)
        echo -e "${YELLOW}Source déjà enregistrée comme skill : $SCRIPT_DIR${NC}"
        echo "Installer une copie dans $SKILLS_DIR/$SKILL_NAME créerait un second skill nommé « $SKILL_NAME »."
        if [ "${OPQUAST_INSTALL_FORCE:-0}" != "1" ]; then
            echo "Installation annulée. Forcer avec OPQUAST_INSTALL_FORCE=1 si le doublon est voulu."
            exit 1
        fi
        echo -e "${YELLOW}OPQUAST_INSTALL_FORCE=1 : poursuite malgré le doublon.${NC}"
        ;;
esac

# Vérifier que le script est lancé depuis le bon répertoire
if [ ! -f "$SCRIPT_DIR/SKILL.md" ]; then
    echo -e "${RED}Erreur: SKILL.md non trouvé.${NC}"
    echo "Lancez ce script depuis le répertoire opquast-skill."
    exit 1
fi

# Créer le répertoire skills si nécessaire
if [ ! -d "$SKILLS_DIR" ]; then
    echo -e "${YELLOW}Création du répertoire $SKILLS_DIR...${NC}"
    mkdir -p "$SKILLS_DIR"
fi

# Vérifier si le skill existe déjà
if [ -e "$SKILLS_DIR/$SKILL_NAME" ] || [ -L "$SKILLS_DIR/$SKILL_NAME" ]; then
    echo -e "${YELLOW}Le skill $SKILL_NAME existe déjà.${NC}"
    REPLY=""
    if [ -t 0 ]; then
        read -p "Voulez-vous le remplacer ? (o/N) " -n 1 -r
        echo
    else
        REPLY="${OPQUAST_INSTALL_REPLACE:-N}"
        echo "Entrée non interactive : remplacement = $REPLY (variable OPQUAST_INSTALL_REPLACE)"
    fi
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        echo "Suppression de l'ancienne installation..."
        rm -rf "$SKILLS_DIR/$SKILL_NAME"
    else
        echo "Installation annulée."
        exit 0
    fi
fi

# Choisir le mode d'installation
echo ""
echo "Mode d'installation :"
echo "  1) Lien symbolique (recommandé pour le développement)"
echo "  2) Copie complète (recommandé pour la production)"
echo ""
INSTALL_MODE=""
if [ -t 0 ]; then
    read -p "Choix [1/2] : " -n 1 -r INSTALL_MODE
    echo ""
else
    INSTALL_MODE="${OPQUAST_INSTALL_MODE:-1}"
    echo "Entrée non interactive : mode = $INSTALL_MODE (variable OPQUAST_INSTALL_MODE)"
fi

case $INSTALL_MODE in
    1)
        echo -e "${BLUE}Installation par lien symbolique...${NC}"
        ln -s "$SCRIPT_DIR" "$SKILLS_DIR/$SKILL_NAME"
        echo -e "${GREEN}✓ Lien créé: $SKILLS_DIR/$SKILL_NAME -> $SCRIPT_DIR${NC}"
        ;;
    2)
        echo -e "${BLUE}Installation par copie (artefacts de développement exclus)...${NC}"
        mkdir -p "$SKILLS_DIR/$SKILL_NAME"
        for item in "${INSTALL_INCLUDE[@]}"; do
            if [ -e "$SCRIPT_DIR/$item" ]; then
                cp -R "$SCRIPT_DIR/$item" "$SKILLS_DIR/$SKILL_NAME/"
            fi
        done
        find "$SKILLS_DIR/$SKILL_NAME" -type d \( -name __pycache__ -o -name node_modules \) -prune -exec rm -rf {} + 2>/dev/null || true
        echo -e "${GREEN}✓ Skill copié dans $SKILLS_DIR/$SKILL_NAME${NC}"
        ;;
    *)
        echo -e "${RED}Choix invalide. Installation annulée.${NC}"
        exit 1
        ;;
esac

# Vérification
echo ""
echo -e "${BLUE}Vérification de l'installation...${NC}"

if [ -f "$SKILLS_DIR/$SKILL_NAME/SKILL.md" ]; then
    echo -e "${GREEN}✓ SKILL.md trouvé${NC}"
else
    echo -e "${RED}✗ SKILL.md manquant${NC}"
    exit 1
fi

if [ -f "$SKILLS_DIR/$SKILL_NAME/rules/opquast-v5.json" ]; then
    if RULE_COUNT=$(python3 -c 'import json, sys; print(len(json.load(open(sys.argv[1], encoding="utf-8"))["rules"]))' "$SKILLS_DIR/$SKILL_NAME/rules/opquast-v5.json" 2>/dev/null); then
        echo -e "${GREEN}✓ $RULE_COUNT règles chargées${NC}"
    else
        echo -e "${RED}✗ Fichier de règles illisible (JSON invalide ou python3 absent)${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Fichier de règles manquant${NC}"
    exit 1
fi

if [ -d "$SKILLS_DIR/$SKILL_NAME/references/regles-v5" ]; then
    REF_COUNT=$(find "$SKILLS_DIR/$SKILL_NAME/references/regles-v5" -maxdepth 1 -type f -name 'regle-*.md' | wc -l | tr -d ' ')
    if [ "$REF_COUNT" -lt 1 ]; then
        echo -e "${RED}✗ Aucune fiche regle-*.md dans references/regles-v5 (copie incomplète)${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ $REF_COUNT fiches de référence${NC}"
else
    echo -e "${RED}✗ Références manquantes${NC}"
    exit 1
fi

# --- Dépendances d'exécution et contrôle de cohérence (r1-z02-056)
echo ""
echo -e "${BLUE}Vérification des dépendances...${NC}"

if command -v python3 >/dev/null 2>&1; then
    echo -e "${GREEN}✓ python3 présent${NC}"
else
    echo -e "${RED}✗ python3 absent : scripts/validate.py et scripts/sync-rules-from-api.py sont inutilisables${NC}"
    exit 1
fi

if command -v node >/dev/null 2>&1; then
    echo -e "${GREEN}✓ node présent${NC}"
else
    echo -e "${YELLOW}! node absent : l'analyse DOM (scripts/bridge.js) sera indisponible${NC}"
fi

if python3 -c 'import jsonschema' >/dev/null 2>&1; then
    echo -e "${BLUE}Contrôle de cohérence (scripts/validate.py)...${NC}"
    if python3 "$SKILLS_DIR/$SKILL_NAME/scripts/validate.py" >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Règles et profils cohérents${NC}"
    else
        echo -e "${RED}✗ scripts/validate.py signale des incohérences. Relancer sans redirection pour le détail.${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}! module jsonschema absent : contrôle de cohérence non exécuté (pip install jsonschema)${NC}"
fi

# Succès
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Installation réussie !                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo "Testez avec Claude Code :"
echo ""
echo -e "  ${BLUE}/opquast --regle 1${NC}"
echo ""
echo "Ou lancez un audit :"
echo ""
echo -e "  ${BLUE}/opquast https://example.com${NC}"
echo ""
