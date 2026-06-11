import type { FuncionarioModel } from "../../entities/FuncionarioModel";

/**
 * API contract:
 * - Endpoint: `GET /funcionarios` (rol jefe_sucursal). Funcionarios de su sucursal.
 */
export type GetFuncionariosUseCaseProtocol = () => Promise<FuncionarioModel[]>;
