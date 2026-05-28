import { ApiError } from "./api-error-model";

/**
 * Interface universal para as respostas da API do backend .NET.
 * Segue o padrão 'Result Pattern', onde a resposta encapsula o sucesso,
 * a falha e o valor de retorno, evitando o uso excessivo de exceções.
 */
export interface ApiResult<T> {
  value: T;              // O dado de retorno em caso de sucesso (ex: User, Role[])
  IsSuccess: boolean;    // Indica se a operação foi concluída com êxito
  IsFailure: boolean;    // Indica se houve algum erro de negócio ou técnico
  errorResult: ApiError; // Detalhes do erro caso IsFailure seja verdadeiro
}

