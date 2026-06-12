import type { GetCurrentUserUseCaseProtocol } from "./getCurrentUserUseCaseProtocol";
import type { PostLoginUseCaseProtocol } from "./postLoginUseCaseProtocol";
import type { PostRegisterUseCaseProtocol } from "./postRegisterUseCaseProtocol";

export type AuthUseCasesProtocol = {
  postLoginUseCase: PostLoginUseCaseProtocol;
  postRegisterUseCase: PostRegisterUseCaseProtocol;
  getCurrentUserUseCase: GetCurrentUserUseCaseProtocol;
  actualizarPerfilUseCase: (datos: { correo?: string; telefono?: string; direccion?: string }) => Promise<void>;
};
