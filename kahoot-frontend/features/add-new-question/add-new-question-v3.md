## Goal
add / remove question

## Description
Make the Add and Remove question buttons functional in the quiz editor sidebar.
When no questions exist the right panel shows an empty state instead of a broken form.
The "Add Question" button gets a blue accent to stand out as a primary action.
Deletion is guarded by a confirmation dialog showing the question title.
Type, points, and time fields in the editor panel are two-way bound to the question signal.

---

## Implementation — Step by Step

### Step 1 — Convert `questions` to a writable signal

**File:** `src/app/pages/quiz-create/quiz-create.ts`

```ts
// Before
readonly questions = MOCK_QUESTIONS; // plain const — mutations are invisible to Angular

// After
readonly questions = signal<QuizQuestion[]>(MOCK_QUESTIONS);
```

**Why:** `ChangeDetectionStrategy.OnPush` only re-renders when a signal value changes.
A plain array reference never changes even after `.push()`, so downstream `computed()`
values (like `activeQuestion`) would never update. Making `questions` a signal means
every call to `questions.update(...)` automatically invalidates `activeQuestion` and
triggers re-render in all consuming child components.

---

### Step 2 — Add mutation methods to `QuizCreateComponent`

```ts
addQuestion(type: 'multiple-choice' | 'true-false'): void {
  const newQuestion: QuizQuestion = {
    id: Date.now(),
    title: 'New Question',
    type,
    points: 10,
    timeLimit: 30,
    options: type === 'multiple-choice' ? ['', '', '', ''] : ['True', 'False'],
  };
  this.questions.update((qs) => [...qs, newQuestion]);
  this.activeIndex.set(this.questions().length - 1); // auto-focus new question
}

removeQuestion(index: number): void {
  this.questions.update((qs) => qs.filter((_, i) => i !== index));
  this.activeIndex.update((i) => Math.min(i, this.questions().length - 1));
}

updateQuestion(updated: QuizQuestion): void {
  this.questions.update((qs) => qs.map((q) => (q.id === updated.id ? updated : q)));
}
```

**Why `Date.now()` for id:** Temporary unique id until a real backend assigns one.
Collision risk in this UI context is negligible.

**Why clamp on remove:** After deletion the `activeIndex` could point past the end of
the array. `Math.min(i, length - 1)` keeps it in bounds. If the list becomes empty,
`length - 1` is -1 but the empty-state guard (Step 3) prevents the editor from rendering.

**Why identity-based update (`q.id === updated.id`):** Immutable update pattern —
replace the matching object and leave all others unchanged. This preserves signal
referential identity for unchanged questions, preventing unnecessary re-renders in the
sidebar list items.

---

### Step 3 — Empty state guard in the template

```html
@if (activeQuestion(); as q) {
  <quiz-create-question-preview [question]="q" />
  <quiz-create-question-editor [question]="q" (questionChange)="updateQuestion($event)" />
} @else {
  <div class="flex h-full items-center justify-center bg-muted/5 col-span-2">
    <p class="text-sm text-muted-foreground">No questions yet. Add one to get started.</p>
  </div>
}
```

**Why `col-span-2`:** The grid has three columns (sidebar | preview | editor). When
the two right columns collapse into the empty state, `col-span-2` makes the placeholder
fill the combined space of preview + editor columns correctly.

**Why `@if (activeQuestion(); as q)`:** `activeQuestion` returns `undefined` when the
array is empty or `activeIndex` is -1. The `as q` alias means the non-null question
value flows into both child components without calling the signal twice.

---

### Step 4 — Install Spartan `dialog` component

```bash
ng g @spartan-ng/cli:ui --name=dialog
```

Generated files in `src/app/ui-lib/dialog/src/lib/`:
`hlm-dialog.ts`, `hlm-dialog-content.ts`, `hlm-dialog-trigger.ts`,
`hlm-dialog-portal.ts`, `hlm-dialog-header.ts`, `hlm-dialog-footer.ts`,
`hlm-dialog-title.ts`, `hlm-dialog-description.ts`, `hlm-dialog-close.ts`,
`hlm-dialog-overlay.ts`

Imported via `HlmDialogImports` from `@ui-lib/dialog`.

**Why `dialog` and not `alert-dialog` for Add?**
`dialog` is the general-purpose modal. `alert-dialog` is reserved for destructive
confirmations — using it for a neutral "add" flow would be semantically incorrect
(`role="alertdialog"` implies an urgent, interruptive message).

---

### Step 5 — "Add Question" dialog in the sidebar

**Pattern used:**
```html
<hlm-dialog>
  <button hlmDialogTrigger hlmBtn ...>Add Question</button>
  <ng-template hlmDialogPortal>
    <hlm-dialog-content>
      <hlm-dialog-header>...</hlm-dialog-header>
      <hlm-select (valueChange)="newQuestionType.set($any($event))">...</hlm-select>
      <hlm-dialog-footer>
        <button hlmBtn brnDialogClose>Cancel</button>
        <button hlmBtn hlmDialogClose (click)="confirmAdd()">Add</button>
      </hlm-dialog-footer>
    </hlm-dialog-content>
  </ng-template>
</hlm-dialog>
```

**Why `<ng-template hlmDialogPortal>`:** Same CDK overlay portal pattern as
`hlmSelectPortal` — `BrnDialogContent` (applied via `HlmDialogPortal`) is the
open/close gate. Without it the dialog content renders unconditionally on page load.

**Why `hlmDialogClose` on the Add button:** `hlmDialogClose` applies `BrnDialogClose`
which programmatically closes the nearest `BrnDialog` ancestor when clicked.
Adding it alongside `(click)="confirmAdd()"` means the click handler runs first
(emitting the output), then the close directive dismisses the modal.

**`confirmAdd()` resets the type picker:**
```ts
confirmAdd(): void {
  this.addQuestion.emit(this.newQuestionType());
  this.newQuestionType.set('multiple-choice'); // reset for next open
}
```

---

### Step 6 — Delete button with `alertDialog` confirmation

```html
<hlm-alert-dialog>
  <button hlmAlertDialogTrigger hlmBtn variant="ghost" size="icon"
    class="absolute right-1 top-1 size-7 text-destructive opacity-0 group-hover:opacity-100 ...">
    <ng-icon name="lucideTrash2" />
  </button>
  <ng-template hlmAlertDialogPortal>
    <div hlmAlertDialogContent>
      <div hlmAlertDialogHeader>
        <h3 hlmAlertDialogTitle>Delete question?</h3>
        <p hlmAlertDialogDescription>Are you sure you want to delete <strong>"{{ question.title }}"</strong>?</p>
      </div>
      <div hlmAlertDialogFooter>
        <button hlmAlertDialogCancel>Cancel</button>
        <button hlmAlertDialogAction variant="destructive" (click)="deleteQuestion.emit(i)">Delete</button>
      </div>
    </div>
  </ng-template>
</hlm-alert-dialog>
```

**Why only on the active card (`@if (activeIndex() === i)`):**
Showing a delete button on every card creates visual noise. Restricting it to the
selected card keeps the sidebar clean and matches the mental model that you first
select a question, then act on it.

**Why `$event.stopPropagation()` on the trigger button:**
The trash button sits inside the card `<button>`. Without stop-propagation, the click
bubbles up to the card and changes `activeIndex` before the dialog opens.

**Why `role="alertdialog"` (Spartan `alert-dialog`):**
Deletion is irreversible. `alertDialog` signals urgency to screen readers, traps focus
inside the confirmation, and requires explicit user action — meeting WCAG 2.1 SC 3.3.4.

---

### Step 7 — Two-way binding on type, points, and time

**New output on `QuizCreateQuestionEditorComponent`:**
```ts
readonly questionChange = output<QuizQuestion>();
```

**Type change (via select `valueChange`):**
```ts
onTypeChange(type: 'multiple-choice' | 'true-false'): void {
  const q = this.question();
  const options = type === 'multiple-choice'
    ? (q.options.length === 2 ? ['', '', '', ''] : q.options)
    : ['True', 'False'];
  this.questionChange.emit({ ...q, type, options });
}
```
When switching from True/False (2 options) to Multiple Choice the options are reset to
4 blank slots. Switching the other way always uses `['True', 'False']`.

**Points / time (via DOM `change` event on `<input type="number">`):**
```ts
onPointsChange(points: number): void {
  if (!isNaN(points)) this.questionChange.emit({ ...this.question(), points });
}
```
`(change)` fires on blur/Enter, not on every keystroke — avoids flooding the signal
with intermediate partial values while the user is still typing.

**Parent wires it up:**
```html
<quiz-create-question-editor
  [question]="q"
  (questionChange)="updateQuestion($event)"
/>
```

---

### Step 8 — "Add Question" button blue accent

```html
<!-- Before -->
<button hlmBtn variant="ghost" size="sm" class="w-full justify-start gap-1.5">

<!-- After -->
<button hlmBtn variant="outline" size="sm"
  class="w-full justify-start gap-1.5 border-primary text-primary hover:bg-primary/10">
```

**Why `variant="outline"` + custom classes instead of `variant="default"`:**
`variant="default"` (filled blue) would be too heavy for a sidebar action that sits
at the bottom of a list. `variant="outline"` with `border-primary text-primary` gives
a clear call-to-action weight without dominating the sidebar visually.

---

## Tasks
- [x] Convert `questions` from plain array to `signal<QuizQuestion[]>`
- [x] Install Spartan `dialog` component
- [x] Build "Add Question" dialog (type picker → adds stub question, focuses it)
- [x] Add delete button to active question card with `alertDialog` confirmation
- [x] Add empty-state guard in quiz-create template (editor + preview panels)
- [x] Restyle "Add Question" button to blue accent
- [x] Two-way binding on type, points, and time in the editor panel
- [x] Verify build is clean

## Questions

## Answers
1. Modal asks for type only — no question text field in the modal.
2. Two-way binding for type, points, and time only (title/options stay display-only for now).
