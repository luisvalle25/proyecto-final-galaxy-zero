export interface EspecieResponse {
  isSuccess: boolean;
  message?: string;
  result?: EspecieEntity[];
}

export interface EspecieByResponse {
  isSuccess: boolean;
  message?: string;
  result?: EspecieEntity;
}

export interface EspecieEntity {
  id: string;
  nombre: string;
  activo: boolean;
}
