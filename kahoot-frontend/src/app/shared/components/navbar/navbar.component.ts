import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideLogIn, lucideLogOut, lucideMoon, lucideSettings, lucideSun, lucideUser, lucideUserPlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmDropdownMenuImports } from '@ui-lib/dropdown-menu';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { environment } from '@env/environment';

interface NavItem {
  name: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, HlmButtonImports, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideUser, lucideSun, lucideMoon, lucideLogIn, lucideLogOut, lucideUserPlus, lucideLayoutDashboard, lucideSettings })],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly appName = environment.appName;

  readonly loggedOutNav: NavItem[] = [];
  readonly loggedInNav: NavItem[] = [];

  get navItems(): NavItem[] {
    return this.auth.isLoggedIn() ? this.loggedInNav : this.loggedOutNav;
  }
}
