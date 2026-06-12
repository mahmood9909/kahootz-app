# kahoot-frontend

Angular 21 frontend for the Kahootz project.

## Stack

- **Framework**: Angular 21 (standalone components, signals)
- **Styling**: SCSS
- **Testing**: Vitest
- **Package manager**: pnpm 10.x
- **TypeScript**: 5.9.x

## Commands

```bash
pnpm start          # dev server (http://localhost:4200)
pnpm build          # production build → dist/
pnpm watch          # build in watch mode (development)
pnpm test           # run unit tests with Vitest
ng generate component src/app/<name>   # scaffold a component
```

## Project structure

```
src/
├── app/
│   ├── app.ts          # root component
│   ├── app.html        # root template
│   ├── app.scss        # root styles
│   ├── app.config.ts   # app-level providers
│   └── app.routes.ts   # route definitions
├── styles.scss         # global styles
├── index.html
└── main.ts
```

## Conventions

- Standalone components only (no NgModules)
- SCSS per component, global variables in `src/styles.scss`
- Lazy-load routes for every feature area
- Single quotes, 100-char print width (Prettier — config in `package.json`)
