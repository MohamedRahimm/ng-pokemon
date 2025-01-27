import { AuthService } from "@ang-pokemon/auth";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";
@Component({
  imports: [RouterModule, AsyncPipe, RouterLink],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
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
