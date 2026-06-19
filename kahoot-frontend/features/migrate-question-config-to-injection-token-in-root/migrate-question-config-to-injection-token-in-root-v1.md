## Goal
Migrate QuestionComponentRef from a plain exported constant to an Angular InjectionToken provided in root

## Source Feature
- **Doc**: `kahoot-frontend/features/true-false-component/true-false-component-v1.md`
- **Current approach**: `QuestionComponentRef` is a plain `const` exported from `src/app/core/config/component.config.ts` and statically imported wherever it is needed (e.g. `QuizCreateEditorCanvasComponent`).

## Target Approach
Angular `InjectionToken` provided in root so that `QuestionComponentRef` is part of the DI tree and can be overridden, extended, or mocked in tests without changing import paths.

## Description
I am working on new config for loading components using a config-driven approach. The registry maps each `QuestionType` to a lazy-loaded component factory and metadata. Currently the registry is a module-level constant that is statically imported.

Migration: replace the exported `const` with an `InjectionToken<QuestionComponentRegistry>` registered via `provideQuestionComponents()` in `app.config.ts` (or equivalent root provider), and inject it with `inject()` at the usage site.

## Migration Tasks
- [x] Define the `QuestionComponentRegistry` type and the `QUESTION_COMPONENT_REF` injection token in `core/config/component.config.ts`.
- [x] Create a `provideQuestionComponents()` helper that returns the provider for root registration.
- [x] Register `provideQuestionComponents()` in `app.config.ts`.
- [x] Update `QuizCreateEditorCanvasComponent` to use `inject(QUESTION_COMPONENT_REF)` instead of the static import.
- [x] Remove the plain `const` export from `component.config.ts`.
- [x] Verify build is clean and the canvas still loads question-type components correctly.

## Questions


## Answers
