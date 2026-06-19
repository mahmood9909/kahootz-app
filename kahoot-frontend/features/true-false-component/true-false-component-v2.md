## Goal
Create TrueFalseComponent to be rendered in the question canvas depending on Question type

## Description
The canvas (`quiz-create-editor-canvas.ts`) dynamically creates a component based on `question().type`
using the `QUESTION_COMPONENT_REF` injection token. `TrueFalseComponent` will replace the current
`TestComponent` placeholder for the `'true-false'` type.

### Current wiring (already in place)
- `QUESTION_COMPONENT_REF` token + `provideQuestionComponents()` registered at root in `app.config.ts`
- `QuizCreateEditorCanvasComponent` calls `createComponent(await ref.component())` — no inputs passed yet
- `QuizQuestion` shape: `{ type, imageUrl?, quizConfig: QuestionItemConfig[], points, timeLimit, ... }`

### Sub-components planned
| # | Component | Location | Shared? |
|---|-----------|----------|---------|
| 1 | `QuestionContentCardComponent` | `shared/components/question-content-card/` | Yes — reused by all question types |
| 2 | `QuestionImageComponent` | `shared/components/question-image/` | Yes — reused by all question types |
| 3 | `TrueFalseOptionsComponent` | `true-false/components/true-false-options/` | No — true-false only |
| 4 | `TrueFalseComponent` (root) | `pages/quiz-create/true-false/` | No — entry point registered in token |

## Tasks
- [ ] Answer open questions in v2 (see Questions section)
- [ ] Scaffold `TrueFalseComponent` with `ng g component`
- [ ] Register `TrueFalseComponent` in `QUESTION_COMPONENT_REF` (replace TestComponent)
- [ ] Pass `QuizQuestion` input into the dynamically created component from the canvas
- [ ] Scaffold `QuestionContentCardComponent` (shared)
- [ ] Scaffold `QuestionImageComponent` (shared, conditional render on `imageUrl`)
- [ ] Scaffold `TrueFalseOptionsComponent` (true-false specific)
- [ ] Wire all sub-components into `TrueFalseComponent` template

## Questions

Q1. **Input passing into dynamic component**
The canvas calls `createComponent(...)` but never sets inputs on the created ref.
Should we:
  - (a) Use `setInput('question', this.question())` on the `ComponentRef` after creation, or
  - (b) Pass data via a shared signal/service instead of component inputs?

Q2. **Folder for TrueFalseComponent root**
Where should the root component live?
  - (a) `src/app/pages/quiz-create/true-false/` (co-located with the page that uses it)
  - (b) `src/app/shared/true-false/` (alongside shared components)

Q3. **True/False option labels**
Are the option labels ("True" / "False") hardcoded in `TrueFalseOptionsComponent`, or
should they be driven by `quizConfig.options` from the question data?

Q4. **QuestionContentCard — editable or read-only?**
In the quiz-create context is the question content card:
  - (a) Editable textarea (user types the question text inline in the canvas), or
  - (b) Read-only display of `question.name`?

Q5. **Styling for option buttons**
For the two True/False buttons, should they follow Kahoot-style large coloured tiles
(e.g. green = True, red = False) or use the existing spartan/ui button styles?

## Answers

Q1. user skills define in project root in ./agents/skill/angular-developer there are bunch of skill for angular of how to set angular signal input.
Q2. create folder called quize portal that will containts all quize creattion , preview , canvas quize pages/ and components/shared  components/quistion-type.
Q3. True and flase the question can be true and false and values but for labels it's not a must.
Q4. this is sub component will take them once by one
Q5. sub component will be step by step.