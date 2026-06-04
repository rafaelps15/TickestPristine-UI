import { Observable } from 'rxjs';
import { Role } from '../entities/role.entity';
import { ApiResult } from '../../infrastructure/models/api-result.dto';

/** Interface de domínio que define o contrato para o repositório de papéis (roles). */
export abstract class RoleRepository {
    abstract getAll(): Observable<ApiResult<Role[]>>;
}
