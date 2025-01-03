import { Route } from "@angular/router";
import { PokemonComponent } from "@ang-pokemon/pokemon";
import {
  LoginComponent,
  NotFoundComponent,
  RegisterComponent,
} from "@ang-pokemon/shared";
import { authGuard } from "./guards/auth.guard";
import { PokemonCatalogComponent } from "./components/pokemon-catalog/pokemon-catalog.component";
export const appRoutes: Route[] = [
  {
    path: "",
    // auth guard to redirect to either login or register
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "register",
    // auth guard this
    component: RegisterComponent,
    title: "register",
  },
  {
    path: "login",
    // auth guard this
    component: LoginComponent,
    title: "login",
  },
  {
    path: "pokemon",
    component: PokemonCatalogComponent,
    title: "pokemon-catalogue",
    // canActivate: [authGuard],
    // canActivateChild: [authGuard],
    children: [
      {
        path: ":id",
        pathMatch: "full",
        component: PokemonComponent,
        title: "pokemon",
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    component: NotFoundComponent,
    title: "404 - Page Not Found",
  },
];
