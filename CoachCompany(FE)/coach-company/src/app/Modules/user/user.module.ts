import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    HomeUserComponent,
    ScheduleComponent,
    SearchTicketComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeUserComponent
  ]
})
export class UserModule {}
