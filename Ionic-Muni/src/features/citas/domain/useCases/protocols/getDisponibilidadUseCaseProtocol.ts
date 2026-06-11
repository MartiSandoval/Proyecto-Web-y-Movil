import type { TimeSlotModel } from "../../entities/TimeSlotModel";

/**
 * API contract:
 * - Endpoint: `GET /disponibilidad/:tramiteId/:fecha`
 */
export type GetDisponibilidadUseCaseProtocol = (
  tramiteId: string,
  fecha: string
) => Promise<TimeSlotModel[]>;
