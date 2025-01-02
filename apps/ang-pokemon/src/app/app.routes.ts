import { Route } from "@angular/router";
import { PokemonComponent } from "@ang-pokemon/pokemon";
import { LoginComponent, NotFoundComponent } from "@ang-pokemon/shared";
import { HomeComponent } from "./components/home.component";
export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "Home",
    canActivate:
  },
  {
    path: "login",
    component: LoginComponent,
    title: "login",
  },
  {
    path: "pokemon/:id",
    pathMatch: "full",
    component: PokemonComponent,
    title: "pokemon",
  },
  {
    path: "**",
    pathMatch: "full",
    component: NotFoundComponent,
    title: "404 - Page Not Found",
  },
];
