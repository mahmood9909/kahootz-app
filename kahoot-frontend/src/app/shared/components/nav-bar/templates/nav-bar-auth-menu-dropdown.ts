import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideUserPlus } from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@ui-lib/dropdown-menu';

@Component({
  selector: 'nav-bar-auth-menu-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideLogIn, lucideUserPlus })],
  template: `
    <hlm-dropdown-menu class="w-40">
      <hlm-dropdown-menu-group>
        <button hlmDropdownMenuItem routerLink="/signin">
          <ng-icon name="lucideLogIn" class="size-4" />
          <span>Sign In</span>
        </button>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem routerLink="/signup">
          <ng-icon name="lucideUserPlus" class="size-4" />
          <span>Sign Up</span>
        </button>
      </hlm-dropdown-menu-group>
    </hlm-dropdown-menu>
  `,
})
export class NavBarAuthMenuDropdownComponent {}
