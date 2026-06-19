import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-signin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signin.page.component.html',
})
export class SigninPageComponent {}
