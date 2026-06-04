import { inject, Injectable, signal } from "@angular/core";
import { RoleRepository } from "../../domain/interfaces/role.repository";
import { Role } from "../../domain/entities/role.entity";
import { finalize } from "rxjs";

/** Serviço de aplicação para orquestração de operações relacionadas a papéis. */
@Injectable({ providedIn: 'root' })
export class RolesService {
  private readonly repository = inject(RoleRepository);

  state = signal({
    data: [] as Role[],
    loading: false,
    error: null as string | null
  });

  loadRoles() {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.repository.getAll()
      .pipe(finalize(() => this.state.update(s => ({ ...s, loading: false }))))
      .subscribe({
        next: (res) => {
          if (res.IsSuccess) {
            this.state.update(s => ({ ...s, data: res.value }));
          } else {
            this.state.update(s => ({ ...s, error: res.errorResult.message }));
          }
        },
        error: () => this.state.update(s => ({ ...s, error: 'Erro ao carregar papéis' }))
      });
  }
}
