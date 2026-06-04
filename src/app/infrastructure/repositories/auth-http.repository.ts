import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/interfaces/auth.repository';
import { loginRequest } from '../models/login-request.dto';
import { ApiResult } from '../models/api-result.dto';

/** Implementação técnica do repositório de autenticação via protocolo HTTP. */
@Injectable({ providedIn: 'root' })
export class AuthHttpRepository extends AuthRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5195/api/auth';

  login(request: loginRequest): Observable<ApiResult<string>> {
    return this.http.post<ApiResult<string>>(`${this.apiUrl}/login`, request);
  }
}
