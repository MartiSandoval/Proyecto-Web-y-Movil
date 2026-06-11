import type { AuthUserDTO } from "./AuthUserDTO";

export interface AuthSessionDTO {
  token: string;
  user: AuthUserDTO;
}
