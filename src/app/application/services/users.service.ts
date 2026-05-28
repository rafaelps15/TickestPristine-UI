import { inject, Injectable, signal } from "@angular/core";
import { UserRepository } from "../../domain/interfaces/user.repository";
import { CreateUserRequest } from "../../core/models/create-user-request.model";
import { catchError, finalize, of } from "rxjs";

// Service responsável por gerenciar as operações relacionadas aos usuários, como criação, atualização e exclusão. Ele utiliza o UserRepository para
// realizar as operações de persistência e mantém sinais para controlar o estado de carregamento, sucesso e erros.
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private repository = inject(UserRepository);

    loading = signal(false);
    success = signal(false);
    error = signal<string | null>(null);

    createUser(data: CreateUserRequest) {
        this.loading.set(true);
        this.success.set(false);
        this.error.set(null);

        this.repository.createUser(data).pipe(
            finalize(() => this.loading.set(false)),
            catchError(err => {
                this.error.set('Erro inesperado ao criar usuário');
                return of(null);
            })
        ).subscribe(result => {
            if (result?.IsSuccess) {
                this.success.set(true);
            } else if (result?.IsFailure) {
                this.error.set(result.errorResult.message || 'Erro ao criar usuário');
            }
        });
    }
}
