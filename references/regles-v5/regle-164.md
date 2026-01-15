# Règle Opquast 164

> Chaque page contient des liens d'accès rapide placés au début du code source.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 164 |
| **ID** | 54443 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque page contient des liens d'accès rapide placés au début du code source.

### English
Each page contains quick-access links placed at the beginning of the source code.

### Español
Cada página contiene enlaces de acceso directo colocados al principio del código fuente.

---

## Objectifs

### Français
- Permettre aux utilisateurs qui consultent les pages de manière linéaire (mode vocal) ou semi-linéaire (écran de faible largeur) de ne pas avoir à défiler l'ensemble des éléments sur chaque page pour accéder aux contenus. 
- Fournir des raccourcis accélérant la navigation au clavier et évitant des actions au clavier répétées pour parcourir la page et atteindre la zone souhaitée.
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Allow users visiting the pages in a linear fashion (in voice mode) or a semi-linear way (on a small screen) to not have to scroll through all of each page’s elements in order to access the content.
- Provide shortcuts that accelerate keyboard navigation and that avoid the repetition of keyboard actions in order to browse through the page and get to the zone they want.
- Improve the accessibility of content for people with disabilities.

### Español
- Evitar a los usuarios que consultan las páginas de forma lineal (modo de voz) o semi-lineal (ancho de pantalla estrecho) tener que desplazarse por todos los elementos de cada página para acceder al contenido. 
- Proporcionar atajos que aceleren la navegación por el teclado y evitar las repetidas acciones de teclado para navegar por la página y llegar a la zona deseada.
- Mejorar la accesibilidad de los contenidos para las personas con discapacidad.

---

## Métadonnées

### Tags
- Accessibilité

### Thématiques
- Navigation

### Phases projet
- Conception
- Développement

---

## Explication pédagogique

Vous avez certainement vu ces liens en haut de certaines pages web. Ils permettent à certains utilisateurs d’accéder bien plus vite aux contenus.

---

## Solution recommandée

<p>Fournir en début de code HTML, avant tout autre lien ou formulaire présent dans la page, les liens visant des ancres correspondantes&nbsp;:</p><ul>
<li>Vers le menu principal si celui-ci n'est pas immédiatement placé après l'en-tête de page ;</li>
					<li>Vers le contenu principal si celui-ci n'est pas immédiatement placé après l'en-tête de page ;</li>
					<li>Vers le formulaire du moteur de recherche si celui-ci n'est pas immédiatement placé après l'en-tête de page.</li>
				</ul>
<p>Le cas échéant, ce menu d'accès rapide peut être masqué au chargement de la page et s'afficher lors de la première tabulation entrant dans celle-ci (via Javascript ou CSS).</p>
<p>Au-delà de cette règle, il est recommandé de baliser explicitement  les régions de la page à l'aide des éléments de landmarks (<code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code>) et de leurs équivalents ARIA, ou au moins la région principale correspondant au contenu (<code>main</code>)

---

## Méthode de vérification

<p>Cette règle gagne à être vérifiée en association avec l'ensemble des règles concernant la navigation au clavier puisque si ces liens d'accès rapide sont présents, ils doivent au minimum apparaître dès la première tabulation dans la page. </p><p>Lors de la navigation dans le site ou de l'inspection des templates (sous réserve de tenir compte des pages dépendants de services tiers)&nbsp;: </p><ul>
<li>Vérifier la présence des liens d'accès rapide au menu, au contenu et à la recherche selon l'organisation de la page ; </li>
					<li>Vérifier qu'ils sont bien placés dans le code de manière à apparaître dès la première tabulation dans la page ; </li>
					<li>Vérifier qu'en cas de masquage par défaut, ils sont affichés lisiblement lors de la première tabulation, à un emplacement prévisible par l'utilisateur ; </li>
					<li>Vérifier que leur fonctionnement est effectif, c'est-à-dire qu'ils permettent d'accéder au menu ou à la zone de contenu et d'y poursuivre immédiatement la navigation au clavier, ou au champ de saisie du formulaire de recherche et de procéder à la saisie.</li>
				</ul>

---

## Vulgarisation

Les liens d’accès rapide sont fréquemment compris comme étant essentiellement destinés aux utilisateurs de lecteurs d’écran et sont alors souvent totalement masqués à l’affichage. Or, ce public n’est pas leur cible principale : ils sont avant tout précieux pour les utilisateurs voyants qui naviguent au clavier. Il est donc indispensable que ces liens soient visibles au moins lors de leur utilisation, ce qui est possible en utilisant des styles CSS et/ou un Java Script qui les masquent au chargement de la page et qui les affichent lors de la première tabulation.

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source/
- **API** : `https://api.opquast.com/checklist/164/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
