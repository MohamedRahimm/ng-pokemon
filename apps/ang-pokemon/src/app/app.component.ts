import { AuthService } from "@ang-pokemon/auth";
import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
@Component({
  imports: [RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  tmp = "";
  ngOnInit(): void {
    this.authService.user$.subscribe((val) => {
      if (val) {
        this.tmp = val.email || "";
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
