## Goal
Create quiz portal — a full-page editor for building quizzes, with sub-routes for editing and previewing.

## Description
A quiz creation portal consisting of a 3-column layout (question list sidebar | live preview | question editor).
Quizzes are identified by an `id` (future: from DB). The portal has two sub-routes under `quiz/`:
- `quiz/:id` — the editor (3-column layout, current implementation)
- `quiz/:id/preview` — functional quiz preview once the quiz is configured

Breadcrumb in the toolbar shows the current location. `Select` component is used in the question type field.

### Layout (editor route)
```
┌─────────────────────────────────────────────────────────┐
│  [← Back]  Quiz › Edit        [Save Draft] [Publish]    │  ← toolbar + breadcrumb
├──────────────┬──────────────────────────┬───────────────┤
│ QUESTIONS    │  PREVIEW                 │  EDITOR       │
│  260px       │  flex-1                  │  320px        │
│              │                          │               │
│ ● Q1: …     │  [image placeholder]     │  Type         │
│   Q2: …     │  Question title          │  [Select ▾]   │
│   Q3: …     │  A ○  B ○               │  Question     │
│             │  C ○  D ○               │  [textarea]   │
│  [+ Add]    │                          │  Pts  Time    │
└──────────────┴──────────────────────────┴───────────────┘
```

### Routes
```
quiz/
├── :id           → QuizCreateComponent  (editor — current 3-col layout)
└── :id/preview   → QuizPreviewComponent (functional preview — future)
```

## Tasks
- [ ] Install `select` Spartan component via `/add-spartan-component select`
- [ ] Install `breadcrumb` Spartan component via `/add-spartan-component breadcrumb`
- [ ] Replace native `<select>` in question editor with Spartan `hlm-select`
- [ ] Add `HlmBreadcrumbImports` to toolbar: `Quiz > Edit` (links to `quiz/:id`)
- [ ] Update routing: change `quiz/create` → `quiz/:id`, add `quiz/:id/preview` child route
- [ ] Create stub `QuizPreviewComponent` at `pages/quiz-preview/quiz-preview.ts`
- [ ] add another preview button for previes path.
- [ ] Verify build is clean

## Questions

## Answers
