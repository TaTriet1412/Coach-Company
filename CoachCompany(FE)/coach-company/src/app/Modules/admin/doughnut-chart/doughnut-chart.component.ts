import { Component, OnInit } from '@angular/core';

import { Chart,registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent implements OnInit {
  public config: any = {
    type: 'doughnut',

    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }
  }

  chart: any;

  ngOnInit(): void {
      this.chart = new Chart('Doughnut_Chart',this.config)
  }
}
