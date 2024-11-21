import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../../core/services/snack-bar.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [AlertModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  warningMessage = "";
  visibleWarning = false;
  dismissible = true;
  resetPasswordForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  constructor(private userService:UserService, private router:Router,private snackBarService:SnackBarService){}

  handleResetPassword(event: Event){
    event.preventDefault();
    const passwordInput = this.resetPasswordForm.get("password")?.value?.trim() || ""; 
    const confirmPasswordInput = this.resetPasswordForm.get("confirmPassword")?.value?.trim() || ""; 
    if (passwordInput==="") {
      this.warningMessage = "Vui lòng nhập ô mật khẩu";
      this.visibleWarning = true;
    }else if(confirmPasswordInput===""){
      this.warningMessage = "Nhập lại mật khẩu còn trống";
      this.visibleWarning = true;
    }else if(confirmPasswordInput != passwordInput){
      this.warningMessage = "Mật khẩu không khớp";
      this.visibleWarning = true;
    }else{
      this.visibleWarning = false;
      const oldEmail = this.userService.getEmailToVerifyCode() || "";


      this.userService.resetPassword(oldEmail,passwordInput)
      .subscribe({
        next: (response:any) => {
          this.snackBarService.notifySuccessUser("Đặt lại mật khẩu thành công")
          this.router.navigate(["user/login"]);
        },
        error: (response:any) => console.log(response.error)
      });
    }
  }

}
