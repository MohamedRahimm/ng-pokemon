import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonComponent } from '@ang-pokemon/pokemon';

@Component({
    imports: [PokemonComponent, RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'ang-pokemon';
}
