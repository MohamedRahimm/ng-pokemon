import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { PokemonColors, PokemonInfo } from "@ang-pokemon/shared";
import { GetPokemonService } from "../services/get-pokemon/get-pokemon.service";
import { map, Observable, switchMap } from "rxjs";
@Component({
  selector: "lib-pokemon",
  imports: [CommonModule],
  templateUrl: "./pokemon.component.html",
  styleUrl: "./pokemon.component.css",
})
export class PokemonComponent implements OnInit {
  route = inject(ActivatedRoute);
  pokemonService = inject(GetPokemonService);
  pokemonData!: Observable<{ data: PokemonInfo }>;
  ngOnInit(): void {
    this.pokemonData = this.route.params.pipe(
      map((param) => {
        const [color, pokemon] = (param["id"] as string).split("-");
        return { color: color as PokemonColors, pokemon };
      }),
      switchMap(({ color, pokemon }) =>
        this.pokemonService.getPokemon(color, pokemon)
      )
    );
  }
}
