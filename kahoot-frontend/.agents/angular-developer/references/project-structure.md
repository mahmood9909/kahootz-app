# Project Folder Structure & Naming Conventions

This document defines the **enforced** folder layout and naming rules for this project.
Always follow these exactly — never invent new patterns.

---

## Folder layout

```
src/app/
├── core/                          # singleton services, config, injection tokens
├── pages/                         # routed page components (lazy-loaded)
│   ├── home/
│   ├── signin/
│   ├── signup/
│   ├── dashboard/
│   ├── quizesplan/                # quiz listing page (not part of quizeportal)
│   └── quizeportal/               # feature area: everything quiz-create/preview related
│       ├── quizeportal.page.component.ts   # router-outlet shell
│       ├── create/                # quiz-create page
│       ├── preview/               # quiz-preview page
│       └── component/
│           ├── create/            # components used only by quiz-create
│           ├── preview/           # components used only by quiz-preview
│           └── shared/
│               └── component/
│                   └── questiontype/   # question-type components (TrueFalse, MultipleChoice…)
├── shared/
│   └── components/                # globally reusable UI components (nav-bar, etc.)
└── ui-lib/                        # Spartan UI Helm copies — NEVER move
```

---

## File naming rules

| Type | Pattern | Example |
|------|---------|---------|
| Page | `pagename.page.component.ts` | `signin.page.component.ts` |
| Page template | `pagename.page.component.html` | `signin.page.component.html` |
| Component | `componentname.parentname.component.ts` | `editorcanvas.quizecreate.component.ts` |
| Component template | `componentname.parentname.component.html` | `editorcanvas.quizecreate.component.html` |
| Shared/global component | `componentname.component.ts` | `truefalse.component.ts` |
| Sub-component of a question type | `subname.parentquestiontype.component.ts` | `options.truefalse.component.ts` |

**Rules:**
- All file names are **lowercase only**, no dashes (`-`), no underscores.
- Every component must have exactly **two files**: `.ts` + `.html` (no inline templates).
- Always generate with `ng g component` — never create files manually.

---

## Class naming rules

| Type | Pattern | Example |
|------|---------|---------|
| Page class | `PascalCasePageComponent` | `SigninPageComponent` |
| Component class | `PascalCaseComponent` | `EditorcanvasComponent`, `TrueFalseComponent` |

---

## Selector naming rules

| Context | Pattern | Example |
|---------|---------|---------|
| Page | `page-pagename` | `page-signin`, `page-quizecreate` |
| Globally reusable component | `app-componentname` | `app-navbar` |
| Feature-specific component (quizeportal) | `quizeportal-componentname` | `quizeportal-editorcanvas` |

All selectors are **element selectors** (e.g. `<page-signin />`, not attribute style).

---

## What stays outside quizeportal

- `pages/quizesplan/` — quiz listing page (browsing quizzes, not authoring)
- `shared/components/nav-bar/` — global UI, not quiz-specific
- `core/` — never moves
