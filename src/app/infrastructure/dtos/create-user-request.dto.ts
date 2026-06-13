/** Dados detalhados para criação de colaborador/usuário. */
export interface CreateUserRequestDto {
  name: string;
  email: string;
  employeeCode: string; // Código do funcionário
  departmentId?: number;
  sectorId?: number;
  specialtyId?: number;
  roleId: number[];
  password?: string;
}
