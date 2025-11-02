import { Component, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { HealthRecord } from '../../shared/interfaces/health-record.interface';
import { HistoryProgressChartComponent } from './components/history-progress-chart/history-progress-chart.component';

@Component({
  selector: 'app-consulting',
  imports: [
    RouterLink,
    HistoryProgressChartComponent
  ],
  templateUrl: './consulting.component.html',
  styleUrl: './consulting.component.scss'
})
export class ConsultingComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  
  public healthRecords = computed(() => {
    return this.dashboardService.healthRecords().sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  });

  public isLoading = computed(() => this.dashboardService.isLoading());

  ngOnInit() {
    // Por ahora usamos datos mock, después se puede cambiar por la llamada al API
    const mockData = this.dashboardService.getMockData();
    this.dashboardService.healthRecords.set(mockData);
  }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
