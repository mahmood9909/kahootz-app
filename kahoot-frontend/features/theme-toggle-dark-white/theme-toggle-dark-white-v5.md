## Goal
Theme toggle dark/light — corrected for actual Spartan UI + `@ng-icons` implementation

## Description
V4 documented the intent of the Spartan migration but contained stale import names.
This version reflects the code as it actually exists after the button component was
added via `/add-spartan-component button`.

Key corrections from v4:
- `HlmButtonDirective` → `HlmButtonImports` (the exported const from `@ui-lib/button`)
- `@lucide/angular` SVG components → `NgIcon` from `@ng-icons/core` + `provideIcons`
- Template uses `<ng-icon name="lucideSun" />` / `<ng-icon name="lucideMoon" />`
- Button positioned `fixed top-4 right-4` with `size="icon" variant="outline"`

## Decisions

| # | Decision |
|---|----------|
| 1 | `.dark` class on `<html>` — required by Tailwind v4 `@custom-variant dark` |
| 2 | `HlmButtonImports` const used (not the directive class directly) — matches spartan pattern |
| 3 | Icons from `@ng-icons/lucide` via `NgIcon` + `provideIcons` — `@lucide/angular` removed |
| 4 | Icon button: `variant="outline" size="icon"` — shows sun (dark mode) or moon (light mode) |
| 5 | Button fixed top-right — will move to a header/nav component in a future task |
| 6 | Default: always **light** on first load — unchanged |
| 7 | No persistence — localStorage deferred to a future task — unchanged |

## What changed from v4

| | v4 (intent) | v5 (actual) |
|--|-------------|-------------|
| Button import | `HlmButtonDirective` | `HlmButtonImports` |
| Icon package | `@lucide/angular` (`LucideMoon`, `LucideSun`) | `@ng-icons/core` + `@ng-icons/lucide` |
| Template icon | `<svg lucideSun class="h-4 w-4" />` | `<ng-icon name="lucideSun" />` |
| Button template | `<button hlmBtn>` (no size/variant) | `<button hlmBtn variant="outline" size="icon">` |
| Button position | not specified | `fixed top-4 right-4` wrapper div |

## Current implementation

### `src/app/service/theme.service.ts`
```ts
import { computed, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
    this.document.documentElement.classList.toggle('dark', next === 'dark');
  }
}
```

### `src/app/app.ts`
```ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
}
```

### `src/app/app.html`
```html
<div class="fixed top-4 right-4">
  <button hlmBtn variant="outline" size="icon" (click)="themeService.toggle()" aria-label="Toggle theme">
    @if (themeService.isDark()) {
      <ng-icon name="lucideSun" />
    } @else {
      <ng-icon name="lucideMoon" />
    }
  </button>
</div>
<router-outlet />
```

### `src/styles.scss`
```scss
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
}
```

### `src/tailwind.css` (relevant parts)
```css
@custom-variant dark (&:where(.dark, .dark *));

:root  { --background: #ffffff; --foreground: #09090b; /* … */ }
.dark  { --background: #09090b; --foreground: #fafafa; /* … */ }
```

## How dark mode works end-to-end

1. User clicks the button → `ThemeService.toggle()` runs
2. `.dark` class is added/removed from `<html>`
3. CSS cascade: `.dark { --background: #09090b; … }` overrides `:root` values
4. `body { background-color: var(--background); }` picks up the new value immediately
5. Any Tailwind utility using `@theme inline` tokens (`bg-primary`, `text-foreground`, etc.)
   also updates because `--color-primary: var(--primary)` is a live runtime reference

## Tasks
- [x] Change `.app-dark` → `.dark` in `ThemeService`
- [x] Remove `providePrimeNG` from `app.config.ts`
- [x] Install `@ui-lib/button` spartan component
- [x] Replace `<p-button>` with `<button hlmBtn variant="outline" size="icon">`
- [x] Replace `@lucide/angular` with `@ng-icons/core` + `@ng-icons/lucide` + `NgIcon`
- [x] Register icons via `provideIcons({ lucideSun, lucideMoon })` in component providers
- [x] Add `background-color: var(--background)` + `color: var(--foreground)` to body
- [x] Verify: toggle changes button icon AND page background between light/dark

## Questions
1. Should the toggle button eventually move into a dedicated nav/header component?
2. Should we persist the theme preference in `localStorage`?

## Answers
1. Yes — will move to a header/nav when that feature is implemented.
2. Will add localStorage persistence in a future task.
