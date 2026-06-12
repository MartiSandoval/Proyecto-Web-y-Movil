import { AuthRepository } from '../repositories/authRepository';

export const actualizarPerfilUseCase = (repository: AuthRepository) => 
  async (datos: { telefono?: string, direccion?: string }): Promise<void> => {
    return await repository.actualizarPerfil(datos);
  };