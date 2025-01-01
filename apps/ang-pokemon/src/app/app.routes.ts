import { Route } from "@angular/router";
import { PokemonComponent } from "@ang-pokemon/pokemon";
import { NotFoundComponent } from "@ang-pokemon/shared";
import { HomeComponent } from "./components/home.component";
export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "login",
    component: ,
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
