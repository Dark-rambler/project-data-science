import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-switch-form',
    templateUrl: './switch-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class SwitchFormComponent {
    public label = input.required<string>();
    public id = input.required<string>();
    public parentForm = input<FormGroup>();
    public controlName = input.required<string>();
    public yesLabel = input<string>('Sí');
    public noLabel = input<string>('No');

    public control = computed(() => {
        const form = this.parentForm();
        const controlName = this.controlName();
        if (!form || !controlName) {
            return new FormControl(0);
        }
        return form.get(controlName) as FormControl;
    });

    public toggle() {
        const currentValue = this.control().value;
        this.control().setValue(currentValue === 1 ? 0 : 1);
    }
}
