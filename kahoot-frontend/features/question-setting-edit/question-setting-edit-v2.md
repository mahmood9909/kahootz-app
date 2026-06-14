## Goal
Question setting edit

## Description
Rework the right-side question editor panel (`quiz-create-question-editor.ts`, 320 px column) so it contains the fields listed in Tasks, replaces the free-text timer/points inputs with dropdowns, and removes the Options list. Separator + info-icon tooltips added per Instructions.

## Tasks
- [ ] Question [Name] is required and mapped to question name when u add new one
- [ ] Question [Type] keep it and its required and should be always showen form Question name already showen when u add new question
- [ ] Question [Description] not required required and it will be mapped to description of question when u add new question.
- [ ] Question [Points] required and it's number points from one two 100.
- [ ] Question [Calculation Algorithm] dropdown has either of the following values [Standard, Timer Based] the default value is [Standard].
- [ ] Question [Timer] is value set seconds user can shooise up to 120 seconds 2 min , make it as dropdown and default value is 10 second.
- [ ] Remove [Option] currently will not needed as quiz editor will be main field to choose  .

## Questions

### Q1 — Name field scope
The [Name] field currently only exists in the add-question dialog (left sidebar).
Should [Name] **also** appear in the editor panel (right sidebar) so the user can rename a question after it has been created?
Or is it only needed in the add dialog?

### Q2 — Description field scope
Same as Q1 — [Description] is only in the add dialog today.
Should it also appear in the editor panel for editing after creation?

### Q3 — Points input style
Should [Points] be a **number input** (typed value, min=1, max=100) or a **dropdown** (1 … 100)?
A dropdown of 100 items is long — a number input might be more ergonomic. Clarify preference.

### Q4 — Timer dropdown increments
Are the timer values exactly **10 s, 20 s, 30 s … 120 s** (every 10 seconds, 12 options total)?
Or a different step (e.g. 5 s, 15 s, 30 s, 60 s, 120 s)?

### Q5 — Icons per label
Instruction 4 says "add icon for each label to the left."
Which **Lucide icon** should each field use?

| Field | Icon suggestion (confirm or correct) |
|---|---|
| Name | `lucidePencil` |
| Type | `lucideLayoutList` |
| Description | `lucideAlignLeft` |
| Points | `lucideStar` |
| Calculation Algorithm | `lucideCalculator` |
| Timer | `lucideTimer` |

### Q6 — Tooltip text for info icons
Instruction 5 adds `<ng-icon name="lucideInfo" />` to [Timer] and [Calculation Algorithm].
What text should each tooltip display?

| Field | Suggested tooltip text (confirm or rewrite) |
|---|---|
| Timer | "Time allowed to answer this question." |
| Calculation Algorithm | "Standard: fixed points. Timer Based: points decrease the longer the player takes." |

### Q7 — Separator layout
Instruction 2 says Points and Calculation Algorithm are "related fields" and to add a separator between those two and the rest, from top and bottom.
Intended layout (confirm or correct):

```
[Name]
[Type]
[Description]
──── separator ────
[Points]
[Calculation Algorithm]
──── separator ────
[Timer]
```

Or is the grouping different?

### Q8 — Interface field: calculationAlgorithm
The `QuizQuestion` interface (in `quiz-create.ts`) does not have a `calculationAlgorithm` field yet.
Should I add `calculationAlgorithm: 'standard' | 'timer-based'` to the interface and wire it through `addQuestion()` / `updateQuestion()`?

### Q9 — Question Name maps to `title` in interface
The interface uses `title: string` for the question name.
Should I rename the property to `name` everywhere, or keep `title` and just label it "Name" in the UI?

## Answers

1. Question [Name] should apper in right editor side nav
2. Question [Description] should apper in right editor side nav
3. make it number as we already will validate this input later.
4. 10seconds and +5 sequence for every increase.
5. u know only tool tip for algoritm only Time base that means the time will be main factor of how calcuating the points "for example" .
7. no sorry [Timer] and [Calculation Algorithm] should be in seprator alone.
8. yes make it this mock as of now NOTE every will pulled from api so these fields are mocks as of now to make component functional.
9. title are the question title like what is the actual question saies for example [how does weather today], for name is just naming config like weather question so 30 chacater long.

## NOTE
10 the deseing needs to be aligned in a way that component will have input and the code will pull data from API later on no relaying on mock data we have them currently. 