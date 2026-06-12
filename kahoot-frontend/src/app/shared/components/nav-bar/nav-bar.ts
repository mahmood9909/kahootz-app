import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideMoon, lucideSun, lucideUser, lucideUserPlus } from '@ng-icons/lucide';
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
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgIcon, HlmButtonImports, HlmDropdownMenuImports],
  providers: [provideIcons({ lucideUser, lucideSun, lucideMoon, lucideLogIn, lucideUserPlus })],
  templateUrl: './nav-bar.html',
})
export class NavBarComponent {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly appName = environment.appName;

  readonly loggedOutNav: NavItem[] = [{ name: 'Home', path: '/' }];
  readonly loggedInNav: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  get navItems(): NavItem[] {
    return this.auth.isLoggedIn() ? this.loggedInNav : this.loggedOutNav;
  }
}
