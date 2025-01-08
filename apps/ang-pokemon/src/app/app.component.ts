import { AuthService } from "@ang-pokemon/auth";
import { Component, inject, OnInit } from "@angular/core";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from "@angular/router";
import { AsyncPipe } from "@angular/common";
@Component({
  imports: [RouterModule, AsyncPipe, RouterLink],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === "/pokemon" || e.urlAfterRedirects === "/pokemon") {
          this.router.navigateByUrl("/pokemon/catalog");
        } else if (e.url === "/" || e.urlAfterRedirects === "/") {
          this.router.navigateByUrl("/register");
        }
      }
    });
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        console.error("Logout failed:", err);
      },
    });
  }
}
