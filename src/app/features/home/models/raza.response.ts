export interface RazaResponse {
  isSuccess: boolean;
  message?: string;
  result?: RazaEntity[];
}

export interface RazaByResponse {
  isSuccess: boolean;
  message?: string;
  result?: RazaEntity;
}

export interface RazaEntity {
  id: string;
  nombre: string;
  especie: string;
  activo: boolean;
}
