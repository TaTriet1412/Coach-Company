import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeUserComponent } from "./home/home.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { SearchTicketComponent } from "./search-ticket/search-ticket.component";
import { AboutComponent } from "./about/about.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactComponent } from "./contact/contact.component";
import { LoginComponent } from "./login/login.component";
import { ChooseChairComponent } from "./choose-chair/choose-chair.component";
import { DefaultUserUiComponent } from "./default-user-ui/default-user-ui.component";
import { ForgotPassswordComponent } from "./login/forgot-passsword/forgot-passsword.component";
import { VerificationCodeComponent } from "./login/verification-code/verification-code.component";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";
import { DetailBlogComponent } from "./blog/detail-blog/detail-blog.component";
import { DetailTicketComponent } from "./search-ticket/detail-ticket/detail-ticket.component";

const routes: Routes = [
    { path: "", component: DefaultUserUiComponent,children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeUserComponent},
      { path: "schedule", component: ScheduleComponent},
      { path: "ticket", children: [
        {path: "", component: SearchTicketComponent},
        {path: "detail-ticket/:id", component: DetailTicketComponent},]},
        { path: "about-us", component: AboutComponent},
        { path: "blog", children: [
          {path: "", component: BlogComponent},
        {path: "detail-blog/:id", component: DetailBlogComponent},]},
        { path: "contact-us", component: ContactComponent},
        { path: "register", component: RegisterComponent},
        { path: "login", children: [
          { path: "",component: LoginComponent},
          { path: "forgot-password",component: ForgotPassswordComponent},
          { path: "verification-code",component: VerificationCodeComponent},
        { path: "reset-password",component: ResetPasswordComponent},]},
        { path: "choose-chair/:id", component: ChooseChairComponent},
    ]
    },

    
  ];

  
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}


