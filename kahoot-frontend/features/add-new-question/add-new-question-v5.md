## Goal
add / remove question

## Description
Make the Add and Remove question buttons functional in the quiz editor sidebar.
Full implementation complete as of v5.

---

## Implementation — Step by Step

### Step 1 — Convert `questions` to a writable signal

**File:** `src/app/pages/quiz-create/quiz-create.ts`

```ts
readonly questions = signal<QuizQuestion[]>(MOCK_QUESTIONS);
```

**Why:** `OnPush` only re-renders on signal changes. A plain array reference never changes on mutation, so `computed(() => questions[activeIndex])` would never update. Signal makes every `questions.update(...)` call automatically invalidate downstream computed values.

---

### Step 2 — Mutation methods on `QuizCreateComponent`

```ts
addQuestion(payload: { name: string; description: string; type: 'multiple-choice' | 'true-false' }): void {
  const q: QuizQuestion = {
    id: Date.now(),
    title: payload.name || `Question ${this.questions().length + 1}`,
    description: payload.description || undefined,
    type: payload.type,
    points: 10,
    timeLimit: 30,
    options: payload.type === 'multiple-choice' ? ['', '', '', ''] : ['True', 'False'],
  };
  this.questions.update(qs => [...qs, q]);
  this.activeIndex.set(this.questions().length - 1);
}

removeQuestion(index: number): void {
  this.questions.update(qs => qs.filter((_, i) => i !== index));
  this.activeIndex.update(i => Math.min(i, this.questions().length - 1));
}

updateQuestion(updated: QuizQuestion): void {
  this.questions.update(qs => qs.map(q => q.id === updated.id ? updated : q));
}
```

**Why `Date.now()` for id:** Temporary unique id until a real backend assigns one.

**Why clamp on remove:** Prevents `activeIndex` going out of bounds after the last item in a position is deleted.

**Why identity-based update:** Immutable update — only the changed item gets a new reference, so unchanged sidebar cards don't re-render.

---

### Step 3 — Empty state guard

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

**Why `col-span-2`:** The grid is `grid-cols-[260px_1fr_320px]`. When empty, the placeholder must span both the preview and editor columns.

---

### Step 4 — Install Spartan `dialog` component

```bash
ng g @spartan-ng/cli:ui --name=dialog
```

Imported via `HlmDialogImports` from `@ui-lib/dialog`.

**Why `dialog` not `alert-dialog`:** `dialog` is for neutral interactions. `alert-dialog` sets `role="alertdialog"` (urgency signal to screen readers) — reserved for destructive confirmations only.

---

### Step 5 — Add Question dialog using `hlm-card` as the container

**Problem:** `hlm-dialog-content` hard-codes `sm:max-w-md` via its internal `classes()` constructor. Overriding via `class` attribute or `!important` both failed due to Tailwind cascade order being non-deterministic.

**Solution:** Skip `hlm-dialog-content` entirely. Render `<hlm-card>` directly inside `<ng-template hlmDialogPortal>`. `hlm-card` has no max-width, so `class="w-full min-w-[400px] sm:max-w-lg"` applies cleanly.

```html
<hlm-dialog>
  <button hlmDialogTrigger hlmBtn variant="ghost" size="sm"
    class="w-full justify-start gap-1.5 border border-primary text-primary hover:bg-primary/10 hover:text-primary"
    (click)="initDialog()">
    <ng-icon name="lucidePlus" class="size-4" />
    Add Question
  </button>
  <ng-template hlmDialogPortal>
    <hlm-card class="w-full min-w-[400px] sm:max-w-lg">
      <hlm-card-header>
        <h3 hlmCardTitle>Add Question</h3>
        <p hlmCardDescription>Fill in the details for your new question.</p>
      </hlm-card-header>
      <div hlmCardContent class="flex flex-col gap-4">
        <!-- Question Name -->
        <!-- Question Type (hlm-select) -->
        <!-- Description (hlmTextarea) -->
      </div>
      <hlm-card-footer class="justify-end gap-2">
        <button hlmBtn variant="outline" brnDialogClose>Cancel</button>
        <button hlmBtn hlmDialogClose (click)="confirmAdd()">Create</button>
      </hlm-card-footer>
    </hlm-card>
  </ng-template>
</hlm-dialog>
```

**Why `hlmDialogClose` on the Create button:** `BrnDialogClose` (applied via `hlmDialogClose`) programmatically closes the nearest `BrnDialog` ancestor. Adding it alongside `(click)="confirmAdd()"` means the handler emits the output first, then the directive closes the modal.

**Why `(click)="initDialog()"` on the trigger:** Pre-fills `newQuestionName` to `"Question N+1"` and resets type before the dialog renders, so the fields are correct on every open.

**Why `variant="ghost"` + explicit `border border-primary`:** `variant="outline"` applies `border-input` via CVA which competes with `border-primary` in the Tailwind cascade. `variant="ghost"` applies no border, so `border border-primary` wins without conflict.

---

### Step 6 — Delete button with `alertDialog` confirmation

```html
@if (activeIndex() === i) {
  <hlm-alert-dialog>
    <button hlmAlertDialogTrigger hlmBtn variant="ghost" size="icon"
      class="absolute right-1 top-1 size-7 text-destructive opacity-0 group-hover:opacity-100"
      (click)="$event.stopPropagation()">
      <ng-icon name="lucideTrash2" class="size-3.5" />
    </button>
    <ng-template hlmAlertDialogPortal>
      <div hlmAlertDialogContent>
        <div hlmAlertDialogHeader>
          <h3 hlmAlertDialogTitle>Delete question?</h3>
          <p hlmAlertDialogDescription>
            Are you sure you want to delete <strong>"{{ question.title }}"</strong>?
          </p>
        </div>
        <div hlmAlertDialogFooter>
          <button hlmAlertDialogCancel>Cancel</button>
          <button hlmAlertDialogAction variant="destructive" (click)="deleteQuestion.emit(i)">Delete</button>
        </div>
      </div>
    </ng-template>
  </hlm-alert-dialog>
}
```

**Why only on active card:** Shows on hover only for the currently selected card. Reduces visual noise and matches the mental model of "select, then act".

**Why `$event.stopPropagation()`:** The trash button is nested inside the card `<button>`. Without stop-propagation the click bubbles up and changes `activeIndex` before the dialog opens.

---

### Step 7 — Two-way binding on type, points, and time

New output on `QuizCreateQuestionEditorComponent`:
```ts
readonly questionChange = output<QuizQuestion>();
```

- **Type** via `(valueChange)` on `hlm-select` — also resets options when switching between types
- **Points / time** via `(change)` on `<input type="number">` — fires on blur/Enter, not every keystroke, avoiding intermediate NaN emissions

---

### Step 8 — Install and use `hlmTextarea`

```bash
ng g @spartan-ng/cli:ui --name=textarea
```

Imported via `HlmTextareaImports` from `@ui-lib/textarea`. Applied as `hlmTextarea` directive on `<textarea>` elements.

Replaced `hlmInput` (designed for `<input>`) on both textareas:
- `quiz-create-question-editor.ts` — question text field
- `quiz-create-questions-sidebar.ts` — description field in Add Question dialog

`hlmTextarea` applies `field-sizing-content` which auto-grows with content.

**Why `max-h-32 overflow-y-auto`:** `field-sizing-content` grows the textarea indefinitely. Capping at `max-h-32` (8rem / ~128px) keeps the layout stable and scrolls the content instead of pushing other elements.

---

## QuizQuestion model

```ts
export interface QuizQuestion {
  id: number;
  title: string;
  description?: string;       // optional — set from Add dialog
  type: 'multiple-choice' | 'true-false';
  points: number;
  timeLimit: number;
  options: string[];
  imageUrl?: string;
}
```

---

## Tasks
- [x] Convert `questions` from plain array to `signal<QuizQuestion[]>`
- [x] Install Spartan `dialog` component
- [x] Build "Add Question" dialog — `hlm-card` inside portal (name + type + description)
- [x] Pre-fill question name as "Question N+1" on dialog open
- [x] Add delete button with `alertDialog` confirmation showing question title
- [x] Empty-state guard (`col-span-2`) in quiz-create template
- [x] Restyle "Add Question" button (ghost + explicit border-primary)
- [x] Two-way binding on type, points, and time
- [x] Install Spartan `textarea`, replace `hlmInput` on all `<textarea>` elements
- [x] Cap textarea height with `max-h-32 overflow-y-auto`
- [x] Verify build is clean

## Questions

## Answers
1. Modal asks for type only — no question text field in the modal.
   → Updated: modal has Question Name, Type, and Description (optional).
2. Two-way binding for type, points, and time only (title/options stay display-only for now).

## Feedback

