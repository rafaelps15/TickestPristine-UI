import { Injectable, signal, computed } from '@angular/core';

/** Serviço responsável pela gestão de estado e persistência da sessão do usuário. */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly STORAGE_KEY = 'auth_token';

  // Signal privado para controle interno do token
  private _token = signal<string | null>(this.getInitialToken());

  // Exposição pública apenas para leitura
  token = this._token.asReadonly();

  // Estado de autenticação derivado da existência do token
  isAuthenticated = computed(() => !!this._token());

  /** Salva o token na sessão e persiste no armazenamento local. */
  saveSession(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
    this._token.set(token);
  }

  /** Remove o token da sessão e limpa o armazenamento local. */
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
