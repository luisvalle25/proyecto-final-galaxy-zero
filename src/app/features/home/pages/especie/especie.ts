import { Component, inject, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { EspecieResponse, EspecieEntity } from '../../models/especie.response';

import { EspecieService } from '../../services/especie.service';
import { AlertService } from '../../../../shared/services/alert.service';

import { TituloPage } from '../../components/titulo-page/titulo-page';

@Component({
  imports: [TituloPage, RouterLink],
  selector: 'app-especie',
  styleUrl: './especie.css',
  templateUrl: './especie.html',
})
export class Especie implements OnInit {
  private readonly especieService = inject(EspecieService);
  private readonly alertService = inject(AlertService);

  especies = signal<EspecieEntity[]>([]);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.alertService.showLoading();

    this.especieService.getAll().subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(
            result.message ?? 'Error al realizar la carga de las especies',
          );
          return;
        }

        this.especies.set(result.result!);
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(err?.message ?? 'Ocurrió un error inesperado');
      },
    });
  }

  onSearch(search: string): void {
    if (!search) return;

    this.alertService.showLoading();

    this.especieService.getSearch(search).subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(
            result.message ?? 'Error al realizar la carga de las especies',
          );
          return;
        }

        this.especies.set(result.result!);
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(err?.message ?? 'Ocurrió un error inesperado');
      },
    });
  }

  onEliminar(especie: EspecieEntity): void {
    this.alertService
      .showConfirm('¿Desea eliminar el registro?', 'Esta acción no se puede deshacer', 'Sí', 'No')
      .then((confirmado) => {
        if (confirmado) {
          this.alertService.showLoading();

          this.especieService.delete(especie.id).subscribe({
            next: (result) => {
              this.alertService.close();

              if (!result.isSuccess) {
                this.alertService.showError(
                  result.message ?? 'Error al realizar la eliminacion de la especie',
                );
                return;
              }

              this.getAll();
            },
            error: (err) => {
              this.alertService.close();
              this.alertService.showError(err?.message ?? 'Ocurrió un error inesperado');
            },
          });
        }
      });
  }
}
