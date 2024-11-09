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

const routes: Routes = [
    { path: "", 
      component: DefaultUserUiComponent,
      children: [
        {path: "", component: HomeUserComponent},
        { path: "home", component: HomeUserComponent},
        { path: "schedule", component: ScheduleComponent},
        { path: "ticket", component: SearchTicketComponent},
        { path: "about-us", component: AboutComponent},
        { path: "blog", component: BlogComponent},
        { path: "contact-us", component: ContactComponent},
        { path: "register", component: RegisterComponent},
        { path: "login", component: LoginComponent},
        { path: "choose-chair", component: ChooseChairComponent},
      ]
    },
    
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}


