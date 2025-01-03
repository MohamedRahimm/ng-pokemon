import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "@ang-pokemon/paginator";
import { colors } from "@ang-pokemon/shared";

@Component({
  selector: "app-pokemon-catalog",
  imports: [CommonModule,PaginatorComponent],
  templateUrl: "./pokemon-catalog.component.html",
  styleUrl: "./pokemon-catalog.component.css",
})
export class PokemonCatalogComponent {
    totalPages = colors.length
}
