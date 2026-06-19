import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.page.component.html',
})
export class DashboardPageComponent {}
