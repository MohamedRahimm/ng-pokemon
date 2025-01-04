import { Component, input, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageBtnComponent } from "../page-btn/page-btn.component";
import { RouterLink } from "@angular/router";
import { PokemonColors } from "@ang-pokemon/shared";
export interface Content {
  color: string;
  url: string;
  pokemon: { sprite: string; name: string };
}
@Component({
  selector: "lib-paginator",
  imports: [CommonModule, PageBtnComponent, RouterLink],
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.css",
})
export class PaginatorComponent {
  pageNames = input.required<string[]>();
  currentPage = input.required<{
    num: number;
    name: string;
    content: Content[];
  }>();
  idk = output<{ num: number; name: string }>();
  changePange({ num, name }: { num: number; name: string }) {
    this.idk.emit({ num, name });
  }
  //   ngOnInit(): void {
  //     this.pages = [...Array(this.totalPages()).keys()].map((val) => colors[val]);
  //     this.changePage(colors[0]);
  //   }
  //   changePage(color: PokemonColors) {
  //     this.pageContent = [];
  //     this.pokemonService.getPokemonByColor(color).subscribe((val) => {
  //       val.data.forEach((idk) => {
  //         this.pageContent.push({
  //           color,
  //           pokemon: { sprite: idk.sprites.front_default, name: idk.name },
  //           url: `/pokemon/${color}-${idk.name}`,
  //         });
  //       });
  //     });
}
