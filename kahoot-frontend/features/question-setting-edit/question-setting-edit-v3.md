## Goal
Question setting edit

## Description
Rework the right-side question editor panel (`quiz-create-question-editor.ts`, 320 px column) so it contains the full set of question fields, replaces free-text inputs with proper controls, and removes the Options list. Separator + info-icon tooltips added per instructions.

## Decisions (resolved from v2 questions)

| # | Decision |
|---|---|
| Q1 | Name field **added to editor panel** — bound to `title`, pre-filled from add-dialog |
| Q2 | Description field **added to editor panel** — bound to `description`, optional |
| Q3 | Points stays as **number input** (min=1, max=100) — more ergonomic than 100-item dropdown |
| Q4 | Timer dropdown values: **10 s, 20 s … 120 s** (every 10 s, 12 options), default 10 s |
| Q5 | Icons per label: Name→`lucidePencilLine`, Type→`lucideLayoutList`, Description→`lucideAlignLeft`, Points→`lucideStar`, Algorithm→`lucideCalculator`, Timer→`lucideTimer` |
| Q6 | Timer tooltip: *"Time allowed to answer this question."* Algorithm tooltip: *"Standard: fixed points. Timer Based: points decrease the longer the player takes."* |
| Q7 | Separator layout: Name → Type → Description → **separator** → Points → Algorithm → **separator** → Timer |
| Q8 | Add `calculationAlgorithm: 'standard' \| 'timer-based'` to `QuizQuestion` interface |
| Q9 | Keep `title` in interface; label it **"Name"** in the UI |

## Layout (editor panel, top → bottom)

```
Question Settings            ← section heading

[icon] Name *
  <input text />

[icon] Type *
  <select />

[icon] Description
  <textarea optional />

──── separator ────

[icon] Points *
  <input number min=1 max=100 />

[icon] Calculation Algorithm [ℹ]
  <select Standard | Timer Based />

──── separator ────

[icon] Timer [ℹ]
  <select 10 s … 120 s />
```

## Tasks
- [x] Write v3 spec
- [ ] Install spartan Tooltip component via `/add-spartan-component tooltip`
- [ ] Add `calculationAlgorithm` field to `QuizQuestion` interface in `quiz-create.ts`
- [ ] Update `addQuestion()` default and MOCK_QUESTIONS in `quiz-create.ts`
- [ ] Rewrite `quiz-create-question-editor.ts` with new layout, icons, tooltips
- [ ] Update sidebar `timeLimit` display to show new default (10 s)

## Questions
(none — all resolved above)

## Answers
(see Decisions table)

## Feedback
