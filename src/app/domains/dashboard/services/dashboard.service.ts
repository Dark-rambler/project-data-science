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
        return this._http.get<HealthRecord[]>(`${this.apiUrl}/health-records/`).pipe(
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
                physicalHealthAverage: 0
            };
        }

        const totalRecords = records.length;
        const averageBMI = records.reduce((sum, record) => sum + record.BMI, 0) / totalRecords;
        
        // Contar factores de riesgo promedio por registro
        const riskFactorsCount = records.reduce((sum, record) => {
            const risks = record.HighBP + record.HighChol + record.Smoker + 
                         record.Stroke + record.HeartDiseaseorAttack + 
                         record.HvyAlcoholConsump + record.DiffWalk;
            return sum + risks;
        }, 0) / totalRecords;

        // Contar hábitos saludables promedio por registro
        const healthyHabitsCount = records.reduce((sum, record) => {
            const healthyHabits = record.PhysActivity + record.Fruits + 
                                 record.Veggies + record.CholCheck;
            return sum + healthyHabits;
        }, 0) / totalRecords;

        const mentalHealthAverage = records.reduce((sum, record) => sum + record.MentHlth, 0) / totalRecords;
        const physicalHealthAverage = records.reduce((sum, record) => sum + record.PhysHlth, 0) / totalRecords;

        return {
            totalRecords,
            averageBMI: Math.round(averageBMI * 10) / 10,
            riskFactorsCount: Math.round(riskFactorsCount * 10) / 10,
            healthyHabitsCount: Math.round(healthyHabitsCount * 10) / 10,
            mentalHealthAverage: Math.round(mentalHealthAverage * 10) / 10,
            physicalHealthAverage: Math.round(physicalHealthAverage * 10) / 10
        };
    }

    // Datos mock para desarrollo
    public getMockData(): HealthRecord[] {
        return [
            {
                "id": 2,
                "HighBP": 3,
                "HighChol": 0,
                "CholCheck": 1,
                "BMI": 23.5,
                "Smoker": 0,
                "Stroke": 0,
                "HeartDiseaseorAttack": 0,
                "PhysActivity": 1,
                "Fruits": 1,
                "Veggies": 1,
                "HvyAlcoholConsump": 0,
                "AnyHealthcare": 1,
                "NoDocbcCost": 0,
                "GenHlth": 3,
                "MentHlth": 5,
                "PhysHlth": 2,
                "DiffWalk": 0,
                "Sex": 1,
                "Age": 8,
                "Education": 4,
                "Income": 5,
                "created_at": "2025-11-01T13:16:47.569097Z",
                "user": 4
            },
            {
                "id": 1,
                "HighBP": 1,
                "HighChol": 0,
                "CholCheck": 1,
                "BMI": 23.5,
                "Smoker": 0,
                "Stroke": 0,
                "HeartDiseaseorAttack": 0,
                "PhysActivity": 1,
                "Fruits": 1,
                "Veggies": 1,
                "HvyAlcoholConsump": 0,
                "AnyHealthcare": 1,
                "NoDocbcCost": 0,
                "GenHlth": 3,
                "MentHlth": 5,
                "PhysHlth": 2,
                "DiffWalk": 0,
                "Sex": 1,
                "Age": 8,
                "Education": 4,
                "Income": 5,
                "created_at": "2025-11-01T13:14:44.586575Z",
                "user": 4
            }
        ];
    }
}