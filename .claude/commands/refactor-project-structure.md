Refactor the Angular project's folder structure to follow best-practice conventions: `core/`, `features/`, and `shared/`.

Arguments: $ARGUMENTS
(Expected: none, or a specific layer to refactor e.g. "core" / "features" / "shared". Defaults to all three.)

---

Follow every step in order. Do not skip any step.

---

## Target structure

```
src/app/
├── app.ts               ← root component (never moves)
├── app.html
├── app.scss
├── app.config.ts
├── app.routes.ts
│
├── core/                ← singleton services, guards, interceptors
│   ├── services/        ← app-wide services (auth, theme, etc.)
│   ├── guards/          ← route guards
│   └── interceptors/    ← HTTP interceptors
│   └── directives/    ← HTTP interceptors
│
├── pages/            ← one folder per route / feature area
│       ├── siginin.ts
│       └── signup.html
│
├── shared/              ← reusable pieces used across ≥2 features
│   └── components/      ← reusable UI components (nav-bar, etc.)
│
└── ui-lib/              ← Spartan UI Helm copies — NEVER moved
```

### Rules

| Layer | Goes here | Does NOT go here |
|-------|-----------|-----------------|
| `core/` | `@Injectable({ providedIn: 'root' })` services, route guards, HTTP interceptors | Page components, feature-specific services |
| `features/` | Page components loaded by the router, feature-scoped services | Shared UI components, singleton services |
| `shared/` | Components / directives / pipes used by ≥2 features | Page-specific logic, singleton services |
| `ui-lib/` | Spartan Helm copies only | Everything else |

---

## Step 1 — Audit what exists

Run:
```bash
find src/app -type f -name "*.ts" | grep -v "ui-lib\|node_modules\|spec" | sort
```

Categorise each file into `core`, `features`, or `shared` using the rules above.
Write the mapping as a table before touching any file:

| Current path | Target path | Reason |
|---|---|---|
| `src/app/service/auth.service.ts` | `src/app/core/services/auth.service.ts` | Singleton service |
| `src/app/service/theme.service.ts` | `src/app/core/services/theme.service.ts` | Singleton service |
| `src/app/pages/sign-in/sign-in.ts` | `src/app/features/sign-in/sign-in.ts` | Routed page |
| `src/app/pages/sign-up/sign-up.ts` | `src/app/features/sign-up/sign-up.ts` | Routed page |
| `src/app/pages/dashboard/dashboard.ts` | `src/app/features/dashboard/dashboard.ts` | Routed page |
| `src/app/components/nav-bar/nav-bar.ts` | `src/app/shared/components/nav-bar/nav-bar.ts` | Used by root layout |

Do not proceed until the table is complete.

---

## Step 2 — Move files (one layer at a time)

Move files with `git mv` so git tracks the rename rather than treating it as a delete + add.

### 2a — core/services
```bash
mkdir -p src/app/core/services
git mv src/app/service/auth.service.ts   src/app/core/services/auth.service.ts
git mv src/app/service/theme.service.ts  src/app/core/services/theme.service.ts
# If the old service/ folder is now empty, remove it:
rmdir src/app/service 2>/dev/null || true
```

### 2b — features
```bash
mkdir -p src/app/features/sign-in src/app/features/sign-up src/app/features/dashboard
git mv src/app/pages/sign-in/sign-in.ts     src/app/features/sign-in/sign-in.ts
git mv src/app/pages/sign-up/sign-up.ts     src/app/features/sign-up/sign-up.ts
git mv src/app/pages/dashboard/dashboard.ts src/app/features/dashboard/dashboard.ts
# Remove empty page folders:
rm -rf src/app/pages
```

### 2c — shared/components
```bash
mkdir -p src/app/shared/components/nav-bar
git mv src/app/components/nav-bar/nav-bar.ts   src/app/shared/components/nav-bar/nav-bar.ts
git mv src/app/components/nav-bar/nav-bar.html src/app/shared/components/nav-bar/nav-bar.html
# Remove empty components folder:
rm -rf src/app/components
```

> **Note:** If any file has a matching `.html`, `.scss`, or `.spec.ts`, move those too with `git mv`.

---

## Step 3 — Fix all import paths

After moving files, every `import` that references the old paths must be updated.
Open each affected file and update relative `import` statements.

### Common import changes

| Old import | New import |
|---|---|
| `../../service/auth.service` | `../../core/services/auth.service` |
| `../../service/theme.service` | `../../core/services/theme.service` |
| `./components/nav-bar/nav-bar` | `./shared/components/nav-bar/nav-bar` |
| `./pages/sign-in/sign-in` | `./features/sign-in/sign-in` |
| `./pages/sign-up/sign-up` | `./features/sign-up/sign-up` |
| `./pages/dashboard/dashboard` | `./features/dashboard/dashboard` |

### Files that need import updates (typical)

| File | What to update |
|---|---|
| `src/app/app.ts` | `NavBarComponent` import path |
| `src/app/app.routes.ts` | All `loadComponent` paths |
| `src/app/shared/components/nav-bar/nav-bar.ts` | `AuthService` + `ThemeService` paths |

Use grep to catch any imports that reference old paths:
```bash
grep -r "from.*service/auth\|from.*service/theme\|from.*pages/\|from.*components/nav-bar" src/app --include="*.ts"
```

The output must be empty before proceeding.

---

## Step 4 — Verify build

```bash
ng build --configuration development 2>&1 | tail -10
```

Must complete with **zero errors**. If there are `TS2307: Cannot find module` errors:
1. Re-read the file that contains the error
2. Check the import path — it is almost always a wrong relative depth (`../../` vs `../`)
3. Fix the import and rebuild

Do not proceed until the build is clean.

---

## Step 5 — Update documentation

Update `CLAUDE.md` (or the nearest project-level readme) to reflect the new structure:

```
src/
├── app/
│   ├── core/services/     ← singleton services (auth, theme)
│   ├── features/          ← routed page components
│   ├── shared/components/ ← reusable UI components
│   └── ui-lib/            ← Spartan UI Helm copies
```

---

## Step 6 — Commit

```bash
git add -A
git commit -m "refactor(structure): reorganise into core/, features/, shared/"
```

---

## Checkpoints summary

| # | Check | Command |
|---|---|---|
| 1 | Audit table complete | manual |
| 2 | All files moved with `git mv` | `git status` — should show renames, not deletes |
| 3 | No stale imports | `grep -r "from.*pages/\|from.*service/" src/app --include="*.ts"` → empty |
| 4 | Build clean | `ng build --configuration development` |
| 5 | CLAUDE.md updated | manual |

---

## Guardrails

- **Never move `ui-lib/`** — Spartan CLI must find it at `src/app/ui-lib/` (set in `components.json`). Moving it breaks `ng g @spartan-ng/cli:ui`.
- **Never move `app.ts`, `app.config.ts`, `app.routes.ts`** — Angular CLI and the bootstrapper hard-reference these.
- **Always use `git mv`** — a plain file copy + delete loses git blame history.
- **Fix imports depth carefully** — after moving a file two levels deeper (e.g. `service/` → `core/services/`), all relative paths inside that file shift by one `../`.
