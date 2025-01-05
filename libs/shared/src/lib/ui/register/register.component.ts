import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "@ang-pokemon/auth";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { FirebaseError } from "@angular/fire/app";
import { BehaviorSubject, finalize } from "rxjs";

@Component({
  selector: "lib-register",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  userEmail = "";
  error = signal<null | string>(null);
  loading = new BehaviorSubject<boolean>(false);
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isInvalid(field: "email" | "password") {
    const getter = this.form.get(field);
    return getter?.invalid && (getter.dirty || getter.touched);
  }
  handleSumbit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (email && password) {
      this.loading.next(true);
      this.authService
        .register(email, password)
        .pipe(finalize(() => this.loading.next(false)))
        .subscribe({
          next: () => {
            this.router.navigateByUrl("/pokemon");
          },
          error: (err: FirebaseError) => {
            if (
              err.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              this.error.set("Email already registered");
            }
          },
        });
    }
  }
}
