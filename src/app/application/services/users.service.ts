import { inject, Injectable, signal } from "@angular/core";
import { UserRepository } from "../../domain/interfaces/user.repository";
import { CreateUserRequestDto } from "../../infrastructure/dtos/create-user-request.dto";
import { finalize } from "rxjs";

/** Serviço de usuários. */
@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly repository = inject(UserRepository);

  state = signal({
    loading: false,
    success: false,
    error: null as string | null
  });

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
        error: () => this.state.update(s => ({ ...s, error: 'Erro inesperado ao criar usuário' }))
      });
  }

  resetState() {
    this.state.set({ loading: false, success: false, error: null });
  }
}
