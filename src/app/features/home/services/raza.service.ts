import { inject, Service } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { RazaCreateRequest } from '../models/raza.request';
import { RazaResponse, RazaByResponse } from '../models/raza.response';

@Service()
export class RazaService {
  private readonly API_URL = `${environment.URL_BASE}/razas`;
  private readonly http = inject(HttpClient);

  create(modelo: RazaCreateRequest): Observable<RazaResponse> {
    return this.http.post<RazaResponse>(this.API_URL, modelo).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error en la solicitud (400)';

        if (error.status === 400 && error.error) {
          mensajeError = error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }

  delete(id: string): Observable<RazaResponse> {
    return this.http.delete<RazaResponse>(`${this.API_URL}/${id}`).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error en la solicitud (400)';

        if (error.status === 400 && error.error) {
          mensajeError = error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }

  getById(id: string): Observable<RazaByResponse> {
    return this.http.get<RazaByResponse>(`${this.API_URL}/${id}`).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error en la solicitud (400)';

        if (error.status === 400 && error.error) {
          mensajeError = error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }

  getAll(): Observable<RazaResponse> {
    return this.http.get<RazaResponse>(this.API_URL).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error en la solicitud (400)';

        if (error.status === 400 && error.error) {
          mensajeError = error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }

  getSearch(search: string): Observable<RazaResponse> {
    return this.http.get<RazaResponse>(`${this.API_URL}/searchbyterm/${search}`).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        let mensajeError = 'Error en la solicitud (400)';

        if (error.status === 400 && error.error) {
          mensajeError = error.error.message || error.error.error || mensajeError;
        }

        return throwError(() => new Error(mensajeError));
      }),
    );
  }
}