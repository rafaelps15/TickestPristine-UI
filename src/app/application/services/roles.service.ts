import { inject, Injectable, signal } from "@angular/core";
import { RoleRepository } from "../../domain/interfaces/role.repository";
import { Role } from "../../core/models/role.model";

/**
 * Serviço de Aplicação para gerenciamento de Papéis (Roles).
 * Atua como orquestrador, utilizando o contrato do repositório para buscar dados
 * e expondo estados reativos (Signals) para que a UI possa reagir às mudanças.
 */
@Injectable({
    providedIn: 'root'
})
export class RolesService {
    /** 
     * Injeção da abstração (Interface). O Angular resolverá para a implementação 
     * correta definida no app.config.ts (Inversão de Dependência).
     */
    private roleRepository = inject(RoleRepository);

    // Estados Reativos (Signals) do Angular 18
    roles = signal<Role[]>([]);    // Lista de papéis carregados
    loading = signal(false);       // Indica se há uma operação em andamento

    /**
     * Carrega a lista de papéis e atualiza o estado reativo.
     */
    loadRoles() {
        this.loading.set(true);
        this.roleRepository.getAll().subscribe({
            next: (result) => {
                if (result.IsSuccess) this.roles.set(result.value);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
