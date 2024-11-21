import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgwWowService } from "ngx-wow"
import { SearchScheduleComponent } from "../search-schedule/search-schedule.component";
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [ SearchScheduleComponent,ContactComponent]
})
export class HomeUserComponent implements  OnInit {
  @ViewChild('spinner') spinnerElement!: ElementRef;


  constructor(private wowService: NgwWowService,private router:Router){}

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

  goToSchedule() {
    this.router.navigate(["/schedule"])
  }
  
}
