import { Component, inject, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { RiskFactorsChartComponent } from './components/risk-factors-chart/risk-factors-chart.component';
import { HealthyHabitsChartComponent } from './components/healthy-habits-chart/healthy-habits-chart.component';
import { BmiChartComponent } from './components/bmi-chart/bmi-chart.component';
import { HealthComparisonChartComponent } from './components/health-comparison-chart/health-comparison-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    StatsCardsComponent,
    RiskFactorsChartComponent,
    HealthyHabitsChartComponent,
    BmiChartComponent,
    HealthComparisonChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private _dashboardService = inject(DashboardService);

  public healthRecords = this._dashboardService.healthRecords;
  public isLoading = this._dashboardService.isLoading;

  public healthStats = computed(() => {
    return this._dashboardService.calculateStats(this.healthRecords());
  });

  ngOnInit() {
    // Por ahora usamos datos mock, después se puede cambiar por la llamada al API
    const mockData = this._dashboardService.getMockData();
    this._dashboardService.healthRecords.set(mockData);
  }
}
