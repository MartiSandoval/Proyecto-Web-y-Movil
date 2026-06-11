import type { AuthSessionModel } from "../../entities/AuthSessionModel";

/**
 * API contract:
 * - Endpoint: `POST /auth/login`
 * - Body: `{ rut, password }`
 */
export type PostLoginUseCaseProtocol = (rut: string, password: string) => Promise<AuthSessionModel>;
