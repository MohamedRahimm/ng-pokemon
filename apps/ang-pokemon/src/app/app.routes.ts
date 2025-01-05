import { Route } from "@angular/router";
import { authGuard } from "./guards/auth/auth.guard";
import { authRedirectGuard } from "./guards/auth-redirect/auth-redirect.guard";
import { PokemonCatalogRootComponent } from "./components/pokemon-catalog-root/pokemon-catalog-root.component";
import {
  PokemonCatalogComponent,
  PokemonComponent,
} from "@ang-pokemon/pokemon";
export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "register",
    // canActivate: [authRedirectGuard],
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.RegisterComponent),
    title: "register",
  },
  {
    path: "login",
    // canActivate: [authRedirectGuard],
    title: "login",
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.LoginComponent),
  },
  {
    path: "pokemon",
    component: PokemonCatalogRootComponent,
    title: "pokemon-catalogue",
    // canActivate: [authGuard],
    // canActivateChild: [authGuard],
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
        component: PokemonComponent,
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
