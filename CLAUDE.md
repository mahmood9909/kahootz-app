# Kahootz Project

## Project Structure

```
kahootz/
├── kahoot-frontend/   # Angular 21 frontend application
└── kahoot-backend/    # Backend (to be created)
```

## Frontend (`kahoot-frontend/`)

- **Framework**: Angular 21.1.3
- **Styling**: SCSS
- **Routing**: Enabled (`app.routes.ts`)
- **Package manager**: pnpm 10.x
- **Node**: 24.x

### Dev server

```bash
cd kahoot-frontend
pnpm start
```

### Build

```bash
cd kahoot-frontend
pnpm build
```

### Tests

```bash
cd kahoot-frontend
pnpm test
```

## Backend (`kahoot-backend/`)

To be defined.

## Notes

- Working directory: `C:\Coding\claude-code\kahootz`
- Platform: Windows 11, PowerShell + Bash available

---

## Documentation Workflow (enforced on every task)

Every feature and bugfix **must** have a dedicated markdown file before work begins.

### File locations

| Type    | Path pattern                                              |
|---------|-----------------------------------------------------------|
| Feature | `kahoot-frontend/features/<slug>/<slug>-v1.md`            |
| Bugfix  | `kahoot-frontend/bugfix/<slug>/<slug>-v1.md`              |

### Versioning rule

Never edit an existing doc in-place. Each revision is a new file:

```
add-login-page-v1.md   ← original
add-login-page-v2.md   ← first revision (questions answered, plan updated)
add-login-page-v3.md   ← next revision
```

### Required sections in every doc

```markdown
## Goal
<one-line description>

## Description
<context, links, reproduction steps>

## Tasks
- [ ] ...

## Questions

## Answers
```

### Slash commands

| Command | What it does |
|---------|--------------|
| `/new-feature <name>` | Scaffolds `features/<slug>/<slug>-v1.md` |
| `/new-bug <name>`     | Scaffolds `bugfix/<slug>/<slug>-v1.md`   |
| `/next-version <name-or-path>` | Creates the next version of an existing doc |
