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

import { UsuarioRequest } from "../../../models/usuario.request";

import { UsuarioService } from "../../../services/usuario.service";
import { AlertService } from "../../../../../shared/services/alert.service";

import { TituloPage } from "../../../components/titulo-page/titulo-page";

@Component({
  imports: [TituloPage, CommonModule, ReactiveFormsModule, RouterLink],
  selector: "app-crear",
  templateUrl: "./crear.html",
})
export class Crear {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly alertService = inject(AlertService);

  usuarioForm = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    email: ["", [Validators.required]],
    password: ["", [Validators.required]],
  });

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;

    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioRequest: UsuarioRequest = {
      nombre: this.pf["nombre"].value || "",
      email: this.pf["email"].value || "",
      password: this.pf["password"].value || "",
    };

    this.alertService.showLoading();

    this.usuarioService
      .create(usuarioRequest)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.alertService.close();

          if (!result.isSuccess) {
            this.alertService.showError(
              result.message ?? "Error al guardar al usuario",
            );
            return;
          }

          this.router.navigate(["/home/usuario"]);
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
    return this.usuarioForm.controls;
  }
}
