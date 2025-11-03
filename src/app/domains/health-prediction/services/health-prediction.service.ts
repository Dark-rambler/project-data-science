import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface HealthPredictionRequest {
    HighBP: number;
    HighChol: number;
    CholCheck: number;
    BMI: number;
    Smoker: number;
    Stroke: number;
    HeartDiseaseorAttack: number;
    PhysActivity: number;
    Fruits: number;
    Veggies: number;
    HvyAlcoholConsump: number;
    AnyHealthcare: number;
    NoDocbcCost: number;
    GenHlth: number;
    MentHlth: number;
    PhysHlth: number;
    DiffWalk: number;
    Sex: number;
    Age: number;
    Education: number;
    Income: number;
}

export interface HealthPredictionResponse {
    prediction: number;
    probability: number;
    risk_level: string;
    recommendations: string[];
    prob_diabetes:number
}

@Injectable({
    providedIn: 'root'
})
export class HealthPredictionService {
    private readonly _http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public isLoading = signal<boolean>(false);
    public predictionResult = signal<HealthPredictionResponse | null>(null);
    public hasError = signal<boolean>(false);

    public predict(data: HealthPredictionRequest): Observable<HealthPredictionResponse> {
        this.isLoading.set(true);
        this.hasError.set(false);

        return this._http.post<HealthPredictionResponse>(`${this.apiUrl}/predict-diabetes/`, data);
    }

    public setPredictionResult(result: HealthPredictionResponse) {
        console.log(result);

        this.predictionResult.set(result);
        this.isLoading.set(false);
    }

    public setError() {
        this.hasError.set(true);
        this.isLoading.set(false);
    }

    public clearResult() {
        this.predictionResult.set(null);
        this.hasError.set(false);
    }
}
