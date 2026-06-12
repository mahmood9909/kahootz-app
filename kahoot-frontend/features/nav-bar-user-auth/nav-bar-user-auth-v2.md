## Goal
Navigation bar with logo, dynamic nav items, and an auth area that adapts between logged-out (sign in/up dropdown) and logged-in (user avatar dropdown) states.

## Description

### Layout
One `NavBarComponent` that renders differently depending on auth state.

```
[ Logo ]   [ nav item ]  [ nav item ]  ...   [ auth area ]
  left                                            right
```

### Logo
Site identity logo on the left side. Asset TBD (see Questions).

### Nav items — dynamic list
Nav items are driven by a config list:

```ts
list = [
  { name: string, onAuthenticate: boolean, path: string }
]
```

Items are shown/hidden depending on the `onAuthenticate` flag and current auth state (see Questions — exact filter logic unclear).

### Auth area (right side)

**Logged-out state:**
A single icon/button. When clicked, opens a **Spartan dropdown-menu** with two options:
- Sign In
- Sign Up

**Logged-in state:**
User avatar (SVG placeholder now, user-selectable later). When clicked, opens a **Spartan dropdown-menu** with user options (see Questions — items TBD).

### Auth service
`AuthService` with an `isLoggedIn` signal and a `toggleAuth()` method for testing (no real auth yet).

### Spartan component needed
`dropdown-menu` — must be added via `/add-spartan-component` before building.

---

## Tasks
- [ ] Answer remaining questions in v3
- [ ] Add `dropdown-menu` via `/add-spartan-component`
- [ ] Create `AuthService` with `isLoggedIn` signal + `toggleAuth()`
- [ ] Scaffold `NavBarComponent` standalone component
- [ ] Build logo section (left)
- [ ] Build dynamic nav items from config list
- [ ] Build logged-out auth area: icon → dropdown (Sign In / Sign Up)
- [ ] Build logged-in auth area: avatar → dropdown (user options)
- [ ] Add `NavBarComponent` to `app.html`
- [ ] Verify build: `ng build --configuration development`

---

## Questions

### Q1 — `onAuthenticate` filter logic
The list item has `onAuthenticate: true | false`. What is the exact rule?

Options:
- A) `true` = only visible when logged **in**; `false` = only visible when logged **out**
- B) `true` = visible when logged in **and** logged out; `false` = hidden always (disabled item)
- C) Something else?

### Q2 — Logged-in user dropdown items
What options appear when the user clicks their avatar while logged in?
e.g. Profile / Settings / Log Out — please list them.

### Q3 — Sign In / Sign Up actions
When the user picks "Sign In" or "Sign Up" from the logged-out dropdown, what happens?
- A) Navigate to a route (e.g. `/sign-in`, `/sign-up`)
- B) Open a modal/dialog
- C) TBD / placeholder for now

### Q4 — Logo
Is there a logo asset file already, or should I use:
- A) Placeholder text (e.g. "Kahootz")
- B) A Lucide icon as placeholder
- C) An image file (provide path)

### Q5 — Nav bar positioning
Should the nav bar be:
- A) `position: fixed` — sticks to top of viewport, content scrolls beneath it
- B) Static header — sits at the top of the normal document flow

---

## Answers

1. let's change the plan and make two thing we will have default row avatat when use not logged in pressing on icon will shows two differen dropdown version 
2. frirst drop down will show for non authenticated user with two items in it sigin/sinup.
3. scond dropdown will show up logout / account setting.

4. will have two lists one discribe logged user and another for nonlogged one.

5. make nav bar sticky fixed  and bit transparent a specfic ratio to make it items behind it blury.
6. pull any games svg like a kahoot svg but not exacly same refrence in assert file so we can change it at any time 

