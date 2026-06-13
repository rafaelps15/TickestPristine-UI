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
  isAuthenticated = computed(() => {
    const token = this._token();
    const isValid = typeof token === 'string' && token.split('.').length === 3;
    console.log('Validando Token:', { exists: !!token, isString: typeof token === 'string', length: token?.length, isValid });
    if (token && !isValid) {
      console.warn('Token presente mas inválido:', token);
    }
    return isValid;
  });

  /** Usuário decodificado do token. */
  user = computed(() => {
    const token = this._token();
    if (!this.isAuthenticated() || typeof token !== 'string') return null;
    return this.decodeToken(token);
  });

  /** Papel do usuário vindo do token. */
  role = computed(() => {
    const user = this.user();
    if (!user) return null;
    // Retorna o claim de role conforme definido pelo back-end
    return user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || user['role'] || null;
  });

  /** Salva o token na sessão e local storage. */
  saveSession(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, token);
    }
    this._token.set(token);
  }

  /** Limpa a sessão e local storage. */
  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this._token.set(null);
  }

  private getInitialToken(): string | null {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      // Se por algum motivo o que estiver no localStorage não for uma string (raro), ignora.
      return typeof saved === 'string' ? saved : null;
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length < 2) {
        throw new Error('Token format is invalid');
      }
      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }
}
