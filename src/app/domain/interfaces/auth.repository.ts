import { Observable } from 'rxjs';
import { ApiResultDto } from '../../infrastructure/dtos/api-result.dto';
import { LoginRequestDto } from '../../infrastructure/dtos/login-request.dto';

/** Contrato do repositório de autenticação. */
export abstract class AuthRepository {
    abstract login(request: LoginRequestDto): Observable<ApiResultDto<string>>;
}
