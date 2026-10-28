import { Component, inject, OnInit, signal } from '@angular/core';

import { RazaResponse, RazaEntity } from '../../models/raza.response';

import { RazaService } from '../../services/raza.service';
import { AlertService } from '../../../../shared/services/alert.service';

import { TituloPage } from '../../components/titulo-page/titulo-page';

@Component({
  imports: [TituloPage],
  selector: 'app-raza',
  styleUrl: './raza.css',
  templateUrl: './raza.html',
})
export class Raza implements OnInit {
  private readonly razaService = inject(RazaService);
  private readonly alertService = inject(AlertService);

  razas = signal<RazaEntity[]>([]);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.alertService.showLoading();

    this.razaService.getAll().subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(result.message ?? 'Error al realizar la carga de las razas');
          return;
        }

        this.razas.set(result.result!);
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

    this.razaService.getSearch(search).subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(result.message ?? 'Error al realizar la carga de las razas');
          return;
        }

        this.razas.set(result.result!);
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(err?.message ?? 'Ocurrió un error inesperado');
      },
    });
  }

  onEliminar(raza: RazaEntity): void {
    this.alertService
      .showConfirm('¿Desea eliminar el registro?', 'Esta acción no se puede deshacer', 'Sí', 'No')
      .then((confirmado) => {
        if (confirmado) {
          this.alertService.showLoading();

          this.razaService.delete(raza.id).subscribe({
            next: (result) => {
              this.alertService.close();

              if (!result.isSuccess) {
                this.alertService.showError(
                  result.message ?? 'Error al realizar la eliminacion de la raza',
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
