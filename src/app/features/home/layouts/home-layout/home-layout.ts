import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  inject,
} from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

import { Menu } from "../../components/menu/menu";

declare var bootstrap: any;

@Component({
  imports: [RouterLink, RouterOutlet, Menu],
  selector: "app-home-layout",
  styleUrl: "./home-layout.css",
  templateUrl: "./home-layout.html",
})
export class HomeLayout {
  private readonly router = inject(Router);

  @ViewChild("sidebarMenu", { static: true }) sidebar!: ElementRef;

  private isLargeScreen: boolean = false;

  ngOnInit() {
    this.isLargeScreen = window.matchMedia("(min-width: 992px)").matches;
  }

  toggleMenu(): void {
    if (this.isLargeScreen) {
      document.body.classList.toggle("sidebar-collapsed");
    } else {
      const offcanvasNative = this.sidebar.nativeElement;
      const offcanvasInstance =
        bootstrap.Offcanvas.getOrCreateInstance(offcanvasNative);
      offcanvasInstance.toggle();
    }
  }

  cerrar(): void {
    sessionStorage.removeItem("access_token");
    this.router.navigate(["auth/login"]);
  }
}
