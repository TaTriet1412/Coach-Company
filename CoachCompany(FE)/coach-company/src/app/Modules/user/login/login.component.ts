import { Component } from '@angular/core';
import { AlertModule  } from '@coreui/angular';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [AlertModule,ReactiveFormsModule],
})
export class LoginComponent {
  visibleWarning = false;
  visibleError = false;
  dismissible = true;
  warningMessage = "";
  errorMessage = "";
  isAdmin = true;
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })


  constructor(
    private authService: AuthService,
    private router:Router,
    private userService: UserService,
  ) {}
  
  handleLogin(event: Event){
    event.preventDefault();
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailInputValue = this.userForm.get("email")?.value?.trim() || ""; 
    const passwordInputValue = this.userForm.get("password")?.value?.trim() || ""; 
    if (emailInputValue==="") {
        this.warningMessage = "Vui lòng nhập email";
        this.visibleWarning = true;
    }else if(!emailPattern.test(emailInputValue)){
      this.warningMessage = "Email không hợp lệ";
      this.visibleWarning = true;      
    }else if (passwordInputValue===""){
      this.warningMessage  = "Vui lòng nhập mật khẩu";
      this.visibleWarning = true;
    }else{
      // Tát thông báo khi điền đúng form
      this.visibleWarning = false;
      const userFormValue = {
        email: emailInputValue,
        password: passwordInputValue
      }
      this.userService.loginAccount(userFormValue)
        .subscribe({
          next: (response:any) => {
            // Ẩn error khi người dùng đăng nhập đúng
            this.visibleError = false
            this.userService.setUser(response);
            if(response.role == 1) {
              this.authService.loginAsAdmin();
              this.router.navigate(["/admin"]);
            }else {
              this.authService.loginAsStaff();
              this.router.navigate(["/staff"]);
            }
          },
          error: (response:any) => {
            // Thống báo error khi đăng nhập sai
            this.errorMessage = response.error.message;
            this.visibleError = true
          }

        })
    }
  }

  goToForgotPassword(){
    this.router.navigate(['/user/login/forgot-password'])
  }


}
