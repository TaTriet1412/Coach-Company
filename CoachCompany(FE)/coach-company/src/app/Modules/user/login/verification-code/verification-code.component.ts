import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [AlertModule,ReactiveFormsModule,CountdownComponent  ],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css'
})
export class VerificationCodeComponent {
  warningMessage = ""
  errorMessage = ""
  dismissible = true;
  visibleWarning = false;
  visibleError = false;
  resendDisabled = false;
  verificationForm = new FormGroup({
    code: new FormControl(''),
  })
  timeExp: number = 5*60
  config: CountdownConfig = { leftTime: this.timeExp};
  constructor(private userService:UserService,private router:Router){}


  handleVerificationCode(event: Event){

    
    event.preventDefault();
    const codeInput = this.verificationForm.get("code")?.value?.trim() || ""; 
    if (codeInput==="") {
        this.warningMessage = "Vui lòng nhập Code";
        this.visibleWarning = true;
        this.visibleError = false;
    }else{
      this.visibleWarning = false;
      const oldEmail = this.userService.getEmailToVerifyCode() || "";
      this.userService.verifyCode(oldEmail,codeInput)
      .subscribe({
        next: (response:any) => {
          this.router.navigate(['/login/reset-password'])
        },
        error: (response:any) => {
          this.errorMessage = response.error.message;
          this.visibleError = true;
        }
      });
    }
  }

  resendCode() {
    this.resendDisabled = true;
    this.userService.resendCode();
  }

  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.resendDisabled = false;
    }
    
  }

}
