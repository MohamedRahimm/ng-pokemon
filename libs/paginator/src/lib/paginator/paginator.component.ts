import { Component, inject, input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageBtnComponent } from "../page-btn/page-btn.component";
import { colors } from "@ang-pokemon/pokemon";
import { GetPokemonService } from "@ang-pokemon/pokemon";
import { PokemonColors } from "@ang-pokemon/pokemon";
interface UiData {
  sprite: string;
  name: string;
}
interface Colors {
  color: PokemonColors;
  pokemon: UiData;
}
@Component({
  selector: "lib-paginator",
  imports: [CommonModule, PageBtnComponent],
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.css",
})
export class PaginatorComponent implements OnInit {
  pokemonService = inject(GetPokemonService);
  currentPage = 0;
  totalPages = input.required<number>();
  pages: number[] = [];
  display: Colors[] = [];
  ngOnInit(): void {
    this.pages = [...Array(this.totalPages()).keys()];
  }
  pageContent: unknown;
  changePage(newPage: number) {
    this.currentPage = newPage;
    this.display = [];
    this.pokemonService.getPokemonByColor(colors[newPage]).subscribe((val) => {
      val.data.forEach((idk) => {
        this.display.push({
          color: colors[newPage],
          pokemon: { sprite: idk.sprites.front_default, name: idk.name },
        });
      });
    });
  }
}
