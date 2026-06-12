## Goal
Migrate nav-bar component from current implementation to a cleaned-up version with useless code removed and style adjusted

## Source Feature
- **Doc**: `kahoot-frontend/features/nav-bar-user-auth/nav-bar-user-auth-v5.md`
- **Current approach**: Standalone Angular component with Spartan UI dropdown menus, Tailwind styling, auth-aware nav items, and theme toggle

## Target Approach
Remove useless code and adjust style in `nav-bar.ts` and `nav-bar.html`

## Description
Navigation bar with logo, auth-state-aware nav items, avatar dropdown, and three stub pages (sign-in, sign-up, dashboard).

Migration: audit `nav-bar.ts` and `nav-bar.html` for dead code (unused imports, unused nav arrays, stale logic) and tighten up the styling.

## Migration Tasks
- [ ] Read and understand the source feature implementation.
- [ ] Identify dead code: unused imports, unused variables, leftover nav arrays that are always empty, console.logs
- [ ] Identify style adjustments needed (spacing, alignment, token usage)
- [ ] Plan the changes and create next version with findings.
- [ ] Implement the cleanup.
- [ ] Verify build is clean and UI looks correct after changes.
- [ ] Remove old implementation code.


## Instruction 
1. remove to navs logged and unlogged it nav from nav component ts 
2. create folder templated under nav complenet folder to wrap up templates in there 
3. will have template folder they will occupy the dropdown component then will wrap them with <ng-template> in nav comeplenet and refrence them .

e.g 
Before 
 <ng-template #userMenu>
        <hlm-dropdown-menu class="w-48">
          <hlm-dropdown-menu-group>
            <button hlmDropdownMenuItem routerLink="/dashboard">
              <ng-icon name="lucideLayoutDashboard" class="size-4" />
              <span>Dashboard</span>
            </button>
          </hlm-dropdown-menu-group>
          <hlm-dropdown-menu-separator />
          <hlm-dropdown-menu-group>
            <button hlmDropdownMenuItem>
              <ng-icon name="lucideUser" class="size-4" />
              <span>Profile</span>
            </button>
            <button hlmDropdownMenuItem>
              <ng-icon name="lucideSettings" class="size-4" />
              <span>Settings</span>
            </button>
          </hlm-dropdown-menu-group>
          <hlm-dropdown-menu-separator />
          <button hlmDropdownMenuItem>
            <ng-icon name="lucideLogOut" class="size-4" />
            <span>Log Out</span>
          </button>
        </hlm-dropdown-menu>
      </ng-template>

      After 
       <ng-template #userMenu>
        <nav-logged-dropdown> ex 
      </ng-template>

4. define naming convension such that <mainComponentRef-purpose-componentType> 
## Questions


## Answers
