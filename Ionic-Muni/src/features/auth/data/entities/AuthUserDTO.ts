export interface AuthUserDTO {
  id: string;
  nombre: string;
  rut?: string;
  telefono?: string;
  direccion?: string;
  rol: "usuario" | "funcionario" | "jefe_sucursal";
  sucursal_id?: string;
}