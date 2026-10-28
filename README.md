# Alpha App

Sistema web para la gestión de una veterinaria. Permite administrar usuarios, especies, razas y mascotas desde una sola aplicación, manteniendo la información organizada y relacionada entre sí.

## Funcionalidades

- **Usuarios:** registro, consulta, edición y eliminación de usuarios del sistema (por ejemplo, dueños de mascotas).
- **Especies:** administración del catálogo de especies (perro, gato, ave, etc.).
- **Razas:** administración de razas, asociadas a una especie.
- **Mascotas:** registro y gestión de mascotas, vinculadas a un usuario (dueño), una especie y una raza.

### Relación entre los módulos

```
Especie ──< Raza ──< Mascota >── Usuario
```

Una especie tiene varias razas, y cada mascota pertenece a una raza y a un usuario.

## Arquitectura

Alpha App es una aplicación de dos partes que se comunican mediante una API REST:

```
┌──────────────────┐      HTTP / JSON      ┌─────────────────────────┐
│  Frontend        │ ────────────────────► │  Backend                │
│  Angular         │ ◄──────────────────── │  .NET 10 (API REST)     │
└──────────────────┘                       │  Arquitectura limpia    │
                                           └───────────┬─────────────┘
                                                       │ Entity Framework Core
                                                ┌──────▼──────┐
                                                │ SQL Server  │
                                                └─────────────┘
```

### Backend

El backend está desarrollado con **.NET 10** siguiendo los principios de **Clean Architecture**, separando responsabilidades en capas:

| Capa | Responsabilidad |
|------|-----------------|
| **Domain** | Entidades (Usuario, Especie, Raza, Mascota) y reglas de negocio. No depende de ninguna otra capa. |
| **Application** | Casos de uso, DTOs, interfaces y validaciones. |
| **Infrastructure** | Acceso a datos con Entity Framework Core, repositorios, migraciones y servicios externos. |
| **API** | Controladores, configuración y punto de entrada HTTP. |

## Tecnologías utilizadas

**Frontend**
- [Angular](https://angular.dev/) (generado con Angular CLI 22.1.8)
- TypeScript
- [Vitest](https://vitest.dev/) para pruebas unitarias

**Backend**
- [.NET 10](https://dotnet.microsoft.com/) (ASP.NET Core Web API)
- Clean Architecture
- [Entity Framework Core](https://learn.microsoft.com/ef/core/) como ORM (enfoque Code First con migraciones)
- [SQL Server](https://www.microsoft.com/sql-server) como base de datos

## Requisitos previos

- [Node.js](https://nodejs.org/) en una versión compatible con Angular 22
- npm (incluido con Node.js)
- Angular CLI:

```bash
npm install -g @angular/cli
```

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- Herramienta de Entity Framework Core:

```bash
dotnet tool install --global dotnet-ef
```

- SQL Server (cualquiera de estas opciones):
  - [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads) o LocalDB
  - SQL Server en Docker:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<TuContraseñaSegura>" \
  -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```
### 1. Frontend

```bash
git clone [https://github.com/luisvalle25/proyecto-final-zero]
cd alpha-app
npm install
```

Configura la URL de la API en `[ruta del archivo, por ejemplo src/environments/environment.ts]`.

## Uso

### Servidor de desarrollo

```bash
ng serve
```

Abre `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente al modificar los archivos fuente.

Asegúrate de que el backend y SQL Server estén en ejecución antes de usar la aplicación.

### Compilación para producción

```bash
ng build
```

Los archivos generados se guardan en la carpeta `dist/`, con la aplicación optimizada en rendimiento y velocidad.

## Pruebas

### Pruebas unitarias

```bash
ng test
```

### Pruebas end-to-end

```bash
ng e2e
```

Angular CLI no incluye un framework e2e por defecto; puedes elegir el que mejor se adapte al proyecto.

## Estructura del proyecto (frontend)

```
src/
└── app/
    ├── usuarios/     # Gestión de usuarios
    ├── especies/     # Gestión de especies
    ├── razas/        # Gestión de razas
    └── mascotas/     # Gestión de mascotas
```

## Desarrollo

Para generar nuevos componentes con Angular CLI:

```bash
ng generate component nombre-del-componente
ng generate --help
```

## Licencia

Este proyecto está bajo la licencia [MIT]. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Recursos adicionales

- [Documentación de Angular](https://angular.dev/)
- [Referencia de Angular CLI](https://angular.dev/tools/cli)
- [Documentación de .NET](https://learn.microsoft.com/dotnet/)
- [Documentación de Entity Framework Core](https://learn.microsoft.com/ef/core/)
