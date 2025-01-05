import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegisterComponent } from "../register/register.component";
import { AuthService } from "@ang-pokemon/auth";
import { Router, RouterLink } from "@angular/router";
import { FirebaseError } from "@angular/fire/app";
import { BehaviorSubject, finalize } from "rxjs";

@Component({
  selector: "lib-login",
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  userEmail = "";
  error = signal<null | string>(null);
  loading = new BehaviorSubject(false);
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
        .login(email, password)
        .pipe(finalize(() => this.loading.next(false)))
        .subscribe({
          next: () => {
            this.router.navigateByUrl("/pokemon");
          },
          error: (err: FirebaseError) => {
            if (err.message === "Firebase: Error (auth/invalid-credential).") {
              this.error.set("Email or password is incorrect");
            }
          },
        });
    }
  }
}
