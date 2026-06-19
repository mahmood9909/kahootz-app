import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.page.component.html',
})
export class SignupPageComponent {}
