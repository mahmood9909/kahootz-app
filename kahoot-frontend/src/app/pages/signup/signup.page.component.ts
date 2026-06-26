import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormField, FormRoot, email, form, minLength, required, validateTree } from '@angular/forms/signals';
import { HlmInputImports } from '@ui-lib/input';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmCardImports } from '@ui-lib/card';
import { HlmLabelImports } from '@ui-lib/label';

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'page-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.page.component.html',
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
export class SignupPageComponent {
  protected readonly registration = signal<SignUpData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly signUpForm = form(
    this.registration,
    (path) => {
      required(path.email);
      email(path.email);
      required(path.password);
      minLength(path.password, 8);
      required(path.confirmPassword);
      validateTree(path, (ctx) => {
        const { password, confirmPassword } = ctx.value();
        if (password && confirmPassword && password !== confirmPassword) {
          return { kind: 'passwordMismatch', message: 'Passwords do not match' };
        }
        return null;
      });
    },
    {
      submission: {
        action: async (field) => {
          console.log('Sign up:', field().value());
          return null;
        },
      },
    },
  );
}
