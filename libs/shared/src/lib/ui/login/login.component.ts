import { AfterViewInit, Component, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "@ang-pokemon/auth";
import { Router, RouterLink } from "@angular/router";
import { FirebaseError } from "@angular/fire/app";
import { finalize } from "rxjs";
import { FormComponent } from "../form/form.component";

@Component({
  selector: "lib-login",
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements AfterViewInit {
  authService = inject(AuthService);
  router = inject(Router);
  @ViewChild(FormComponent) formComponent!: FormComponent;
  ngAfterViewInit() {
    this.formComponent.addControl(
      "email",
      "email",
      new FormControl("", [Validators.required, Validators.email])
    );
    this.formComponent.addControl(
      "password",
      "password",
      new FormControl("", [Validators.required, Validators.minLength(6)])
    );
    this.formComponent.handleSubmit = () => {
      const email = this.formComponent.form.value["email"];
      const password = this.formComponent.form.value["password"];
      if (email && password) {
        this.formComponent.loading.next(true);
        this.authService
          .login(email, password)
          .pipe(finalize(() => this.formComponent.loading.next(false)))
          .subscribe({
            next: () => {
              this.router.navigateByUrl("/pokemon");
            },
            error: (err: FirebaseError) => {
              if (
                err.message === "Firebase: Error (auth/invalid-credential)."
              ) {
                this.formComponent.onErrorSignal.set(
                  "Email or password is incorrect"
                );
              }
            },
          });
      }
    };
  }
}
