import { Injectable, signal, computed } from '@angular/core';

/** Serviço de gestão de sessão. */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly STORAGE_KEY = 'auth_token';

  // Controle interno do token.
  private _token = signal<string | null>(this.getInitialToken());

  // Exposição para leitura.
  token = this._token.asReadonly();

  // Estado de autenticação.
  isAuthenticated = computed(() => !!this._token());

  /** Salva o token na sessão e local storage. */
  saveSession(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
    this._token.set(token);
  }

  /** Limpa a sessão e local storage. */
  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._token.set(null);
  }

  private getInitialToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.STORAGE_KEY);
    }
    return null;
  }
}
