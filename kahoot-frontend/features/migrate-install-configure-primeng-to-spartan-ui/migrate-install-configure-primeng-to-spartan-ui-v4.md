## Goal
Migrate UI component library from PrimeNG to Spartan UI, with Tailwind CSS v4 and a `@ui-lib/*` path alias structure.

## Status
- [x] Done — build passes, dev server confirmed HTTP 200
- [x] Theming fixed — Tailwind utility classes now generated, dark/light toggle works visually
- [x] MCP server configured — `@spartan-ng/mcp` available for component discovery

## Source Feature
- **Doc**: `kahoot-frontend/features/install-configure-primeng/install-configure-primeng-feat-v4.md`
- **Was**: PrimeNG v21 + Aura preset, dark mode via `.app-dark` class, `providePrimeNG()` global provider

## Tools
- `spartan_components_list` — discover available components and check what is already installed
- `spartan_components_get <name>` — get full API (selectors, inputs, imports) and usage examples before implementing any spartan component; never guess selectors

## MCP Server Setup

### `.mcp.json` (project root — `kahootz/.mcp.json`)
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
MCP servers are loaded at session start. After adding `.mcp.json`, restart Claude Code for tools to become active.

---

## What was implemented

### New packages

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | 4.3.0 | Core Tailwind v4 |
| `@tailwindcss/postcss` | 4.3.0 | PostCSS plugin for Angular build pipeline |
| `postcss` | 8.5.15 | Required peer for the above |
| `@angular/cdk` | 21.2.14 | Angular CDK (pinned to v21 — v22 peer-mismatches Angular 21) |
| `class-variance-authority` | 0.7.1 | CVA — variant-based class string utility for the button |
| `clsx` | 2.1.1 | Conditional class joining |
| `tailwind-merge` | 3.6.0 | Merge Tailwind classes without conflicts |
| `@lucide/angular` | 1.18.0 | Lucide icons (replaces `primeicons`; `lucide-angular` deprecated) |

### Removed packages
- `primeng` 21.1.9
- `@primeuix/themes` 2.0.3
- `primeicons` 7.0.0

---

### New files

#### `postcss.config.json` ← must be JSON, not `.mjs`/`.js`
Angular's `@angular/build@21` only reads `postcss.config.json` or `.postcssrc.json`.
JavaScript config files are silently ignored — Tailwind never runs.

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

#### `src/tailwind.css`
Dedicated CSS entry point — separate from `styles.scss` because Sass would try to
resolve `@import "tailwindcss"` as a Sass partial and fail.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... all semantic tokens ... */
}

:root { --primary: #18181b; ... }
.dark  { --primary: #fafafa; ... }
```

Key decisions:
- `@custom-variant dark` → class-based dark mode (`.dark` on `<html>`)
- `@theme inline` → bridges runtime CSS custom properties into Tailwind's token
  system so `bg-primary`, `text-muted-foreground`, etc. respond to the `.dark` class
- Token values are hex strings (not HSL space-separated) — simpler `var()` bridge

#### `src/app/ui-lib/utils.ts`
```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function hlm(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

#### `src/app/ui-lib/button/hlm-button.directive.ts` + `index.ts`
Spartan-style button directive using Angular 21 signals + CVA.
Selector: `[hlmBtn]`. Inputs: `variant`, `size`, `class` (alias for `userClass`).

```html
<button hlmBtn>Default</button>
<button hlmBtn variant="outline">Outline</button>
<button hlmBtn variant="ghost" size="icon"><svg lucideMoon /></button>
```

Imported via path alias: `import { HlmButtonDirective } from '@ui-lib/button'`

---

### Modified files

#### `tsconfig.json` — `@ui-lib/*` path alias
```json
"baseUrl": ".",
"paths": {
  "@ui-lib/*": ["src/app/ui-lib/*"]
}
```

#### `angular.json` — `src/tailwind.css` before `src/styles.scss`
```json
"styles": ["src/tailwind.css", "src/styles.scss"]
```

#### `src/styles.scss` — theme colors on body
```scss
body {
  background-color: var(--background);
  color: var(--foreground);
}
```

#### `src/app/app.ts` — `HlmButtonDirective` + Lucide icons replacing PrimeNG `Button`

#### `src/app/app.html` — `<button hlmBtn>` with `@if`/`@else` for icon switching

#### `src/app/service/theme.service.ts` — toggled class changed from `app-dark` → `dark`

---

## Deviations from v1 plan

| Plan | Actual |
|---|---|
| Use `@spartan-ng/cli` for init + component scaffolding | CLI not used — HlmButton created manually; CLI requires Nx or specific project setup |
| `lucide-angular` | `@lucide/angular` — `lucide-angular` was deprecated |
| `@angular/cdk` latest | Pinned to `@angular/cdk@21` — latest (v22) is mismatched with Angular 21 |
| `@variant dark` | `@custom-variant dark` — correct Tailwind v4 stable syntax |
| HSL space-separated CSS variable values | Hex values — cleaner bridge via `var()` in `@theme inline` |
| `postcss.config.mjs` | `postcss.config.json` — Angular 21 only reads JSON PostCSS config |

## Angular 21 + Tailwind v4 PostCSS gotcha

`@angular/build@21` (`src/utils/postcss-configuration.js`) only accepts:
```
postcssConfigurationFiles = ['postcss.config.json', '.postcssrc.json']
```
JavaScript/ESM config files are silently ignored. When no recognised config is found,
Angular falls back to its own built-in Tailwind v3 integration (looks for
`tailwind.config.js`). Since we have neither, PostCSS never ran — `@import
"tailwindcss"` was resolved by esbuild as a static file copy and all Tailwind
directives (`@source`, `@theme inline`, `@custom-variant`) passed through as literal
strings in the output CSS with no utility classes generated.

Fix: use `postcss.config.json`, not `.mjs`/`.js`.

## ui-lib structure
```
src/app/ui-lib/
├── utils.ts              ← hlm() = clsx + tailwind-merge
└── button/
    ├── hlm-button.directive.ts
    └── index.ts
```

Future components: `src/app/ui-lib/<name>/` — the wildcard `@ui-lib/*` path alias
covers them automatically.

## Questions

1. Spartan CLI compatibility with non-Nx Angular 21 projects.
2. Official Spartan UI token values for Tailwind v4.

## Answers

1. Per MCP server: use `ng g @spartan-ng/cli:<generator>` for Angular CLI workspaces (no `nx.json`). Verify by running `ng g @spartan-ng/cli:info --json` once `@spartan-ng/cli` is installed as a dev dependency.
2. Use `spartan_components_get` via MCP to check official token names per component. Current zinc-palette tokens match the Spartan UI defaults shown in their docs.
