# Generating Components — Project Conventions

Always use `ng g component` (alias `ng g c`). Never create `.ts` or `.html` files manually.
Run all commands from the `kahoot-frontend/` directory.

---

## Command format

```bash
ng g component <path/to/componentname> --no-standalone false
```

`ng g c` is the short alias. The path is relative to `src/app/`.

> **Dry-run first**: add `--dry-run` to preview generated paths before committing.

---

## Path & name mapping

The CLI derives the file name and class name from the last segment of the path.
To match project naming rules, pass the **full file-name stem** (without `.ts`) as the last path segment.

### Page component

Goal: `pages/signin/signin.page.component.ts` → class `SigninPageComponent`

```bash
ng g c pages/signin/signin.page.component
```

Generated files:
```
src/app/pages/signin/signin.page.component.ts
src/app/pages/signin/signin.page.component.html
src/app/pages/signin/signin.page.component.scss
src/app/pages/signin/signin.page.component.spec.ts
```

Then immediately set the selector and class name in the `.ts` file:
```ts
@Component({
  selector: 'page-signin',
  ...
})
export class SigninPageComponent { ... }
```

### Feature component (quizeportal)

Goal: `pages/quizeportal/component/create/editorcanvas.quizecreate.component.ts`

```bash
ng g c pages/quizeportal/component/create/editorcanvas.quizecreate.component
```

Then set selector to `quizeportal-editorcanvas` and class to `EditorcanvasComponent`.

### Shared question-type component

Goal: `pages/quizeportal/component/shared/component/questiontype/truefalse.component.ts`

```bash
ng g c pages/quizeportal/component/shared/component/questiontype/truefalse.component
```

Then set selector to `quizeportal-truefalse` and class to `TrueFalseComponent`.

### Sub-component of a question type

Goal: `options.truefalse.component.ts` inside a `truefalse/components/` sub-folder

```bash
ng g c pages/quizeportal/component/shared/component/questiontype/truefalse/components/options.truefalse.component
```

Selector: `quizeportal-truefalse-options`, class: `OptionsComponent`.

---

## Post-generation checklist

After every `ng g c`:

1. **Rename the class** to match `PascalCasePageComponent` or `PascalCaseComponent`.
2. **Set the selector** following the selector rules in `project-structure.md`.
3. **Add `ChangeDetectionStrategy.OnPush`** to every component.
4. **Delete the `.scss` file** — project uses Tailwind utility classes in the template; no per-component SCSS needed unless explicitly required.
5. **Delete the `.spec.ts` file** unless writing a test for this component right now.
6. Move template content into the generated `.html` file (never use inline `template:`).

---

## Common flags

| Flag | Use |
|------|-----|
| `--dry-run` | Preview file paths without writing |
| `--skip-tests` | Skip generating `.spec.ts` |
| `--inline-style` | Skip `.scss` file (use only if no per-component styles needed) |
| `--change-detection OnPush` | Set OnPush automatically |
