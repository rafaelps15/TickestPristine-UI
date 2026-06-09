import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleRepository } from '../../domain/interfaces/role.repository';
import { Role } from '../../domain/entities/role.entity';
import { ApiResultDto } from '../dtos/api-result.dto';

/** Implementação HTTP do repositório de papéis. */
@Injectable({ providedIn: 'root' })
export class RoleHttpRepository extends RoleRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5195/api/roles';

    getAll() {
        return this.http.get<ApiResultDto<Role[]>>(this.apiUrl);
    }
}
