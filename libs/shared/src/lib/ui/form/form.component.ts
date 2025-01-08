import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "lib-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.css",
})
export class FormComponent {
  form = new FormGroup<{ [key: string]: FormControl<string | null> }>({});
  loading = new BehaviorSubject<boolean>(false);
  onCompleteSignal = signal<string>("");
  onErrorSignal = signal<string>("");
  HTMLparams: { controlName: string; type: string }[] = [];
  handleSubmit = () => undefined;
  isInvalid(field: string) {
    const getter = this.form.get(field);
    return getter?.invalid && (getter.dirty || getter.touched);
  }
  addControl(name: string, type: string, control: FormControl<string | null>) {
    this.form.addControl(name, control);
    this.HTMLparams.push({ controlName: name, type });
  }
}
