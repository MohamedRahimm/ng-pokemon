import { AuthService } from "@ang-pokemon/auth";
import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormComponent } from "../form/form.component";
@Component({
  selector: "lib-reset-pw",
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: "./reset-pw.component.html",
  styleUrl: "./reset-pw.component.css",
})
export class ResetPwComponent implements AfterViewInit, OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  mode = "";
  actionCode = "";
  @ViewChild(FormComponent) formComponent!: FormComponent;
  ngAfterViewInit() {
    this.formComponent.addControl(
      "password",
      "password",
      new FormControl("", [Validators.required, Validators.minLength(6)])
    );
    this.formComponent.handleSubmit = () => {
      if (this.formComponent.form.value["password"]) {
        this.authService
          .changePasswordConfirm(
            this.actionCode,
            this.formComponent.form.value["password"]
          )
          .subscribe({
            next: () => this.router.navigateByUrl("/pokemon"),
            error: () =>
              this.formComponent.onErrorSignal.set(
                "An error occurred please try again"
              ),
          });
      }
    };
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!params) this.router.navigateByUrl("/");
      this.mode = params["mode"];
      this.actionCode = params["oobCode"];
      if (this.mode !== "resetPassword") {
        console.error(`Unknown mode ${this.mode}`);
        this.router.navigateByUrl("/");
      }
    });
  }
}
