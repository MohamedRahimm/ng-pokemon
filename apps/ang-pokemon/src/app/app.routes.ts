import {
  PokemonCatalogComponent,
  PokemonComponent,
} from "@ang-pokemon/pokemon";
import { Route } from "@angular/router";
import { authRedirectGuard } from "./guards/auth-redirect/auth-redirect.guard";
import { authGuard } from "./guards/auth/auth.guard";
export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "register",
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.RegisterComponent),
    title: "register",
  },
  {
    path: "login",
    canActivate: [authRedirectGuard],
    title: "login",
    loadComponent: () =>
      import("@ang-pokemon/shared").then((c) => c.LoginComponent),
  },
  {
    path: "password",
    canActivate: [authRedirectGuard],
    canActivateChild: [authRedirectGuard],
    title: "Reset Password",
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("@ang-pokemon/shared").then((c) => c.PasswordComponent),
      },
      {
        path: "reset",
        pathMatch: "prefix",
        loadComponent: () =>
          import("@ang-pokemon/shared").then((c) => c.ResetPwComponent),
      },
    ],
  },
  {
    path: "pokemon",
    title: "Pokemon Catalog",
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: "",
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
