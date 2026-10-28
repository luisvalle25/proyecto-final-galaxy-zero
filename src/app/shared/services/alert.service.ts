import { Service } from "@angular/core";
import Swal from "sweetalert2";

@Service()
export class AlertService {
  showLoading(
    title: string = "Procesando...",
    text: string = "Por favor, espere.",
  ): void {
    Swal.fire({
      title,
      text,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  }

  showError(message: string, timer: number = 3000): void {
    Swal.fire({
      title: message,
      icon: "error",
      timer: timer,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  }

  showSuccess(title: string, timer: number = 3000): void {
    Swal.fire({
      title,
      icon: "success",
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  }

  showConfirm(
    title: string,
    text: string,
    confirmButtonText: string = "Aceptar",
    cancelButtonText: string = "Cancelar",
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#042444",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false,
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  close(): void {
    Swal.close();
  }
}
