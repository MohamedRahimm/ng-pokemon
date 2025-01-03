import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "@ang-pokemon/paginator";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-pokemon-catalog",
  imports: [CommonModule, PaginatorComponent, RouterOutlet],
  templateUrl: "./pokemon-catalog.component.html",
  styleUrl: "./pokemon-catalog.component.css",
})
export class PokemonCatalogComponent {
  totalPages = 10;
}
