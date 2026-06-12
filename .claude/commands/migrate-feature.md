Create a migration documentation file to move an existing feature from its current technology/approach to a new one.

Arguments: $ARGUMENTS
(Expected: "<feature-slug-or-path> to <new-technology-or-approach>"
 e.g. "theme-toggle-dark-white to NgRx signals" or "setup-site-colors to custom preset")

Steps:
1. Parse $ARGUMENTS to extract:
   - SOURCE: everything before the word " to " → the source feature slug or path
   - TARGET: everything after the word " to " → the new technology or approach description

2. Locate the source feature doc:
   - If a path is given, use it directly.
   - If a slug/name is given, search under `kahoot-frontend/features/` for a matching folder.
   - Read the **latest version** file in that folder (highest vN number).
   - Extract the ## Goal and ## Description from it to understand what the feature does.

3. Convert SOURCE slug and TARGET description to kebab-case to build the migration slug:
   - migration slug = `migrate-<source-slug>-to-<target-kebab>`
   - e.g. SOURCE "theme-toggle-dark-white" + TARGET "ngrx signals" → `migrate-theme-toggle-dark-white-to-ngrx-signals`

4. Determine the migration folder: `kahoot-frontend/features/<migration-slug>/`.
   - If the folder already exists: find the highest version and use N+1.
   - If not: create the folder, start at v1.

5. Create the file `kahoot-frontend/features/<migration-slug>/<migration-slug>-v1.md` (or vN)
   using this exact template, filling in the placeholders from what you read:

```
## Goal
Migrate <source feature goal> from <current approach> to <target approach>

## Source Feature
- **Doc**: `<path to latest source feature version file>`
- **Current approach**: <one-line summary of what technology/pattern is currently used, read from the source doc>

## Target Approach
<target technology or approach from $ARGUMENTS>

## Description
<copy the Description from the source feature doc, then append a new line:>
Migration: replace <current approach> with <target approach>.

## Migration Tasks
- [ ] Read and understand the source feature implementation.
- [ ] Research the target approach and how it applies to this feature.
- [ ] Plan the migration steps and create next version with findings.
- [ ] Implement the migration.
- [ ] Verify feature behaviour is identical after migration.
- [ ] Remove old implementation code.

## Questions


## Answers

```

6. Report the full file path that was created.
