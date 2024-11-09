import { Component } from '@angular/core';
import { StatisticComponent } from "../statistic/statistic.component";

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [StatisticComponent],
})
export class HomeAdminComponent {

}
