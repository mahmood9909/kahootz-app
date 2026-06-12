## Goal
Theme toggle dark-white

## Description
Add the ability to switch between light and dark theme. Architecture must be
extensible so additional themes can be added later without refactoring.
The toggle logic lives under `src/app/theme/` as a decoupled utility.

## Decisions

| # | Decision |
|---|----------|
| 1 | Service-only utility — no dedicated UI component; test button added to `app.html` temporarily |
| 2 | Default: always **light** on first load |
| 3 | No persistence yet — cookies/localStorage will be added in a future task |
| 4 | **Decoupled**: `ThemeService` owns theming only; root component owns the button UI |

## Implementation Plan

### File structure

```
src/app/theme/
  theme.service.ts   ← theming logic only (toggle, current theme signal)
```

### Step 1 — `theme.service.ts`

Signal-based service. Responsible only for applying/removing the `.app-dark`
class on `<html>` and exposing the current theme state.

```ts
import { Injectable, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    const next: Theme = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    this.document.documentElement.classList.toggle('app-dark', next === 'dark');
  }
}
```

> `Theme` is a union type — adding `'brand'` or any future theme is a one-line change here.

### Step 2 — `app.config.ts`

Add `darkModeSelector: '.app-dark'` so PrimeNG activates its dark palette
when that class is on `<html>`:

```ts
providePrimeNG({
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.app-dark' }
  }
})
```

### Step 3 — `styles.scss`

Add dark body background that responds to the `.app-dark` class:

```scss
body { background-color: #ffffff; }
.app-dark body { background-color: #09090b; }
```

### Step 4 — `app.html` (temporary test button)

The root component injects `ThemeService` and wires a toggle button.
UI concern stays in the component; theming concern stays in the service.

```html
<p-button
  [label]="themeService.isDark() ? 'Switch to Light' : 'Switch to Dark'"
  [icon]="themeService.isDark() ? 'pi pi-sun' : 'pi pi-moon'"
  (onClick)="themeService.toggle()"
/>
<router-outlet />
```

`app.ts` injects the service:
```ts
readonly themeService = inject(ThemeService);
```

## Tasks
- [x] Plan and analyze before implementation.
- [x] Answer questions.
- [ ] Create `src/app/theme/theme.service.ts`.
- [ ] Update `app.config.ts` with `darkModeSelector`.
- [ ] Update `styles.scss` with dark body rule.
- [ ] Update `app.ts` to inject `ThemeService`.
- [ ] Update `app.html` with test toggle button.
- [ ] Verify: button toggles PrimeNG components + body background between light and dark.

## Questions

1. **Toggle UI placement**: Where should the toggle button live?
2. **Initial theme default**: What should the app default to on first load?
3. **Persistence**: Should the chosen theme persist across page refreshes via `localStorage`?

## Answers

1. make utility as of now the function will change the color. Add sample button to test functionality.
2. Always light default.
3. Will not store user preference now — will do it later through cookie.

## Instruction
- Code should be decoupled: one service responsible for theming, component owns the UI.
