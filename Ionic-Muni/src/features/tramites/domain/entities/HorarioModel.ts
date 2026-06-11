export interface HorarioModel {
  diaSemana: number; // 1 = lunes … 7 = domingo
  horaInicio: string; // "HH:MM"
  horaFin: string; // "HH:MM"
  intervaloMinutos: number; // duración del slot = define los cupos por franja
}
