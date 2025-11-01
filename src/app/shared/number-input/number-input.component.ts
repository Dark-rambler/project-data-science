import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class NumberInputComponent {
    public label = input.required<string>();
    public id = input.required<string>();
    public parentForm = input<FormGroup>();
    public controlName = input.required<string>();
    public min = input<number>(0);
    public max = input<number>(100);
    public step = input<number>(1);

    public control = computed(() => {
        const form = this.parentForm();
        const controlName = this.controlName();
        if (!form || !controlName) {
            return new FormControl(0);
        }
        return form.get(controlName) as FormControl;
    });
}