import { Component, input, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';

@Component({
    selector: 'app-healthy-habits-chart',
    template: `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Hábitos Saludables</h3>
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
export class HealthyHabitsChartComponent {
    public healthRecords = input<HealthRecord[]>([]);
    
    public chartType: ChartType = 'bar';
    
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    public chartData = computed((): ChartData<'bar'> => {
        const records = this.healthRecords() || [];
        
        if (records.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }
        
        const habitCounts = {
            physActivity: records.filter(r => r.PhysActivity === 1).length,
            fruits: records.filter(r => r.Fruits === 1).length,
            veggies: records.filter(r => r.Veggies === 1).length,
            cholCheck: records.filter(r => r.CholCheck === 1).length,
            healthcare: records.filter(r => r.AnyHealthcare === 1).length
        };

        return {
            labels: [
                'Actividad Física',
                'Consume Frutas',
                'Consume Vegetales',
                'Chequeo Colesterol',
                'Atención Médica'
            ],
            datasets: [{
                data: [
                    habitCounts.physActivity,
                    habitCounts.fruits,
                    habitCounts.veggies,
                    habitCounts.cholCheck,
                    habitCounts.healthcare
                ],
                backgroundColor: [
                    '#10B981', // Verde
                    '#06B6D4', // Cian
                    '#8B5CF6', // Violeta
                    '#F59E0B', // Ámbar
                    '#3B82F6'  // Azul
                ],
                borderColor: [
                    '#059669',
                    '#0891B2',
                    '#7C3AED',
                    '#D97706',
                    '#2563EB'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        };
    });
}