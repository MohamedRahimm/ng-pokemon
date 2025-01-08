import { AfterViewInit, Component, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "@ang-pokemon/auth";
import { FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { FirebaseError } from "@angular/fire/app";
import { finalize } from "rxjs";
import { FormComponent } from "../form/form.component";

@Component({
  selector: "lib-register",
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements AfterViewInit {
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
          .register(email, password)
          .pipe(finalize(() => this.formComponent.loading.next(false)))
          .subscribe({
            next: () => {
              this.router.navigateByUrl("/pokemon");
            },
            error: (err: FirebaseError) => {
              if (
                err.message === "Firebase: Error (auth/email-already-in-use)."
              ) {
                this.formComponent.onErrorSignal.set(
                  "Email already registered"
                );
              }
            },
          });
      }
    };
  }
}
