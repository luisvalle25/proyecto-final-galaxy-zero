export interface UsuarioResponse {
  isSuccess: boolean;
  message?: string;
  result?: UsuarioEntity[];
}

export interface UsuarioEntity {
  id: string;
  nombre: string;
  email: string;
  activo: boolean;
}
