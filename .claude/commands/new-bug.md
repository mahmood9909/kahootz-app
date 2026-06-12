Create a new bugfix documentation file.

Arguments: $ARGUMENTS
(Expected: bug name in plain text, e.g. "fix wrong button color" or "login redirect loop")

Steps:
1. Convert the bug name to kebab-case slug (e.g. "fix wrong button color" → "fix-wrong-button-color").
2. Determine the target folder: `kahoot-frontend/bugfix/<slug>/`.
3. Check if the folder already exists.
   - If yes: find the highest existing version number in that folder and use N+1.
   - If no: create the folder, start at v1.
4. Create the file `kahoot-frontend/bugfix/<slug>/<slug>-v1.md` (or vN) with this exact template:

```
## Goal
<bug name>

## Description


## Tasks
- [ ] analyze why the error is happening
- [ ] plan and analyze the fix after carefully reading the files
- [ ] create next version md with findings and fix

## Questions


## Answers

```

5. Report the full file path that was created.
