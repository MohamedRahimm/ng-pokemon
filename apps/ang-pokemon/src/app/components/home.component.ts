import { Component, inject, OnInit } from "@angular/core";
import { PaginatorComponent } from "@ang-pokemon/paginator";
import { colors } from "@ang-pokemon/shared";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-home",
  imports: [CommonModule, PaginatorComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  totalPages = colors.length;
  hideOtherElems = false;
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.hideOtherElems = this.router.url.includes("pokemon");
    });
  }
  navigateToPokemon() {
    this.router.navigateByUrl("/pokemon/red-charmander");
  }
}
