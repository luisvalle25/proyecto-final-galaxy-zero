import { Routes } from "@angular/router";

import { authGuard } from "./core/auth/guards/auth-guard";
import { guestGuard } from "./core/auth/guards/guest-guard";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./core/auth/auth.route").then((r) => r.authRoutes),
    canActivate: [guestGuard],
  },
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.route").then((r) => r.homeRoutes),
    canActivate: [authGuard],
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "auth" },
];
