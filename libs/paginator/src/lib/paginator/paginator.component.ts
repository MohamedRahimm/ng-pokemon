import { Component, input, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageBtnComponent } from "../page-btn/page-btn.component";
import { RouterLink } from "@angular/router";
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
  pageInfo = output<{ num: number; name: string }>();
  changePange({ num, name }: { num: number; name: string }) {
    this.pageInfo.emit({ num, name });
  }
}
