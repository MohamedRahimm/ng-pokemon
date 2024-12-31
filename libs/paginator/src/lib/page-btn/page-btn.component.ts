import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "lib-page-btn",
  imports: [CommonModule],
  templateUrl: "./page-btn.component.html",
  styleUrl: "./page-btn.component.css",
})
export class PageBtnComponent {
  pageNum = input.required<number>();
  out = output<number>();
  handleClick() {
    this.out.emit(this.pageNum());
  }
}
