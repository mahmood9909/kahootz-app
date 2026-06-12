## Goal
Migrate UI component library from PrimeNG to Spartan UI, including installing Tailwind CSS v4 as a prerequisite.

## Source Feature
- **Doc**: `kahoot-frontend/features/install-configure-primeng/install-configure-primeng-feat-v4.md`
- **Current approach**: PrimeNG v21 with Aura preset theme; dark mode via `.app-dark` CSS class toggled by `ThemeService`

## Target Approach
Spartan UI (`ui.spartan.ng`) — shadcn/ui-inspired Angular component library built on Angular CDK primitives,
styled with Tailwind CSS v4. Components are copied into the project (not imported from npm for the styled
"helm" layer) so they are fully owned and customisable.

## Description
PrimeNG v21 was installed and configured with the Aura preset and a `ThemeService` that toggles `.app-dark`
on `<html>` for dark mode. A single `<p-button>` in the root component serves as proof-of-concept.

Migration: replace PrimeNG with Spartan UI.  
Prerequisites: install Tailwind CSS v4 (Spartan UI requires it for all component styles).

---

## Migration Tasks

### Phase 1 — Install Tailwind CSS v4
- [ ] 1.1 Install Tailwind v4 and its PostCSS plugin
- [ ] 1.2 Create `postcss.config.mjs` at the project root
- [ ] 1.3 Create `src/tailwind.css` as a dedicated CSS entry point
- [ ] 1.4 Register `src/tailwind.css` in `angular.json` before `styles.scss`
- [ ] 1.5 Verify `pnpm build` passes and Tailwind utility classes work

### Phase 2 — Install & initialise Spartan UI
- [ ] 2.1 Install `@spartan-ng/cli` and `@angular/cdk`
- [ ] 2.2 Run `spartan init` to scaffold base CSS variable tokens into `src/tailwind.css`
- [ ] 2.3 Add the Button component via `spartan add button`

### Phase 3 — Remove PrimeNG
- [ ] 3.1 Uninstall `primeng`, `@primeuix/themes`, `primeicons`
- [ ] 3.2 Remove `providePrimeNG` from `src/app/app.config.ts`
- [ ] 3.3 Remove PrimeNG layer + primeicons import from `src/styles.scss`
- [ ] 3.4 Replace `Button` from `primeng/button` with `HlmButtonDirective` in `src/app/app.ts`
- [ ] 3.5 Replace `<p-button>` markup in `src/app/app.html` with Spartan equivalent

### Phase 4 — Migrate ThemeService for Tailwind dark mode
- [ ] 4.1 Change toggled class from `app-dark` → `dark` in `ThemeService`
- [ ] 4.2 Remove the `.app-dark body` block from `src/styles.scss`

### Phase 5 — Icons
- [ ] 5.1 Install `lucide-angular` to replace PrimeIcons (`pi pi-moon`, `pi pi-sun`)
- [ ] 5.2 Update `app.html` to use Lucide icon components

### Phase 6 — Verify
- [ ] 6.1 `pnpm build` passes clean
- [ ] 6.2 Dev server renders Spartan button with correct styling
- [ ] 6.3 Dark / light theme toggle still works

---

## Step-by-Step How-To

### Phase 1 — Install Tailwind CSS v4

#### Why a separate `tailwind.css` file?
The `styles.scss` entry point is processed by Sass first.  
Sass would try to resolve `@import "tailwindcss"` as a Sass partial — it won't find one and the build fails.  
Keeping Tailwind in a plain `.css` file avoids this; Angular processes `.css` and `.scss` entries independently.

#### Step 1.1 — Install packages

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

| Package | Purpose |
|---|---|
| `tailwindcss` | Core Tailwind v4 |
| `@tailwindcss/postcss` | PostCSS plugin that transforms `@import "tailwindcss"` |
| `postcss` | PostCSS runner (required peer) |

#### Step 1.2 — Create `kahoot-frontend/postcss.config.mjs`

Angular's `@angular/build:application` builder automatically picks up a `postcss.config.mjs`
in the project root and applies it when processing stylesheet entries.

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### Step 1.3 — Create `kahoot-frontend/src/tailwind.css`

```css
@import "tailwindcss";

/* Spartan UI CSS variable tokens will be added here by `spartan init` in Phase 2 */
```

#### Step 1.4 — Update `angular.json` styles array

In `angular.json` under `projects.kahoot-frontend.architect.build.options.styles`,
add `src/tailwind.css` **before** `src/styles.scss` so Tailwind's base resets load first:

```json
"styles": [
  "src/tailwind.css",
  "src/styles.scss"
]
```

Full diff context (`angular.json` line 33–35 area):

```json
"styles": [
  "src/tailwind.css",
  "src/styles.scss"
],
```

#### Step 1.5 — Smoke-test Tailwind

```bash
pnpm build
```

Add a temporary `class="text-red-500"` to any element in `app.html`, run `pnpm start`, and
confirm the text turns red. Remove the test class before moving to Phase 2.

---

### Phase 2 — Install & initialise Spartan UI

#### Step 2.1 — Install CLI and CDK

```bash
pnpm add -D @spartan-ng/cli
pnpm add @angular/cdk
```

`@angular/cdk` is a required peer — Spartan Brain components are built on top of it.

#### Step 2.2 — Init Spartan (injects CSS variable tokens)

```bash
npx spartan init
```

When prompted for the stylesheet target, point it at `src/tailwind.css`.  
This appends a `@layer base { :root { ... } .dark { ... } }` block with Spartan's design tokens
(background, foreground, primary, muted, border, ring, etc.).

Expected addition to `src/tailwind.css` after init:

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    /* ... more tokens ... */
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... more tokens ... */
  }
}
```

#### Step 2.3 — Add the Button helm component

```bash
npx spartan add button
```

This copies the following files into the project (no npm package for the styled layer):

```
src/app/ui/
└── ui-button-helm/
    ├── hlm-button.directive.ts
    └── index.ts
```

---

### Phase 3 — Remove PrimeNG

#### Step 3.1 — Uninstall PrimeNG packages

```bash
pnpm remove primeng @primeuix/themes primeicons
```

#### Step 3.2 — Update `src/app/app.config.ts`

**Before:**
```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
  ],
};
```

**After:**
```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
```

#### Step 3.3 — Update `src/styles.scss`

**Before:**
```scss
@layer primeng;
@import 'primeicons/primeicons.css';

body {
  margin: 0;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.app-dark body {
  background-color: #09090b;
}
```

**After** (PrimeNG layer and primeicons removed; `.app-dark` block removed — Tailwind handles dark via `dark:` prefix):
```scss
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
```

Background colour is now controlled by Spartan CSS variables (`--background`) via Tailwind's `bg-background` class.

#### Step 3.4 — Update `src/app/app.ts`

**Before:**
```ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
}
```

**After:**
```ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from './ui/ui-button-helm/hlm-button.directive';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
}
```

#### Step 3.5 — Update `src/app/app.html`

**Before:**
```html
<p-button
  [label]="themeService.isDark() ? 'Switch to Light' : 'Switch to Dark'"
  [icon]="themeService.isDark() ? 'pi pi-sun' : 'pi pi-moon'"
  (onClick)="themeService.toggle()"
/>
<router-outlet />
```

**After** (temporary — icons added in Phase 5):
```html
<button hlmBtn (click)="themeService.toggle()">
  {{ themeService.isDark() ? 'Switch to Light' : 'Switch to Dark' }}
</button>
<router-outlet />
```

---

### Phase 4 — Migrate ThemeService for Tailwind dark mode

Tailwind's `dark:` variant keys off the `dark` class on `<html>`, not `.app-dark`.

**`src/app/service/theme.service.ts` — change the toggled class:**

```ts
toggle(): void {
  const next: Theme = this._theme() === 'light' ? 'dark' : 'light';
  this._theme.set(next);
  // Changed from 'app-dark' to 'dark' — Tailwind dark: variant requires this class on <html>
  this.document.documentElement.classList.toggle('dark', next === 'dark');
}
```

---

### Phase 5 — Icons (Lucide replaces PrimeIcons)

#### Step 5.1 — Install `lucide-angular`

```bash
pnpm add lucide-angular
```

#### Step 5.2 — Update `src/app/app.ts`

```ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { HlmButtonDirective } from './ui/ui-button-helm/hlm-button.directive';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonDirective, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
  readonly Moon = Moon;
  readonly Sun = Sun;
}
```

#### Step 5.3 — Update `src/app/app.html`

```html
<button hlmBtn (click)="themeService.toggle()">
  <lucide-icon [img]="themeService.isDark() ? Sun : Moon" class="mr-2 h-4 w-4" />
  {{ themeService.isDark() ? 'Switch to Light' : 'Switch to Dark' }}
</button>
<router-outlet />
```

---

### Phase 6 — Verify

```bash
# Production build must pass clean
pnpm build

# Dev server — visually confirm:
pnpm start
# ✓ Button renders with Spartan styling
# ✓ Clicking the button toggles dark / light mode
# ✓ No console errors
```

---

## Questions

1. Does `@spartan-ng/cli` work standalone (non-Nx) with Angular 21?  
   _The CLI was originally Nx-dependent. Verify against Spartan UI docs (MCP server) when available._

2. Does `npx spartan init` accept a target stylesheet path, or does it use a default?  
   _Verify exact CLI flags when MCP server is available._

3. Are `@spartan-ng/ui-button-helm` (and other components) also available as npm packages for
   non-CLI installs? This would be the fallback if the CLI doesn't support non-Nx projects.

4. What is the exact Tailwind v4 dark mode configuration required — does Spartan's `@layer base`
   block use `media` strategy or `class` strategy?

## Answers

_To be filled in as each question is resolved._
