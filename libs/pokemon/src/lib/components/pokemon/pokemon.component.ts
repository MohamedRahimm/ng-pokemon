import { PokemonColors } from "@ang-pokemon/shared";
import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";
import { GetPokemonService } from "../../services/get-pokemon/get-pokemon.service";
@Component({
  selector: "lib-pokemon",
  imports: [CommonModule],
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
  errorSignal = signal(false);
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
      .subscribe({
        error: () => {
          this.errorSignal.set(true);
        },
        next: (pokemon) => {
          this.pokemonData = {
            name:
              pokemon.data.name[0].toUpperCase() + pokemon.data.name.slice(1),
            weight: pokemon.data.weight,
            types: pokemon.data.types
              .map((types) => types.type.name)
              .toString(),
            moves: pokemon.data.moves.map((moves) => moves.move.name),
            sprites: Object.values(pokemon.data.sprites).filter(
              (sprite) => typeof sprite === "string"
            ),
          };
        },
      });
  }
}
