import { Component } from '@angular/core';
import { AlertModule  } from '@coreui/angular';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [AlertModule,ReactiveFormsModule],
})
export class LoginComponent {
  visible = false;
  dismissible = true;
  errorMessage = "";
  isAdmin = true;
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })


  constructor(private authService: AuthService,private router:Router,private http:HttpClient) {}
  
  handleLogin(event: Event){
    event.preventDefault();
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailInputValue = this.userForm.get("email")?.value?.trim() || ""; 
    const passwordInputValue = this.userForm.get("password")?.value?.trim() || ""; 
    if (emailInputValue==="") {
        this.errorMessage = "Vui lòng nhập email";
        this.visible = true;
    }else if(!emailPattern.test(emailInputValue)){
      this.errorMessage = "Email không hợp lệ";
      this.visible = true;      
    }else if (passwordInputValue===""){
      this.errorMessage  = "Vui lòng nhập mật khẩu";
      this.visible = true;
    }else{
      this.visible = false;
      this.http.post<Object>('http://localhost:8080/api/users/login', this.userForm.value)
        .subscribe({
          next: (response:any) => {
            console.log(response);
            if(response.role == 1) {
              this.authService.loginAsAdmin();
              this.router.navigate(["/admin"]);
            }else {
              this.authService.loginAsStaff();
              this.router.navigate(["/staff"]);
            }
          },
          error: (error:any) => {
            console.log(error.error);
          }

        })

        
    }
  }

}
