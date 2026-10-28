import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { take } from "rxjs/operators";

import { EspecieCreateRequest } from "../../../models/especie.request";

import { EspecieService } from "../../../services/especie.service";
import { AlertService } from "../../../../../shared/services/alert.service";

import { TituloPage } from "../../../components/titulo-page/titulo-page";

@Component({
  imports: [TituloPage, CommonModule, ReactiveFormsModule, RouterLink],
  selector: "app-crear",
  templateUrl: "./crear.html",
})
export class CrearEspecie {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly especieService = inject(EspecieService);
  private readonly alertService = inject(AlertService);

  especieForm = this.formBuilder.group({
    nombre: ["", [Validators.required]],
  });

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;

    if (this.especieForm.invalid) {
      return;
    }

    const especieRequest: EspecieCreateRequest = {
      nombre: this.pf["nombre"].value || "",
    };

    this.alertService.showLoading();

    this.especieService
      .create(especieRequest)
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
