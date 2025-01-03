import { AuthService } from "@ang-pokemon/auth";
import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
  imports: [RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  authService = inject(AuthService);
  logout() {
    this.authService.logout();
  }
}
