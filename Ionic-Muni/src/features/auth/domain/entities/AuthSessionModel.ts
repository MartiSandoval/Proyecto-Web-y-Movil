import type { AuthUserModel } from "./AuthUserModel";

export interface AuthSessionModel {
  token: string;
  user: AuthUserModel;
}
