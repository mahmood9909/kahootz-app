## Goal
Create quiz portal — a full-page editor for building quizzes, with sub-routes for editing and previewing.

## Description
A quiz creation portal consisting of a 3-column layout (question list sidebar | live preview | question editor).
Quizzes are identified by an `id` (future: from DB). The portal has two sub-routes under `quiz/`:
- `quiz/:id` — the editor (3-column layout)
- `quiz/:id/preview` — quiz preview stub (placeholder, to be built out later)

---

## Implementation — Step by Step

### Step 1 — Install Spartan UI components

**Components installed:** `badge`, `breadcrumb`, `card`, `icon`, `input`, `label`,
`scroll-area`, `select`, `separator`

**Command used for each:**
```bash
ng g @spartan-ng/cli:ui --name=<component>
```

**Why Spartan UI?**
The project uses the Spartan/UI (Brain + Helm) pattern — Brain primitives handle
accessibility and state; Helm copies live in `src/app/ui-lib/` and own the visual
styles. Every component is imported via the `@ui-lib/<name>` alias defined in
`tsconfig.json`, keeping consuming components decoupled from the file system layout.

---

### Step 2 — Nested child routing (`QuizLayoutComponent`)

**Files created:**
- `src/app/pages/quiz/quiz-layout.ts` — minimal `<router-outlet />` shell
- Routes in `src/app/app.routes.ts` changed from flat to nested `children` array

**Before (flat):**
```ts
{ path: 'quiz/create', loadComponent: () => import('./pages/quiz-create/quiz-create') }
```

**After (nested):**
```ts
{
  path: 'quiz',
  loadComponent: () => import('./pages/quiz/quiz-layout').then(m => m.QuizLayoutComponent),
  children: [
    { path: ':id',         loadComponent: () => import('./pages/quiz-create/quiz-create') },
    { path: ':id/preview', loadComponent: () => import('./pages/quiz-preview/quiz-preview') },
  ],
}
```

**Why a layout shell?**
Angular lazy-loads children relative to the parent outlet. Using a dedicated
`QuizLayoutComponent` that renders only `<router-outlet />` gives the quiz namespace
its own outlet without the root `app.html` outlet needing to know about quiz internals.
Children are still independently lazy-loaded for optimal bundle splitting.

**Why `display: contents` is NOT needed here:**
`QuizLayoutComponent` contains only `<router-outlet />` so the child component is the
first real DOM element. No sizing or layout issues arise.

---

### Step 3 — `/quizzes` list page (`QuizzesComponent`)

**File:** `src/app/pages/quizzes/quizzes.ts`

**What it renders:**
- Page header with "New Quiz" button → `/quiz/new`
- Responsive grid of quiz cards (Spartan `hlmCard`)
- Each card: title, question count badge, Edit button → `/quiz/:id`, Delete button
- Empty state when list is empty

**Why Spartan `hlmCard` and `hlmBadge`?**
Cards and badges carry semantic Tailwind colour tokens (`bg-card`, `text-muted-foreground`)
and respect the active theme. Using raw `<div>` with inline styles would break dark mode.

**Why mock data?**
The backend does not exist yet. `MOCK_QUIZZES` is a typed const; the real data
layer will be a signal-based service that replaces it without changing the template.

---

### Step 4 — Quiz editor page (`QuizCreateComponent`)

**File:** `src/app/pages/quiz-create/quiz-create.ts`

**State model:**
```ts
readonly activeIndex = signal(0);
readonly activeQuestion = computed(() => this.questions[this.activeIndex()]);
```

- `activeIndex` is a writable signal — updated by the sidebar via `(selectQuestion)` output.
- `activeQuestion` is derived via `computed()` — re-evaluates automatically whenever
  `activeIndex` changes with zero manual subscription management.

**Why signals instead of RxJS BehaviorSubject?**
Angular 17+ promotes signals as the primary reactive primitive for local component state.
`computed()` is synchronous and zero-overhead for derived values. BehaviorSubject would
require `async` pipe or manual subscriptions with teardown.

**Route param (quizId):**
```ts
readonly quizId = toSignal(
  this.route.paramMap.pipe(map(p => p.get('id') ?? 'new'))
);
```
`toSignal()` bridges the RxJS `ActivatedRoute` observable into a signal so the template
can read `quizId()` without `async` pipe, keeping `ChangeDetectionStrategy.OnPush` clean.

**Why `input.required<QuizQuestion>()`?**
Child components (`QuizCreateQuestionEditorComponent`, etc.) receive only the active
question, not the full list. Angular 17+ `input.required()` is the signal-based
equivalent of `@Input({ required: true })`, enforced at compile time with no default.

---

### Step 5 — 3-column layout

**Grid:**
```html
<div class="grid min-h-0 flex-1 grid-cols-[260px_1fr_320px] divide-x divide-border/50">
```

- Fixed 260 px sidebar, flexible centre, fixed 320 px editor panel.
- `min-h-0` prevents grid rows from overflowing when content is taller than the viewport
  (a known CSS grid gotcha — grid rows default to `min-height: auto`).
- `divide-x` draws 1 px borders between columns without extra wrapper elements.

**Child components and their responsibilities:**

| Component | File | Responsibility |
|---|---|---|
| `QuizCreateQuestionsSidebarComponent` | `components/quiz-create-questions-sidebar.ts` | Scrollable list of questions; emits `selectQuestion` on click |
| `QuizCreateQuestionPreviewComponent` | `components/quiz-create-question-preview.ts` | Centred card showing how the question looks to players |
| `QuizCreateQuestionEditorComponent` | `components/quiz-create-question-editor.ts` | Settings form: type, question text, points, time limit, answer options |

**Why split into three components?**
Each panel has a distinct responsibility and will grow independently (e.g., drag-to-reorder
in the sidebar, canvas rendering in the preview). Keeping them separate limits re-render
scope — `OnPush` means only the component whose `input` signal changed will re-render.

---

### Step 6 — Breadcrumbs

**Why `HlmBreadcrumbImports` instead of plain links?**
Spartan breadcrumb handles `aria-label="breadcrumb"`, `aria-current="page"` on the
active item, and correct list semantics automatically. This satisfies WCAG 2.1 SC 2.4.8
without manual ARIA attributes.

**Editor breadcrumb:** `Quizzes / Edit Quiz`
**Preview breadcrumb:** `Quizzes / Edit Quiz / Preview`

The "Edit Quiz" item in the preview breadcrumb links back to `/quiz/:id` using the
`quizId` signal from `ActivatedRoute`, so the link is always correct regardless of
whether the id is `new` or a real database id.

---

### Step 7 — Spartan `hlm-select` for question type

**Problem with native `<select>`:**
Native selects cannot be styled consistently across browsers and don't respect the
project's design tokens.

**Pattern used:**
```html
<hlm-select [value]="question().type" [itemToString]="questionTypeLabel">
  <hlm-select-trigger class="w-full">
    <hlm-select-value placeholder="Select type…" />
  </hlm-select-trigger>
  <ng-template hlmSelectPortal>
    <hlm-select-content>
      <hlm-select-item value="multiple-choice">Multiple Choice</hlm-select-item>
      <hlm-select-item value="true-false">True / False</hlm-select-item>
    </hlm-select-content>
  </ng-template>
</hlm-select>
```

**Why `<ng-template hlmSelectPortal>`?**
`HlmSelectPortal` applies `BrnPopoverContent` as a host directive.
`BrnPopoverContent` is the open/close gate — it renders its projected content
into a CDK overlay portal only when the select is open. Without this wrapper,
`<hlm-select-content>` is rendered unconditionally on page load, so the
dropdown appears permanently open.

**Why `[itemToString]`?**
`BrnSelectValue` (the Brain primitive behind `<hlm-select-value>`) uses
`itemToString` to convert the bound value to display text. The default is
the identity function, so without it `'multiple-choice'` is shown verbatim.
The mapping function resolves it to the human label:
```ts
readonly questionTypeLabel = (value: string): string =>
  ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;
```

---

## Bugs encountered and fixed

| Bug | Root cause | Fix |
|---|---|---|
| Select dropdown always open on page load | `<hlm-select-content>` rendered outside `BrnPopoverContent` gate | Wrapped in `<ng-template hlmSelectPortal>` |
| Select trigger showing `"multiple-choice"` not `"Multiple Choice"` | `itemToString` defaults to identity function | Added `[itemToString]="questionTypeLabel"` with human-label map |
| `@ui-lib/select` and `@ui-lib/icon` resolve errors | Stale `tsconfig.json` entries without Helm files on disk | Removed stale entries, re-ran `ng g @spartan-ng/cli:ui --name=<component>` |

---

## Questions

## Answers
