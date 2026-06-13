## Goal
add / remove question

## Description
Make the Add and Remove question buttons functional in the quiz editor sidebar.
When no questions exist the right panel shows an empty state instead of a broken form.
The "Add Question" button gets a blue accent to stand out as a primary action.
Deletion is guarded by a confirmation dialog showing the question title.

## Plan

### Task 1 — Convert `questions` to a writable signal

**File:** `src/app/pages/quiz-create/quiz-create.ts`

Change:
```ts
readonly questions = MOCK_QUESTIONS; // plain const array
```
To:
```ts
readonly questions = signal<QuizQuestion[]>(MOCK_QUESTIONS);
```

**Why:** All mutations (add, delete) need to trigger re-renders in `OnPush` components.
A plain array reference never changes so Angular never re-evaluates downstream `computed()`.
Making it a signal means `questions.update(...)` automatically invalidates `activeQuestion`.

---

### Task 2 — "Add Question" dialog

**New Spartan component to install:** `dialog`

**Trigger:** "Add Question" button in sidebar footer → opens a `HlmDialogComponent`.

**Dialog contents:**
- `hlm-select` to pick question type (`multiple-choice` / `true-false`)
- Cancel + Add buttons

**On Add:** push a new `QuizQuestion` stub onto `questions` signal, set `activeIndex`
to the new item's index so the editor focuses it immediately.

**Stub shape added:**
```ts
{
  id: Date.now(),
  title: 'New Question',
  type: <selected type>,
  points: 10,
  timeLimit: 30,
  options: type === 'multiple-choice' ? ['', '', '', ''] : ['True', 'False'],
}
```

**Why a modal and not inline?**
The sidebar has no room for an inline form. A modal keeps the selection step discrete
and avoids partially-constructed questions appearing in the list before they are ready.
Spartan `dialog` uses a CDK overlay so it sits above the 3-column layout correctly.

---

### Task 3 — Delete button with confirmation

**Trigger:** Small `lucideTrash2` icon button on the active question card in the sidebar.
Only visible on the currently selected (active) card — hidden on inactive cards to reduce noise.

**Confirmation:** Spartan `alertDialog` with message:
> Are you sure you want to delete "**[question title]**"?

Buttons: Cancel (outline) / Delete (destructive).

**On Delete:**
1. Remove question at `activeIndex` from the `questions` signal.
2. Clamp `activeIndex` to `Math.min(activeIndex, questions().length - 1)` to
   prevent an out-of-bounds active index after removal.
3. If `questions()` is now empty, `activeIndex` stays at 0 (empty state guard handles it).

**Why `alertDialog` and not a `confirm()`?**
`window.confirm()` is blocked in many browser contexts and cannot be styled.
Spartan `alertDialog` (Brain + Helm) is accessible (`role="alertdialog"`, focus trap)
and consistent with the project's design system.

---

### Task 4 — Empty state in editor panel

**When:** `questions()` is empty (all deleted, or quiz opened with no questions).

**What shows:** Centred placeholder in the right panel:
> No questions yet. Add one to get started.

**Implementation:** `@if / @else` guard in `quiz-create.ts` template:
```html
@if (activeQuestion()) {
  <quiz-create-question-editor [question]="activeQuestion()!" />
} @else {
  <div class="flex h-full items-center justify-center text-sm text-muted-foreground">
    No questions yet. Add one to get started.
  </div>
}
```

Same guard applied to `<quiz-create-question-preview>`.

---

### Task 5 — Style "Add Question" button (blue accent)

Change sidebar footer button from `variant="ghost"` to styled outline:
```html
<button hlmBtn variant="outline" size="sm"
  class="w-full justify-start gap-1.5 border-primary text-primary hover:bg-primary/10">
```

**Why:** Ghost buttons are used for low-priority actions. Adding a question is the
primary action in the sidebar; a coloured border+text treatment makes it stand out
without being as heavy as a filled `variant="default"` button.

---

## Tasks
- [ ] Convert `questions` from plain array to `signal<QuizQuestion[]>`
- [ ] Install Spartan `dialog` and `alert-dialog` components
- [ ] Build "Add Question" dialog (type picker → adds stub question, focuses it)
- [ ] Add delete button to active question card with `alertDialog` confirmation
- [ ] Add empty-state guard in quiz-create template (editor + preview panels)
- [ ] Restyle "Add Question" button to blue accent
- [ ] Verify build is clean

## Instructions
1. Provide plan and analysis before coding so I can confirm — DONE (this doc)
2. Don't guess — ask if anything is unclear

## Questions


## Answers
1. no only ask for type as Question setting will not ask for typing question itself.
2. the only action setting as of should be the following (question type , points , time )