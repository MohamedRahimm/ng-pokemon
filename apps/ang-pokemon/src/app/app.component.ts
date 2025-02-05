import { AuthService } from "@ang-pokemon/auth";
import { AsyncPipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { BehaviorSubject, finalize } from "rxjs";
@Component({
  imports: [RouterModule, AsyncPipe, RouterLink],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
  onErrorSignal = signal(false);
  loading = new BehaviorSubject<boolean>(false);
  logout() {
    this.loading.next(true);
    this.authService
      .logout()
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/");
        },
        error: (err) => {
          this.onErrorSignal.set(true);
          console.error("Logout failed:", err);
        },
      });
  }
}
