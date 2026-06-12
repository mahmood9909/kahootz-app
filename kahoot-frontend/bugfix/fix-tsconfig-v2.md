## Goal
Fix `/tsconfig.app.json` and `/tsconfig.spec.json`

## Analysis

### Q: Were the tsconfig files causing compilation errors?
**A: No.** Running `pnpm build` compiled successfully with zero errors. Both tsconfig files are correctly configured for Angular 21 + Vitest:

- `tsconfig.json` — solution-level config, delegates to referenced projects via `"files": []` + `"references"`. Correct.
- `tsconfig.app.json` — includes `src/**/*.ts`, excludes `src/**/*.spec.ts`, `"types": []` to keep the app build clean. Correct.
- `tsconfig.spec.json` — includes `.spec.ts` and `.d.ts`, sets `"types": ["vitest/globals"]` for global `describe`/`it`/`expect`. Correct.

### Q: Then what was the actual error?
**A: Stale generated test in `app.spec.ts`.**

The Angular scaffold generates a default test:
```ts
expect(compiled.querySelector('h1')?.textContent).toContain('Hello, kahoot-frontend');
```

After the PrimeNG setup replaced the app template, the `<h1>` no longer exists.
`querySelector('h1')` returned `undefined`, and Vitest's `toContain(undefined, string)` throws:
> AssertionError: the given combination of arguments (undefined and string) is invalid for this assertion.

## Fix

Updated `src/app/app.spec.ts` — replaced the stale title test with a test that reflects the current template (`<router-outlet />`):

```ts
// Before
it('should render title', async () => {
  ...
  expect(compiled.querySelector('h1')?.textContent).toContain('Hello, kahoot-frontend');
});

// After
it('should render router outlet', async () => {
  ...
  expect(compiled.querySelector('router-outlet')).not.toBeNull();
});
```

## Result

```
Test Files  1 passed (1)
      Tests  2 passed (2)
```

## Q&A

### Q: Why am I getting "The common source directory of 'tsconfig.app.json' is './src'. The 'rootDir' setting must be explicitly set…"?

**A:** When `rootDir` is not set and `outDir` is set, TypeScript infers the root from the common ancestor of all included files. If that inferred root ever shifts (e.g. a file outside `src/` gets pulled in), the output layout changes unexpectedly — so TypeScript warns you to make it explicit.

**Fix:** Add `"rootDir": "src"` to `compilerOptions` in both `tsconfig.app.json` and `tsconfig.spec.json`.

```jsonc
// tsconfig.app.json
"compilerOptions": {
  "outDir": "./out-tsc/app",
  "rootDir": "src",   // ← added
  "types": []
}

// tsconfig.spec.json
"compilerOptions": {
  "outDir": "./out-tsc/spec",
  "rootDir": "src",   // ← added
  "types": ["vitest/globals"]
}
```

This pins the output layout to `src/` and silences the warning. Build and tests both pass after the change.


### Q: tsconfig.app.json warning is gone but tsconfig.spec.json still shows "The common source directory is './src/app'…". Why?

**A:** The two tsconfigs include different files, so TypeScript infers a different common root for each:

| tsconfig | included files | inferred common root |
|---|---|---|
| `tsconfig.app.json` | `src/**/*.ts` → picks up `src/main.ts` | `src/` ✅ matches `rootDir: "src"` |
| `tsconfig.spec.json` | `src/**/*.spec.ts` → only `src/app/app.spec.ts` | `src/app/` ⚠ broader than needed |

Setting `"rootDir": "src"` in both configs is still **correct** — TypeScript requires only that rootDir be an *ancestor* of all included files, not an exact match. Running `tsc -p tsconfig.spec.json --noEmit` confirms zero errors or warnings after the fix.

**The warning in your IDE is stale.** Restart the TypeScript language server to clear it:

- **VS Code**: `Ctrl+Shift+P` → `TypeScript: Restart TS Server`
- **WebStorm / Rider**: `File` → `Invalidate Caches` or restart the IDE

## Final Result

```
tsc -p tsconfig.app.json --noEmit   → no output (clean)
tsc -p tsconfig.spec.json --noEmit  → no output (clean)

pnpm build   → Application bundle generation complete
pnpm test    → Test Files 1 passed | Tests 2 passed
```
