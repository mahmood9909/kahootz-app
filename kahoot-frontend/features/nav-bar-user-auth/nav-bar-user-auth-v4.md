## Goal
Navigation bar with logo, auth-state-aware nav items, and avatar dropdown — plus dedicated sign-in and sign-up pages.

## Description

### Nav bar — fixed, transparent, blurred
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo SVG]   [nav item]  ...                     [avatar icon] │
└─────────────────────────────────────────────────────────────────┘
  position: fixed | bg-background/80 backdrop-blur-md | border-b
```

### Logo
- Game-themed SVG (Kahoot-inspired, original) at `src/assets/logo.svg`
- Rendered as an `<img>` or inline `<svg>` so it can be swapped without touching component code

### Nav items per auth state
```ts
// logged OUT
loggedOutNav = [{ name: 'Home', path: '/' }]

// logged IN
loggedInNav = [{ name: 'Dashboard', path: '/dashboard' }]
```

### Avatar + dropdown (right side)
Same placeholder avatar icon (`lucideUser`) for both states. Clicking opens different dropdowns:

**Logged-out dropdown:**
| Label    | Action              |
|----------|---------------------|
| Sign In  | router navigate `/signin` |
| Sign Up  | router navigate `/signup` |

**Logged-in dropdown:**
| Label    | Action        |
|----------|---------------|
| Profile  | no action yet |
| Settings | no action yet |
| Log Out  | no action yet |

### Routes
| Path         | Component               | Location                          |
|--------------|-------------------------|-----------------------------------|
| `/`          | (existing home)         | —                                 |
| `/signin`    | `SignInPageComponent`   | `src/app/pages/sign-in/`          |
| `/signup`    | `SignUpPageComponent`   | `src/app/pages/sign-up/`          |
| `/dashboard` | `DashboardPageComponent`| `src/app/pages/dashboard/`        |

All routes lazy-loaded. Dashboard visible only when logged in (guard TBD — for now just a route with no guard).

### Auth service
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
- [ ] Answer Q1 below (sign-in / sign-up page content)
- [ ] Add `dropdown-menu` via `/add-spartan-component`
- [ ] Create `AuthService`
- [ ] Add placeholder game logo SVG to `src/assets/logo.svg`
- [ ] Scaffold `NavBarComponent`
- [ ] Implement fixed + blur nav bar shell
- [ ] Build logo, nav items, avatar + both dropdowns
- [ ] Add `NavBarComponent` to `app.html` with top padding on body
- [ ] Create `SignInPageComponent` at `src/app/pages/sign-in/`
- [ ] Create `SignUpPageComponent` at `src/app/pages/sign-up/`
- [ ] Create `DashboardPageComponent` at `src/app/pages/dashboard/`
- [ ] Register routes in `app.routes.ts`
- [ ] Verify build: `ng build --configuration development`

---

## Questions

### Q1 — Sign-in and sign-up page content
The pages need to exist as real pages (not placeholders). What should they contain?

- A) Minimal auth forms only — sign-in: email + password + submit; sign-up: name + email + password + submit (no wiring, no validation yet)
- B) Something specific — please describe the layout or fields you want

---

## Answers


Q1. A . just default page name as we will take into differen feature. 
Q1. A .  Don't added fields as of now  
