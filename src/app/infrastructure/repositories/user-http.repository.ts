import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { CreateUserRequest } from '../../core/models/create-user-request.model';
import { ApiResult } from '../../core/models/api-result.model';

@Injectable({
    providedIn: 'root'
})
export class UserHttpRepository extends UserRepository {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/users';

    createUser(request: CreateUserRequest) {
        return this.http.post<ApiResult<void>>(this.apiUrl, request);
    }
}