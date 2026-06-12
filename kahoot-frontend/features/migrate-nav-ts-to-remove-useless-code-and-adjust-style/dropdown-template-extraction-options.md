# Dropdown Template Extraction — Options

## Why it broke

Spartan's `[hlmDropdownMenuTrigger]` renders the `<ng-template>` into a CDK overlay portal.
It measures the **first DOM child** for sizing. When we wrap `<hlm-dropdown-menu>` in a
custom component, the host element (`<nav-bar-user-menu-dropdown>`) becomes the first child —
its default `display: block` has no intrinsic size yet, so the menu collapses.

---

## Option A — `display: contents` on the host (simplest fix)

Add `host: { style: 'display: contents' }` to the component decorator.
`display: contents` makes the host element invisible to layout — its children
are treated as direct children of the parent, so Spartan measures `<hlm-dropdown-menu>`
as if the wrapper never existed.

```ts
// templates/nav-bar-user-menu-dropdown.ts
@Component({
  selector: 'nav-bar-user-menu-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },   // ← key line
  imports: [RouterLink, NgIcon, HlmDropdownMenuImports],
  providers: [provideIcons({ ... })],
  template: `
    <hlm-dropdown-menu class="w-48">
      ...
    </hlm-dropdown-menu>
  `,
})
export class NavBarUserMenuDropdownComponent {}
```

`nav-bar.html` stays exactly as written before (component in ng-template):

```html
<ng-template #userMenu>
  <nav-bar-user-menu-dropdown />   <!-- host is invisible to layout -->
</ng-template>
```

**Trade-off:** `display: contents` has minor accessibility caveats in older browsers
(the host is skipped in the accessibility tree), but this is fine for a menu wrapper.

---

## Option B — `TemplateRef` input (no wrapper element at all)

Create a directive that exposes a `TemplateRef` the nav-bar can pass to the trigger directly.
No host element enters the DOM.

```ts
// templates/nav-bar-user-menu.directive.ts
import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({ selector: '[navBarUserMenu]', exportAs: 'navBarUserMenu' })
export class NavBarUserMenuDirective {
  readonly ref = inject(TemplateRef);
}
```

Declare the template in a separate `.html` file, then reference it in nav-bar:

```html
<!-- nav-bar.html -->

<!-- Declare templates (hidden, just registering them) -->
<ng-template navBarUserMenu #userMenu="navBarUserMenu">
  <hlm-dropdown-menu class="w-48">
    ...items...
  </hlm-dropdown-menu>
</ng-template>

<!-- Use the TemplateRef on the trigger -->
<button hlmBtn [hlmDropdownMenuTrigger]="userMenu.ref" align="end">
  <ng-icon name="lucideUser" class="size-5" />
</button>
```

**Trade-off:** The markup stays in `nav-bar.html` (just moves to a separate declaration block).
Useful when you want the template to live in its own file via `templateUrl`, but that requires
a full component anyway — so this option only wins if you want to avoid the host element entirely
without `display: contents`.

---

## Recommendation

Go with **Option A** — add `host: { style: 'display: contents' }` to each dropdown component.
It keeps the clean separation we want (each dropdown is its own file) with a one-line fix.
