import { Component } from '@angular/core';
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [DoughnutChartComponent],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent {

}
