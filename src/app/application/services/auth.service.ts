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
          console.log('Resposta do login:', res);
          if (res.isSuccess) {
            let token = res.value;
            
            // Se o value for um objeto, tenta pegar a propriedade 'token' ou similar
            if (token && typeof token === 'object') {
              token = (token as any).token || (token as any).accessToken || (token as any).value;
              console.log('Token extraído do objeto:', token);
            }

            if (typeof token !== 'string') {
              console.error('Não foi possível extrair uma string de token da resposta.', res.value);
              this.state.update(s => ({ ...s, error: 'Erro ao processar login do servidor.' }));
              return;
            }

            this.session.saveSession(token);
            console.log('Sessão salva. Autenticado?', this.session.isAuthenticated());
            
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Falha no login:', res.errorResult);
            this.state.update(s => ({ ...s, error: res.errorResult?.message ?? 'E-mail ou senha incorretos' }));
          }
        },
        error: (err) => {
          console.error('Erro de autenticação:', err);
          
          // Tenta extrair a mensagem de erro da resposta da API.
          const apiMessage = err.error?.errorResult?.message || err.error?.message;
          
          if (apiMessage) {
            this.state.update(s => ({ ...s, error: apiMessage }));
            return;
          }

          // Mensagens de fallback para falhas de rede ou respostas sem corpo.
          let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
          
          if (err.status === 0) {
            errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else if (err.status === 401) {
            errorMessage = 'E-mail ou senha incorretos.';
          } else if (err.status === 500) {
            errorMessage = 'Erro interno no servidor.';
          }

          this.state.update(s => ({ ...s, error: errorMessage }));
        }
      });
  }

  logout() {
    this.session.clearSession();
    this.state.update(s => ({ ...s, error: null }));
  }
}
