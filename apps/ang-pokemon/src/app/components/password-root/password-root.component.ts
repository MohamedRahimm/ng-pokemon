import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-password-root",
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./password-root.component.html",
  styleUrl: "./password-root.component.css",
})
export class PasswordRootComponent {}
