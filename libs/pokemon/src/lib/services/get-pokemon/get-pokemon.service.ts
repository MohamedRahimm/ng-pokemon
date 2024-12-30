import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonColorInfo, PokemonColors, PokemonSpecies } from './pokemon';
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { DbService } from '../db/db.service';

@Injectable({
    providedIn: 'root'
})
export class GetPokemonService {
    private httpClient = inject(HttpClient)
    private db = inject(DbService)
    getPokemonByColor(color: PokemonColors): Observable<{ "color": PokemonColors, "data": PokemonSpecies[] }> {
        return from(this.db.getFromIndexedDB(color)).pipe(
            switchMap((cachedData) => {
                if (cachedData) {
                    return of(cachedData);
                } else {
                    return this.httpClient
                        .get<PokemonColorInfo>(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
                        .pipe(
                            map(({ pokemon_species }) => pokemon_species),
                            switchMap((species) => {
                                return from(this.db.saveToIndexedDB(color, species)).pipe(map(() => ({ color, "data": species })));
                            })
                        );
                }
            })
        );
    }
    getPokemonInfo(color: PokemonColors) {
        return this.getPokemonByColor(color).pipe(
            map(({ data }) => data.map(val => val.url)),
            switchMap((urls) => {
                return forkJoin(urls.map(url => this.httpClient.get(url)));
            })
        );
    }
}
