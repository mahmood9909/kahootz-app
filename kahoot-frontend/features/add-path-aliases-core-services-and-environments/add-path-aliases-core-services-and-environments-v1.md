## Goal
Add TypeScript path aliases for `@core/services` and `@env` to replace deep relative imports like `../../../../core/services/auth.service` and `../../../../environments/environment`

## Description
Currently, files deep in the component tree need to write long relative paths to reach singleton services and environment files:

```ts
import { AuthService }  from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { environment }  from '../../../../environments/environment';
```

Adding TS path aliases in `tsconfig.json` lets every file use clean absolute-style imports regardless of depth:

```ts
import { AuthService }  from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { environment }  from '@env/environment';
```

## Tasks
- [ ] Add `@core/*` and `@env` aliases to `tsconfig.json` `paths`
- [ ] Update all existing imports across the codebase to use the new aliases
- [ ] Verify build is clean after changes

## Questions

## Answers
