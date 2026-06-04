import { ApiError } from "./api-error.dto";

/** Interface universal para as respostas da API seguindo o Result Pattern. */
export interface ApiResult<T> {
  value: T;
  IsSuccess: boolean;
  IsFailure: boolean;
  errorResult: ApiError;
}
