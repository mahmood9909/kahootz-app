## Goal
Create TrueFalseComponent to be rendered in the question canvas depending on Question type

## Description
Every question type renders a different component inside the editor canvas via a dynamic component registry (`QUESTION_COMPONENT_REF` injection token). `TrueFalseComponent` is the entry point for `type: 'true-false'` questions. It is composed of shared sub-components (content card, image holder) and a true-false-specific options component.

### Architecture
- **Canvas** (`editorcanvas.quizecreate.component.ts`) calls `createComponent()` + `setInput('question', ...)` to dynamically mount the question-type component.
- **Registry** (`core/config/component.config.ts`) maps `'true-false'` → lazy import of `TrueFalseComponent`.
- **TrueFalseComponent** composes shared + specific sub-components.

---

## File locations (post project-structure refactor)

| Component | Path |
|-----------|------|
| `TrueFalseComponent` | `pages/quizeportal/components/shared/components/questiontype/truefalse/` |
| `QuestioncontentcardComponent` | `pages/quizeportal/components/shared/components/questioncontentcard/` |
| `EditorcanvasComponent` | `pages/quizeportal/components/create/editorcanvas/` |
| Registry | `core/config/component.config.ts` |

---

## Sub-component plan

| # | Component | File | Location | Shared? | Status |
|---|-----------|------|----------|---------|--------|
| 1 | `QuestioncontentcardComponent` | `questioncontentcard.component.ts` | `shared/components/questioncontentcard/` | Yes | ✅ Done |
| 2 | `QuestionimageComponent` | `questionimage.component.ts` | `shared/components/questionimage/` | Yes | ⬜ Next |
| 3 | `TruefalseoptionsComponent` | `options.truefalse.component.ts` | `questiontype/truefalse/components/options/` | No | ⬜ Pending |

---

## Tasks
- [x] Scaffold `TrueFalseComponent` with `ng g component`
- [x] Register `TrueFalseComponent` in `QUESTION_COMPONENT_REF` (replaces TestComponent placeholder)
- [x] Fix canvas (`EditorcanvasComponent`) to call `setInput('question', this.question())` after `createComponent`
- [x] Scaffold `QuestioncontentcardComponent` with `ng g component` — shared editable card at top of canvas
- [x] Wire `QuestioncontentcardComponent` into `TrueFalseComponent` template
- [ ] Scaffold `QuestionimageComponent` — shared, renders only when `question().imageUrl` exists
- [ ] Wire `QuestionimageComponent` into `TrueFalseComponent` template
- [ ] Scaffold `TruefalseoptionsComponent` — two large buttons (True / False) specific to this question type
- [ ] Wire `TruefalseoptionsComponent` into `TrueFalseComponent` template

---

## Completed work detail

### TrueFalseComponent
- Selector: `quizeportal-truefalse`
- Input: `question = input.required<QuizQuestion>()`
- Output: `questionChange = output<QuizQuestion>()`
- Currently renders: `QuestioncontentcardComponent`

### QuestioncontentcardComponent
- Selector: `quizeportal-questioncontentcard`
- Input: `question = input.required<QuizQuestion>()`
- Output: `questionChange = output<QuizQuestion>()`
- Template: centered card with an auto-resize textarea bound to `question().name`

### Canvas fix
`EditorcanvasComponent` now calls:
```ts
const componentRef = this.containerRef().createComponent(await ref.component());
componentRef.setInput('question', this.question());
```

---

## Naming conventions (per project structure doc)
- File: `componentname.component.ts` / `.html` (lowercase, no dashes)
- Class: `PascalCaseComponent`
- Selector: `quizeportal-componentname` (feature prefix)
- Sub-component files: `subname.parentname.component.ts`
- Generate: `ng g c path/componentname --skip-tests` → rename generated files, delete `.scss`

---

## Questions

Q1. `QuestionimageComponent` — should it be read-only (display only) or allow the user to upload/paste an image URL inline in the canvas?

Q2. `TruefalseoptionsComponent` — the True and False buttons: should they be interactive in the create canvas (e.g. clicking shows which is correct) or purely visual tiles with no click behaviour for now?

## Answers

