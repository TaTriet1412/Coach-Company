import { Component, ElementRef, HostListener, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'coach-company';
  constructor(private router: Router,private authService: AuthService){
    // Subscribe to changes in the authentication status
    this.authService.authStatusChanged.subscribe(status => {
      this.router.navigate(['/']); // Navigate to the home route or any other route to refresh the layout
    });

  }

  ngOnInit(): void {
    if(this.authService.getAdminStatus()){
      this.router.navigate(['/admin'])
    }
    else{
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy(): void {     
    localStorage.removeItem('userRole');
  }
}
