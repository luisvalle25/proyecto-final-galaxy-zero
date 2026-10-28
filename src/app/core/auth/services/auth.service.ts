import { inject, Service } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, delay, Observable, throwError } from "rxjs";

import { environment } from "../../../../environments/environment";

import { LoginRequest } from "../models/login.request";
import { LoginResponse } from "../models/login.response";

@Service()
export class AuthService {
  private readonly API_URL = `${environment.URL_BASE}/seguridad/auth`;
  private readonly http = inject(HttpClient);

  login(modelo: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL, modelo).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = "Error en la solicitud (400)";

        if (error.status === 400 && error.error) {
          mensajeError =
            error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }

  autenticado(): boolean {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      return false;
    }

    return this.validarJWT(token);
  }

  private validarJWT(token: string): boolean {
    const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
    return jwtRegex.test(token);
  }
}
