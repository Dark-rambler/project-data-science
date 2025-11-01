import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
    value: number;
    label: string;
}

@Component({
    selector: 'app-select-form',
    templateUrl: './select-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class SelectFormComponent {
    public label = input.required<string>();
    public id = input.required<string>();
    public parentForm = input<FormGroup>();
    public controlName = input.required<string>();
    public options = input.required<SelectOption[]>();

    public control = computed(() => {
        const form = this.parentForm();
        const controlName = this.controlName();
        if (!form || !controlName) {
            return new FormControl(0);
        }
        return form.get(controlName) as FormControl;
    });
}