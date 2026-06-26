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
| `CalculationAlgorithm` | `CalculationAlgorithm` | keep as-is |

## Open Question

**Q2-follow-up** — You said `QStruct` should have **both** `name` and `title` as different fields. Currently `QuizQuestion` only has `name`. Please clarify what each field represents:

- `name` — what does it store? (e.g. a short internal identifier, a slug?)
- `title` — what does it store? (e.g. the full question text shown to the user?)

Once answered I can write the final confirmed shape and proceed to implementation.

## Answers

1. name will be slug or shor identifer of the form that can represnt QStruct.
2. title will be actual title of the question.
3. no need for u to print out the ttile I will make this happen later no worry.
## Tasks
- [ ] Answer Q2-follow-up above
- [ ] Finalize `QStruct` shape with both `name` and `title`
- [ ] Implement all 13 file changes
- [ ] Verify TypeScript compiles with no errors after migration
