## Goal
Install and configure Spartan UI in a new Angular 21 project from scratch

## Description
End-to-end setup guide. Following this document plus
`setup-site-colors-with-spartan-ui-v1.md` (design tokens) and
`theme-toggle-dark-white-v5.md` (ThemeService + toggle button) gives a fully
working Angular 21 app with Spartan UI, Tailwind CSS v4, dark mode, and the MCP
server for component discovery in Claude Code.

---

## Step 1 — Create the Angular project

```bash
ng new <project-name> --routing --style=scss --standalone
cd <project-name>
```

Set package manager to pnpm in `angular.json` (or pass `--package-manager=pnpm`):
```json
"cli": { "packageManager": "pnpm" }
```

---

## Step 2 — Install all required packages

Run in one shot:

```bash
# Tailwind CSS v4 pipeline
pnpm add tailwindcss @tailwindcss/postcss postcss

# Spartan UI — Brain (headless primitives) + peer dependencies
pnpm add @spartan-ng/brain @angular/cdk@^21 class-variance-authority clsx tailwind-merge

# Icon library (Spartan components use @ng-icons internally)
pnpm add @ng-icons/core @ng-icons/lucide

# Spartan CLI — dev dep only, used to scaffold Helm components
pnpm add -D @spartan-ng/cli
```

### Version notes

| Package | Why pinned |
|---------|-----------|
| `@angular/cdk@^21` | Must match the Angular major version. `@angular/cdk` latest can be v22+ which peer-conflicts with Angular 21. Always pin to the same major. |
| `@spartan-ng/brain` + `@spartan-ng/cli` | These are `0.0.1-alpha.*` releases; Brain and CLI must always be the **same alpha tag**. Check the current tag at npmjs.com before installing. |

---

## Step 3 — PostCSS configuration

Create `postcss.config.json` in the **project root** (same level as `package.json`):

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

> **Critical**: The file extension **must be `.json`**. Angular's `@angular/build@21`
> only reads `postcss.config.json` or `.postcssrc.json`. Files named
> `postcss.config.mjs` or `postcss.config.js` are silently ignored — Tailwind never
> runs, no utility classes are generated, and there is no error message.

---

## Step 4 — Create the Tailwind CSS entry point

Create `src/tailwind.css`:

```css
@import "tailwindcss";
```

> **Why a separate file?** `styles.scss` is processed by Sass. Sass would interpret
> `@import "tailwindcss"` as a Sass partial import and fail. Tailwind v4 directives
> (`@import`, `@theme`, `@custom-variant`) must live in a plain CSS file.

Design tokens and dark mode are added to this file in the next doc
(`setup-site-colors-with-spartan-ui-v1.md`).

---

## Step 5 — Register `tailwind.css` in `angular.json`

In `angular.json` under `projects.<name>.architect.build.options.styles`,
add `"src/tailwind.css"` **before** `"src/styles.scss"`:

```json
"styles": [
  "src/tailwind.css",
  "src/styles.scss"
]
```

Order matters: Tailwind's reset and base layer must load before any component styles.

---

## Step 6 — Configure the Spartan CLI

Create `components.json` in the **project root**:

```json
{
  "componentsPath": "src/app/ui-lib",
  "importAlias": "@ui-lib"
}
```

This tells the CLI where to write generated Helm component files and what import
alias they will be referenced by.

---

## Step 7 — Set up the `@ui-lib/*` path alias

In `tsconfig.json`, add `baseUrl` and `paths` inside `compilerOptions`:

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

The wildcard covers every component added later (`@ui-lib/button`, `@ui-lib/input`,
etc.) without any extra tsconfig edits.

> **How the CLI uses this**: `ng g @spartan-ng/cli:ui --name=<component>` writes
> component files into `src/app/ui-lib/<component>/src/` **and** adds a specific path
> entry (e.g. `"@ui-lib/button": ["./src/app/ui-lib/button/src/index.ts"]`). The
> CLI's "already installed" check reads these tsconfig paths — if a path is registered
> but the actual files are missing, the CLI still skips generation. Delete the stale
> path entry from `tsconfig.json` to force a re-run.

---

## Step 8 — Create `ui-lib/utils.ts`

Create `src/app/ui-lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function hlm(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

This is the `hlm()` helper used by every generated Helm directive to merge Tailwind
class strings without conflicts.

---

## Step 9 — Configure MCP server for Claude Code

Create `.mcp.json` in the **workspace root** (one level above the Angular project,
or at the project root — wherever Claude Code is opened from):

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

Restart Claude Code after creating this file. The MCP server enables:
- `spartan_components_list` — see all available components + which are installed
- `spartan_components_get <name>` — get exact selectors, inputs, and usage examples
  before writing any template code (never guess selectors)
- `spartan_health_check` — diagnose project setup issues

---

## Step 10 — Add a component to verify the setup

Run `ng g @spartan-ng/cli:info --json` first to confirm the CLI sees your project
correctly (`workspaceType` should be `angular-cli`, not `nx`):

```bash
ng g @spartan-ng/cli:info --json
```

Expected output includes:
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

Then install the button component:

```bash
ng g @spartan-ng/cli:ui --name=button
```

Files written:
```
src/app/ui-lib/button/
└── src/
    ├── hlm-button.directive.ts
    └── index.ts
```

---

## Step 11 — Smoke-test in `app.ts` / `app.html`

In `src/app/app.ts`:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonImports } from '@ui-lib/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonImports],
  templateUrl: './app.html',
})
export class App {}
```

In `src/app/app.html`:

```html
<button hlmBtn>Spartan UI is working</button>
<router-outlet />
```

---

## Step 12 — Verify the build

```bash
ng build --configuration development
```

The build must complete with **no errors**. A button styled with `bg-primary
text-primary-foreground` will be visible in the browser once design tokens are
added (next doc).

---

## What comes next

| Doc | Covers |
|-----|--------|
| `setup-site-colors-with-spartan-ui-v1.md` | Zinc color palette, CSS custom properties, `@theme inline`, dark mode CSS variables |
| `theme-toggle-dark-white-v5.md` | `ThemeService`, toggle button in `app.html`, `styles.scss` body background |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| No Tailwind utilities generated, raw CSS in output | `postcss.config.json` missing or named `.mjs`/`.js` | Rename to `postcss.config.json` |
| `@import "tailwindcss"` in styles.scss throws Sass error | Tailwind directive in a Sass file | Move to `src/tailwind.css` |
| `ng g @spartan-ng/cli:ui` says "already installed" but files are missing | Stale tsconfig path entry from a previous failed run | Remove the `@ui-lib/<component>` entry from `tsconfig.json` and re-run |
| `@angular/cdk` peer conflict warnings | CDK version ahead of Angular major | Pin `@angular/cdk@^<same-major-as-angular>` |
| Brain and CLI version mismatch | Installed at different times | Check `npm show @spartan-ng/brain dist-tags` and reinstall both at the same alpha tag |

## Tasks
- [ ] Create Angular project with routing + SCSS
- [ ] Install all packages (Tailwind, Brain, CLI, CDK, CVA, clsx, tw-merge, ng-icons)
- [ ] Create `postcss.config.json` (`.json` extension — not `.mjs`)
- [ ] Create `src/tailwind.css` with `@import "tailwindcss"`
- [ ] Register `src/tailwind.css` first in `angular.json` styles array
- [ ] Create `components.json` with `componentsPath` + `importAlias`
- [ ] Add `baseUrl` + `@ui-lib/*` path to `tsconfig.json`
- [ ] Create `src/app/ui-lib/utils.ts` with `hlm()` helper
- [ ] Create `.mcp.json` and restart Claude Code
- [ ] Run `ng g @spartan-ng/cli:info --json` — confirm `workspaceType: angular-cli`
- [ ] Run `ng g @spartan-ng/cli:ui --name=button`
- [ ] Add `<button hlmBtn>` smoke-test to `app.html`
- [ ] `ng build --configuration development` — confirm no errors

## Questions

## Answers
