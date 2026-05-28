import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleRepository } from '../../domain/interfaces/role.repository';
import { Role } from '../../core/models/role.model';
import { ApiResult } from '../../core/models/api-result.model';

/**
 * Implementação técnica do repositório de Roles utilizando o protocolo HTTP.
 * Esta classe pertence à camada de Infraestrutura e conhece os detalhes
 * de comunicação com a API externa (URLs, HttpClient).
 */
@Injectable({
    providedIn: 'root'
})
export class RoleHttpRepository extends RoleRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/roles';

    /** Executa a chamada GET para o endpoint de roles da API */
    getAll() {
        return this.http.get<ApiResult<Role[]>>(this.apiUrl);
    }
}