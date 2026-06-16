import { inject, Injectable, signal, computed } from "@angular/core";
import { UserRepository } from "../../domain/interfaces/user.repository";
import { CreateUserRequestDto } from "../../infrastructure/dtos/create-user-request.dto";
import { UserSummary } from "../../domain/models/user-summary.model";
import { finalize } from "rxjs";

/** Serviço de usuários. */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly repository = inject(UserRepository);

  state = signal({
    data: [] as UserSummary[],
    loading: false,
    success: false,
    error: null as string | null
  });

  users = computed(() => this.state().data);

  loadUsers() {
    this.state.update(s => ({ ...s, loading: true, error: null }));
    this.repository.getAll()
      .pipe(finalize(() => this.state.update(s => ({ ...s, loading: false }))))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.state.update(s => ({ ...s, data: res.value }));
          } else {
            this.state.update(s => ({ ...s, error: res.errorResult?.message ?? 'Erro ao carregar usuários' }));
          }
        },
        error: (err) => {
          console.error('Erro ao carregar usuários:', err);
          this.state.update(s => ({ ...s, error: 'Erro de conexão ao carregar usuários' }));
        }
      });
  }

  createUser(data: CreateUserRequestDto) {
    this.state.update(s => ({ ...s, loading: true, success: false, error: null }));

    this.repository.createUser(data)
      .pipe(finalize(() => this.state.update(s => ({ ...s, loading: false }))))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.state.update(s => ({ ...s, success: true }));
          } else {
            this.state.update(s => ({ ...s, error: res.errorResult?.message ?? 'Erro ao criar usuário' }));
          }
        },
        error: (err) => {
          console.error('Erro ao criar usuário:', err);

          // Prioriza a mensagem de erro retornada pela API.
          const apiMessage = err.error?.errorResult?.message || err.error?.message;
          if (apiMessage) {
            this.state.update(s => ({ ...s, error: apiMessage }));
            return;
          }

          // Fallback para erros de conexão ou respostas genéricas.
          let errorMessage = 'Ocorreu um erro inesperado ao tentar criar o usuário.';
          if (err.status === 0) {
            errorMessage = 'Sem conexão com o servidor.';
          } else if (err.status === 409) {
            errorMessage = 'Este e-mail já está cadastrado.';
          }

          this.state.update(s => ({ ...s, error: errorMessage }));
        }
      });
  }

  resetState() {
    this.state.set({ loading: false, success: false, error: null });
  }
}
