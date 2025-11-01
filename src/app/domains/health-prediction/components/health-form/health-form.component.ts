import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SelectFormComponent } from '../../../../shared/select-form/select-form.component';
import { SwitchFormComponent } from '../../../../shared/switch-form/switch-form.component';
import { NumberInputComponent } from '../../../../shared/number-input/number-input.component';
import { ButtonComponentComponent } from '../../../../shared/button-component/button-component.component';
import { HealthControls } from '../../enums/health-controls.enum';
import { HEALTH_FORM_CONTROLS, HEALTH_FORM_LABELS, SELECT_OPTIONS, BINARY_FIELDS } from '../../constants/health-form.constants';
import { HealthPredictionService } from '../../services/health-prediction.service';
import { catchError, tap, of } from 'rxjs';

@Component({
    selector: 'app-health-form',
    imports: [
        ReactiveFormsModule, 
        SelectFormComponent, 
        SwitchFormComponent,
        NumberInputComponent, 
        ButtonComponentComponent
    ],
    templateUrl: './health-form.component.html',
})
export class HealthFormComponent {
    protected readonly healthControls = HealthControls;
    protected readonly labels = HEALTH_FORM_LABELS;
    protected readonly selectOptions = SELECT_OPTIONS;
    protected readonly binaryFields = BINARY_FIELDS;
    
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _healthPredictionService = inject(HealthPredictionService);
    
    protected form = this._formBuilder.group(HEALTH_FORM_CONTROLS);
    protected isLoading = this._healthPredictionService.isLoading;
    protected predictionResult = this._healthPredictionService.predictionResult;
    protected hasError = this._healthPredictionService.hasError;

    // Método para verificar si un campo es binario
    protected isBinaryField(fieldName: string): boolean {
        return this.binaryFields.includes(fieldName);
    }

    protected onSubmit() {
        if (this.form.valid) {
            const formData = this.form.value as any;
            
            this._healthPredictionService.predict(formData).pipe(
                tap(result => this._healthPredictionService.setPredictionResult(result)),
                catchError(() => {
                    this._healthPredictionService.setError();
                    return of(null);
                })
            ).subscribe();
        } else {
            this.form.markAllAsTouched();
        }
    }

    protected clearResult() {
        this._healthPredictionService.clearResult();
    }
}