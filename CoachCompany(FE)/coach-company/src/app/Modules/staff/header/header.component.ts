import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from 'ckeditor5-premium-features';

@Component({
  selector: 'app-staff-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderStaffComponent implements OnInit {
  @ViewChild('dropDownLi') dropDownLi!: ElementRef;
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;
  userName = "";

  constructor(private authService: AuthService,private userService:UserService){}

  ngOnInit(): void {
      this.userName = this.userService.getUser()?.name ?? "";
  }

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
