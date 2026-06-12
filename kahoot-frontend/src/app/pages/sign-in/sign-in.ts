import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <h1 class="text-3xl font-bold">Sign In</h1>
    </div>
  `,
})
export class SignInComponent {}
