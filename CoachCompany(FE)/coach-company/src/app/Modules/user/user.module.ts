import { NgModule} from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeUserComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderUserComponent } from './layout/header/header.component';
import { FooterUserComponent } from './layout/footer/footer.component';
import { AlertModule, DropdownModule } from '@coreui/angular';
import { CarourselHomeUserComponent } from './home/caroursel-home-user/caroursel-home-user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ChooseChairComponent } from './choose-chair/choose-chair.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DefaultUserUiComponent } from './default-user-ui/default-user-ui.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { ForgotPassswordComponent } from './login/forgot-passsword/forgot-passsword.component';
import { VerificationCodeComponent } from './login/verification-code/verification-code.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AboutComponent,
    SearchTicketComponent,
    BlogComponent,
    RegisterComponent,
    HeaderUserComponent,
    FooterUserComponent,
    ChooseChairComponent,
    DefaultUserUiComponent,
  ],
  imports: [
    LoginComponent,
    UserRoutingModule,
    HomeUserComponent,
    ContactComponent,
    CommonModule,
    CarourselHomeUserComponent,
    DropdownModule,
    ScheduleComponent,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    NgxCaptchaModule,
    AlertModule,
    ReactiveFormsModule,
    ForgotPassswordComponent,
    VerificationCodeComponent,
    ResetPasswordComponent,
  ],
  exports: [
    HomeUserComponent,
    HeaderUserComponent,
    FooterUserComponent,
    ScheduleComponent,
    ContactComponent,
    DefaultUserUiComponent,
    ForgotPassswordComponent,
    VerificationCodeComponent,
    ResetPasswordComponent,

  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
})
export class UserModule {}
