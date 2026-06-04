import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { CreateUserRequest } from '../models/create-user-request.dto';
import { ApiResult } from '../models/api-result.dto';

/** Implementação técnica do repositório de usuários via protocolo HTTP. */
@Injectable({ providedIn: 'root' })
export class UserHttpRepository extends UserRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5195/api/users';

    createUser(request: CreateUserRequest) {
        return this.http.post<ApiResult<void>>(this.apiUrl, request);
    }
}
