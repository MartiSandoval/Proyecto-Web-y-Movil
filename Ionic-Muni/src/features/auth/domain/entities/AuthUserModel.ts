export interface AuthUserModel {
  id: string;
  nombre: string;
  rol: "usuario" | "funcionario" | "jefe_sucursal";
  sucursal_id?: string;
}
