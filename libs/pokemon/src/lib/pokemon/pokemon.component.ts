import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPokemonService } from '../services/get-pokemon/get-pokemon.service';
@Component({
    selector: 'lib-pokemon',
    imports: [CommonModule],
    templateUrl: './pokemon.component.html',
    styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
    pokemonService = inject(GetPokemonService)
    async ngOnInit() {
        this.pokemonService.getPokemonInfo("red").subscribe(val => console.log(val))
    }
}
