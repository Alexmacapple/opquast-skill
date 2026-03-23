# Exemples de l'explorateur de regles

## Liste paginee (`--list`)
```
/opquast --list

# Regles Opquast V5 (1-20 sur 245)

| ID | Titre | Rubrique | Severite |
|----|-------|----------|----------|
| 1 | Il est possible de connaitre les nouveaux contenus | Contenus | critical |
| 2 | Les droits de copie sont disponibles | Contenus | minor |
| 3 | Metadonnee description presente | Contenus | major |
| ... | ... | ... | ... |

Page 1/13 — `/opquast --list --page 2` pour la suite
```

## Recherche (`--search`)
```
/opquast --search formulaire

# 30 regles contenant "formulaire"

| ID | Titre | Severite |
|----|-------|----------|
| 67 | Chaque champ est associe a une etiquette | critical |
| 68 | Les etiquettes sont visuellement proches | major |
| 69 | Les champs obligatoires sont indiques | critical |
| ... | ... | ... |
```

## Par thematique (`--theme`)
```
/opquast --theme accessibilite

# 128 regles Accessibilite

| ID | Titre | Rubrique | Severite |
|----|-------|----------|----------|
| 4 | Dates en format explicite | Contenus | critical |
| 5 | Abreviations expliquees | Contenus | critical |
| ... | ... | ... | ... |
```

## Par rubrique (`--rubrique`)
```
/opquast --rubrique e-commerce

# 39 regles E-Commerce

| ID | Titre | Severite |
|----|-------|----------|
| 15 | Prix clairement indiques | critical |
| 16 | Devise mentionnee | critical |
| 17 | Disponibilite indiquee | major |
| ... | ... | ... |
```
