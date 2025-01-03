import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "lib-login",
  imports: [CommonModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent extends RegisterComponent {
  constructor() {
    super();
  }
  override handleSumbit(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (email && password)
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigateByUrl("/"),
        error: (err) => console.error(err),
      });
  }
}
