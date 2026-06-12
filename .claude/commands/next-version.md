Create the next version of an existing feature or bugfix documentation file.

Arguments: $ARGUMENTS
(Expected: path to the existing md file OR the slug/name of the feature or bug)

Steps:
1. Locate the referenced md file. If only a name/slug is given, search under
   `kahoot-frontend/features/` and `kahoot-frontend/bugfix/` for a matching folder.
2. Identify the highest version file in that folder (e.g. `fix-login-v2.md`).
3. Increment the version number by 1.
4. Create a new file with the incremented version (e.g. `fix-login-v3.md`).
5. Copy the full content of the latest version into the new file as a starting point,
   preserving all existing sections including Questions and Answers.
6. Report the new file path.
