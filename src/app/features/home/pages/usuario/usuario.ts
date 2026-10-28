import { Component, inject, OnInit, signal } from "@angular/core";

import { UsuarioResponse, UsuarioEntity } from "../../models/usuario.response";

import { UsuarioService } from "../../services/usuario.service";
import { AlertService } from "../../../../shared/services/alert.service";

import { TituloPage } from "../../components/titulo-page/titulo-page";

@Component({
  imports: [TituloPage],
  selector: "app-usuario",
  styleUrl: "./usuario.css",
  templateUrl: "./usuario.html",
})
export class Usuario implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly alertService = inject(AlertService);

  usuarios = signal<UsuarioEntity[]>([]);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.alertService.showLoading();

    this.usuarioService.getAll().subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(
            result.message ?? "Error al realizar la carga de usuarios",
          );
          return;
        }

        this.usuarios.set(result.result!);
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(
          err?.message ?? "Ocurrió un error inesperado",
        );
      },
    });
  }

  onSearch(search: string): void {
    if (!search) return;

    this.alertService.showLoading();

    this.usuarioService.getSearch(search).subscribe({
      next: (result) => {
        this.alertService.close();

        if (!result.isSuccess) {
          this.alertService.showError(
            result.message ?? "Error al realizar la carga de usuarios",
          );
          return;
        }

        this.usuarios.set(result.result!);
      },
      error: (err) => {
        this.alertService.close();
        this.alertService.showError(
          err?.message ?? "Ocurrió un error inesperado",
        );
      },
    });
  }
}
