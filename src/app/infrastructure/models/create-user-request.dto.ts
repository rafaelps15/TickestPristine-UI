/** DTO para requisição de criação de usuário. */
export interface CreateUserRequest {
  name: string;
  email: string;
  password?: string;
  roleId: number[];
}
