Set up a new Angular project with Spartan UI, Tailwind CSS v4, zinc design tokens, and a dark/light theme toggle.

Arguments: $ARGUMENTS
(Expected: project name, e.g. "my-app". If omitted, apply to the current Angular project.)

---

Follow every phase in order. Do not skip steps. Each phase ends with a checkpoint — confirm it passes before moving on.

---

# Phase 1 — Create the Angular project

> Skip this phase if configuring an existing blank Angular project.

## Step 1.1 — Scaffold

```bash
ng new $ARGUMENTS --routing --style=scss --standalone
cd $ARGUMENTS
```

## Step 1.2 — Set pnpm as package manager

In `angular.json`, inside the top-level `"cli"` object:

```json
"cli": {
  "packageManager": "pnpm"
}
```

---

# Phase 2 — Install packages

## Step 2.1 — Install all dependencies in one shot

```bash
# Tailwind CSS v4 build pipeline
pnpm add tailwindcss @tailwindcss/postcss postcss

# Spartan UI — headless Brain primitives + peer deps
pnpm add @spartan-ng/brain @angular/cdk@^21 class-variance-authority clsx tailwind-merge

# Icon library used by Spartan Helm components
pnpm add @ng-icons/core @ng-icons/lucide

# Spartan CLI — scaffolds Helm component files (dev only)
pnpm add -D @spartan-ng/cli
```

**Version rules — read before installing:**

| Package | Rule |
|---------|------|
| `@angular/cdk` | Must match Angular's major version. Pin `@angular/cdk@^21` for Angular 21. Do NOT install latest — v22+ peer-conflicts with Angular 21. |
| `@spartan-ng/brain` + `@spartan-ng/cli` | Must be the **same alpha tag** (e.g. both `0.0.1-alpha.711`). Check the current tag at npmjs.com/package/@spartan-ng/brain before installing. |

---

# Phase 3 — PostCSS configuration

## Step 3.1 — Create `postcss.config.json`

Create this file in the **project root** (same level as `package.json`):

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

> **Critical gotcha — extension must be `.json`.**
> Angular's `@angular/build@21` only reads `postcss.config.json` or `.postcssrc.json`.
> If the file is named `postcss.config.mjs` or `postcss.config.js`, Angular silently ignores it.
> Tailwind never runs, no utility classes are generated, and there is no error message.

---

# Phase 4 — Tailwind CSS entry point

## Step 4.1 — Create `src/tailwind.css`

```css
@import "tailwindcss";

/* Class-based dark mode: .dark on <html> activates dark: utilities */
@custom-variant dark (&:where(.dark, .dark *));

/* Bridge CSS custom properties into Tailwind's token system.
   `inline` defers resolution to runtime so .dark can swap values. */
@theme inline {
  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --color-card:               var(--card);
  --color-card-foreground:    var(--card-foreground);
  --color-popover:            var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary:          var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:              var(--muted);
  --color-muted-foreground:   var(--muted-foreground);
  --color-accent:             var(--accent);
  --color-accent-foreground:  var(--accent-foreground);
  --color-destructive:        var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border:             var(--border);
  --color-input:              var(--input);
  --color-ring:               var(--ring);
}

/* Light mode — zinc palette */
:root {
  --background:              #ffffff;
  --foreground:              #09090b;
  --card:                    #ffffff;
  --card-foreground:         #09090b;
  --popover:                 #ffffff;
  --popover-foreground:      #09090b;
  --primary:                 #18181b;
  --primary-foreground:      #fafafa;
  --secondary:               #f4f4f5;
  --secondary-foreground:    #18181b;
  --muted:                   #f4f4f5;
  --muted-foreground:        #71717a;
  --accent:                  #f4f4f5;
  --accent-foreground:       #18181b;
  --destructive:             #ef4444;
  --destructive-foreground:  #fafafa;
  --border:                  #e4e4e7;
  --input:                   #e4e4e7;
  --ring:                    #18181b;
}

/* Dark mode — applied when <html> has class="dark" */
.dark {
  --background:              #09090b;
  --foreground:              #fafafa;
  --card:                    #09090b;
  --card-foreground:         #fafafa;
  --popover:                 #09090b;
  --popover-foreground:      #fafafa;
  --primary:                 #fafafa;
  --primary-foreground:      #18181b;
  --secondary:               #27272a;
  --secondary-foreground:    #fafafa;
  --muted:                   #27272a;
  --muted-foreground:        #a1a1aa;
  --accent:                  #27272a;
  --accent-foreground:       #fafafa;
  --destructive:             #b91c1c;
  --destructive-foreground:  #fafafa;
  --border:                  #27272a;
  --input:                   #27272a;
  --ring:                    #d4d4d8;
}
```

> **Why a separate file?**
> `styles.scss` is processed by Sass. Sass tries to resolve `@import "tailwindcss"` as
> a Sass partial and throws an error. Tailwind v4 directives must live in a plain `.css`
> file.

## Step 4.2 — How these tokens work

The three blocks work together at runtime:

```
:root / .dark  →  define --primary, --background, etc. as hex values
@theme inline  →  maps --color-primary: var(--primary) into Tailwind
Tailwind       →  generates bg-primary, text-foreground, etc.
```

Because `@theme inline` defers resolution, toggling `.dark` on `<html>` swaps every
color instantly — no rebuild. Spartan components and your own Tailwind utilities all
read the same tokens.

---

# Phase 5 — Wire into Angular

## Step 5.1 — Register `tailwind.css` in `angular.json`

In `angular.json` under `projects.<name>.architect.build.options.styles`, add
`"src/tailwind.css"` **before** `"src/styles.scss"`:

```json
"styles": [
  "src/tailwind.css",
  "src/styles.scss"
]
```

Order matters — Tailwind's base layer must load before component styles.

## Step 5.2 — Wire page background in `src/styles.scss`

```scss
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
}
```

This makes the entire page respond to the theme toggle — background flips from white
to near-black when `.dark` is applied.

---

# Phase 6 — Configure Spartan CLI

## Step 6.1 — Create `components.json`

Create in the **project root**:

```json
{
  "componentsPath": "src/app/ui-lib",
  "importAlias": "@ui-lib"
}
```

## Step 6.2 — Add path alias to `tsconfig.json`

Inside `compilerOptions`, add `baseUrl` and `paths`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@ui-lib/*": ["src/app/ui-lib/*"]
    }
  }
}
```

The wildcard `@ui-lib/*` covers every component added in the future without extra
tsconfig edits.

> **CLI gotcha — "already installed" with missing files.**
> The CLI's install check reads tsconfig `paths`, not actual files on disk. If a path
> like `"@ui-lib/button"` is already in `tsconfig.json` but the files were never created,
> the CLI will skip generation and report "already installed". Fix: delete the stale
> specific path entry (e.g. `"@ui-lib/button": [...]`) from `tsconfig.json`, then re-run
> `ng g @spartan-ng/cli:ui --name=button`.

## Step 6.3 — Create `src/app/ui-lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function hlm(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

This `hlm()` helper is used by every generated Helm directive to merge Tailwind class
strings without conflicts.

---

# Phase 7 — MCP server

## Step 7.1 — Create `.mcp.json`

Create at the **workspace root** (the directory Claude Code is opened from — one level
above the Angular project if the repo is structured that way):

```json
{
  "mcpServers": {
    "spartan-ui": {
      "command": "npx",
      "args": ["-y", "@spartan-ng/mcp"]
    }
  }
}
```

Restart Claude Code after creating this file.

**What this enables in Claude Code sessions:**

| Tool | Purpose |
|------|---------|
| `spartan_components_list` | See all available components and which are installed |
| `spartan_components_get <name>` | Get exact selectors, inputs, and usage examples before writing any template |
| `spartan_health_check` | Diagnose project setup issues |

> Always call `spartan_components_get` before using a Spartan component in a template.
> Never guess selectors or input names.

---

# Phase 8 — Add the first component and verify

## Step 8.1 — Confirm CLI sees the project correctly

```bash
ng g @spartan-ng/cli:info --json
```

Expected output:

```json
{
  "workspaceType": "angular-cli",
  "config": {
    "found": true,
    "componentsPath": "src/app/ui-lib",
    "importAlias": "@ui-lib"
  }
}
```

If `workspaceType` is `nx`, stop and check for a `nx.json` file that shouldn't be there.

## Step 8.2 — Install the button component

```bash
ng g @spartan-ng/cli:ui --name=button
```

Files written to `src/app/ui-lib/button/src/`:
- `hlm-button.directive.ts` — `HlmButton` directive, `buttonVariants` CVA, `HlmButtonImports` const
- `index.ts` — re-exports everything

---

# Phase 9 — Theme toggle

## Step 9.1 — Create `ThemeService`

Create `src/app/service/theme.service.ts`:

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

## Step 9.2 — Update `src/app/app.ts`

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

**Import notes:**
- `HlmButtonImports` — the exported const from `@ui-lib/button` (not `HlmButtonDirective` or `HlmButton` directly)
- `NgIcon` — the component from `@ng-icons/core` that renders icons by name
- `provideIcons` — registers icons in this component's scope; must list each icon used

## Step 9.3 — Update `src/app/app.html`

```html
<div class="fixed top-4 right-4">
  <button
    hlmBtn
    variant="outline"
    size="icon"
    (click)="themeService.toggle()"
    aria-label="Toggle theme"
  >
    @if (themeService.isDark()) {
      <ng-icon name="lucideSun" />
    } @else {
      <ng-icon name="lucideMoon" />
    }
  </button>
</div>
<router-outlet />
```

**Template notes:**
- `hlmBtn` — the Spartan directive attribute (not a component tag). Applied to a native `<button>`.
- `variant="outline"` and `size="icon"` — inputs on `HlmButton`. `size="icon"` makes a square icon button (`size-9`).
- `@if` / `@else` — Angular 17+ control flow. Shows sun when dark, moon when light.
- `<ng-icon name="lucideSun" />` — name must match exactly the camelCase export from `@ng-icons/lucide`.

---

# Phase 10 — Final verification

## Step 10.1 — Build

```bash
ng build --configuration development
```

The build must complete with **zero errors**. Expected output:

```
✔ Building...
Initial chunk files | Names  | Raw size
main.js             | main   | ~1.4 MB
styles.css          | styles | ~16 kB

Application bundle generation complete.
```

## Step 10.2 — Dev server smoke test

```bash
pnpm start
```

Open `http://localhost:4200`. Confirm:
- Page background is white
- A circular outline button is visible in the top-right corner
- Clicking it switches to dark mode (near-black background, sun icon appears)
- Clicking again switches back to light mode (moon icon appears)

---

# How dark mode works end-to-end

```
User clicks button
      │
      ▼
ThemeService.toggle()
      │
      ├─ _theme signal: 'light' → 'dark'
      │
      └─ document.documentElement.classList.toggle('dark', true)
                    │
                    ▼
          CSS cascade: .dark { --background: #09090b; … } overrides :root
                    │
                    ▼
          body { background-color: var(--background); } updates instantly
                    │
                    ▼
          @theme inline tokens (bg-primary, text-foreground, …) update
          because --color-primary: var(--primary) is a live runtime reference
```

---

# How to use colors in templates

Always use semantic Tailwind utilities — never hardcode hex values.

```html
<!-- Page-level -->
<div class="bg-background text-foreground">page</div>

<!-- Card -->
<div class="bg-card text-card-foreground border border-border rounded-md p-4">card</div>

<!-- Muted/subdued -->
<p class="text-muted-foreground text-sm">helper text</p>

<!-- Spartan button variants -->
<button hlmBtn>Primary</button>
<button hlmBtn variant="outline">Outline</button>
<button hlmBtn variant="ghost">Ghost</button>
<button hlmBtn variant="secondary">Secondary</button>
<button hlmBtn variant="destructive">Destructive</button>
<button hlmBtn variant="link">Link</button>

<!-- Dark-only override -->
<div class="bg-white dark:bg-zinc-900">explicit override</div>
```

In `.scss` files, reference tokens directly:

```scss
.my-element {
  background-color: var(--muted);
  color: var(--muted-foreground);
  border: 1px solid var(--border);
}
```

---

# How to add more components

For every new Spartan component:

1. Call `spartan_components_get <name>` via MCP — read selectors, inputs, `*Imports` const name
2. Run `ng g @spartan-ng/cli:ui --name=<name>`
3. Import `<Name>Imports` from `@ui-lib/<name>` in the consuming component
4. Use only selectors and inputs confirmed by step 1 — never guess

Or use the `/add-spartan-component <name>` slash command which automates all four steps.

---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| No Tailwind classes in output CSS | `postcss.config.json` missing or named `.mjs`/`.js` | Rename to `postcss.config.json` — must be JSON |
| Sass error on `@import "tailwindcss"` | Tailwind directive placed in `styles.scss` | Move all Tailwind directives to `src/tailwind.css` |
| `ng g @spartan-ng/cli:ui` says "already installed" but files are missing | Stale tsconfig path from a failed previous run | Delete `"@ui-lib/<name>": [...]` from `tsconfig.json` and re-run |
| `@angular/cdk` peer conflict | CDK version ahead of Angular major | Pin `@angular/cdk@^<same-major-as-angular>` |
| Brain / CLI version mismatch errors | Installed at different times | Run `npm show @spartan-ng/brain dist-tags` and reinstall both at the same alpha tag |
| Theme toggle changes icon but page background stays white | `var(--background)` not set on body | Add `background-color: var(--background)` to `body` in `styles.scss` |
| `dark:` utilities have no effect | `@custom-variant dark` missing from `tailwind.css` | Add `@custom-variant dark (&:where(.dark, .dark *));` at the top of `tailwind.css` |
