## Goal
Fix signin-signup dropdown styling

## Findings

### Bug 1 — Border looks sharp / doesn't match the rest of the UI
**Root cause:** The generated `hlm-dropdown-menu.ts` applies the class `border` with no opacity modifier.
In Tailwind v4, `border` renders as `border-width: 1px` using `--color-border` at full 100% opacity.
The nav bar uses `border-border/50` (50% opacity), so the dropdown's border reads as noticeably
darker and heavier than everything else.

**File:** `src/app/ui-lib/dropdown-menu/src/lib/hlm-dropdown-menu.ts` — line 28
```
... rounded-md border p-1 shadow-md
             ^^^^^^ ← full opacity, too strong
```

**Fix level:** Component level (local Helm copy). No global CSS change needed.
**Fix:** Replace `border` with `border border-border/40` in that class string to visually soften it.

---

### Bug 2 — Dropdown touches the right screen edge
**Root cause:** `HlmDropdownMenuTrigger` defaults to `align: 'start'` (from `injectHlmDropdownMenuConfig`
in `hlm-dropdown-menu-token.ts`). With `align="start"` the dropdown's **left** edge aligns with
the trigger's left edge — but the trigger is at the far right of the nav bar, so the dropdown
overflows beyond the right viewport edge.

**File:** `src/app/components/nav-bar/nav-bar.html` — both `[hlmDropdownMenuTrigger]` bindings
```html
<button ... [hlmDropdownMenuTrigger]="authMenu">   ← no align set, defaults to "start"
<button ... [hlmDropdownMenuTrigger]="userMenu">   ← same
```

**Fix level:** Component level (nav-bar template only).
**Fix:** Add `align="end"` to both trigger buttons so the dropdown's **right** edge aligns with
the trigger's right edge, keeping it fully within the viewport.

---

## Fix Plan

| # | What | Where | Change |
|---|------|--------|--------|
| 1 | Border opacity | `hlm-dropdown-menu.ts` line 28 | `border` → `border border-border/40` |
| 2 | Right-edge overflow | `nav-bar.html` both triggers | add `align="end"` input |

No global CSS changes needed — both fixes are component-level.

---

## Tasks
- [x] Analyze root causes
- [x] Plan fix
- [ ] Implement fixes
- [ ] Verify build

## Questions
None.

## Answers
