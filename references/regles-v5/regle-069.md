# Règle Opquast 69

> Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.

---

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Numéro** | 69 |
| **ID** | 54479 |
| **Version** | V5 (Qualité Numérique) |

---

## Description

### Français
Chaque champ de formulaire est associé dans le code source à une étiquette qui lui est propre.

### English
Each form field has its own label associated with it in the source code.

### Español
Cada campo del formulario tiene su propia etiqueta asociada en el código fuente.

---

## Objectifs

### Français
- Faciliter la compréhension des données attendues dans les formulaires. 
- Permettre aux aides techniques d'accessibilité de restituer les champs de formulaires en les associant systématiquement à une étiquette indiquant leur rôle et la nature de la saisie attendue.
- Faciliter la saisie en permettant de sélectionner le champ via un clic sur son étiquette aussi bien que sur le champ lui-même (particulièrement en cas de case à cocher ou de case radio).
- Améliorer l’accessibilité des contenus aux personnes handicapées

### English
- Facilitate the understanding of the data expected in forms.
- Allow technical accessibility aids to render the fields in forms by systematically attaching a label to them, indicating their role and the nature of the expected input.
- Simplify input by allowing users to select the field by clicking on either its label or the field itself (especially in the case of a checkbox or a radio button).
- Improve the accessibility of content for people with disabilities.

### Español
- Facilitar la comprensión de los datos esperados en los formularios. 
-  Permitir a las ayudas técnicas de accesibilidad de reproducir los campos de formulario asociándolos sistemáticamente a una etiqueta que indique su función y la naturaleza de la entrada esperada.
-  Facilitar la entrada de datos permitiendo que el campo se seleccione con un clic en su etiqueta así como en el propio campo (particularmente en el caso de una checkbox o de un botón de radio).
-  Mejorar la accesibilidad del contenido para las personas con discapacidad

---

## Métadonnées

### Tags
- Basics
- Accessibilité

### Thématiques
- Formulaires

### Phases projet
- Développement

---

## Explication pédagogique

Ne pas savoir à quoi sert un champ de formulaire peut être extrêmement déroutant.

---

## Solution recommandée

<p>Donner à chaque champ de formulaire une étiquette qui lui soit explicitement associée&nbsp;:</p><ul>
<li>si l'étiquette est visible, sous la forme d'un élément <code>label</code> doté d'un attribut <code>for</code> reprenant la valeur de l'attribut <code>id</code> affecté au champ, par exemple :</li>
				</ul><p>&lt;label for="nom1"&gt;Nom de famille&nbsp;:&lt;/label&gt;</p><p>&lt;input id="nom1" type="text" name="nom"&gt;</p><ul>
<li>si l'affichage de l'étiquette n'est pas souhaité (placeholder), sous la forme d'un attribut <code>aria-label</code> ou <code>aria-labelledby</code>.</li>
				</ul><p>Le recours à une étiquette &lt;label for="…"&gt; masquée via les styles CSS est déconseillé au profit de l'attribut <code>aria-label</code> ou <code>aria-labelledby</code>.</p>

---

## Méthode de vérification

<p>Pour chaque champ de formulaire&nbsp;: </p><ul>
<li>Vérifier, en regardant le code source ou à l'aide de Firebug, que l'attribut <code>for</code>, propre à l'élément <code>label</code>, ainsi que l'attribut <code>id</code> du champ ont exactement le même contenu. Si les valeurs de ces deux attributs sont effectivement identiques, l'étiquette (<code>label</code>) est bien associée au champ (<code>input</code>). </li>
					<li>Dans le cas où aucune étiquette n'est visible dans le site (placeholder), vérifier que chaque champ de formulaire est doté d'un attribut <code>aria-label</code> ou <code>aria-labelledby</code>.</li>
				</ul><p>Dans les deux cas, vérifier enfin que l'étiquette décrit effectivement le rôle du champ ou la nature de l'information qui doit y être saisie. Cette bonne pratique ne peut donc être automatisée mais nécessite un examen manuel de chaque formulaire</p>

---

## Vulgarisation

Le recours à l’attribut title du champ évite souvent l’affichage d’étiquettes trop bavardes et simplifie les questions de mise en forme des formulaires.
Par ailleurs, l’utilisation correcte des éléments label permet également d’étendre la zone cliquable à l’étiquette, ce qui procure un gain ergonomique notable quand il s’agit d’activer une case à cocher ou un bouton radio.
Enfin, pour l’accessibilité dans un lecteur d’écran, le recours à un attribut ARIA aria-describedby permet d’associer à l’étiquette label des informations complémentaires telles qu’une aide à la saisie (indication du format de saisie, par exemple).

---

## Liens

- **Checklist V5** : https://checklists.opquast.com/fr/qualite-numerique/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre/
- **API** : `https://api.opquast.com/checklist/69/?version=qualite-numerique`

---

*Règle extraite du référentiel Opquast V5 (Qualité Numérique) - 245 règles*
