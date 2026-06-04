import { inject, Injectable, signal } from "@angular/core";
import { AuthRepository } from "../../domain/interfaces/auth.repository";
import { loginRequest } from "../../infrastructure/models/login-request.dto";
import { SessionService } from "../../core/services/session.service";
import { finalize } from "rxjs";

/** Serviço de aplicação para orquestração de operações relacionadas à autenticação. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly repository = inject(AuthRepository);
  private readonly session = inject(SessionService);

  state = signal({
    loading: false,
    error: null as string | null
  });

  login(credentials: loginRequest) {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.repository.login(credentials)
      .pipe(finalize(() => this.state.update(s => ({ ...s, loading: false }))))
      .subscribe({
        next: (res) => {
          if (res.IsSuccess) {
            this.session.saveSession(res.value);
          } else {
            this.state.update(s => ({ ...s, error: res.errorResult.message }));
          }
        },
        error: () => this.state.update(s => ({ ...s, error: 'Erro inesperado na autenticação' }))
      });
  }

  logout() {
    this.session.clearSession();
    this.state.update(s => ({ ...s, error: null }));
  }
}
