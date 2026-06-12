## Goal
Navigation bar with logo, dynamic nav items per auth state, and avatar icon that opens auth-aware dropdown.

## Description

### Visual structure
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo SVG]   [nav item]  [nav item]  ...         [avatar icon] │  ← fixed, transparent + blur
└─────────────────────────────────────────────────────────────────┘
```

### Nav bar styling
- `position: fixed`, full width, top of viewport
- Semi-transparent background with backdrop blur (e.g. `bg-background/80 backdrop-blur-md border-b`)
- Content scrolls underneath it; page body needs top padding to compensate

### Logo
- A game-themed SVG (Kahoot-style but original) stored at `src/assets/logo.svg`
- Swappable at any time without touching component code

### Nav items — two lists
Two separate config arrays, one per auth state. Each item: `{ name, path }`.

```ts
// shown when logged OUT
loggedOutNav = [
  { name: 'Home', path: '/' },
  // ...TBD
]

// shown when logged IN
loggedInNav = [
  { name: 'Dashboard', path: '/dashboard' },
  // ...TBD
]
```

Actual items TBD — see Questions.

### Avatar icon (right side)
Both states use the same placeholder avatar icon (Lucide `lucideUser` circle icon or equivalent SVG).
Pressing it opens a **Spartan dropdown-menu**. Two dropdown variants:

**Logged-out dropdown:**
- Sign In
- Sign Up

**Logged-in dropdown:**
- Account Settings
- Log Out

### Auth service
`AuthService` with `isLoggedIn` signal + `toggleAuth()` for development testing.

---

## Tasks
- [ ] Answer remaining questions (v4 if needed)
- [ ] Add `dropdown-menu` Spartan component via `/add-spartan-component`
- [ ] Create `AuthService` (`isLoggedIn` signal, `toggleAuth()`)
- [ ] Add placeholder game logo SVG to `src/assets/logo.svg`
- [ ] Scaffold `NavBarComponent` standalone component
- [ ] Implement fixed + transparent + blur nav bar shell
- [ ] Build logo section (left)
- [ ] Build dynamic nav items from the two lists
- [ ] Build avatar button + logged-out dropdown (Sign In / Sign Up)
- [ ] Build logged-in dropdown (Account Settings / Log Out)
- [ ] Add `NavBarComponent` to `app.html`, add top padding to body
- [ ] Verify build: `ng build --configuration development`

---

## Questions

### Q1 — Sign In / Sign Up actions
When a user clicks **Sign In** or **Sign Up** from the logged-out dropdown, what should happen?
- A) Navigate to a dedicated route (e.g. `/sign-in`, `/sign-up`)
- B) Open a modal/dialog (built in a later feature)
- C) Placeholder only for now — just `toggleAuth()` to simulate login so we can test the logged-in state

### Q2 — Log Out action
When the user clicks **Log Out** from the logged-in dropdown:
- A) Call `authService.toggleAuth()` to flip back to logged-out (for testing now, real auth later)
- B) Navigate to a specific route after logout (e.g. `/`)
- Both?

### Q3 — Account Settings action
When the user clicks **Account Settings**:
- A) Navigate to a route (e.g. `/settings`) — should I create a placeholder route?
- B) Placeholder only — no action yet

### Q4 — Nav item lists
What nav items should go in each list?
I have `Home /` for logged-out and `Dashboard /dashboard` as a guess — please confirm or replace with the real items you want.
If TBD, I'll use short placeholder lists and we can update them later.

---

## Answers


Q1. a. let's have two routes one for /signin and one for /signup
Q1. b. let's open up dedicated page for it instead.
Q1. c. Don't added any place holder just create the pages under page folder under app.

Q2. for logout don't implement it as of now.
Q3. no need to create account setting as of now make dropdown with setting and profile items .

Q4. dashboard will be shown up only for logged in user home is default home page.

so as for current routes /sigin , /signup , / or defualr route and finally is logout 
