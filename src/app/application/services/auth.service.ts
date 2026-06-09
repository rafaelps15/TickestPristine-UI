import { inject, Injectable, signal } from "@angular/core";
import { AuthRepository } from "../../domain/interfaces/auth.repository";
import { LoginRequestDto } from "../../infrastructure/dtos/login-request.dto";
import { SessionService } from "../../core/services/session.service";
import { finalize } from "rxjs";
import { Router } from "@angular/router";

/** Serviço de autenticação. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly repository = inject(AuthRepository);
  private readonly session = inject(SessionService);

  private readonly router = inject(Router);

  state = signal({
    loading: false,
    error: null as string | null
  });

  login(credentials: LoginRequestDto) {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.repository.login(credentials)
      .pipe(finalize(() => this.state.update(s => ({ ...s, loading: false }))))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.session.saveSession(res.value);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Falha no login:', res.errorResult);
            this.state.update(s => ({ ...s, error: res.errorResult?.message ?? 'Erro na autenticação' }));
          }
        },
        error: (err) => {
          console.error('Erro de rede ou servidor:', err);
          const status = err.status ? ` (Status: ${err.status})` : '';
          this.state.update(s => ({ ...s, error: `Erro inesperado na autenticação${status}` }));
        }
      });
  }

  logout() {
    this.session.clearSession();
    this.state.update(s => ({ ...s, error: null }));
  }
}
