## Goal
Define and enforce project folder structure and component naming conventions

## Description
Defined a consistent folder layout and naming standard before the codebase grew too large to refactor safely. All quiz-related pages and components were moved into a `quizeportal` feature area. Naming rules were codified into two skill files so Claude follows them automatically in future sessions.

All changes from v1 have been applied. This document is the living reference going forward.

---

## Folder structure (final)

```
src/app/
├── core/                                    ← unchanged (services, config, tokens)
├── pages/
│   ├── home/
│   │   ├── home.page.component.ts
│   │   └── home.page.component.html
│   ├── signin/
│   │   ├── signin.page.component.ts
│   │   └── signin.page.component.html
│   ├── signup/
│   │   ├── signup.page.component.ts
│   │   └── signup.page.component.html
│   ├── dashboard/
│   │   ├── dashboard.page.component.ts
│   │   └── dashboard.page.component.html
│   ├── quizesplan/                          ← quiz listing (NOT in quizeportal)
│   │   ├── quizesplan.page.component.ts
│   │   └── quizesplan.page.component.html
│   └── quizeportal/                         ← everything quiz create/preview
│       ├── quizeportal.page.component.ts    ← router-outlet shell
│       ├── quizeportal.page.component.html
│       ├── create/
│       │   ├── quizecreate.page.component.ts
│       │   └── quizecreate.page.component.html
│       ├── preview/
│       │   ├── quizepreview.page.component.ts
│       │   └── quizepreview.page.component.html
│       └── components/
│           ├── create/
│           │   ├── editorcanvas/
│           │   │   ├── editorcanvas.quizecreate.component.ts
│           │   │   └── editorcanvas.quizecreate.component.html
│           │   ├── questioneditor/
│           │   │   ├── questioneditor.quizecreate.component.ts
│           │   │   └── questioneditor.quizecreate.component.html
│           │   └── questionsidebar/
│           │       ├── questionsidebar.quizecreate.component.ts
│           │       └── questionsidebar.quizecreate.component.html
│           ├── preview/
│           │   └── questionpreview/
│           │       ├── questionpreview.quizepreview.component.ts
│           │       └── questionpreview.quizepreview.component.html
│           └── shared/
│               └── components/
│                   ├── questioncontentcard/
│                   │   ├── questioncontentcard.component.ts
│                   │   └── questioncontentcard.component.html
│                   └── questiontype/
│                       ├── truefalse/
│                       │   ├── truefalse.component.ts
│                       │   └── truefalse.component.html
│                       └── multiplechoice/
│                           ├── multiplechoice.component.ts
│                           └── multiplechoice.component.html
├── shared/
│   └── components/
│       └── navbar/                          ← renamed from nav-bar/
│           ├── navbar.component.ts
│           └── navbar.component.html
└── ui-lib/                                  ← Spartan UI Helm copies, never move
```

---

## Naming rules (enforced)

### Files
| Type | Pattern | Example |
|------|---------|---------|
| Page | `pagename.page.component.ts` + `.html` | `signin.page.component.ts` |
| Feature component | `componentname.featurepage.component.ts` + `.html` | `editorcanvas.quizecreate.component.ts` |
| Shared / standalone component | `componentname.component.ts` + `.html` | `questioncontentcard.component.ts` |
| Question-type sub-component | `subname.parentquestiontype.component.ts` | `options.truefalse.component.ts` |

- All lowercase, no dashes (`-`), no underscores in file names
- Every component = exactly **2 files**: `.ts` + `.html`
- No inline templates, no per-component `.scss`

### Classes
| Type | Pattern | Example |
|------|---------|---------|
| Page | `PascalCasePageComponent` | `SigninPageComponent`, `QuizecreatePageComponent` |
| Component | `PascalCaseComponent` | `EditorcanvasComponent`, `NavbarComponent` |

### Selectors
| Context | Pattern | Example |
|---------|---------|---------|
| Page | `page-pagename` | `page-signin`, `page-quizecreate` |
| Global shared component | `app-componentname` | `app-navbar` |
| Feature component (quizeportal) | `quizeportal-componentname` | `quizeportal-editorcanvas` |

All selectors are **element selectors**.

### Component sub-folders
Each component lives in its own folder named after the component. The folder is created by `ng g component`. Files inside match the folder name:

```
editorcanvas/
  editorcanvas.quizecreate.component.ts
  editorcanvas.quizecreate.component.html
```

---

## Generation workflow (`ng g c`)

```bash
# 1. Generate (always --skip-tests)
ng g component pages/<path>/<componentname> --skip-tests

# 2. Rename generated files to match convention
#    Generated:  componentname.ts + componentname.html + componentname.scss
#    Rename to:  componentname.component.ts + componentname.component.html
#    Delete:     componentname.scss

# 3. Update class name → PascalCaseComponent
# 4. Update selector → correct prefix (page- / app- / quizeportal-)
# 5. Add ChangeDetectionStrategy.OnPush
# 6. Update templateUrl to match renamed html file
```

Skill reference: `.agents/skills/angular-developer/references/component-generation.md`

---

## Skill files created

| File | Purpose |
|------|---------|
| `.agents/skills/angular-developer/references/project-structure.md` | Folder layout + naming rules |
| `.agents/skills/angular-developer/references/component-generation.md` | `ng g c` workflow + post-generation checklist |

---

## Tasks
- [x] Move quiz pages into `quizeportal/` feature folder
- [x] Move quiz-create sub-components into `quizeportal/components/create/`
- [x] Move quiz-preview sub-components into `quizeportal/components/preview/`
- [x] Move question-type components into `quizeportal/components/shared/components/questiontype/`
- [x] Rename all pages to `pagename.page.component.ts` pattern
- [x] Rename all page classes to `PascalCasePageComponent`
- [x] Rename all component classes to `PascalCaseComponent`
- [x] Update all selectors (page-* / app-* / quizeportal-*)
- [x] Give each component its own sub-folder (`ng g c` pattern)
- [x] Change `component/` → `components/` (plural) throughout
- [x] Rename `nav-bar/nav-bar.ts` → `navbar/navbar.component.ts`
- [x] Update `app.ts` and `app.html` to use new `NavbarComponent` + `app-navbar`
- [x] Create skill file: `project-structure.md`
- [x] Create skill file: `component-generation.md`
- [x] Verify clean build after all changes

---

## Questions


## Answers


## Feedback
1. Files within a sub-folder (e.g. `components/create/`) should each have their own folder the way Angular generates them with `ng g c path/componentName`.
2. `create` folder has one sub-folder per component; same for `preview` and `shared/components/questiontype/`.
3. `component` renamed to `components` (plural) everywhere.
