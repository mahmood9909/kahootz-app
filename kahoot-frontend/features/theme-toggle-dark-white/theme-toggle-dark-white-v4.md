## Goal
Theme toggle dark/light — updated for Spartan UI + Tailwind v4

## Description
The dark/light toggle was originally built for PrimeNG (`.app-dark` class +
`darkModeSelector` in `providePrimeNG`). After migrating to Spartan UI + Tailwind v4
the toggle was updated to use the `.dark` class convention that Tailwind's
`@custom-variant dark` expects.

This version documents the final working state after the spartan migration.

## Tools
- `spartan_components_get button` — verify `hlmBtn` selector and variant inputs
- `spartan_components_get icon` — verify `ng-icon` / `hlm` usage with `@ng-icons`

## Decisions

| # | Decision |
|---|----------|
| 1 | Class changed from `.app-dark` → `.dark` — required by Tailwind v4 `@custom-variant dark` |
| 2 | PrimeNG `darkModeSelector` option removed along with `providePrimeNG` |
| 3 | Toggle button uses `hlmBtn` (spartan) + `@lucide/angular` icons instead of `p-button` + primeicons |
| 4 | Page background/text respond to theme via `var(--background)` / `var(--foreground)` on `body` |
| 5 | Default: always **light** on first load — unchanged from v3 |
| 6 | No persistence — cookies/localStorage deferred to a future task — unchanged from v3 |
| 7 | Decoupling preserved: `ThemeService` owns class toggling; root component owns button UI |

## What changed from v3 (PrimeNG)

| File | v3 (PrimeNG) | v4 (Spartan UI) |
|------|-------------|-----------------|
| `theme.service.ts` | toggled `.app-dark` | toggles `.dark` |
| `app.config.ts` | `providePrimeNG({ theme: { options: { darkModeSelector: '.app-dark' }}})` | removed — no PrimeNG |
| `styles.scss` | `.app-dark body { background: #09090b }` | `body { background-color: var(--background); color: var(--foreground); }` |
| `app.html` | `<p-button [icon]="..." (onClick)="...">` | `<button hlmBtn (click)="..."><svg lucideSun/Moon /></button>` |
| `app.ts` | imported `Button` from primeng | imported `HlmButtonDirective`, `LucideMoon`, `LucideSun` |
| Dark trigger | `.app-dark` on `<html>` | `.dark` on `<html>` |

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
import { LucideMoon, LucideSun } from '@lucide/angular';
import { HlmButtonDirective } from '@ui-lib/button';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonDirective, LucideMoon, LucideSun],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
}
```

### `src/app/app.html`
```html
<button hlmBtn (click)="themeService.toggle()">
  @if (themeService.isDark()) {
    <svg lucideSun class="h-4 w-4" />
    Switch to Light
  } @else {
    <svg lucideMoon class="h-4 w-4" />
    Switch to Dark
  }
</button>
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

:root  { --background: #ffffff; --foreground: #09090b; ... }
.dark  { --background: #09090b; --foreground: #fafafa; ... }
```

## How dark mode works end-to-end

1. User clicks the button → `ThemeService.toggle()` runs
2. `.dark` class is added/removed from `<html>`
3. CSS cascade: `.dark { --background: #09090b; ... }` overrides `:root` values
4. `body { background-color: var(--background); }` picks up the new value immediately
5. Any element using Tailwind semantic utilities (`bg-primary`, `text-foreground`, etc.)
   also updates because `@theme inline { --color-primary: var(--primary); }` bridges
   the Tailwind token to the runtime CSS variable

## Tasks
- [x] Change `.app-dark` → `.dark` in `ThemeService`
- [x] Remove `providePrimeNG` dark mode selector from `app.config.ts`
- [x] Replace `<p-button>` with `<button hlmBtn>` in `app.html`
- [x] Replace primeicon SVGs with `lucideSun` / `lucideMoon` from `@lucide/angular`
- [x] Add `background-color: var(--background)` + `color: var(--foreground)` to body in `styles.scss`
- [x] Verify: toggle changes button styling AND page background between light/dark

## Questions
1. Should the toggle button eventually move into a dedicated nav/header component?
2. Should we persist the theme preference in `localStorage`?

## Answers
1. Yes — will move to a header/nav when that feature is implemented.
2. Will add localStorage persistence in a future task.
