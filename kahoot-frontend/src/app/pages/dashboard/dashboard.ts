import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
  `,
})
export class DashboardComponent {}
