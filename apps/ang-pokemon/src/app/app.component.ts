import { AuthService } from "@ang-pokemon/auth";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
  imports: [RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
    });
  }
  logout() {
    this.authService.logout();
  }
}
