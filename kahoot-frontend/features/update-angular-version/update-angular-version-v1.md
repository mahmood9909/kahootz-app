## Goal
Update Angular version

## Description
update project - angular version global + project version to add signal form to the project

## Tasks
- [ ] form should be avaiable to be used.

## Questions

1. **Target version** — The project is already on Angular 21.2.17 (installed) while `package.json` pins `^21.1.0`. Are you targeting Angular 22, or just locking the existing install to `^21.2.x`?

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