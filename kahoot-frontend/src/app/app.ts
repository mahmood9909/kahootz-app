import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { ThemeService } from './service/theme.service';
import { NavBarComponent } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonImports, NgIcon, NavBarComponent],
  providers: [provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);
}
