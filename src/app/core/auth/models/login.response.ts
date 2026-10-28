export interface LoginResponse {
  isSuccess: boolean;
  message?: string;
  result?: Result;
}

export interface Result {
  id: string;
  nombre: string;
  token: string;
}
