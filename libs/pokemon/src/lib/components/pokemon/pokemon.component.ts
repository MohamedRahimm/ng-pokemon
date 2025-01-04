import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PokemonColors } from "@ang-pokemon/shared";
import { GetPokemonService } from "../../services/get-pokemon/get-pokemon.service";
import { map, switchMap } from "rxjs";
@Component({
  selector: "lib-pokemon",
  imports: [CommonModule, RouterLink],
  templateUrl: "./pokemon.component.html",
  styleUrl: "./pokemon.component.css",
})
export class PokemonComponent implements OnInit {
  route = inject(ActivatedRoute);
  pokemonService = inject(GetPokemonService);
  pokemonData: {
    name: string;
    moves: string[];
    types: string;
    weight: number;
    sprites: string[];
  } = {
    name: "",
    moves: [],
    types: "",
    weight: 0,
    sprites: [],
  };
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((param) => {
          const [color, pokemon] = (param["id"] as string).split("-");
          return { color: color as PokemonColors, pokemon };
        }),
        switchMap(({ color, pokemon }) =>
          this.pokemonService.getPokemon(color, pokemon)
        )
      )
      .subscribe((pokemon) => {
        this.pokemonData = {
          name: pokemon.data.name,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map((types) => types.type.name).toString(),
          moves: pokemon.data.moves.map((moves) => moves.move.name),
          sprites: Object.values(pokemon.data.sprites).filter(
            (sprite) => typeof sprite === "string"
          ),
        };
      });
  }
}
