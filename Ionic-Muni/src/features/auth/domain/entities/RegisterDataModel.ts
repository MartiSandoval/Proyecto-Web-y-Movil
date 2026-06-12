export interface RegisterDataModel {
  email: string;
  password: string;
  nombre: string;
  rut: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  direccion: string; // <-- NUEVO

}
