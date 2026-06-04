import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleRepository } from '../../domain/interfaces/role.repository';
import { Role } from '../../domain/entities/role.entity';
import { ApiResult } from '../models/api-result.dto';

/** Implementação técnica do repositório de papéis via protocolo HTTP. */
@Injectable({ providedIn: 'root' })
export class RoleHttpRepository extends RoleRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5195/api/roles';

    getAll() {
        return this.http.get<ApiResult<Role[]>>(this.apiUrl);
    }
}
