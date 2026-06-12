# Install & Configure PrimeNG — v3 (Implementation Plan)

## Status
- [ ] Awaiting confirmation

## Summary of Answers from v2
- Theme: Aura preset (light, matches primeng.org homepage)
- No dark mode, no theme switcher for now
- Add one Button component to confirm PrimeNG works

---

## Analysis

**Current app state:**
- Angular 21, standalone components only (no NgModules)
- No PrimeNG installed
- `app.config.ts` uses `ApplicationConfig` with providers array
- `styles.scss` is empty
- Root component is `app.ts` / `app.html`

---

## Implementation Plan

### Step 1 — Install PrimeNG
```bash
cd kahoot-frontend
pnpm add primeng
```

### Step 2 — Configure PrimeNG in `app.config.ts`
Add `providePrimeNG` with the Aura preset and light theme:
```ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

providers: [
  ...
  providePrimeNG({ theme: { preset: Aura } })
]
```

### Step 3 — Add PrimeNG base styles to `styles.scss`
```scss
@layer tailwind-base, primeng;
```
> PrimeNG v19+ uses CSS layers — this ensures correct style ordering.

### Step 4 — Add a Button to `app.ts` / `app.html`
Import `ButtonModule` in the component and add `<p-button label="PrimeNG Works!" />` to the template.

---

## Files to be changed
| File | Change |
|------|--------|
| `package.json` | primeng added as dependency |
| `src/app/app.config.ts` | Add `providePrimeNG` with Aura preset |
| `src/styles.scss` | Add PrimeNG CSS layer |
| `src/app/app.ts` | Import `ButtonModule` |
| `src/app/app.html` | Add `<p-button>` |

---

## Confirmation Required
**Please reply "confirmed" to proceed with implementation.**

## Next Version
- v4: Implementation complete + result
