import { Component } from '@angular/core';
import { HealthFormComponent } from './components/health-form/health-form.component';

@Component({
    selector: 'app-health-prediction',
    templateUrl: './health-prediction.component.html',
    styleUrl: './health-prediction.component.scss',
    imports: [HealthFormComponent]
})
export class HealthPredictionComponent {

}