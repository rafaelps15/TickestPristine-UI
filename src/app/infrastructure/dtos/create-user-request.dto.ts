/** Dados para criação de usuário. */
export interface CreateUserRequestDto {
  name: string;
  email: string;
  password?: string;
  roleId: number[];
}
