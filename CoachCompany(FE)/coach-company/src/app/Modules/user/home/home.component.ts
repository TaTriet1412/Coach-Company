import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CarourselHomeUserComponent } from './caroursel-home-user/caroursel-home-user.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { NgwWowService } from "ngx-wow"
import { SearchScheduleComponent } from "../search-schedule/search-schedule.component";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CarourselHomeUserComponent, ScheduleComponent, SearchScheduleComponent,ContactComponent]
})
export class HomeUserComponent implements  OnInit {
  @ViewChild('spinner') spinnerElement!: ElementRef;


  constructor(private wowService: NgwWowService){}

  ngOnInit(): void {
    // Time for spinner appear
    
    setTimeout(() => {
      if (this.spinnerElement.nativeElement.textContent.length) {
        this.spinnerElement.nativeElement.classList.remove('show');
      }
    }, 10);
    
    this.wowService.init();
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }
  
}
