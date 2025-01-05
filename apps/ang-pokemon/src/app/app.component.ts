import { AuthService } from "@ang-pokemon/auth";
import { Component, inject, OnInit, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { from, switchMap } from "rxjs";
@Component({
  imports: [RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
  logout() {
    this.router.navigate(["/"]);
    this.authService.logout();
    this.authService.userSignal.set("");
  }
}
