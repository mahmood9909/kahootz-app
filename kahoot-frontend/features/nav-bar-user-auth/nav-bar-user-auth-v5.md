## Goal
Navigation bar with logo, auth-state-aware nav items, avatar dropdown, and three stub pages (sign-in, sign-up, dashboard).

## Description

### Nav bar
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo SVG]   [nav item]  ...                     [avatar icon] │
└─────────────────────────────────────────────────────────────────┘
  position: fixed | bg-background/80 backdrop-blur-md | border-b
```

### Logo
- `src/assets/logo.svg` — game-themed original SVG (quiz/game icon)
- Rendered via `<img src="assets/logo.svg">` — swap the file to update globally

### Nav items (two lists)
```ts
loggedOutNav = [{ name: 'Home', path: '/' }]
loggedInNav  = [{ name: 'Dashboard', path: '/dashboard' }]
```

### Avatar + dropdown
Both states use `lucideUser` icon. One click → different dropdown per state.

| State       | Dropdown items              | Action             |
|-------------|-----------------------------|--------------------|
| Logged out  | Sign In                     | navigate `/signin` |
|             | Sign Up                     | navigate `/signup` |
| Logged in   | Profile                     | none yet           |
|             | Settings                    | none yet           |
|             | Log Out                     | none yet           |

### Pages (stub — heading only, no forms)
| Route        | Component                | Folder                          |
|--------------|--------------------------|---------------------------------|
| `/`          | existing home            | —                               |
| `/signin`    | `SignInPageComponent`    | `src/app/pages/sign-in/`        |
| `/signup`    | `SignUpPageComponent`    | `src/app/pages/sign-up/`        |
| `/dashboard` | `DashboardPageComponent` | `src/app/pages/dashboard/`      |

All routes lazy-loaded. No route guards yet.

### AuthService
```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  toggleAuth(): void { this._isLoggedIn.update(v => !v); }
}
```

---

## Tasks
- [x] All questions answered — ready to implement
- [ ] Add `dropdown-menu` Spartan component via `/add-spartan-component`
- [ ] Create `src/assets/logo.svg` (game-themed placeholder SVG)
- [ ] Create `AuthService` at `src/app/service/auth.service.ts`
- [ ] Scaffold `NavBarComponent` at `src/app/components/nav-bar/`
- [ ] Implement fixed + blur nav bar shell
- [ ] Build logo (left), nav items (center), avatar + dropdowns (right)
- [ ] Add `NavBarComponent` to `app.html`, add `pt-16` to body wrapper
- [ ] Create `SignInPageComponent` — heading only
- [ ] Create `SignUpPageComponent` — heading only
- [ ] Create `DashboardPageComponent` — heading only
- [ ] Register all routes in `app.routes.ts` (lazy-loaded)
- [ ] Verify build: `ng build --configuration development`

## Questions
None — all resolved across v1–v4.

## Answers
All captured in v1–v4 answer sections.
