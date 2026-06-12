import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 class="text-4xl font-bold tracking-tight">Welcome to Kahootz</h1>
      <p class="mt-3 text-muted-foreground">Sign in or create an account to get started.</p>
    </div>
  `,
})
export class HomeComponent {}
