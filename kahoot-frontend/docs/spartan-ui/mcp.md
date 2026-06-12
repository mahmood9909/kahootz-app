# Spartan UI MCP — Tool Reference

The `@spartan-ng/mcp` server exposes two tools. They are the **primary source of
truth** for component APIs — never guess selectors, inputs, or import paths.

MCP server config lives at `kahootz/.mcp.json`. Restart Claude Code to activate.

---

## Tools

### `spartan_components_list`

Returns the full catalog of available spartan components with a short description
of each.

**When to use:**
- Deciding which component to reach for before implementing a UI pattern.
- Cross-checking against `installedComponents` from `ng g @spartan-ng/cli:info --json`.

**Never needed if:** you already know the exact component name.

---

### `spartan_components_get <name>`

Returns the complete API for one component:
- Selectors (e.g. `hlmBtn`, `hlm-dialog`, `BrnDialogTriggerDirective`)
- All `@Input()` names, types, and defaults
- Required Brain imports and Brain directives
- Helm `*Imports` const or individual export names
- Copy-paste usage examples
- Any composition rules (e.g. items must be inside their group)

**When to use:**
- Before writing **any** markup that uses a spartan component.
- When debugging an unexpected rendering/behaviour issue — verify the selector is correct.
- When checking which Brain package a component needs.

**Usage pattern:**
```
spartan_components_get button
spartan_components_get dialog
spartan_components_get select
```

---

## Workflow rule

```
spartan_components_get <name>   ← always first, before writing a single line of template
ng g @spartan-ng/cli:ui --name=<name>   ← add the component if not already installed
```

Do not proceed to write markup until the MCP output has been read and the
component is confirmed in `installedComponents`.
