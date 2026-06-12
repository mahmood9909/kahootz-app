## Goal
Setup site colors with Spartan UI + Tailwind CSS v4

## Description
The site palette is a zinc-based black-and-white neutral scale, matching the Spartan UI defaults (and shadcn/ui zinc for React). Colors are defined once as CSS custom properties and bridged into Tailwind's token system via `@theme inline`, so every Spartan component and every Tailwind utility class reads from the same source of truth.

Dark mode is fully supported via a `.dark` class on `<html>`, toggled by `ThemeService`.

---

## How Spartan UI + Tailwind CSS v4 Colors Work

### The big picture

Spartan UI (Helm layer) uses Tailwind semantic utilities (`bg-primary`, `text-muted-foreground`, etc.) to style components. Those utilities are backed by Tailwind CSS v4 theme tokens, which are bridged at runtime to CSS custom properties so `.dark` can swap them without a rebuild.

```
CSS custom properties in tailwind.css (:root / .dark)
        │
        └─ @theme inline { --color-primary: var(--primary); }
                │
                ▼
        Tailwind generates bg-primary, text-foreground, etc.
                │
                ▼
        Spartan Helm directives (hlmBtn, hlmInput, …) read those utilities
                │
                ▼
        Your own template HTML uses the same utility classes
```

### Token layers

There are two layers:

| Layer | File | Purpose |
|-------|------|---------|
| **CSS custom properties** | `src/tailwind.css` — `:root` / `.dark` blocks | Raw values per color scheme; swapped at runtime by toggling `.dark` on `<html>` |
| **Tailwind theme bridge** | `src/tailwind.css` — `@theme inline { … }` | Maps `--color-X` → `var(--X)` so Tailwind utilities stay dynamic |

No rebuild is needed when the theme changes — the browser just re-reads the custom properties.

### The `@theme inline` bridge

```css
/* tailwind.css */
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  /* … one line per token … */
}
```

`inline` tells Tailwind v4 **not** to resolve the value at build time. The utility class `bg-primary` compiles to `background-color: var(--color-primary)`, and `var(--color-primary)` resolves at runtime to whatever `var(--primary)` currently is (light or dark).

### Dark mode via `@custom-variant`

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This registers a `dark:` variant in Tailwind. Any utility prefixed with `dark:` activates when `.dark` is on `<html>` or any ancestor. `ThemeService.toggle()` adds/removes that class.

### The zinc palette

Both `:root` (light) and `.dark` define the same set of semantic tokens:

| Token | Light | Dark | Meaning |
|-------|-------|------|---------|
| `--primary` | `#18181b` | `#fafafa` | Main action color (buttons, links) |
| `--primary-foreground` | `#fafafa` | `#18181b` | Text on primary-colored surfaces |
| `--background` | `#ffffff` | `#09090b` | Page background |
| `--foreground` | `#09090b` | `#fafafa` | Default text |
| `--secondary` | `#f4f4f5` | `#27272a` | Secondary surfaces |
| `--muted` | `#f4f4f5` | `#27272a` | Subdued backgrounds |
| `--muted-foreground` | `#71717a` | `#a1a1aa` | Subdued text |
| `--border` | `#e4e4e7` | `#27272a` | Component borders |
| `--input` | `#e4e4e7` | `#27272a` | Input borders |
| `--ring` | `#18181b` | `#d4d4d8` | Focus ring |
| `--destructive` | `#ef4444` | `#b91c1c` | Errors / danger |
| `--card` | `#ffffff` | `#09090b` | Card background |
| `--popover` | `#ffffff` | `#09090b` | Popover background |

---

## How to Use Colors in Template HTML

### 1. Semantic Tailwind utilities (preferred)

Use Tailwind utilities that map to the semantic tokens. These automatically adapt to dark mode.

```html
<!-- Button using primary -->
<button hlmBtn>Save</button>

<!-- Muted text -->
<p class="text-muted-foreground text-sm">Helper text</p>

<!-- Card surface -->
<div class="bg-card text-card-foreground rounded-md border border-border p-4">
  Card content
</div>
```

### 2. Spartan component variants

Spartan Helm components expose a `variant` input that maps to semantic tokens via CVA:

```html
<!-- default → bg-primary text-primary-foreground -->
<button hlmBtn>Primary</button>

<!-- outline → border-border bg-background -->
<button hlmBtn variant="outline">Outline</button>

<!-- ghost → hover:bg-muted -->
<button hlmBtn variant="ghost">Ghost</button>

<!-- destructive → bg-destructive text-destructive-foreground -->
<button hlmBtn variant="destructive">Delete</button>

<!-- secondary → bg-secondary text-secondary-foreground -->
<button hlmBtn variant="secondary">Secondary</button>

<!-- link → text-primary underline -->
<button hlmBtn variant="link">Link</button>
```

### 3. CSS custom properties directly

When you need a value outside a Tailwind utility:

```html
<!-- Inline style referencing a token -->
<div [style.border-color]="'var(--border)'" [style.padding]="'1rem'">
  Custom bordered box
</div>
```

```scss
// In a component .scss file
.my-element {
  background-color: var(--muted);
  color: var(--muted-foreground);
}
```

### 4. Dark-mode-specific utilities

```html
<!-- bg-white in light, bg-zinc-950 in dark -->
<div class="bg-background text-foreground">
  Adapts automatically
</div>

<!-- Explicit dark: override -->
<div class="text-foreground dark:text-muted-foreground">
  Slightly dimmed in dark mode
</div>
```

### 5. Adding a new token

To add a custom token (e.g. a brand accent):

```css
/* src/tailwind.css */
:root  { --brand: #6366f1; }
.dark  { --brand: #818cf8; }

@theme inline {
  --color-brand: var(--brand);
}
```

Then use it as `bg-brand`, `text-brand`, `border-brand` anywhere in templates.

### Quick reference

| Goal | Use |
|------|-----|
| Standard button | `<button hlmBtn>` |
| Colored variant | `variant="outline"` / `"ghost"` / `"destructive"` |
| Text on muted bg | `text-muted-foreground` |
| Surface background | `bg-card` / `bg-muted` / `bg-background` |
| Borders | `border border-border` |
| Focus ring | handled by Spartan internally via `--ring` |
| Dark-only override | `dark:bg-muted dark:text-foreground` |

---

## Tasks
- [x] Add `@custom-variant dark` to `src/tailwind.css`
- [x] Define `:root` and `.dark` CSS custom property blocks in `src/tailwind.css`
- [x] Add `@theme inline` bridge mapping `--color-*` → `var(--*)` for all tokens
- [x] Wire `body` background and text to `var(--background)` / `var(--foreground)` in `styles.scss`
- [x] Verify: Spartan components render with zinc palette in both light and dark mode

## Questions

What is the difference between `@theme` and `@theme inline` in Tailwind v4?

## Answers

**`@theme` vs `@theme inline`:**

| | `@theme` | `@theme inline` |
|-|---------|-----------------|
| Resolution | Build time — value is baked into the generated utility class | Runtime — utility references `var(--color-X)` which the browser resolves live |
| Use case | Static values (spacing scale, font families) | Dynamic values that change at runtime (theme colors, dark mode) |
| Dark mode support | No — can't swap at runtime | Yes — swapping CSS custom properties immediately updates all utilities |

We always use `@theme inline` for color tokens so `.dark` class toggling takes effect without a page reload.
