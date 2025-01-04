import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Content, PaginatorComponent } from "@ang-pokemon/paginator";
import { colors, PokemonColors } from "@ang-pokemon/shared";
import { GetPokemonService } from "../../services/get-pokemon/get-pokemon.service";

@Component({
  selector: "lib-pokemon-catalog",
  imports: [CommonModule, PaginatorComponent],
  templateUrl: "./pokemon-catalog.component.html",
  styleUrl: "./pokemon-catalog.component.css",
})
export class PokemonCatalogComponent {
  pokemonService = inject(GetPokemonService);
  pageNames = colors;
  currentPage: {
    num: number;
    name: string;
    content: Content[];
  } = { num: 0, name: colors[0], content: this.loadContent(colors[0]) };
  loadContent(name: string) {
    const content: Content[] = [];
    this.pokemonService
      .getPokemonByColor(name as PokemonColors)
      .subscribe((val) => {
        val.data.forEach((idk) => {
          content.push({
            color: name,
            pokemon: { sprite: idk.sprites.front_default, name: idk.name },
            url: `/pokemon/${name}-${idk.name}`,
          });
        });
      });
    return content;
  }
  somefunc({ name, num }: { name: string; num: number }) {
    this.currentPage.name = name;
    this.currentPage.num = num;
    this.currentPage.content = this.loadContent(name);
  }
}
