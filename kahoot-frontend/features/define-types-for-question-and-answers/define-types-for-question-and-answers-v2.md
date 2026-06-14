## Goal
Define types for question and answers

## Description
Centralise all TypeScript types into `src/app/types/types.ts`, reshape `QuizQuestion` to include `quizConfig`, empty the middle column of the quiz editor, install Angular CDK, and scaffold a `renderer` component in core.

---

## Analysis

### What changes

| Area | Current state | Target state |
|---|---|---|
| Types location | `src/app/core/models/quiz.models.ts` | `src/app/types/types.ts` |
| `QuizQuestion.title` | `string` | renamed to `name: string` |
| `QuizQuestion.quizConfig` | absent | `QuizConfigItem[]` — describes UI to render |
| Middle column | `quiz-create-question-preview` component | emptied (placeholder only) |
| Angular CDK | not installed | installed for drag-and-drop |
| Renderer component | absent | `src/app/core/renderer/renderer.ts` |

### New type shape (from instruction example)

```ts
// Primitives
type QuestionType         = 'multiple-choice' | 'true-false';
type CalculationAlgorithm = 'standard' | 'timer-based';

// Dynamic renderer config
interface QuizConfigItem {
  componentRef: string;       // e.g. 'input-field' | 'image-url' | 'mcq'
  props: Record<string, any>; // untyped for now as instructed
}

// Reshaped question
interface QuizQuestion {
  id:                  number;
  name:                string;           // renamed from title
  description?:        string;
  points:              number;
  calculationAlgorithm: CalculationAlgorithm;
  timeLimit:           number;
  imageUrl?:           string;
  type:                QuestionType;
  quizConfig:          QuizConfigItem[];
}

// Top-level quiz
interface Quiz {
  id:           number;
  title:        string;
  description?: string;
  questions:    QuizQuestion[];
}
```

### Renderer component (scaffold only)
- **Location:** `src/app/core/renderer/renderer.ts`
- **Input:** `configs: QuizConfigItem[]`
- Iterates over `configs` and renders each using `NgComponentOutlet` + a registry map (`componentRef` string → Angular component class)
- Registry and actual sub-components (`InputFieldComponent`, `McqComponent`, etc.) are **out of scope** for this task — scaffold only

---

## Proposed task list

- [ ] Create `src/app/types/types.ts` with all types above
- [ ] Add `@types/*` path alias to `tsconfig.json`
- [ ] Delete `src/app/core/models/quiz.models.ts`
- [ ] Update all imports in `quiz-create.ts` and all sub-components to use `@types/types`
- [ ] Rename `title` → `name` in `QuizQuestion` and every reference (interface, mock data, templates, sidebar display)
- [ ] Add `quizConfig: QuizConfigItem[]` to mock questions (empty array `[]` for now)
- [ ] Empty the middle column: clear `quiz-create-question-preview.ts` template to a blank placeholder `<div>`
- [ ] Install Angular CDK: `pnpm add @angular/cdk`
- [ ] Scaffold `src/app/core/renderer/renderer.ts` (standalone component, input `configs`, loops with `@for`, `NgComponentOutlet` — no actual sub-components yet)

---

## Questions

### Q1 — Types folder path
Instruction says "types folder in app." Assuming `src/app/types/types.ts` and alias `@types/types`. Correct?

### Q2 — `title` → `name` rename
Renaming `QuizQuestion.title` to `name` will update the left-sidebar display (currently shows `question.title`) and the settings panel Name field binding. All references will be updated. Confirm?

### Q3 — Keep `options: string[]` on `QuizQuestion`?
The MCQ `quizConfig` item already holds options inside `props`. Should `options: string[]` stay on `QuizQuestion` (useful for the sidebar summary and preview), or should it be removed in favour of `quizConfig` being the sole source?

### Q4 — Middle column
"Make middle empty" — should I:
a) Clear the `quiz-create-question-preview.ts` template to a `<div class="flex h-full items-center justify-center text-muted-foreground text-sm">Quiz editor coming soon</div>` placeholder, OR
b) Remove the component entirely and replace its slot with that placeholder inline in `quiz-create.ts`?

### Q5 — Drag and drop scope for CDK
CDK install is confirmed. What will be draggable in this task?
a) Questions in the left sidebar (reorder questions)
b) `QuizConfigItem` entries within the renderer (reorder config blocks)
c) Both — or just install now, wire up later?

### Q6 — Renderer component depth
For the scaffold: should the renderer just loop and render a `<p>{{ config.componentRef }}</p>` placeholder per item, or should I wire `NgComponentOutlet` with an empty registry map now?

---

## Answers

1. yes please to for type.
2. title is should be short represntation for the name.
3. remove options will not needed.
4. just make new component and add it to quiz preview please.
5. don't do anything for quiz preview create will take step by step just angular drag cdk for this matter and install lodash as well.
6. don't render component just creaye renderer component and will tell u how to do it.