export interface TimeSlotDTO {
  hora: string;
  disponible: boolean;
}

export interface DisponibilidadResponseDTO {
  slots: TimeSlotDTO[];
}
