/**
 * Representa um papel (Role) de acesso no sistema.
 * Utilizado para definir as permissões e níveis de acesso de cada usuário.
 */
export interface Role {
  id: number | string;   // Identificador único da role (pode ser UUID ou Inteiro)
  name: string;          // Nome legível (ex: 'Admin', 'Cliente')
  description: string;   // Descrição detalhada das permissões deste papel
}
