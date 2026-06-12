Add a spartan/ui component to the project's `ui-lib`.

Arguments: $ARGUMENTS
(Expected: component name, e.g. "input" or "badge" or "dialog")

---

Follow every step in order. Do not skip any step.

## Step 1 — Get project context

Run:
```bash
ng g @spartan-ng/cli:info --json
```

From the output, note:
- `installedComponents` — if the requested component is already listed here, skip to Step 4.
- `availableComponents` — confirm the component name is valid.
- `componentsPath` — should be `src/app/ui-lib`.
- `importAlias` — should be `@ui-lib`.

## Step 2 — Pull the component API from MCP

Call the spartan MCP tool:
```
spartan_components_get <component-name>
```

Read the full output. Record:
- Correct selector(s) and directive/component class names
- All `@Input()` names, types, defaults
- The `*Imports` const name (or individual export names)
- Whether Brain primitives are required on host elements
- Whether icons need `provideIcons` registration
- Composition rules (e.g. items must be inside a group wrapper)

Do not proceed until you have read the MCP output.

## Step 3 — Install via CLI

Run:
```bash
ng g @spartan-ng/cli:ui --name=<component-name>
```

This is an Angular CLI workspace (`workspaceType: angular-cli`), so use `ng g`, not `pnpm nx g`.

After the command completes, list the generated files:
```bash
ls src/app/ui-lib/<component-name>/
```

Read each generated file to understand the full exported API before writing any usage code.

## Step 4 — Compose the component in the target location

Using the API confirmed in Step 2:

1. Import from `@ui-lib/<name>` in the consuming standalone component.
2. Add to the `imports` array.
3. Write the template using ONLY selectors and inputs confirmed by MCP output — never guess.
4. Apply semantic color tokens (`bg-primary`, `text-muted-foreground`, etc.), not raw values.
5. Use `gap-*` not `space-*` for spacing; `size-*` when width equals height.

## Step 5 — Register icons if needed

If the MCP output or generated Helm file uses `<ng-icon>`, register the required icons:

```ts
import { provideIcons } from '@ng-icons/core';
import { lucide<IconName> } from '@ng-icons/lucide';

@Component({
  providers: [provideIcons({ lucide<IconName> })],
})
```

## Step 6 — Verify build

```bash
ng build --configuration development 2>&1 | tail -8
```

Confirm no errors. If there are TypeScript errors related to the new component,
re-read the generated Helm file and the MCP output to correct the import or usage.

## Step 7 — Report

State:
- Which component was added
- Files created in `src/app/ui-lib/<name>/`
- Import path to use: `import { ... } from '@ui-lib/<name>'`
- Any icons that were registered
- Any composition rules the caller must follow

---

Reference docs: `kahoot-frontend/docs/spartan-ui/add-component.md`
MCP reference:  `kahoot-frontend/docs/spartan-ui/mcp.md`
