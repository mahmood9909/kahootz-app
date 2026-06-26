## Goal
restructure kahoot types ts

## Description
Rename and reshape all types so the platform is not quiz-game specific, enabling future support for forms, surveys, and other question-based formats. Types and their usages only — no component behavior changes.

## Confirmed Type Renames

| Old | New | Notes |
|-----|-----|-------|
| `QuestionType` | `QType` | rename only |
| `QuestionOption` | `QOptionsStruct` | rename only |
| `QuestionItemConfig` | *(removed)* | absorbed into `QStruct` |
| `QuizQuestion` | `QStruct` | rename + struct change |
| `Quiz` | `PlanStruct` | rename only |
| `CalculationAlgorithm` | `CalculationAlgorithm` | **keep as-is** (A1) |

## Confirmed New Shape

```typescript
export type QType = 'multiple-choice' | 'true-false';

export type CalculationAlgorithm = 'standard' | 'timer-based';

export type QOptionsStruct = {
  id: string;
  title: string;
  config: { cssClass: string };
  isCorrect?: boolean;
};

export type QStruct = {
  id: string;
  title: string;          // ← was: name  (see open Q2 below)
  description?: string;
  points: number;
  calculationAlgorithm: CalculationAlgorithm;
  timeLimit: number;
  imageUrl?: string;
  type: QType;
  options: QOptionsStruct[];  // ← was: quizConfig: QuestionItemConfig[] (A3 confirmed)
  answers?: string[];
};

export type PlanStruct = {
  id: string;
  title: string;
  description?: string;
  questions: QStruct[];
};
```

## Files That Will Change (13 total)

| # | File | What changes |
|---|------|-------------|
| 1 | `src/app/types/types.ts` | Full rewrite |
| 2 | `src/app/core/services/question.statemanagment.service.ts` | `QuizQuestion`→`QStruct`, `QuestionType`→`QType`, `quizConfig`→`options`, `name`→`title`? |
| 3 | `src/app/core/config/component.config.ts` | `QuestionType`→`QType` |
| 4 | `src/app/pages/quizeportal/components/shared/components/questioncontentcard/questioncontentcard.component.ts` | `QuizQuestion`→`QStruct` |
| 5 | `src/app/pages/quizeportal/components/shared/components/questioncontentcard/questioncontentcard.component.html` | `question().name`→`question().title`? |
| 6 | `src/app/pages/quizeportal/components/shared/components/questiontype/truefalse/truefalse.component.ts` | `QuizQuestion`→`QStruct` |
| 7 | `src/app/pages/quizeportal/components/shared/components/questiontype/multiplechoice/multiplechoice.component.ts` | `QuizQuestion`→`QStruct` |
| 8 | `src/app/pages/quizeportal/components/preview/questionpreview/questionpreview.quizepreview.component.ts` | `QuizQuestion`→`QStruct` |
| 9 | `src/app/pages/quizeportal/components/create/questionsidebar/questionsidebar.quizecreate.component.ts` | `QuestionType`→`QType` |
| 10 | `src/app/pages/quizeportal/components/create/questionsidebar/questionsidebar.quizecreate.component.html` | `question.name`→`question.title`? |
| 11 | `src/app/pages/quizeportal/components/create/questioneditor/questioneditor.quizecreate.component.ts` | `QuestionType`→`QType` |
| 12 | `src/app/pages/quizeportal/components/create/questioneditor/questioneditor.quizecreate.component.html` | `question().name`→`question().title`? |
| 13 | `src/app/pages/quizeportal/components/create/editorcanvas/editorcanvas.quizecreate.component.ts` | `QuizQuestion`→`QStruct` |

## Open Question

**Q2 (clarification needed)** — The `QuizQuestion.name` field (the question's display title) appears in 3 HTML templates as `question.name` / `question().name`. Your A2 said "anything with quize should be changed to plan" — that covers `quizConfig` → `options`. But specifically for the **field name** `name` on the question struct:

- **Option A** — rename `name` → `title` on `QStruct` (templates update to `.title`). Aligns with "QStruct will define question title."
- **Option B** — keep field as `name`, only rename the type (`QuizQuestion` → `QStruct`). Templates stay as `.name`.

Which option?

## Answers
will have name and title for question both are different both fileds should be there.

## Tasks
- [ ] Answer Q2 above
- [ ] Create v3 doc with final confirmed plan
- [ ] Implement all 13 file changes
- [ ] Verify TypeScript compiles with no errors after migration
