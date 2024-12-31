import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  PokemonColorInfo,
  PokemonColors,
  PokemonInfo,
} from "@ang-pokemon/shared";
import {
  catchError,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { DbService } from "../db/db.service";

@Injectable({
  providedIn: "root",
})
export class GetPokemonService {
  private httpClient = inject(HttpClient);
  private db = inject(DbService);
  getPokemonByColor(
    color: PokemonColors
  ): Observable<{ color: PokemonColors; data: PokemonInfo[] }> {
    return from(this.db.getFromIndexedDB(color)).pipe(
      switchMap((cachedData) => {
        if (cachedData.data.length) {
          return of(cachedData);
        } else {
          return this.retrieveFromAPI(color);
        }
      })
    );
  }
  private retrieveFromAPI(
    color: PokemonColors
  ): Observable<{ color: PokemonColors; data: PokemonInfo[] }> {
    return this.httpClient
      .get<PokemonColorInfo>(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of(null);
        }),
        filter((response) => response !== null),
        // Gets the pokemon species urls
        map(({ pokemon_species }) => pokemon_species.map(({ name }) => name)),
        mergeMap((names) => {
          const reqs = names.map((name) =>
            this.httpClient
              .get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${name}`)
              .pipe(
                catchError((err) => {
                  console.error(err);
                  return of(null);
                })
              )
          );
          return forkJoin(reqs).pipe(
            map((responses) =>
              responses.filter((response) => response !== null)
            )
          );
        }),
        switchMap((data) => {
          const savePromises = data.map((pokemon) =>
            from(this.db.saveToIndexedDB(color, pokemon))
          );
          return forkJoin(savePromises).pipe(map(() => ({ color, data })));
        })
      );
  }
}
