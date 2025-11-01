import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class InputFormComponent {
    public userName = input.required<string>();
    public type = input<"text" | "password">("text");
    public id = input.required<string>();
    public parentForm = input<FormGroup>();
    public controlName = input.required<string>();

    public control = computed(() => {
        const form = this.parentForm();
        const controlName = this.controlName()!;
        return form?.get(controlName) as FormControl;
    });

}
