import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isLoggedIn = signal(true);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  readonly isLoggedOut = computed(() => !this._isLoggedIn());

  toggleAuth(): void {
    this._isLoggedIn.update((v) => !v);
  }
}
