import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultStaffUiComponent } from './default-staff-ui/default-staff-ui.component';
import { HomeStaffComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { UpdateTicketComponent } from './ticket/update-ticket/update-ticket.component';
import { RouteComponent } from './route/route.component';
import { TripComponent } from './trip/trip.component';
import { ContactComponent } from './contact/contact.component';
import { ProcessContactComponent } from './contact/process-contact/process-contact.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultStaffUiComponent,
    children: [
      { path: "home", component: HomeStaffComponent},
      { path: "ticket", children: [
        {path: "", component: TicketComponent},
        {path: "create-ticket", component: CreateTicketComponent},
        {path: "update-ticket/:id", component: UpdateTicketComponent},
      ]
      },
      { path: "route", component: RouteComponent},
      { path: "trip", component: TripComponent},
      { path: "contact",children: [
        {path: "", component: ContactComponent},
        {path: "process-contact/:id", component: ProcessContactComponent},
      ]},
      { path: "", component: HomeStaffComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
