import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-pokemon-catalog-root",
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./pokemon-catalog-root.component.html",
  styleUrl: "./pokemon-catalog-root.component.css",
})
export class PokemonCatalogRootComponent {}
