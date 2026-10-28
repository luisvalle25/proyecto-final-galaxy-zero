import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { take } from 'rxjs/operators';

import { LoginRequest } from "../../models/login.request";

import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../../../shared/services/alert.service";

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: "app-login",
  styleUrl: "./login.css",
  templateUrl: "./login.html",
})
export class Login {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);

  loginForm = this.formBuilder.group({
    email: ["admin@alpha.com", [Validators.required]],
    password: ["admin@", [Validators.required]],
  });

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = {
      email: this.pf["email"].value || "",
      password: this.pf["password"].value || "",
    };

    this.alertService.showLoading();

    this.authService
      .login(loginRequest)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.alertService.close();

          if (!result.isSuccess) {
            this.alertService.showError(
              result.message ?? "Error al iniciar sesión",
            );
            return;
          }

          sessionStorage.setItem("access_token", result.result?.token!);
          this.router.navigate(["/home"]);
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
    return this.loginForm.controls;
  }
}
