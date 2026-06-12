# kahoot-frontend

Angular 21 frontend for the Kahootz project.

## Stack

- **Framework**: Angular 21 (standalone components, signals)
- **UI library**: spartan/ui (`@spartan-ng/brain` + local Helm copies in `src/app/ui-lib/`)
- **Styling**: Tailwind CSS v4 (`src/tailwind.css`) + SCSS per component
- **Testing**: Vitest
- **Package manager**: pnpm 10.x
- **TypeScript**: 5.9.x

## Commands

```bash
pnpm start          # dev server (http://localhost:4200)
pnpm build          # production build → dist/
pnpm watch          # build in watch mode (development)
pnpm test           # run unit tests with Vitest
ng generate component src/app/<name>          # scaffold an Angular component
ng g @spartan-ng/cli:ui --name=<component>    # add a spartan/ui Helm component
ng g @spartan-ng/cli:info --json              # print spartan project context
```

## Project structure

```
src/
├── app/
│   ├── app.ts            # root component
│   ├── app.html          # root template
│   ├── app.scss          # root styles
│   ├── app.config.ts     # app-level providers
│   ├── app.routes.ts     # route definitions
│   └── ui-lib/           # local spartan Helm copies (@ui-lib/* alias)
│       ├── utils.ts      # hlm() = clsx + tailwind-merge
│       └── <name>/       # one folder per installed component
│           ├── hlm-<name>.directive.ts
│           └── index.ts
├── tailwind.css          # Tailwind v4 entry + design tokens + dark mode vars
├── styles.scss           # global SCSS (body theme colours, resets)
├── index.html
└── main.ts
```

## Spartan UI — adding components

Before adding any spartan component:
1. Run `ng g @spartan-ng/cli:info --json` and check `installedComponents` — never re-add.
2. Call `spartan_components_get <name>` via MCP to get selectors, inputs, and imports.
3. Run `ng g @spartan-ng/cli:ui --name=<name>` to install Brain + copy Helm files.
4. Import from `@ui-lib/<name>` in the consuming component.

Full guide: `docs/spartan-ui/add-component.md`
MCP reference: `docs/spartan-ui/mcp.md`
Slash command: `/add-spartan-component <name>`

### Critical: PostCSS config
Angular 21 only reads `postcss.config.json` — never `.mjs` or `.js`.
Tailwind CSS entry point is `src/tailwind.css`, not `src/styles.scss`
(the CLI's `tailwindCssFile` detection is a known quirk — it does not affect the build).

## Conventions

- Standalone components only (no NgModules)
- SCSS per component; global design tokens via CSS custom properties in `src/tailwind.css`
- Semantic colour tokens only (`bg-primary`, `text-muted-foreground`) — never raw values
- Lazy-load routes for every feature area
- Single quotes, 100-char print width (Prettier — config in `package.json`)
