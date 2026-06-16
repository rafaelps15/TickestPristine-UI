import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { ApiResultDto } from '../dtos/api-result.dto';

import { UserSummary } from '../../domain/models/user-summary.model';

/** Implementação HTTP do repositório de usuários. */
@Injectable({ providedIn: 'root' })
export class UserHttpRepository extends UserRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5195/api/users';

    createUser(request: CreateUserRequestDto) {
        return this.http.post<ApiResultDto<void>>(this.apiUrl, request);
    }

    getAll() {
        return this.http.get<ApiResultDto<UserSummary[]>>(this.apiUrl);
    }
}
