import { Component, input, computed } from '@angular/core';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';
import { Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-prediction-probability-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">
                Probabilidades de Predicción
            </h3>
            <div class="relative h-64">
                <canvas
                    baseChart
                    [data]="chartData()"
                    [options]="chartOptions"
                    [type]="'doughnut'">
                </canvas>
            </div>
        </div>
    `
})
export class PredictionProbabilityChartComponent {
    public records = input.required<HealthRecord[]>();

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.parsed;
                        return `${context.label}: ${value.toFixed(1)}%`;
                    }
                }
            }
        }
    };

    public chartData = computed(() => {
        const records = this.records();

        if (!records || records.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        // Calcular promedio de probabilidades
        const avgProbNoDiabetes = records.reduce((sum, r) => sum + r.prob_no_diabetes, 0) / records.length;
        const avgProbDiabetes = records.reduce((sum, r) => sum + r.prob_diabetes, 0) / records.length;

        return {
            labels: ['Sin Diabetes', 'Con Diabetes'],
            datasets: [{
                data: [avgProbNoDiabetes, avgProbDiabetes],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',   // Verde para sin diabetes
                    'rgba(239, 68, 68, 0.8)'    // Rojo para con diabetes
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 2
            }]
        };
    });
}
