import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideLogOut, lucideSettings, lucideUser } from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@ui-lib/dropdown-menu';

@Component({
  selector: 'nav-bar-user-menu-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideLayoutDashboard, lucideUser, lucideSettings, lucideLogOut })],
  template: `
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
  `,
})
export class NavBarUserMenuDropdownComponent {}
