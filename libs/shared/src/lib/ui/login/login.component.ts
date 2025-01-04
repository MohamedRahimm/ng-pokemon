import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegisterComponent } from "../register/register.component";
import { AuthService } from "@ang-pokemon/auth";
import { Router } from "@angular/router";
import { FirebaseError } from "@angular/fire/app";

@Component({
  selector: "lib-login",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements RegisterComponent {
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
  validEmail = true;
  isInvalid(field: "email" | "password") {
    const getter = this.form.get(field);
    return getter?.invalid && (getter.dirty || getter.touched);
  }
  handleSumbit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (email && password)
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigateByUrl("/"),
        error: (err: FirebaseError) =>
          console.error(err.message, err.customData),
      });
  }
}
