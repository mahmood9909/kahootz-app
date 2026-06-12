## Goal
Setup site colors with PrimeNG configuration

## Description
PrimeNG should be configured with a modern black-and-white neutral palette, similar to the shadcn/ui zinc scale for React. The goal is to replace the current green/colored Lara primary with a near-black primary, keeping a modern gray scale throughout — not pure `#000000`/`#ffffff`.

Dark mode is out of scope for now but must be easy to add later.

## Answers (interpreted)

| # | Question | Decision |
|---|----------|----------|
| 1 | Preset | Stay on **Lara**, override tokens with `definePreset` |
| 2 | Palette | **Shadcn zinc** neutral scale — near-black `#09090b`, near-white `#fafafa`, mid-grays for borders/muted |
| 3 | Dark mode | **Light only** for now; dark-mode selector left wired so it can be added later |
| 4 | Scope | **Site-wide** — all PrimeNG components inherit the new primary palette |
| 5 | Primary action color | **Near-black** (`#09090b`) as primary; white as inverse |
| 6 | Background | Keep **`#f8f9fa`** (light gray) |

## Implementation Plan

### 1 — Create a custom preset file

**`src/app/theme/preset.ts`**

Use `definePreset` to extend Lara with the shadcn zinc palette:

```ts
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';

export const KahootzPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50:  '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    colorScheme: {
      light: {
        primary: {
          color:         '{primary.950}',   // near-black fill
          inverseColor:  '#ffffff',          // white text on filled
          hoverColor:    '{primary.800}',
          activeColor:   '{primary.700}',
        },
        highlight: {
          background:      '{primary.950}',
          focusBackground: '{primary.700}',
          color:           '#ffffff',
          focusColor:      '#ffffff',
        },
      },
    },
  },
});
```

### 2 — Wire the preset in `app.config.ts`

Replace `Lara` import with `KahootzPreset`:

```ts
import { KahootzPreset } from './theme/preset';

providePrimeNG({ theme: { preset: KahootzPreset } })
```

### 3 — No changes needed to `styles.scss`

Background `#f8f9fa` stays. `@layer tailwind-base, primeng` order stays.

## Tasks
- [x] Plan and analyze this feature before implementation.
- [ ] Create `src/app/theme/preset.ts` with the zinc-based `KahootzPreset`.
- [ ] Update `app.config.ts` to use `KahootzPreset` instead of `Lara`.
- [ ] Verify: Button, InputText, and any other visible PrimeNG components on the dev server look black-and-white.
- [ ] Confirm near-black primary renders correctly (no leftover green).

## Questions

what is difference when use Aura or Lara or Materical 
## Answers

1. No default requirement to make button black cuz currently its green make it as same as primeng defualt themeing which is black and white.

2. keeps the modern coloring not like default #0000 and #fffff

4. shadcn support and our project will support it but as of now change colors.

5. make it default to black and after I review it will deside.

6. lets stick with gray backgroud as of now
