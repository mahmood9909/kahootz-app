import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.component.html',
})
export class HomePageComponent {}
