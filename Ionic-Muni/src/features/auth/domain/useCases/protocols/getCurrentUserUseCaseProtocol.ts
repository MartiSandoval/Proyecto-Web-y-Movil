import type { AuthUserModel } from "../../entities/AuthUserModel";

/**
 * API contract:
 * - Endpoint: `GET /auth/me`
 * - Headers: `Authorization: Bearer <token>`
 */
export type GetCurrentUserUseCaseProtocol = (token: string) => Promise<AuthUserModel>;
