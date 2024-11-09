import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-staff-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderStaffComponent {
  @ViewChild('dropDownLi') dropDownLi!: ElementRef;
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;

  constructor(private authService: AuthService){}

  toggleDropdown() {
    if(!this.dropDownLi.nativeElement.classList.contains("show")){
      this.dropDownLi.nativeElement.classList.add("show");
      this.dropDownMenu.nativeElement.classList.add("show");
    }else {
      this.dropDownLi.nativeElement.classList.remove("show");
      this.dropDownMenu.nativeElement.classList.remove("show");
    }
  }

  handleLogout(){
    this.authService.logout();
  }
}
