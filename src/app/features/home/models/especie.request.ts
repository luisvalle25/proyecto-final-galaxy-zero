export interface EspecieCreateRequest {
  nombre: string;
}

export interface EspecieUpdateRequest {
  id: string;
  nombre: string;
  activo: boolean
}
