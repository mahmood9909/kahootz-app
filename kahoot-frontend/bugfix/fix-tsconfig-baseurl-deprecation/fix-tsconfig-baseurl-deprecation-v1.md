## Goal
Fix tsconfig files — remove deprecated `baseUrl` causing TS 5.9 warnings across tsconfig.json, tsconfig.app.json, and tsconfig.spec.json

## Description
TypeScript 5.9 warns that `baseUrl` is deprecated and will stop functioning in TypeScript 7.0:

```
Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0.
Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
Visit https://aka.ms/ts6 for migration information.
```

The warning appears because `tsconfig.json` sets `"baseUrl": "."` which was previously required to make `paths` mappings work. In modern TypeScript (5.0+), `paths` no longer requires `baseUrl` — the two options have been decoupled.

Affected files:
- `tsconfig.json` — has `"baseUrl": "."` alongside `"paths": { "@ui-lib/*": [...] }`
- `tsconfig.app.json` — extends tsconfig.json, inherits the warning
- `tsconfig.spec.json` — extends tsconfig.json, inherits the warning

## Tasks
- [ ] analyze why the error is happening
- [ ] plan and analyze the fix after carefully reading the files
- [ ] create next version md with findings and fix

## Questions

## Answers
