import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokemonColors } from "@ang-pokemon/shared";

@Component({
  selector: "lib-page-btn",
  imports: [CommonModule],
  templateUrl: "./page-btn.component.html",
  styleUrl: "./page-btn.component.css",
})
export class PageBtnComponent {
  pageNum = input.required<PokemonColors>();
  out = output<PokemonColors>();
  handleClick() {
    this.out.emit(this.pageNum());
  }
}
