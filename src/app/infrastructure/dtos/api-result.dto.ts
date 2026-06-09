import { ApiErrorDto } from "./api-error.dto";

/** Resposta padronizada da API. */
export interface ApiResultDto<T> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  errorResult: ApiErrorDto | null;
}
