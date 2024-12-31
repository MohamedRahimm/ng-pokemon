import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { colors, PokemonComponent } from "@ang-pokemon/pokemon";
import { PaginatorComponent } from "@ang-pokemon/paginator";
@Component({
  imports: [RouterModule, PaginatorComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  totalPages = colors.length;
}
