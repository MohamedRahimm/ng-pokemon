import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetPokemonService } from "../services/get-pokemon/get-pokemon.service";
import { PokemonColors } from "@ang-pokemon/shared";
interface UiData {
  sprite: string;
  name: string;
}
interface Colors {
  color: PokemonColors;
  pokemon: UiData;
}
export const colors: PokemonColors[] = [
  "red",
  "black",
  "blue",
  "brown",
  "gray",
  "green",
  "pink",
  "purple",
  "white",
  "yellow",
];
@Component({
  selector: "lib-pokemon",
  imports: [CommonModule],
  templateUrl: "./pokemon.component.html",
  styleUrl: "./pokemon.component.css",
})
export class PokemonComponent implements OnInit {
  colors: Colors[] = [];
  pokemonService = inject(GetPokemonService);
  ngOnInit() {
    // for (const color of colors) {
    //   this.pokemonService.getPokemonByColor(color).subscribe((val) => {
    //     val.data.forEach((idk) => {
    //       this.colors.push({
    //         color,
    //         pokemon: { sprite: idk.sprites.front_default, name: idk.name },
    //       });
    //     });
    //   });
    // }

    this.pokemonService.getPokemonByColor("red").subscribe((val) => {
      val.data.forEach((idk) => {
        this.colors.push({
          color: "red",
          pokemon: { sprite: idk.sprites.front_default, name: idk.name },
        });
      });
    });
  }
}
