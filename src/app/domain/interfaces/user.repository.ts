import { Observable } from "rxjs";
import { CreateUserRequest } from "../../infrastructure/models/create-user-request.dto";
import { ApiResult } from "../../infrastructure/models/api-result.dto";

/** Interface de domínio que define o contrato para o repositório de usuários. */
export abstract class UserRepository {
    abstract createUser(request: CreateUserRequest): Observable<ApiResult<void>>;
}
