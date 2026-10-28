import { Routes } from "@angular/router";

import { HomeLayout } from "./layouts/home-layout/home-layout";

import { Dashboard } from "./pages/dashboard/dashboard";

import { Especie } from "./pages/especie/especie";
import { CrearEspecie } from "./pages/especie/crear-especie/crear";
import { ActualizarEspecie } from "./pages/especie/actualizar-especie/actualizar";

import { Raza } from "./pages/raza/raza";
import { CrearRaza } from "./pages/raza/crear-raza/crear";

import { Mascota } from "./pages/mascota/mascota";

import { Usuario } from "./pages/usuario/usuario";
import { Crear } from "./pages/usuario/crear/crear";

export const homeRoutes: Routes = [
  {
    path: "",
    component: HomeLayout,
    children: [
      { path: "dashboard", component: Dashboard },

      { path: "especie", component: Especie },
      { path: "especie/crear", component: CrearEspecie },
      { path: "especie/actualizar/:id", component: ActualizarEspecie },

      { path: "raza", component: Raza },
      { path: "raza/crear", component: CrearRaza },

      { path: "mascota", component: Mascota },

      { path: "usuario", component: Usuario },
      { path: "usuario/crear", component: Crear },

      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      { path: "**", redirectTo: "dashboard" },
    ],
  },
];
