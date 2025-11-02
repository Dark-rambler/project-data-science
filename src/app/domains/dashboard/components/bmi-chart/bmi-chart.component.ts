import { Component, input, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';

@Component({
    selector: 'app-bmi-chart',
    template: `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Distribución de IMC</h3>
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
export class BmiChartComponent {
    public healthRecords = input<HealthRecord[]>([]);
    
    public chartType: ChartType = 'pie';
    
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15
                }
            }
        }
    };

    public chartData = computed((): ChartData<'pie'> => {
        const records = this.healthRecords() || [];
        
        if (records.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }
        
        const bmiCategories = {
            underweight: records.filter(r => r.input_data.BMI < 18.5).length,
            normal: records.filter(r => r.input_data.BMI >= 18.5 && r.input_data.BMI < 25).length,
            overweight: records.filter(r => r.input_data.BMI >= 25 && r.input_data.BMI < 30).length,
            obese: records.filter(r => r.input_data.BMI >= 30).length
        };

        return {
            labels: [
                'Bajo Peso (<18.5)',
                'Normal (18.5-24.9)',
                'Sobrepeso (25-29.9)',
                'Obesidad (≥30)'
            ],
            datasets: [{
                data: [
                    bmiCategories.underweight,
                    bmiCategories.normal,
                    bmiCategories.overweight,
                    bmiCategories.obese
                ],
                backgroundColor: [
                    '#60A5FA', // Azul claro
                    '#34D399', // Verde
                    '#FBBF24', // Amarillo
                    '#F87171'  // Rojo claro
                ],
                borderColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444'
                ],
                borderWidth: 2
            }]
        };
    });
}