import type { AuthSessionModel } from "../../entities/AuthSessionModel";
import type { RegisterDataModel } from "../../entities/RegisterDataModel";

/**
 * API contract:
 * - Endpoint: `POST /auth/registro`
 * - Body: `RegisterDataModel`
 */
export type PostRegisterUseCaseProtocol = (data: RegisterDataModel) => Promise<AuthSessionModel>;
