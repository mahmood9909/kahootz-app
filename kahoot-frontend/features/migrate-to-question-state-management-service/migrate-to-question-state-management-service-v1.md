## Goal
Migrate all components to use QuestionStateManagementService from `@core/services/question.statemanagment.service.ts`

## Description
will use service with singal to matain the current selected question insead of using alot of input and output

## Tasks
- [ ] Expand `QuestionStateManagementService` — add `questions[]` signal, `activeIndex` signal, `activeQuestion` computed, and methods `setActiveIndex`, `addQuestion`, `removeQuestion`, `updateQuestion`. Move `MOCK_QUESTIONS` here with `crypto.randomUUID()` IDs on all questions, options, and configs.
- [ ] Simplify `QuizecreatePageComponent` — remove local signals/computed/methods, expose `stateService` for template access, clean up template bindings.
- [ ] Migrate `QuestionsidebarComponent` — remove all `input()`/`output()`, inject service, call service methods directly from template and class.
- [ ] Migrate `EditorcanvasComponent` — remove `question` input, inject service, read `activeQuestion` from service in the effect.
- [ ] Migrate `QuestioneditorComponent` — remove `question` input and `questionChange` output, inject service, call `updateQuestion` directly.
- [ ] ID migration — use `crypto.randomUUID()` for all IDs (questions, options, configs) everywhere new entities are created.

## Questions


## Answers
