# Install & Configure PrimeNG — v4 (Completed)

## Status
- [x] Done

## What was implemented

| File | Change |
|------|--------|
| `package.json` | Added `primeng@21.1.9` and `@primeuix/themes@2.0.3` |
| `src/app/app.config.ts` | Added `providePrimeNG` with Aura preset |
| `src/styles.scss` | Added `@layer tailwind-base, primeng` |
| `src/app/app.ts` | Imported `Button` from `primeng/button` |
| `src/app/app.html` | Added `<p-button label="PrimeNG is working!" />` |

## Notes
- `@primeng/themes` is deprecated in PrimeNG 21 — themes now live in `@primeuix/themes`
- Aura preset is the default theme used on primeng.org homepage
- Build passes clean, button renders with Aura light theme

## Next Version
- Theme switching → separate feature MD
