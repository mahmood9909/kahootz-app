import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun, lucideUser } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmDropdownMenuImports } from '@ui-lib/dropdown-menu';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';
import { environment } from '@env/environment';
import { NavBarAuthMenuDropdownComponent } from './templates/nav-bar-auth-menu-dropdown';
import { NavBarUserMenuDropdownComponent } from './templates/nav-bar-user-menu-dropdown';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgIcon,
    HlmButtonImports,
    HlmDropdownMenuImports,
    NavBarUserMenuDropdownComponent,
    NavBarAuthMenuDropdownComponent,
  ],
  providers: [provideIcons({ lucideUser, lucideSun, lucideMoon })],
  templateUrl: './nav-bar.html',
})
export class NavBarComponent {
  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);
  readonly appName = environment.appName;
}
