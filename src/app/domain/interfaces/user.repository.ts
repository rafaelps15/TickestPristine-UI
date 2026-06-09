import { Observable } from "rxjs";
import { CreateUserRequestDto } from "../../infrastructure/dtos/create-user-request.dto";
import { ApiResultDto } from "../../infrastructure/dtos/api-result.dto";

/** Contrato do repositório de usuários. */
export abstract class UserRepository {
    abstract createUser(request: CreateUserRequestDto): Observable<ApiResultDto<void>>;
}
