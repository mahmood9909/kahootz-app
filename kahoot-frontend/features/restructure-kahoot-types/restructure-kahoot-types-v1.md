## Goal
restructure kahoot types ts

## Description
The current types are too quiz-game specific. Goal is to rename and reshape them so the platform can support forms, quizzes, and other question-based formats — not just game-based scenarios. No component migration yet; types and their usages only.

## Tasks
- [ ] rename `Quiz` => `PlanStruct`
- [ ] rename `QuizQuestion` => `QStruct`
- [ ] merge `QuestionItemConfig` into `QStruct` — remove it; `QStruct` has `options: QOptionsStruct[]` directly
- [ ] rename `QuestionOption` => `QOptionsStruct`
- [ ] rename `QuestionType` => `QType`
- [ ] update all 13 affected files to use new type names and new field names

## Questions

**Q1** — `CalculationAlgorithm` is not in the rename list. Should it stay as-is, or should it also be renamed (e.g. `CalcAlgorithm`)?

**Q2** — `QuizQuestion.name` (the question title field) appears in 3 HTML templates as `question.name` and in the service. Should it be renamed to `QStruct.title` to match the intent ("QStruct will define question title"), or should the field name stay `name` and only the type name changes?

**Q3** — Currently `quizConfig: QuestionItemConfig[]` is an **array**. The first mock question nests options as `quizConfig[0].options[...]`. After the merge, `QStruct.options: QOptionsStruct[]` will be a flat list. Is that correct — one question has one flat list of options directly?

**Q4** — `PlanStruct` (renamed from `Quiz`) is currently not imported by any component or service — only defined in types.ts. Should the service be updated to manage a `PlanStruct` signal (wrapping the questions array), or leave the service as-is for now and just rename the type?

## Answers
1. no need keep it as its.
2. for component anything with quize should be change to plan instead.
3. quize config is no needed QOptionsStruct will be array of options that refer to option of the Question we can use.
4. leave it as its , just side note all these will be imported from an API call later on.

## Instruction
- Analyze and plan migration — plan provided above, waiting for answers before implementing.
- Provide all files that will change — listed in the plan (13 files).
- Don't guess questions — posted above.
- Update all files to leverage new types once answers are confirmed.
- New version of this doc for every round of Q&A.
