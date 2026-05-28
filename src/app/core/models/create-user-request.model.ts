/**
 * Data Transfer Object (DTO) para a criação de novos usuários.
 * Define a estrutura exata que o backend espera receber no corpo da requisição POST.
 */
export interface CreateUserRequest {
  name: string;      // Nome completo do novo usuário
  email: string;     // E-mail que será usado para login e notificações
  password: string;  // Senha (será criptografada no backend)
  roleId: number[];  // Lista de IDs dos papéis que serão atribuídos a este usuário
}