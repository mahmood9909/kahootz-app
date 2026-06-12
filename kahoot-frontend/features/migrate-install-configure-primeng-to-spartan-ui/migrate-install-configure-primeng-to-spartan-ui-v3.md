## Goal
Migrate UI component library from PrimeNG to Spartan UI, with Tailwind CSS v4 and a `@ui-lib/*` path alias structure.

## Status
- [x] Done — build passes, dev server confirmed HTTP 200
- [x] Theming fixed — Tailwind utility classes now generated, dark/light toggle works visually

## Source Feature
- **Doc**: `kahoot-frontend/features/install-configure-primeng/install-configure-primeng-feat-v4.md`
- **Was**: PrimeNG v21 + Aura preset, dark mode via `.app-dark` class, `providePrimeNG()` global provider

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

#### `postcss.config.json` ← was `postcss.config.mjs` in v2, now corrected
Angular's `@angular/build:application` (v21) only reads `postcss.config.json` or
`.postcssrc.json`. JavaScript/MJS config files (`postcss.config.js`, `.mjs`) are
silently ignored — the build proceeds without PostCSS, so Tailwind never runs.

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

Key decisions:
- `@custom-variant dark` → class-based dark mode (`.dark` on `<html>`)
- `@theme inline` → bridges runtime CSS custom properties into Tailwind's token
  system so `bg-primary`, `text-muted-foreground`, etc. respond to the `.dark` class
- Token values are hex strings (not HSL space-separated) — simpler `var()` bridge

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

#### `tsconfig.json` — added `@ui-lib/*` path alias
```json
"baseUrl": ".",
"paths": {
  "@ui-lib/*": ["src/app/ui-lib/*"]
}
```
Angular's esbuild builder reads tsconfig `paths` and adds them as build aliases automatically.

#### `angular.json` — added `src/tailwind.css` before `src/styles.scss`
```json
"styles": ["src/tailwind.css", "src/styles.scss"]
```

#### `src/app/app.config.ts` — removed `providePrimeNG` and Aura import

#### `src/styles.scss` — theme colors on body
Added `background-color: var(--background)` and `color: var(--foreground)` so
toggling `.dark` on `<html>` changes the page background visually.

#### `src/app/app.ts` — replaced `Button` (primeng) with `HlmButtonDirective` + Lucide icons

#### `src/app/app.html` — replaced `<p-button>` with `<button hlmBtn>` + `@if`/`@else` for icons

#### `src/app/service/theme.service.ts` — changed toggled class from `app-dark` → `dark`

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

`@angular/build@21` source (`src/utils/postcss-configuration.js`) only accepts:
```
postcssConfigurationFiles = ['postcss.config.json', '.postcssrc.json']
```
JavaScript/ESM config files are silently ignored. When no recognised config is found,
Angular falls back to its own built-in Tailwind v3 integration (looks for
`tailwind.config.js`). Since we have neither, PostCSS never ran — `@import
"tailwindcss"` was resolved by esbuild as a static file copy, and all Tailwind
directives (`@source`, `@theme inline`, `@custom-variant`) passed through as literal
strings in the output CSS with no utility classes generated.

Fix: rename `postcss.config.mjs` → `postcss.config.json` and express plugins as JSON.

## ui-lib structure
```
src/app/ui-lib/
├── utils.ts              ← hlm() = clsx + tailwind-merge
└── button/
    ├── hlm-button.directive.ts
    └── index.ts
```
Import pattern: `import { HlmButtonDirective } from '@ui-lib/button'`

Future components follow the same pattern: `src/app/ui-lib/<name>/` + add to `tsconfig.json` paths
if you want a named export (or just use `@ui-lib/<name>` via the wildcard path already configured).

## Questions

1. Spartan CLI compatibility with non-Nx Angular 21 projects — to verify when MCP server is available.
2. Official Spartan UI token values for Tailwind v4 (current tokens are based on zinc palette from Spartan docs).

## Answers
_To be filled when MCP server is available._
