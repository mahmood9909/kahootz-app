## Goal
Upgrade to Angular 22 and adopt the official Signal Forms API project-wide

## Description
The project is currently on Angular 21.2.17. Angular 22 (released June 3, 2026) is the latest
stable version and is the first to ship Signal Forms as production-stable (they were experimental
in v21). Signal Forms live in `@angular/forms/signals` and use a `signal → form() → FormField`
pattern. All components that contain forms must use this API. Spartan UI components that wrap
inputs should also be wired to `FormValueControl<T>` if applicable.

## Tasks

### 0 — Prerequisite: update Node.js
- [ ] **BLOCKER** — Angular CLI 22 requires Node ≥ 24.15.0; current install is 24.13.0
- [ ] Download and install Node.js 24.x LTS (≥ 24.15.0) from https://nodejs.org or via `winget upgrade OpenJS.NodeJS.LTS`
- [ ] Verify with `node --version` before continuing

### 1 — Upgrade Angular packages to v22
- [ ] Run `ng update @angular/core@22 @angular/cli@22 @angular/cdk@22` and apply schematics
- [ ] Bump remaining `@angular/*` deps in `package.json` to `^22.0.0`
- [ ] Update `@angular/build` and `@angular/compiler-cli` to `^22.0.0`
- [ ] Run `pnpm install` and verify `ng version` reports v22

### 2 — Update companion packages
- [ ] Update `@spartan-ng/brain` and `@spartan-ng/cli` to their Angular-22-compatible release
- [ ] Update `@ng-icons/core` and `@ng-icons/lucide` if peer-dep conflict arises
- [ ] Verify `pnpm build` succeeds with no type errors

### 3 — Wire Signal Forms into the project
- [ ] Confirm `@angular/forms` v22 is installed (no separate install needed — ships in the package)
- [ ] Document the import path in `CLAUDE.md`: `import { form, FormField, required, ... } from '@angular/forms/signals'`
- [ ] Apply Signal Forms to **sign-in page** (email + password fields)
- [ ] Apply Signal Forms to **sign-up page** (email, password, confirm-password fields)
- [ ] Apply Signal Forms to **question editor** if it has any editable text inputs
- [ ] Ensure `FormField` directive is in every consuming component's `imports` array

### 4 — Spartan UI interop
- [ ] Check if any Spartan Helm components wrap `<input>` or `<textarea>` — if so, implement `FormValueControl<T>` so they work with `[formField]`
- [ ] Verify `[formField]` binding works end-to-end with Spartan `HlmInput` (or equivalent)

### 5 — Smoke test
- [ ] `pnpm build` — zero errors
- [ ] `pnpm test` — all tests pass
- [ ] Dev server: manually fill and submit sign-in and sign-up forms

## Questions

1. **Target version** — The project is already on Angular 21.2.17 while `package.json` pins `^21.1.0`. Are you targeting Angular 22, or just locking the existing install to `^21.2.x`?

2. **Signal forms API** — "Signal forms" could mean different things in Angular 21. Which one do you want?
   - **a)** Angular's official experimental signal-based forms API (`FormField`, `SignalInput` etc.) if available in the target version
   - **b)** Wrapping existing `ReactiveFormsModule` controls with `signal()` / `computed()` manually
   - **c)** A specific community library (e.g. `ngxtension` form helpers)?

3. **"Global" update** — By "global + project version", do you mean also updating the Angular CLI installed globally on the machine (`npm install -g @angular/cli@latest`), or just the project's `package.json` dependencies?

4. **Scope of forms usage** — Which page/component should be the first consumer of signal forms once set up? (e.g. sign-in, sign-up, question editor, plan creation?)

5. **Existing forms** — There are currently zero forms in the codebase. Is this purely additive (no migration), or will we also revisit the sign-in/sign-up pages once forms are introduced?

## Answers
1. latest angular will have signal form so latest stable version is one should be used.
2. no A should be the one where u define signal objecy then pass it to form function and then give to input fields.
3. all components should use it , if there is form utilize it plesae.
4. also if ui library should be migrated for spartan do it also.
