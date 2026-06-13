## Goal
add / remove question

## Description
Make the Add and Remove question buttons functional in the quiz editor sidebar.
When no questions exist the right panel shows an empty state instead of a broken form.
The "Add Question" button gets a blue accent to stand out as a primary action.
Deletion is guarded by a confirmation dialog showing the question title.
Type, points, and time fields in the editor panel are two-way bound to the question signal.

---

## Current State (as of v4)

### Add Question dialog
- Triggered by "Add Question" button at the bottom of the sidebar
- Button styled with blue accent (`border-primary text-primary`) using `variant="ghost"` + explicit border
- Dialog width: `sm:max-w-2xl` (two-column layout)
- **Left column:** Question Name (pre-filled as "Question N+1") + Question Type dropdown
- **Right column:** Description textarea (optional, fixed height `rows="6"`, scrollable)
- Footer: **Create** (primary, left) | **Cancel** (destructive, right)
- On Create: pushes new question stub to the signal, auto-focuses it in the sidebar

### Delete question
- Trash icon appears on hover over the active sidebar card
- Clicking opens an `alertDialog` with the question title in the confirmation message
- On confirm: removes question from signal, clamps `activeIndex` to stay in bounds

### Empty state
- When no questions exist, the preview + editor columns show a centred placeholder
- Uses `col-span-2` to fill both right columns of the 3-column grid

### Editor panel two-way binding
- Type, points, and time changes in the right panel update the question signal immediately
- Type change also resets options (MC → 4 blank slots, TF → ['True', 'False'])

### QuizQuestion model
```ts
export interface QuizQuestion {
  id: number;
  title: string;
  description?: string;       // added — optional, set from the Add dialog
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
- [x] Build "Add Question" dialog (name + type + description → adds stub, focuses it)
- [x] Add delete button to active question card with `alertDialog` confirmation
- [x] Add empty-state guard in quiz-create template (editor + preview panels)
- [x] Restyle "Add Question" button to blue accent
- [x] Two-way binding on type, points, and time in the editor panel
- [x] Pre-fill question name as "Question N+1" when dialog opens
- [x] Replace dialog preview card with description textarea (optional, scrollable)
- [x] Verify build is clean

## Questions

## Answers
1. Modal asks for type only — no question text field in the modal.
   → Updated: modal now also has a Question Name field and a Description textarea.
2. Two-way binding for type, points, and time only (title/options stay display-only for now).

## Feedback
1. model still neither ui nor ux right so we need to fix it such that 

Question name field (input field )
expand width such that it occupy the arvaivlbe space

Question Type (input field )
expand width such that it occupy the arvaivlbe space

Question Description (input field )
expand width such that it occupy the arvaivlbe space

2. make create to right and cancel to the left and push the two button to the right of the mode
