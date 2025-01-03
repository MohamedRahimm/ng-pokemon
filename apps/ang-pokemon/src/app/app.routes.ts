import { Route } from "@angular/router";
import { authGuard, testGuard } from "./guards/auth.guard";
import { PokemonCatalogRootComponent } from "./components/pokemon-catalog-root/pokemon-catalog-root.component";
import { PokemonCatalogComponent } from "./components/pokemon-catalog/pokemon-catalog.component";
export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "register",
    canActivate: [testGuard],
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.RegisterComponent),
    title: "register",
  },
  {
    path: "login",
    canActivate: [testGuard],
    title: "login",
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.LoginComponent),
  },
  {
    path: "pokemon",
    component: PokemonCatalogRootComponent,
    title: "pokemon-catalogue",
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: "catalog",
        pathMatch: "full",
        component: PokemonCatalogComponent,
      },
      {
        path: ":id",
        pathMatch: "full",
        title: "pokemon",
        loadChildren: () =>
          import("@ang-pokemon/pokemon").then((c) => c.PokemonComponent),
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.NotFoundComponent),
    title: "404 - Page Not Found",
  },
];
