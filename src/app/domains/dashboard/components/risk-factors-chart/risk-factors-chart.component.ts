import { Component, input, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';

@Component({
    selector: 'app-risk-factors-chart',
    template: `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Factores de Riesgo</h3>
            <div class="h-80">
                @if (healthRecords() && healthRecords().length > 0) {
                    <canvas baseChart
                        [data]="chartData()"
                        [options]="chartOptions"
                        [type]="chartType">
                    </canvas>
                } @else {
                    <div class="flex items-center justify-center h-full text-gray-500">
                        <p>No hay datos disponibles</p>
                    </div>
                }
            </div>
        </div>
    `,
    imports: [BaseChartDirective]
})
export class RiskFactorsChartComponent {
    public healthRecords = input<HealthRecord[]>([]);
    
    public chartType: ChartType = 'doughnut';
    
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    };

    public chartData = computed((): ChartData<'doughnut'> => {
        const records = this.healthRecords() || [];
        
        if (records.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        const riskCounts = {
            highBP: records.filter(r => r.HighBP === 1).length,
            highChol: records.filter(r => r.HighChol === 1).length,
            smoker: records.filter(r => r.Smoker === 1).length,
            stroke: records.filter(r => r.Stroke === 1).length,
            heartDisease: records.filter(r => r.HeartDiseaseorAttack === 1).length,
            alcohol: records.filter(r => r.HvyAlcoholConsump === 1).length,
            diffWalk: records.filter(r => r.DiffWalk === 1).length
        };

        return {
            labels: [
                'Presión Alta',
                'Colesterol Alto', 
                'Fumador',
                'Derrame',
                'Enfermedad Cardíaca',
                'Alcohol Excesivo',
                'Dificultad Caminar'
            ],
            datasets: [{
                data: [
                    riskCounts.highBP,
                    riskCounts.highChol,
                    riskCounts.smoker,
                    riskCounts.stroke,
                    riskCounts.heartDisease,
                    riskCounts.alcohol,
                    riskCounts.diffWalk
                ],
                backgroundColor: [
                    '#EF4444', // Rojo
                    '#F97316', // Naranja
                    '#EAB308', // Amarillo
                    '#DC2626', // Rojo oscuro
                    '#B91C1C', // Rojo muy oscuro
                    '#F59E0B', // Ámbar
                    '#EC4899'  // Rosa
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        };
    });
}