# Opquast V5 — Les 5 nouvelles règles

> Règles 241-245 — Exclusives à la version Qualité Numérique (V5)

Ces règles n'existaient pas dans la V4 (Assurance Qualité Web).

---

## Règle 241

### Les documents PDF internes sont dotés d'une structure de titres.

**Thématique** : Structure et code

**Tags** : Accessibilité | SEO

**Phases** : Editorial

### Objectifs

- Permettre aux utilisateurs d’accéder directement à différentes sections d’un document PDF. 
- Fournir une structure de titres aux utilisateurs qui en ont besoin. 
- Permettre la consultation d’un PDF via une aide technique.
- Améliorer l’accessibilité des contenus aux personnes handicapées. 
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### Explication

Baliser les titres des documents PDF facilite leur compréhension et la navigation au sein des contenus, notamment pour les internautes handicapés, mais aussi pour tous les autres. De nombreux lecteurs PDF permettent d’afficher directement le sommaire d’un document PDF à partir de cette structure de titres.

### En clair

Le balisage d’un PDF est intéressant au moins sur le plan de l’ergonomie et de l’accessibilité. Ce n’est pas toujours simple à mettre en œuvre, notamment pour les PDF issus de la chaîne graphique de l’impression, mais il faut s’attendre à ce que ce type de besoin prenne de l’importance au cours des prochaines années. C’est pourquoi nous avons complété cette règle par plusieurs autres recommandations clés que vous trouverez en fin d’ouvrage.

### Solution

Lorsque le document PDF est issu d’une suite bureautique telle que Word ou OpenOffice, il faut utiliser les styles et formatages proposés par le logiciel de manière à générer un PDF structuré, en appliquant les styles de texte tels que Titre 1, Titre 2, Titre 3 pour les différents niveaux de titre.Ces styles peuvent ensuite être modifiés pour les adapter à la présentation souhaitée. Enfin, l’option Exporter en PDF balisé ou tagué doit être activée au moment de l’export PDF. Pour plus d’informations, consulter la rubrique accessibilité du site http://www.adobe.com.

### Comment vérifier

Pour chaque document PDF interne, vérifier la présence des éléments de structure de titre :à l’aide d’un outil d’inspection du code ;en ouvrant le document dans un lecteur PDF permettant d’afficher les signets ;ou en consultant le document dans un lecteur d’écran.

[Voir la règle complète](https://checklists.opquast.com/fr/qualite-numerique/241)

---

## Règle 242

### Les cellules des tableaux de données sont reliées à leurs entêtes.

**Thématique** : Structure et code

**Tags** : Accessibilité

**Phases** : Développement → Editorial

### Objectifs

- Permettre aux aides techniques de restituer l'information contenue dans les tableaux de données de manière compréhensible, en indiquant à l'utilisateur les relations logiques entre contenu et entêtes du tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### Explication

Certains internautes vocalisent les contenus web grâce à des aides techniques. Un tableau très clair à l’écran peut devenir totalement incompréhensible en mode vocal. Il est pourtant assez facile de prévoir ce cas de figure.

### En clair

Les difficultés d’utilisation de la technique id/headers invitent actuellement à privilégier les tableaux simples (quitte à morceler le cas échéant un tableau complexe en plusieurs tableaux simples) pour tirer parti du déploiement plus simple de la technique des scope. La prise en charge de scope dans les aides techniques a été plus tardive que celle des id/headers, mais peut à présent être considérée comme suffisante pour s’en tenir à cette solution quand le type de tableau l’autorise. Il faut aussi se souvenir qu’un tableau complexe risque fort d’être obscur pour tous les utilisateurs, indépendamment du problème d’accessibilité au sens strict : autant les éviter autant que possible au profit de tableaux plus simples.

### Solution

Utiliser l'élément HTML th et son attribut scope pour baliser les cellules d'en-têtes et expliciter leur portée (scope de valeur col pour un en-tête de colonne, de valeur row pour un en-tête de ligne).Pour les en-têtes qui ne s'appliquent qu'à une partie d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut id pour l'élément th et de l'attribut headers pour les éléments td avec les valeurs appropriées : Donner à chaque en-tête (élément th) un attribut id (par exemple, id="foo") ; Utiliser l'attribut headers dans chaque cellule (élément td) pour indiquer les en-têtes associées (par exemple, headers="foo" pour chaque cellule rattachée à l'en-tête ayant l'attribut id="foo"). En savoir plus: th sur MDN - td sur MDN

### Comment vérifier

Dans le code généré des tableaux de données : Vérifier l'utilisation systématique de l'élément th pour baliser les en-têtes de ligne ou de colonne ; Pour les en-têtes s'appliquant à la totalité d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut scope doté de la valeur appropriée (row pour une ligne ou col pour une colonne) ; Pour les en-têtes qui ne s'appliquent qu'à une partie d'une ligne ou d'une colonne, contrôler la présence systématique de l'attribut id pour l'élément th et de l'attribut headers pour les éléments td avec les valeurs appropriées : Chaque en-tête (élément th) doit être dotée d'un attribut id (par exemple, id="foo") ; L'attribut headers doit être utilisée dans chaque cellule (élément td) pour indiquer les en-têtes associées (par exemple, headers="foo" pour chaque cellule rattachée à l'en-tête ayant l'attribut id="foo").

[Voir la règle complète](https://checklists.opquast.com/fr/qualite-numerique/242)

---

## Règle 243

### Les titres des tableaux de données sont renseignés.

**Thématique** : Structure et code

**Tags** : Accessibilité

**Phases** : Développement → Editorial

### Objectifs

- Permettre aux utilisateurs d'aides techniques (lecteurs d'écran) d'identifier aisément la nature des informations fournies par un tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### Explication

Un tableau HTML peut être doté d’un titre. Ce dernier peut être affiché ou non, mais, dans tous les cas, sa présence et sa pertinence sont importantes pour la compréhension du tableau.

### En clair

L’élément caption correctement renseigné permet en particulier à un outil de synthèse vocale d’énumérer de manière claire et explicite la liste des différents tableaux de données présents dans une page web. À défaut, ces outils restitueront le contenu de la première ligne du tableau, ce qui sera généralement peu explicite.

### Solution

Utiliser et renseigner l'élément HTML caption pour chaque tableau de données.Le cas échéant, recourir à un élément caption masqué à l'affichage. En savoir plus: caption sur MDN

### Comment vérifier

Pour chaque tableau de données : Vérifier la présence de l'élément caption. Si cet élément est masqué à l'affichage à l'aide d'une classe CSS, vérifier qu'il reste accessible pour les lecteurs d'écran ; Contrôler la pertinence de l'élément caption qui doit permettre d'identifier la nature des informations apportées par le tableau. Cette vérification peut être partiellement automatisée pour ce qui est de la présence de l'élément de titre caption mais le contrôle de sa pertinence nécessite un examen manuel.

[Voir la règle complète](https://checklists.opquast.com/fr/qualite-numerique/243)

---

## Règle 244

### La linéarisation des tableaux utilisés pour la mise en page ne nuit pas à la compréhension des contenus.

**Thématique** : Structure et code

**Tags** : Accessibilité

**Phases** : Développement

### Objectifs

- Fournir un contenu compréhensible aux utilisateurs dont l'agent utilisateur ou l'aide technique (lecteur d'écran) ne permet pas de restituer la mise en forme initialement prévue à l'aide d'un tableau.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### Explication

Une page vocalisée va être lue de manière linéaire, dans l’ordre où son contenu apparaît dans le code HTML. Il arrive alors que la linéarisation des tableaux de mise en page vienne casser le sens de la page.

### En clair

Le recours limité aux tableaux de mise en forme se justifiait lorsque les techniques de mise en page CSS n’étaient pas suffisamment implémentées par tous les navigateurs, ce qui est rarissime aujourd’hui. Cette règle reste cependant pertinente pour contrôler le niveau de risque dans le cas, par exemple, de pages anciennes qu’on souhaite garder en ligne en limitant la charge de correction.

### Solution

Regrouper dans une même cellule td les informations qui doivent être verticalement associées (ne pas les répartir dans des cellules placées dans des lignes successives du tableau). En savoir plus: td sur MDN

### Comment vérifier

Pour chaque tableau de mise en forme, c'est-à-dire pour chaque tableau ne comportant pas de donnée reliée à des en-têtes de ligne ou de colonne : Procéder à la linéarisation de l'affichage à l'aide d'un outil de développement. Vérifier que le contenu linéarisé reste compréhensible, sans incohérence ni perte d'information.

[Voir la règle complète](https://checklists.opquast.com/fr/qualite-numerique/244)

---

## Règle 245

### Les tableaux de données ne sont pas simulés.

**Thématique** : Structure et code

**Tags** : Accessibilité | Écoconception | SEO

**Phases** : Développement → Editorial

### Objectifs

- Permettre aux utilisateurs d’accéder à des tableaux exploitables par leur agent utilisateur et restitués de manière compréhensible dans tous les cas.
- Améliorer l’accessibilité des contenus aux personnes handicapées.
- Améliorer la prise en compte des contenus par les moteurs de recherche et outils d’indexation

### Explication

Il peut être tentant, pour aller plus vite, de scanner un tableau présent dans un document bureautique et de coller l’image dans la page web, ou de simuler visuellement des tableaux en insérant des espaces entre des données. Mais c’est en fait une très mauvaise idée : le contenu de ces tableaux ne sera ni indexable par les moteurs de recherche, ni consultable pour différents utilisateurs.

### En clair

Ces tableaux sont généralement issus d’une capture d’écran d’un document bureautique. On pourrait certes songer à fournir une alternative textuelle à l’image, mais cela reviendrait à créer le tableau de données HTML ; autant publier directement celui-ci.

Un tableau de données réalisé en simulant la mise en colonnes revient en fait à produire un contenu pratiquement dénué de sens, en particulier pour un outil de synthèse vocale.

### Solution

Utiliser systématiquement l’élément table et les éléments associés tr, td, th, caption pour baliser les tableaux de données, et non des images reproduisant le tableau. En savoir plus: table sur MDN Utiliser systématiquement l'élément table et les éléments associés tr, td, th, caption, pour baliser les tableaux de données, et non des artifices reposant sur des accumulations d'espaces insécables ou de caractères graphiques tels que les pipes (lignes verticales « | »). En savoir plus: table sur MDN

### Comment vérifier

S’assurer qu’aucun tableau de données n’est géré sous forme d’image. Pour chaque contenu affiché sous forme de tableau de données (c'est-à-dire associant des cellules de données à des en-têtes de ligne ou de colonnes) : S'assurer que celui-ci est balisé avec les éléments HTML tr (ligne), td (cellule de données), th (en-tête de ligne ou de colonne) et caption (titre du tableau), par exemple à l'aide d'un outil de développement.

[Voir la règle complète](https://checklists.opquast.com/fr/qualite-numerique/245)

---

## Résumé

| Règle | Description | Tags |
|-------|-------------|------|
| 241 | PDF avec structure de titres | Accessibilité, SEO |
| 242 | Cellules tableaux reliées aux entêtes | Accessibilité |
| 243 | Titres des tableaux renseignés (caption) | Accessibilité |
| 244 | Linéarisation tableaux mise en page | Accessibilité |
| 245 | Tableaux de données non simulés | Accessibilité, Écoconception, SEO |

### Points communs

- **Toutes en thématique** : Structure et code
- **Focus principal** : Accessibilité (5/5 règles)
- **Sujet** : Tableaux HTML et documents PDF

---

*Source : [checklists.opquast.com/fr/qualite-numerique](https://checklists.opquast.com/fr/qualite-numerique/) — Généré le 2026-01-15*
