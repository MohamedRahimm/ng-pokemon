import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@ang-pokemon/auth";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
@Component({
  selector: "lib-reset-pw",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./reset-pw.component.html",
  styleUrl: "./reset-pw.component.css",
})
export class ResetPwComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  mode = "";
  actionCode = "";
  error = signal<string>("");
  form = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
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
  handleSubmit() {
    if (this.form.value.password) {
      this.authService
        .idk(this.actionCode, this.form.value.password)
        .subscribe({
          next: () => this.router.navigateByUrl("/pokemon"),
          error: () => this.error.set("An error occurred please try again"),
        });
    }
  }
}
