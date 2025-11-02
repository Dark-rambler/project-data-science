import { Component, input, computed } from '@angular/core';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';
import { Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-history-progress-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
                Progresión de Probabilidades de Diabetes
            </h3>
            <div class="relative h-80">
                <canvas 
                    baseChart
                    [data]="chartData()"
                    [options]="chartOptions"
                    [type]="'line'">
                </canvas>
            </div>
            <div class="mt-4 text-sm text-gray-600">
                <div class="flex justify-between">
                    <span>📈 Tendencia: {{ getTrend() }}</span>
                    <span>📊 Total registros: {{ records().length }}</span>
                </div>
            </div>
        </div>
    `
})
export class HistoryProgressChartComponent {
    public records = input.required<HealthRecord[]>();

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.parsed.y;
                        return `${context.dataset.label}: ${value.toFixed(1)}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha de Registro'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Probabilidad (%)'
                },
                beginAtZero: true,
                max: 100
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

        // Ordenar por fecha
        const sortedRecords = [...records].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const labels = sortedRecords.map((record, index) => {
            const date = new Date(record.created_at);
            return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        });

        const diabetesProbabilities = sortedRecords.map(record => record.prob_diabetes);
        const noDiabetesProbabilities = sortedRecords.map(record => record.prob_no_diabetes);

        return {
            labels,
            datasets: [
                {
                    label: 'Probabilidad Diabetes',
                    data: diabetesProbabilities,
                    borderColor: 'rgba(239, 68, 68, 1)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Probabilidad Sin Diabetes',
                    data: noDiabetesProbabilities,
                    borderColor: 'rgba(34, 197, 94, 1)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }
            ]
        };
    });

    public getTrend(): string {
        const records = this.records();
        if (records.length < 2) return 'Insuficientes datos';

        const sortedRecords = [...records].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const firstProb = sortedRecords[0].prob_diabetes;
        const lastProb = sortedRecords[sortedRecords.length - 1].prob_diabetes;

        if (lastProb > firstProb + 5) {
            return 'Aumentando ⚠️';
        } else if (lastProb < firstProb - 5) {
            return 'Mejorando ✅';
        } else {
            return 'Estable ➡️';
        }
    }
}