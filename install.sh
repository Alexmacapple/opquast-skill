#!/bin/bash

# ============================================================
# Opquast Skill - Script d'installation pour Claude Code
# ============================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Répertoires
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$HOME/.claude/skills"
SKILL_NAME="opquast"

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Opquast Skill - Installation              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

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
if [ -e "$SKILLS_DIR/$SKILL_NAME" ]; then
    echo -e "${YELLOW}Le skill $SKILL_NAME existe déjà.${NC}"
    read -p "Voulez-vous le remplacer ? (o/N) " -n 1 -r
    echo
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
read -p "Choix [1/2] : " -n 1 -r INSTALL_MODE
echo ""

case $INSTALL_MODE in
    1)
        echo -e "${BLUE}Installation par lien symbolique...${NC}"
        ln -s "$SCRIPT_DIR" "$SKILLS_DIR/$SKILL_NAME"
        echo -e "${GREEN}✓ Lien créé: $SKILLS_DIR/$SKILL_NAME -> $SCRIPT_DIR${NC}"
        ;;
    2)
        echo -e "${BLUE}Installation par copie...${NC}"
        cp -R "$SCRIPT_DIR" "$SKILLS_DIR/$SKILL_NAME"
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
    RULE_COUNT=$(python3 -c "import json; print(len(json.load(open('$SKILLS_DIR/$SKILL_NAME/rules/opquast-v5.json'))['rules']))" 2>/dev/null || echo "?")
    echo -e "${GREEN}✓ $RULE_COUNT règles chargées${NC}"
else
    echo -e "${RED}✗ Fichier de règles manquant${NC}"
    exit 1
fi

if [ -d "$SKILLS_DIR/$SKILL_NAME/references/regles-v5" ]; then
    REF_COUNT=$(ls -1 "$SKILLS_DIR/$SKILL_NAME/references/regles-v5" | wc -l | tr -d ' ')
    echo -e "${GREEN}✓ $REF_COUNT fichiers de référence${NC}"
else
    echo -e "${RED}✗ Références manquantes${NC}"
    exit 1
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
