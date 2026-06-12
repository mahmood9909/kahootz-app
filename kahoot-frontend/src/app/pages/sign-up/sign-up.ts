import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <h1 class="text-3xl font-bold">Sign Up</h1>
    </div>
  `,
})
export class SignUpComponent {}
