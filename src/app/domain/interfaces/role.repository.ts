import { Observable } from 'rxjs';
import { Role } from '../../core/models/role.model';
import { ApiResult } from '../../core/models/api-result.model';

/**
 * Contrato (Interface) de Domínio para o repositório de Papéis (Roles).
 * Esta classe define 'o que' o sistema deve ser capaz de fazer em relação às roles,
 * sem se preocupar com detalhes técnicos de como os dados são obtidos (HTTP, SQL, etc).
 */
export abstract class RoleRepository {
    /** Busca todos os papéis disponíveis no sistema */
    abstract getAll(): Observable<ApiResult<Role[]>>;
}