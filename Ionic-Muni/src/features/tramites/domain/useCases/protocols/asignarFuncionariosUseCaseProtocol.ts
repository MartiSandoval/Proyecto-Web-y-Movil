/**
 * API contract:
 * - Endpoint: `PUT /tramites/:id/funcionarios` (rol jefe_sucursal).
 */
export type AsignarFuncionariosUseCaseProtocol = (
  id: string,
  funcionarioIds: string[]
) => Promise<void>;
