import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HealthRecord, HealthStats } from '../../../shared/interfaces/health-record.interface';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly _http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    public healthRecords = signal<HealthRecord[]>([]);
    public isLoading = signal<boolean>(false);

    public getHealthRecords(): Observable<HealthRecord[]> {
        this.isLoading.set(true);
        return this._http.get<HealthRecord[]>(`${this.apiUrl}/health/list/`).pipe(
            map(records => {
                this.healthRecords.set(records);
                this.isLoading.set(false);
                return records;
            })
        );
    }

    public calculateStats(records: HealthRecord[]): HealthStats {
        if (records.length === 0) {
            return {
                totalRecords: 0,
                averageBMI: 0,
                riskFactorsCount: 0,
                healthyHabitsCount: 0,
                mentalHealthAverage: 0,
                physicalHealthAverage: 0,
                diabetesRiskAverage: 0,
                highRiskCount: 0
            };
        }

        const totalRecords = records.length;
        const averageBMI = records.reduce((sum, record) => sum + record.input_data.BMI, 0) / totalRecords;

        // Contar factores de riesgo promedio por registro
        const riskFactorsCount = records.reduce((sum, record) => {
            const data = record.input_data;
            const risks = Number(data.HighBP) + Number(data.HighChol) + Number(data.Smoker) +
                         Number(data.Stroke) + Number(data.HeartDiseaseorAttack) +
                         Number(data.HvyAlcoholConsump) + Number(data.DiffWalk);
            return sum + risks;
        }, 0) / totalRecords;

        // Contar hábitos saludables promedio por registro
        const healthyHabitsCount = records.reduce((sum, record) => {
            const data = record.input_data;
            const healthyHabits = Number(data.PhysActivity) + Number(data.Fruits) +
                                 Number(data.Veggies) + Number(data.CholCheck);
            return sum + healthyHabits;
        }, 0) / totalRecords;

        const mentalHealthAverage = records.reduce((sum, record) => sum + record.input_data.MentHlth, 0) / totalRecords;
        const physicalHealthAverage = records.reduce((sum, record) => sum + record.input_data.PhysHlth, 0) / totalRecords;

        // Calcular promedio de riesgo de diabetes
        const diabetesRiskAverage = records.reduce((sum, record) => sum + record.prob_diabetes, 0) / totalRecords;

        // Contar registros de alto riesgo (>50% probabilidad de diabetes)
        const highRiskCount = records.filter(record => record.prob_diabetes > 50).length;

        return {
            totalRecords,
            averageBMI: Math.round(averageBMI * 10) / 10,
            riskFactorsCount: Math.round(riskFactorsCount * 10) / 10,
            healthyHabitsCount: Math.round(healthyHabitsCount * 10) / 10,
            mentalHealthAverage: Math.round(mentalHealthAverage * 10) / 10,
            physicalHealthAverage: Math.round(physicalHealthAverage * 10) / 10,
            diabetesRiskAverage: Math.round(diabetesRiskAverage * 10) / 10,
            highRiskCount
        };
    }

    // Datos mock para desarrollo
    public getMockData(): HealthRecord[] {
        return [
            {
                "id": 8,
                "input_data": {
                    "HighBP": 1,
                    "HighChol": 1,
                    "CholCheck": 1,
                    "BMI": 25.5,
                    "Smoker": 1,
                    "Stroke": 1,
                    "HeartDiseaseorAttack": 1,
                    "PhysActivity": 1,
                    "Fruits": 0,
                    "Veggies": 0,
                    "HvyAlcoholConsump": 0,
                    "AnyHealthcare": 1,
                    "NoDocbcCost": 0,
                    "GenHlth": 3,
                    "MentHlth": 5,
                    "PhysHlth": 2,
                    "DiffWalk": 0,
                    "Sex": 1,
                    "Age": 80,
                    "Education": 4,
                    "Income": 5
                },
                "prediction": 1,
                "prob_no_diabetes": 37.97,
                "prob_diabetes": 62.03,
                "created_at": "2025-11-02T18:01:35.408327Z"
            },
            {
                "id": 7,
                "input_data": {
                    "HighBP": 1,
                    "HighChol": 1,
                    "CholCheck": 1,
                    "BMI": 29,
                    "Smoker": 1,
                    "Stroke": 1,
                    "HeartDiseaseorAttack": 1,
                    "PhysActivity": 0,
                    "Fruits": 0,
                    "Veggies": 0,
                    "HvyAlcoholConsump": 1,
                    "AnyHealthcare": 1,
                    "NoDocbcCost": 0,
                    "GenHlth": 5,
                    "MentHlth": 23,
                    "PhysHlth": 23,
                    "DiffWalk": 1,
                    "Sex": 0,
                    "Age": 7,
                    "Education": 4,
                    "Income": 5
                },
                "prediction": 1,
                "prob_no_diabetes": 16.68,
                "prob_diabetes": 83.32,
                "created_at": "2025-11-02T17:59:24.158541Z"
            },
            {
                "id": 6,
                "input_data": {
                    "HighBP": 1,
                    "HighChol": 1,
                    "CholCheck": 1,
                    "BMI": 29,
                    "Smoker": 1,
                    "Stroke": 1,
                    "HeartDiseaseorAttack": 1,
                    "PhysActivity": 0,
                    "Fruits": 0,
                    "Veggies": 0,
                    "HvyAlcoholConsump": 1,
                    "AnyHealthcare": 1,
                    "NoDocbcCost": 0,
                    "GenHlth": 5,
                    "MentHlth": 23,
                    "PhysHlth": 23,
                    "DiffWalk": 1,
                    "Sex": 0,
                    "Age": 7,
                    "Education": 4,
                    "Income": 5
                },
                "prediction": 1,
                "prob_no_diabetes": 16.68,
                "prob_diabetes": 83.32,
                "created_at": "2025-11-02T17:59:18.750788Z"
            },
            {
                "id": 5,
                "input_data": {
                    "HighBP": 0,
                    "HighChol": 0,
                    "CholCheck": 0,
                    "BMI": 25,
                    "Smoker": 0,
                    "Stroke": 0,
                    "HeartDiseaseorAttack": 0,
                    "PhysActivity": 0,
                    "Fruits": 0,
                    "Veggies": 0,
                    "HvyAlcoholConsump": 0,
                    "AnyHealthcare": 1,
                    "NoDocbcCost": 0,
                    "GenHlth": 3,
                    "MentHlth": 0,
                    "PhysHlth": 0,
                    "DiffWalk": 0,
                    "Sex": 1,
                    "Age": 7,
                    "Education": 4,
                    "Income": 5
                },
                "prediction": 0,
                "prob_no_diabetes": 86.05,
                "prob_diabetes": 13.95,
                "created_at": "2025-11-02T17:57:54.010067Z"
            },
            {
                "id": 4,
                "input_data": {
                    "HighBP": 0,
                    "HighChol": 0,
                    "CholCheck": 0,
                    "BMI": 25,
                    "Smoker": 0,
                    "Stroke": 0,
                    "HeartDiseaseorAttack": 0,
                    "PhysActivity": 0,
                    "Fruits": 0,
                    "Veggies": 0,
                    "HvyAlcoholConsump": 0,
                    "AnyHealthcare": 1,
                    "NoDocbcCost": 0,
                    "GenHlth": 3,
                    "MentHlth": 0,
                    "PhysHlth": 0,
                    "DiffWalk": 0,
                    "Sex": 1,
                    "Age": 7,
                    "Education": 4,
                    "Income": 5
                },
                "prediction": 0,
                "prob_no_diabetes": 86.05,
                "prob_diabetes": 13.95,
                "created_at": "2025-11-02T17:57:45.970349Z"
            }
        ];
    }
}
