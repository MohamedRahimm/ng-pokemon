import { Component, inject, input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageBtnComponent } from "../page-btn/page-btn.component";
import { GetPokemonService } from "@ang-pokemon/pokemon";
import { PokemonColors } from "@ang-pokemon/shared";
import { colors } from "@ang-pokemon/shared";
import { RouterLink } from "@angular/router";
interface UiData {
  sprite: string;
  name: string;
}
interface Colors {
  color: PokemonColors;
  pokemon: UiData;
  url: string;
}
@Component({
  selector: "lib-paginator",
  imports: [CommonModule, PageBtnComponent, RouterLink],
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.css",
})
export class PaginatorComponent implements OnInit {
  pokemonService = inject(GetPokemonService);
  totalPages = input.required<number>();
  pages: PokemonColors[] = [];
  display: Colors[] = [];
  ngOnInit(): void {
    this.pages = [...Array(this.totalPages()).keys()].map((val) => colors[val]);
    this.changePage(colors[0]);
  }
  pageContent: unknown;
  changePage(color: PokemonColors) {
    this.display = [];
    this.pokemonService.getPokemonByColor(color).subscribe((val) => {
      val.data.forEach((idk) => {
        this.display.push({
          color,
          pokemon: { sprite: idk.sprites.front_default, name: idk.name },
          url: `/pokemon/${color}-${idk.name}`,
        });
      });
    });
  }
}
