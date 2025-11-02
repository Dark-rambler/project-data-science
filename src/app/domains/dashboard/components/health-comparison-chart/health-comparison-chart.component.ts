import { Component, input, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';

@Component({
    selector: 'app-health-comparison-chart',
    template: `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Salud Mental vs Física</h3>
            <p class="text-sm text-gray-600 mb-4">Días de mala salud en los últimos 30 días</p>
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
export class HealthComparisonChartComponent {
    public healthRecords = input<HealthRecord[]>([]);

    public chartType: ChartType = 'line';

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 30,
                title: {
                    display: true,
                    text: 'Días de mala salud'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Registros'
                }
            }
        }
    };

    public chartData = computed((): ChartData<'line'> => {
        const records = this.healthRecords() || [];

        if (records.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        const labels = records.map((_, index) => `Registro ${index + 1}`);
        const mentalHealthData = records.map(r => r.input_data.MentHlth);
        const physicalHealthData = records.map(r => r.input_data.PhysHlth);

        return {
            labels,
            datasets: [
                {
                    label: 'Salud Mental',
                    data: mentalHealthData,
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#8B5CF6',
                    pointBorderColor: '#7C3AED',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Salud Física',
                    data: physicalHealthData,
                    borderColor: '#06B6D4',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#06B6D4',
                    pointBorderColor: '#0891B2',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }
            ]
        };
    });
}
