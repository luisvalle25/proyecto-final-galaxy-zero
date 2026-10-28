import { inject, Service } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, delay, Observable, throwError } from "rxjs";

import { environment } from "../../../../environments/environment";

import { UsuarioRequest } from "../models/usuario.request";
import { UsuarioResponse } from "../models/usuario.response";

@Service()
export class UsuarioService {
  private readonly API_URL = `${environment.URL_BASE}/usuarios`;
  private readonly http = inject(HttpClient);

  create(modelo: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.API_URL, modelo).pipe(
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

  getAll(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(this.API_URL).pipe(
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

  getSearch(search: string): Observable<UsuarioResponse> {
    return this.http
      .get<UsuarioResponse>(`${this.API_URL}/searchbyterm/${search}`)
      .pipe(
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
}
