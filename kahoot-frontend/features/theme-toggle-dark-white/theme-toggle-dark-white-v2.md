## Goal
Theme toggle dark-white

## Description
Add the ability to switch between light and white theme. Architecture must be
extensible so additional themes (e.g. a brand colour theme) can be added later
without refactoring. The toggle logic lives under `src/app/theme/` as a utility.

## Analysis

### How PrimeNG dark mode works

PrimeNG Aura has a built-in dark palette. It activates when a CSS class (e.g. `.app-dark`)
is present on the `<html>` element. We configure this once in `providePrimeNG`:

```ts
providePrimeNG({
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.app-dark' }
  }
})
```

PrimeNG then injects two `:root` blocks — one default (light), one scoped to `.app-dark` —
covering every component automatically.

### Proposed file structure

```
src/app/theme/
  theme.service.ts     ← signal-based service, manages active theme + persistence
```

The service will:
- Hold a signal `theme: Signal<'light' | 'dark'>` (union extensible to more themes later)
- Toggle the `.app-dark` class on `document.documentElement`
- Persist the choice to `localStorage` so it survives page refreshes

### `body` background

`styles.scss` currently has `background-color: #ffffff` hard-coded.
It must also respond to the dark class:

```scss
body { background-color: #ffffff; }
.app-dark body { background-color: #09090b; }
```

## Questions

1. **Toggle UI placement**: Where should the toggle button live?
   - (a) Floating button fixed to a corner of the screen
   - (b) Inside a top navigation / header bar (to be built)
   - (c) Just the service for now — no UI yet, tested via the service directly

2. **Initial theme default**: What should the app default to on first load?
   - (a) Always light
   - (b) Follow the OS `prefers-color-scheme` setting
   - (c) Last saved preference from localStorage (default light if none saved)

3. **Persistence**: Should the chosen theme persist across page refreshes via `localStorage`?

## Tasks
- [x] Plan and analyze before implementation.
- [ ] Answer questions above.
- [ ] Configure `darkModeSelector` in `app.config.ts`.
- [ ] Create `src/app/theme/theme.service.ts`.
- [ ] Update `styles.scss` dark body background.
- [ ] Add toggle UI (location TBD from Q1).
- [ ] Verify: switching theme updates PrimeNG components + body background.

## Answers

1. make utility as of now the function will change the color.
2. add sample button to test functionality and make it works.
3. will not choose to store use prefrence as of now we will do it later through cookie.


## Instruction 
[] code should be decoupled one service respoisble for ui generic one for themeing. 


