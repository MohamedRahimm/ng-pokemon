import { Component, inject } from "@angular/core";
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
    if (email && password)
      this.authService.register(email, password).subscribe({
        next: () => {
          this.router.navigate(["/"]);
          this.authService.userSignal.set(email);
        },
        error: (err: FirebaseError) =>
          console.error(err.message, err.customData),
      });
  }
}
