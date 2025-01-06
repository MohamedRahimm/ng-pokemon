import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "@ang-pokemon/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, finalize } from "rxjs";

@Component({
  selector: "lib-password",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./password.component.html",
  styleUrl: "./password.component.css",
})
export class PasswordComponent {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  emailSent = signal<boolean>(false);
  loading = new BehaviorSubject<boolean>(false);
  form = new FormGroup({
    email: new FormControl("", Validators.email),
  });

  handleSumbit() {
    if (this.form.value.email) {
      this.loading.next(true);
      this.authService
        .changePassword(this.form.value.email)
        .pipe(finalize(() => this.loading.next(false)))
        .subscribe({
          next: () => {
            this.emailSent.set(true);
          },
          error: () => console.error("An error occured try again"),
        });
    }
  }
}
