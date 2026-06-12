## Goal
Fix logo: respond to theme switch, pull SVG from assets, pull app name from environment config

## Findings

### Bug 1 — Logo doesn't respond to theme
**Root cause:** The inline SVG in `nav-bar.html` (lines 5–9) hardcodes `fill="white"` on the
inner path shapes. In light mode this works (white on dark-zinc background). In dark mode
`fill-primary` becomes `#fafafa` (near-white), so the inner white shapes become invisible
against the near-white background — the logo looks blank.

```html
<!-- current — broken in dark mode -->
<rect width="32" height="32" rx="8" class="fill-primary"/>        ← reactive ✓
<path d="..." fill="white" opacity="0.9"/>                        ← hardcoded ✗
<rect x="13" y="13" ... fill="white"/>                            ← hardcoded ✗
```

Additionally, the `src/assets/logo.svg` file uses hardcoded hex `fill="#6366f1"` and `fill="white"`
which are never reactive to theme. This file is not currently used by the template (the template
uses a separate inline SVG), making it stale.

**Fix:** Replace hardcoded `fill="white"` with `class="fill-primary-foreground"`.
`--color-primary-foreground` is `#fafafa` in light mode and `#18181b` in dark mode — always
the contrasting colour against `--color-primary`.

---

### Bug 2 — App name hardcoded in template
**Root cause:** `nav-bar.html` line 10 has a literal string:
```html
<span class="text-base font-bold tracking-tight">Kahootz</span>
```
No `src/environments/` folder exists in the project — Angular's environment file pattern has
not been set up yet.

**Fix:**
1. Create `src/environments/environment.ts` (production) and `src/environments/environment.development.ts`
2. Add `appName: 'Kahootz'` to both
3. Wire `angular.json` `fileReplacements` so the dev file swaps in during `ng serve` / dev builds
4. Import `environment` in `nav-bar.ts` and bind `{{ environment.appName }}` in the template

---

## Fix Plan

| # | What | File(s) | Change |
|---|------|---------|--------|
| 1 | Fix logo inner colours | `nav-bar.html` | `fill="white"` → `class="fill-primary-foreground"` |
| 2 | Clean up stale asset | `src/assets/logo.svg` | Rewrite to use `currentColor` so it's usable if needed later |
| 3 | Create environment files | `src/environments/environment.ts` + `environment.development.ts` | Add `appName: 'Kahootz'` |
| 4 | Wire fileReplacements | `angular.json` | Add dev `fileReplacements` entry |
| 5 | Bind app name from env | `nav-bar.ts` + `nav-bar.html` | Import `environment`, expose as property, bind in template |

---

## Result

**Light mode:**
```
[ dark-zinc rect ][ white-ish inner squares ]  Kahootz   ← from env
```
**Dark mode:**
```
[ near-white rect ][ dark inner squares ]  Kahootz   ← same env value
```

Both states use the same template — CSS variables do the work, no `@if` needed.

---

## Tasks
- [x] Analyze root causes
- [x] Plan fix
- [ ] Implement fixes
- [ ] Verify build

## Questions
None.

## Answers
