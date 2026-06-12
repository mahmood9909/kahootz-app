## Goal
Navigation bar with user icon and auth options (sign in / sign up when logged out, user menu when logged in)

## Description

Build a top-level navigation bar component that adapts based on authentication state:

- **Logged-out state**: two buttons — "Sign In" and "Sign Up" — visible in the nav bar.
- **Logged-in state**: the two auth buttons are hidden and replaced by a user icon/avatar that, when clicked, opens a dropdown menu with user-specific options (e.g. profile, settings, log out).

The auth state will be driven by a flag (e.g. a signal or service) that can be toggled for now (real auth to come later). The sign-in and sign-up buttons should route to or open their respective components/pages.

### Open questions to resolve before implementation
- Where does the nav bar live? Fixed to the top of the viewport, or part of a layout shell?
- What options appear in the logged-in user dropdown? (e.g. Profile, Settings, Log Out)
- Should "Sign In" and "Sign Up" open a modal/dialog or navigate to a dedicated route?
- What does the user avatar show when logged in — initials, a placeholder icon, or a real avatar URL?
- What Spartan UI components are available for the dropdown menu? (`@ui-lib/popover`? `@ui-lib/dropdown-menu`?)

## Tasks
- [ ] Answer open questions above (see Questions section)
- [ ] Scaffold `NavBarComponent` as a standalone Angular component
- [ ] Add `AuthService` (or extend `ThemeService` pattern) with a `isLoggedIn` signal and `toggleAuth()` for testing
- [ ] Build logged-out state: Sign In + Sign Up buttons using `hlmBtn`
- [ ] Build logged-in state: user icon button that opens a dropdown menu
- [ ] Wire conditional rendering with `@if (authService.isLoggedIn())` / `@else`
- [ ] Add `NavBarComponent` to `app.html` layout
- [ ] Verify build passes: `ng build --configuration development`

## Questions
1. Fixed top bar or part of a layout shell/router outlet wrapper?
2. What items go in the logged-in user dropdown menu?
3. Sign In / Sign Up — modal dialogs or full page routes?
4. User avatar — icon only, initials badge, or actual image?
5. Which Spartan UI component to use for the dropdown (popover, dropdown-menu, context-menu)?

## Answers
1. wil have one nav menue component but will changed depnding on wather user logged in or not
2. nav bar will have logo to the left represnt site identity.
3. items will in list that is dyanmiclly shows up 

list = [
    item : name , 
    onAutheticate : true / false
    path : routerOutLetPath
]

4. use avtar svgs for user will changed later and user will choose form list of avatars.
5. use drop-down please refer to /add-spartan-component.md skill for adding it.
6. let's make logged/signup icon when press on it will show drop-down for either signin and signup options. 

