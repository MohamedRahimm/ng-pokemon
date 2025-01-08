import { AuthService } from "@ang-pokemon/auth";
import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, inject, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { FormComponent } from "../form/form.component";

@Component({
  selector: "lib-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: "./password.component.html",
  styleUrl: "./password.component.css",
})
export class PasswordComponent implements AfterViewInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  @ViewChild(FormComponent) formComponent!: FormComponent;

  ngAfterViewInit() {
    this.formComponent.addControl(
      "email",
      "email",
      new FormControl("", [Validators.required, Validators.email])
    );

    this.formComponent.handleSubmit = () => {
      const email = this.formComponent.form.value["email"];
      if (email) {
        this.formComponent.loading.next(true);
        this.formComponent.onCompleteSignal.set("");
        this.authService
          .changePasswordInit(email)
          .pipe(finalize(() => this.formComponent.loading.next(false)))
          .subscribe({
            next: () => {
              this.formComponent.onCompleteSignal.set("Check Your Email!");
            },
            error: () =>
              this.formComponent.onErrorSignal.set(
                "An Error Occurred. Please Refresh"
              ),
          });
      }
    };
  }
}
