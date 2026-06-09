import { Observable } from 'rxjs';
import { Role } from '../entities/role.entity';
import { ApiResultDto } from '../../infrastructure/dtos/api-result.dto';

/** Contrato do repositório de papéis. */
export abstract class RoleRepository {
    abstract getAll(): Observable<ApiResultDto<Role[]>>;
}
