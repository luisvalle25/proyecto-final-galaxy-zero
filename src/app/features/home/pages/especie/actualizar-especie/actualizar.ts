import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";

import { take } from "rxjs/operators";

import { EspecieUpdateRequest } from "../../../models/especie.request";

import { EspecieService } from "../../../services/especie.service";
import { AlertService } from "../../../../../shared/services/alert.service";

import { TituloPage } from "../../../components/titulo-page/titulo-page";

@Component({
  imports: [TituloPage, CommonModule, ReactiveFormsModule, RouterLink],
  selector: "app-actualizar",
  templateUrl: "./actualizar.html",
})
export class ActualizarEspecie implements OnInit {
  private readonly router = inject(Router);
  private readonly routeActivated = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly especieService = inject(EspecieService);
  private readonly alertService = inject(AlertService);

  id!: string;

  especieForm = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    activo: [true, [Validators.required]],
  });

  ngOnInit() {
    this.id = this.routeActivated.snapshot.paramMap.get("id") ?? "";
    if (this.id) {
      this.cargarEspecie();
    }
  }

  cargarEspecie() {
    this.alertService.showLoading();

    this.especieService.getById(this.id).subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(
            result.message ?? "Error al cargar la especie",
          );
          return;
        }

        const especie = result!.result;

        this.especieForm.patchValue({
          nombre: especie!.nombre,
          activo: especie!.activo,
        });
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(
          err?.message ?? "Ocurrió un error inesperado",
        );
      },
    });
  }

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;

    if (this.especieForm.invalid) {
      return;
    }

    const especieRequest: EspecieUpdateRequest = {
      id: this.id,
      nombre: this.pf["nombre"].value || "",
      activo: this.pf["activo"].value,
    };
    
    this.alertService.showLoading();

    this.especieService
      .update(this.id, especieRequest)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.alertService.close();

          if (!result.isSuccess) {
            this.alertService.showError(
              result.message ?? "Error al guardar la especie",
            );
            return;
          }

          this.router.navigate(["/home/especie"]);
        },
        error: (err) => {
          this.alertService.close();
          this.alertService.showError(
            err?.message ?? "Ocurrió un error inesperado",
          );
        },
      });
  }

  get pf(): { [key: string]: AbstractControl } {
    return this.especieForm.controls;
  }
}
