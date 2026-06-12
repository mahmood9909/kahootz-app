Create a new feature documentation file.

Arguments: $ARGUMENTS
(Expected: feature name in plain text, e.g. "add login page" or "dark mode toggle")

Steps:
1. Convert the feature name to kebab-case slug (e.g. "add login page" → "add-login-page").
2. Determine the target folder: `kahoot-frontend/features/<slug>/`.
3. Check if the folder already exists.
   - If yes: find the highest existing version number in that folder and use N+1.
   - If no: create the folder, start at v1.
4. Create the file `kahoot-frontend/features/<slug>/<slug>-v1.md` (or vN) with this exact template:

```
## Goal
<feature name>

## Description


## Tasks
- [ ] 

## Questions


## Answers

```

5. Report the full file path that was created.
