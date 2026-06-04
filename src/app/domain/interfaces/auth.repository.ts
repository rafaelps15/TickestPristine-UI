import { Observable } from 'rxjs';
import { ApiResult } from '../../infrastructure/models/api-result.dto';
import { loginRequest } from '../../infrastructure/models/login-request.dto';

/** Interface de domínio que define o contrato para as operações de autenticação. */
export abstract class AuthRepository {
    abstract login(request: loginRequest): Observable<ApiResult<string>>;
}
