import { Component, input, computed } from '@angular/core';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';
import { Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-prediction-results-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4 text-gray-800">
                Resultados de Predicciones
            </h3>
            <div class="relative h-64">
                <canvas
                    baseChart
                    [data]="chartData()"
                    [options]="chartOptions"
                    [type]="'bar'">
                </canvas>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                <p>Total de predicciones: {{ totalPredictions() }}</p>
                <p>Precisión promedio: {{ averageAccuracy() }}%</p>
            </div>
        </div>
    `
})
export class PredictionResultsChartComponent {
    public records = input.required<HealthRecord[]>();

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.parsed.y;
                        return `Cantidad: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Resultado de Predicción'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad'
                },
                beginAtZero: true
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

        const positiveCount = records.filter(r => r.prediction === 1).length;
        const negativeCount = records.filter(r => r.prediction === 0).length;

        return {
            labels: ['Sin Diabetes (0)', 'Con Diabetes (1)'],
            datasets: [{
                data: [negativeCount, positiveCount],
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

    public totalPredictions = computed(() => {
        return this.records().length;
    });

    public averageAccuracy = computed(() => {
        const records = this.records();
        if (records.length === 0) return 0;

        // Calcular precisión basada en la probabilidad más alta
        const accuracy = records.reduce((sum, record) => {
            const maxProb = Math.max(record.prob_diabetes, record.prob_no_diabetes);
            return sum + maxProb;
        }, 0) / records.length;

        return Math.round(accuracy * 100) / 100;
    });
}
