import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeStaffComponent {
  constructor(
    private router:Router,
  ){}
  
  goToRoute() {
    this.router.navigate(['staff/route'])
  }

  goToTrip() {
    this.router.navigate(['staff/trip'])
  }

  goToTicket() {
    this.router.navigate(['staff/ticket'])
  }

  goToContact() {
    this.router.navigate(['staff/contact'])
  }

}
