## Goal
Fix nav styling problem

## Findings

### Bug 1 — Theme toggle overlaps the nav bar
**Root cause:** The theme toggle lives in `app.html` as a separate `fixed top-4 right-4 z-50` div, floating independently over the page — and over the nav bar itself. It is not part of the nav bar.

**Files involved:**
- `src/app/app.html` — hosts the floating theme toggle div
- `src/app/app.ts` — imports `ThemeService`, `lucideSun`, `lucideMoon` for the toggle
- `src/app/components/nav-bar/nav-bar.html` — has no theme toggle
- `src/app/components/nav-bar/nav-bar.ts` — has no theme imports

### Bug 2 — Logo shows as broken image
**Root cause:** The logo is loaded via `<img src="assets/logo.svg">` (relative path). Angular serves assets at `/assets/logo.svg` (root-relative), but a relative path works only on the `/` route. On sub-routes like `/signin` the browser resolves it as `/signin/assets/logo.svg` which 404s.

Additionally the SVG itself uses a `<text>` element which may render inconsistently across browsers without an embedded font.

**File involved:** `src/app/components/nav-bar/nav-bar.html` line 4, `src/assets/logo.svg`

### Bug 3 — Items not aligned
**Root cause:** `ml-auto` on the auth area div (line 24 of `nav-bar.html`) pushes it to the right, but with `flex-1` already on the nav items `<ul>`, the `ml-auto` is redundant and can cause layout inconsistency. Vertical alignment relies on `items-center` on the nav — should be fine once the logo renders correctly.

---

## Fix Plan

### Fix 1 — Move theme toggle into the nav bar
- **Remove** the floating theme toggle div and its `z-50` wrapper from `app.html`
- **Remove** `ThemeService`, `lucideSun`, `lucideMoon`, `NgIcon` imports from `app.ts` (no longer needed there)
- **Add** `ThemeService` inject + `lucideSun`/`lucideMoon` icons to `nav-bar.ts`
- **Add** theme toggle button inside the nav bar's right-side auth area, next to the user avatar button

### Fix 2 — Replace broken logo
- Replace `<img src="assets/logo.svg">` with an **inline SVG** (no network request, no path issue)
- Use a simple quiz-themed inline SVG: a speech bubble with a question mark, colored with `text-primary` / `fill-current`
- Remove `src/assets/logo.svg` (no longer needed)

### Fix 3 — Clean up alignment
- Remove `ml-auto` from the auth area div (redundant with `flex-1` on `<ul>`)
- Keep `items-center` on the nav for vertical centering
- Ensure the right-side cluster (theme + user icons) uses `flex items-center gap-1`

---

## Result layout (logged-out)
```
┌─────────────────────────────────────────────────────────────┐
│  [Quiz SVG + "Kahootz"]   [Home]          [☀/🌙]  [👤]    │
│  ← logo (left)            ← nav links     ← right cluster  │
└─────────────────────────────────────────────────────────────┘
```

---

## Tasks
- [x] Analyze root causes
- [x] Plan fix
- [ ] Confirm plan then implement

## Questions
None — the fix is clear. Ready to implement on confirmation.

## Answers
