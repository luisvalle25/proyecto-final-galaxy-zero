import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { take } from 'rxjs/operators';

import { EspecieEntity } from '../../../models/especie.response';

import { RazaCreateRequest } from '../../../models/raza.request';

import { RazaService } from '../../../services/raza.service';
import { EspecieService } from '../../../services/especie.service';

import { AlertService } from '../../../../../shared/services/alert.service';

import { TituloPage } from '../../../components/titulo-page/titulo-page';

@Component({
  imports: [TituloPage, CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-crear',
  templateUrl: './crear.html',
})
export class CrearRaza implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly razaService = inject(RazaService);
  private readonly especieService = inject(EspecieService);
  private readonly alertService = inject(AlertService);

  especies = signal<EspecieEntity[]>([]);

  ngOnInit() {
    this.cargarEspecies();
  }

  cargarEspecies() {
    this.alertService.showLoading();

    this.especieService.getAll().subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(result.message ?? 'Error al cargar la especies');
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

  razaForm = this.formBuilder.group({
    especieid: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
  });

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;

    if (this.razaForm.invalid) {
      return;
    }

    const razaRequest: RazaCreateRequest = {
      especieid: this.pf['especieid'].value || '',
      nombre: this.pf['nombre'].value || '',
    };

    this.alertService.showLoading();

    this.razaService
      .create(razaRequest)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.alertService.close();

          if (!result.isSuccess) {
            this.alertService.showError(result.message ?? 'Error al guardar la raza');
            return;
          }

          this.router.navigate(['/home/raza']);
        },
        error: (err) => {
          this.alertService.close();
          this.alertService.showError(err?.message ?? 'Ocurrió un error inesperado');
        },
      });
  }

  get pf(): { [key: string]: AbstractControl } {
    return this.razaForm.controls;
  }
}
