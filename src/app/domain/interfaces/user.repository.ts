import { Observable } from "rxjs";
import { CreateUserRequest } from "../../core/models/create-user-request.model";
import { ApiResult } from "../../core/models/api-result.model";

// Interface para o repositório de usuários, definindo métodos para operações relacionadas a usuários
export abstract class UserRepository {
    abstract createUser(request: CreateUserRequest): Observable<ApiResult<void>>;
}
