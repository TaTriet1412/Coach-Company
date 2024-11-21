import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { UserService } from '../../../../core/services/user.service';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passsword',
  standalone: true,
  imports: [AlertModule,ReactiveFormsModule],
  templateUrl: './forgot-passsword.component.html',
  styleUrl: './forgot-passsword.component.css'
})
export class ForgotPassswordComponent {
  visibleWarning = false;
  dismissible = true;
  warningMessage = "";
  codeResetPassword = 0;
  sendEmailForm = new FormGroup({
    email: new FormControl(''),
  })

  constructor(private userService: UserService,private router:Router){}

  handleSendEmail(event: Event){
    event.preventDefault();
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailInputValue = this.sendEmailForm.get("email")?.value?.trim() || ""; 
    if (emailInputValue==="") {
        this.warningMessage = "Vui lòng nhập email";
        this.visibleWarning = true;
    }else if(!emailPattern.test(emailInputValue)){
      this.warningMessage = "Email không hợp lệ";
      this.visibleWarning = true;      
    }else{
      this.visibleWarning = false;

      this.userService.sendVerificationCode(emailInputValue)
      .subscribe({
        next: (response:any) => {},
        error: (response:any) => {}
      });
      this.router.navigate(["/user/login/verification-code"])
    }
  }
}
