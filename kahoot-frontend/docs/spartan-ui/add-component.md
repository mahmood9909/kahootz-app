# Adding a Spartan UI Component

Reference this document whenever a spartan component needs to be added to the
`ui-lib`. It covers the full workflow: discovery → installation → wiring.

---

## Project context (always verify first)

```bash
ng g @spartan-ng/cli:info --json
```

Key fields to check:

| Field | Value in this project |
|---|---|
| `workspaceType` | `angular-cli` |
| `componentsPath` | `src/app/ui-lib` |
| `importAlias` | `@ui-lib` |
| `iconLibrary` | `@ng-icons` |
| `installedComponents` | components already present — **do not re-add these** |
| `availableComponents` | full catalog the CLI can generate |

---

## Step 1 — Check if the component is already installed

If the component name appears in `installedComponents`, skip to Step 3 and just
use the existing files. **Never run `ng g @spartan-ng/cli:ui` for an already-installed component.**

---

## Step 2 — Pull the API docs via MCP

```
spartan_components_get <name>
```

Read the output fully before writing any code. Confirm:
- The correct selector(s) (e.g. `hlmBtn`, `[hlmBtn]`, `hlm-dialog`)
- Which `@Input()`s are available and their defaults
- Whether the component requires a Brain directive on a host element
- Which `*Imports` const to add to the standalone component's `imports` array
- Whether icons need to be registered (`provideIcons`)

---

## Step 3 — Install the component via CLI

```bash
ng g @spartan-ng/cli:ui --name=<name>
```

This command for an **Angular CLI workspace** (`workspaceType: angular-cli`):
1. Installs the Brain npm package (`@spartan-ng/brain`) if the version is missing.
2. Copies the Helm directive/component files into `src/app/ui-lib/<name>/`.
3. Creates an `index.ts` barrel export.

**Do not run this for components already in `installedComponents`.**

---

## Step 4 — Verify generated files

After the CLI runs, confirm the expected structure exists:

```
src/app/ui-lib/<name>/
├── hlm-<name>.directive.ts   (or .component.ts for visual components)
└── index.ts                  ← barrel: export { Hlm<Name>... } from './hlm-<name>'
```

If the CLI generated anything else (e.g. multiple files for compound components
like dialog or select), read each file before proceeding.

---

## Step 5 — Wire into a consuming component

```ts
// In any standalone Angular component that needs this UI element:
import { Hlm<Name>Directive } from '@ui-lib/<name>';
// or the *Imports const (check MCP output for exact name):
import { Hlm<Name>Imports } from '@ui-lib/<name>';

@Component({
  imports: [Hlm<Name>Directive],   // or Hlm<Name>Imports spread
})
```

The `@ui-lib/*` path alias is configured in `tsconfig.json` and esbuild picks it
up automatically — no further config needed.

---

## Step 6 — Register icons (if component uses `<ng-icon>`)

Icons from `@ng-icons` must be registered at the component or module level.
The MCP output will indicate which icon set is needed.

```ts
import { provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideX } from '@ng-icons/lucide';

@Component({
  providers: [provideIcons({ lucideSearch, lucideX })],
})
```

See the spartan SKILL rules at `rules/icons.md` for naming conventions.

---

## Gotchas specific to this project

### `tailwindCssFile` detection
`ng g @spartan-ng/cli:info` reports `tailwindCssFile: "src/styles.scss"` because
the CLI scans for the `@import "tailwindcss"` directive. In this project, that
directive is in `src/tailwind.css` (not `styles.scss`). This does not break
anything — it is a detection quirk only. The Tailwind pipeline works correctly
via `postcss.config.json`.

### PostCSS config must be JSON
Angular 21's build only reads `postcss.config.json` (not `.mjs` / `.js`).
Do not create a JavaScript-based PostCSS config — it will be silently ignored
and Tailwind utilities will not be generated.

### `@spartan-ng/cli` version
Pinned to `0.0.1-alpha.711` alongside `@spartan-ng/brain`. Keep these in sync
when upgrading — the CLI generates Helm code that calls Brain APIs at the same
alpha version.

---

## Reference

- MCP tool usage: `docs/spartan-ui/mcp.md`
- Migration history: `features/migrate-install-configure-primeng-to-spartan-ui/`
- Existing ui-lib components: `src/app/ui-lib/`
