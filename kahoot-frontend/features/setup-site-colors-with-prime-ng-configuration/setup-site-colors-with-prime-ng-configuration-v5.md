## Goal
Setup site colors with PrimeNG configuration

## Description
PrimeNG should be configured with a modern black-and-white neutral palette, similar to the shadcn/ui zinc scale for React. The goal is to replace the current green/colored Lara primary with a near-black primary, keeping a modern gray scale throughout — not pure `#000000`/`#ffffff`.

Dark mode is out of scope for now but must be easy to add later.

---

## How PrimeNG Presets Work

### The big picture

PrimeNG v4+ uses a **design token system**. Instead of overriding CSS classes, you define named tokens (like `{primary.950}`) and PrimeNG maps them to CSS custom properties (`--p-primary-950`) that every component reads.

```
definePreset(BasePreset, overrides)
        │                    │
        │                    └─ your token overrides (semantic colors, etc.)
        └─ Lara / Aura / Material (the base visual shape)
                │
                ▼
        CSS custom properties injected into :root
                │
                ▼
        Every <p-button>, <p-inputtext>, etc. reads those vars
```

### Preset layers

A preset has two layers:

| Layer | What it controls | Example |
|-------|-----------------|---------|
| `primitive` | Raw color palette — just values, no meaning | `zinc.950: '#09090b'` |
| `semantic` | Meaning mapped to primitive values | `primary.color: '{primary.950}'` |

We only touch `semantic` because that's what drives component colors. The `primitive.primary` block is our zinc scale; the `semantic.colorScheme.light.primary` block says "use zinc 950 as the filled button color."

### Token reference syntax

Inside a preset, `{primary.950}` is a **token reference** — PrimeNG resolves it at build time to the actual hex value. This means:

```ts
hoverColor: '{primary.800}',  // resolves to #27272a
```

…is the same as writing `#27272a` directly, but stays in sync if you ever change the palette.

### How `definePreset` merges

`definePreset(Lara, overrides)` does a **deep merge**. You only need to specify what you want to change — everything else from Lara (border-radius, spacing, typography, shadow tokens) is inherited untouched.

```ts
// This only changes primary colors.
// Button shape, padding, focus ring, etc. all come from Lara unchanged.
export const KahootzPreset = definePreset(Lara, {
  semantic: {
    primary: { 950: '#09090b', ... },
    colorScheme: {
      light: {
        primary: { color: '{primary.950}', ... }
      }
    }
  }
});
```

### Where the CSS ends up

At runtime, PrimeNG injects a `<style>` block into `<head>`:

```css
:root {
  --p-primary-950: #09090b;
  --p-primary-color: var(--p-primary-950);   /* filled button bg */
  --p-primary-inverse-color: #ffffff;         /* text on filled button */
  --p-primary-hover-color: var(--p-primary-800);
  /* ... */
}
```

Every component uses these vars internally — you never need to target `.p-button` in your own CSS.

---

## How to Use Different Colors in Template HTML

### 1. Severity prop (built-in named colors)

PrimeNG components accept a `severity` prop that maps to preset color groups:

```html
<!-- Uses primary (our near-black) -->
<p-button label="Save" />

<!-- Uses named severity tokens from the preset -->
<p-button label="Danger"  severity="danger" />
<p-button label="Warning" severity="warn" />
<p-button label="Info"    severity="info" />
<p-button label="Success" severity="success" />
<p-button label="Help"    severity="help" />

<!-- Ghost / text / outlined variants -->
<p-button label="Ghost"    [text]="true" />
<p-button label="Outlined" [outlined]="true" />
<p-button label="Ghost danger" severity="danger" [text]="true" />
```

### 2. Inline style with CSS custom properties

Use the CSS vars PrimeNG generates to stay in the token system:

```html
<!-- Manually use a zinc shade for a surface -->
<div [style.background]="'var(--p-primary-100)'"
     [style.color]="'var(--p-primary-950)'"
     [style.padding]="'1rem'">
  Custom surface using zinc-100 bg, zinc-950 text
</div>
```

### 3. `pt` (PassThrough) — style individual component parts

Every PrimeNG component exposes a `pt` input that lets you inject classes or styles into internal slots:

```html
<!-- Change just the icon color inside a button -->
<p-button
  label="Custom"
  icon="pi pi-star"
  [pt]="{ icon: { style: { color: 'var(--p-primary-400)' } } }"
/>

<!-- Add a Tailwind class to the button root -->
<p-button
  label="Tailwind"
  [pt]="{ root: { class: 'my-custom-class' } }"
/>
```

### 4. Tailwind utility classes alongside PrimeNG

Since we have `@layer tailwind-base, primeng` in `styles.scss`, Tailwind and PrimeNG coexist safely:

```html
<!-- Wrap a PrimeNG component with Tailwind layout -->
<div class="flex gap-4 p-6 bg-zinc-50">
  <p-button label="Primary" />
  <p-button label="Ghost" [text]="true" />
</div>
```

### 5. Adding a new severity color to the preset

If you need a completely custom named color (e.g. a "brand" severity), add it to `preset.ts`:

```ts
// In src/app/theme/preset.ts
export const KahootzPreset = definePreset(Lara, {
  semantic: {
    // ... existing primary overrides ...
    colorScheme: {
      light: {
        // custom named group — use in templates as severity="brand"
        // (requires PrimeNG component to support custom severity)
      }
    }
  }
});
```

> Note: Built-in components only read the standard severity names. Custom severities are useful for your own components that read CSS vars directly.

### Quick reference — which approach to use

| Goal | Use |
|------|-----|
| Standard colored button | `severity="danger"` etc. |
| Variant of a component | `[text]="true"` / `[outlined]="true"` |
| Apply a zinc shade to your own element | `var(--p-primary-NNN)` |
| Style inside a PrimeNG component | `[pt]="{ slot: { style/class } }"` |
| Layout / spacing around PrimeNG | Tailwind classes on wrapper div |

---

## Tasks
- [x] Plan and analyze this feature before implementation.
- [x] Create `src/app/theme/preset.ts` with the zinc-based `KahootzPreset`.
- [x] Update `app.config.ts` to use `KahootzPreset` instead of `Lara`.
- [ ] Verify: Button, InputText, and any other visible PrimeNG components on the dev server look black-and-white.
- [ ] Confirm near-black primary renders correctly (no leftover green).

## Questions

What is the difference between Aura, Lara, and Material presets?

## Answers

**Preset comparison:**

| Preset | Design language | Feel | Best for |
|--------|----------------|------|----------|
| **Lara** | Clean, minimal, neutral | Professional/enterprise, subtle shadows, rounded corners | Closest to shadcn — fewest visual opinions, tokens easy to override |
| **Aura** | PrimeNG's own bold system | Stronger contrast, sharper edges, more opinionated | When you want PrimeNG's flagship look out of the box |
| **Material** | Google Material Design 3 | Elevation shadows, ripple effects, floating labels on inputs | Apps that should feel like a Google product |

**Decision: Lara** — it has the fewest built-in visual opinions, so the zinc token overrides come through cleanly. Aura would conflict on some component styles; Material would look completely wrong for a shadcn aesthetic.
