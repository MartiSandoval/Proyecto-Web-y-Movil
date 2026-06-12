import { CitasRepository } from '../repositories/citasRepository';

export const cancelarMiCitaUseCase = (repository: CitasRepository) => 
  async (citaId: string): Promise<void> => {
    return await repository.cancelarMiCita(citaId);
  };