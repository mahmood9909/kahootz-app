import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormField, FormRoot, email, form, required } from '@angular/forms/signals';
import { HlmInputImports } from '@ui-lib/input';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmCardImports } from '@ui-lib/card';
import { HlmLabelImports } from '@ui-lib/label';

interface SignInData {
  email: string;
  password: string;
}

@Component({
  selector: 'page-signin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signin.page.component.html',
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    ...HlmInputImports,
    ...HlmButtonImports,
    ...HlmCardImports,
    ...HlmLabelImports,
  ],
})
export class SigninPageComponent {
  protected readonly credentials = signal<SignInData>({ email: '', password: '' });

  protected readonly signInForm = form(
    this.credentials,
    (path) => {
      required(path.email);
      email(path.email);
      required(path.password);
    },
    {
      submission: {
        action: async (field) => {
          console.log('Sign in:', field().value());
          return null;
        },
      },
    },
  );
}
