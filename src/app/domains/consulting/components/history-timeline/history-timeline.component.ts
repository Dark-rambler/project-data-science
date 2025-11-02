import { Component, input, computed } from '@angular/core';
import { HealthRecord } from '../../../../shared/interfaces/health-record.interface';

@Component({
    selector: 'app-history-timeline',
    standalone: true,
    imports: [],
    template: `
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-6 text-gray-800">
                Historial de Registros Médicos
            </h3>
            
            <div class="relative">
                <!-- Timeline line -->
                <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                <!-- Timeline items -->
                @for (record of sortedRecords(); track record.id) {
                    <div class="relative flex items-start mb-8">
                        <!-- Timeline dot -->
                        <div class="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-white shadow-lg"
                             [class]="getTimelineDotClass(record)">
                            @if (record.prediction === 1) {
                                <span class="text-white font-bold">⚠️</span>
                            } @else {
                                <span class="text-white font-bold">✅</span>
                            }
                        </div>
                        
                        <!-- Content -->
                        <div class="ml-6 flex-1">
                            <div class="bg-gray-50 p-4 rounded-lg border-l-4"
                                 [class]="getContentBorderClass(record)">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="text-lg font-semibold text-gray-800">
                                        Registro #{{ record.id }}
                                    </h4>
                                    <span class="text-sm text-gray-500">
                                        {{ formatDate(record.created_at) }}
                                    </span>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div class="space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Predicción:</span>
                                            <span class="font-medium" [class]="getPredictionClass(record)">
                                                {{ record.prediction === 1 ? 'Con Diabetes' : 'Sin Diabetes' }}
                                            </span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Prob. Diabetes:</span>
                                            <span class="font-medium text-red-600">
                                                {{ record.prob_diabetes.toFixed(1) }}%
                                            </span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Prob. Sin Diabetes:</span>
                                            <span class="font-medium text-green-600">
                                                {{ record.prob_no_diabetes.toFixed(1) }}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="space-y-2">
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">BMI:</span>
                                            <span class="font-medium">{{ record.input_data.BMI }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Edad:</span>
                                            <span class="font-medium">{{ getAgeCategory(record.input_data.Age) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-sm text-gray-600">Salud General:</span>
                                            <span class="font-medium">{{ getHealthCategory(+record.input_data.GenHlth) }}/5</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Risk factors summary -->
                                <div class="text-sm">
                                    <span class="text-gray-600">Factores de riesgo activos:</span>
                                    <div class="flex flex-wrap gap-1 mt-1">
                                        @if (record.input_data.HighBP === 1) {
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Presión Alta</span>
                                        }
                                        @if (record.input_data.HighChol === 1) {
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Colesterol Alto</span>
                                        }
                                        @if (record.input_data.Smoker === 1) {
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Fumador</span>
                                        }
                                        @if (record.input_data.Stroke === 1) {
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Antec. ACV</span>
                                        }
                                        @if (record.input_data.HeartDiseaseorAttack === 1) {
                                            <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Enfermedad Cardíaca</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
                @if (sortedRecords().length === 0) {
                    <div class="text-center py-8 text-gray-500">
                        <div class="text-4xl mb-2">📊</div>
                        <p>No hay registros médicos disponibles</p>
                        <p class="text-sm">Completa tu primer formulario de salud para ver el historial</p>
                    </div>
                }
            </div>
        </div>
    `
})
export class HistoryTimelineComponent {
    public records = input.required<HealthRecord[]>();

    public sortedRecords = computed(() => {
        return [...this.records()].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    });

    public getTimelineDotClass(record: HealthRecord): string {
        return record.prediction === 1 
            ? 'bg-red-500 border-red-200' 
            : 'bg-green-500 border-green-200';
    }

    public getContentBorderClass(record: HealthRecord): string {
        return record.prediction === 1 
            ? 'border-red-400' 
            : 'border-green-400';
    }

    public getPredictionClass(record: HealthRecord): string {
        return record.prediction === 1 
            ? 'text-red-600' 
            : 'text-green-600';
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    public getAgeCategory(ageCode: number): string {
        const ageRanges = {
            1: '18-24 años',
            2: '25-29 años',
            3: '30-34 años',
            4: '35-39 años',
            5: '40-44 años',
            6: '45-49 años',
            7: '50-54 años',
            8: '55-59 años',
            9: '60-64 años',
            10: '65-69 años',
            11: '70-74 años',
            12: '75-79 años',
            13: '80+ años'
        };
        return ageRanges[ageCode as keyof typeof ageRanges] || `Código ${ageCode}`;
    }

    public getHealthCategory(healthCode: number): string {
        const healthLevels = {
            1: 'Excelente',
            2: 'Muy buena',
            3: 'Buena',
            4: 'Regular',
            5: 'Mala'
        };
        return healthLevels[healthCode as keyof typeof healthLevels] || `${healthCode}`;
    }
}