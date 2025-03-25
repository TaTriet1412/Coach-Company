import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticComponent } from "./statistic/statistic.component";
import { TicketComponent } from "./ticket/ticket.component";
import { CreateTicketComponent } from "./ticket/create-ticket/create-ticket.component";
import { UpdateTicketComponent } from "./ticket/update-ticket/update-ticket.component";
import { DeleteTicketComponent } from "./ticket/delete-ticket/delete-ticket.component";
import { NewsComponent } from "./news/news.component";
import { CreateNewsComponent } from "./news/create-news/create-news.component";
import { UpdateNewsComponent } from "./news/update-news/update-news.component";
import { DeleteNewsComponent } from "./news/delete-news/delete-news.component";
import { DefaultAdminUiComponent } from "./default-admin-ui/default-admin-ui.component";
import { RouteComponent } from "./route/route.component";
import { CreateRouteComponent } from "./route/create-route/create-route.component";
import { UpdateRouteComponent } from "./route/update-route/update-route.component";
import { DeleteRouteComponent } from "./route/delete-route/delete-route.component";
import { DriverComponent } from "./driver/driver.component";
import { CreateDriverComponent } from "./driver/create-driver/create-driver.component";
import { UpdateDriverComponent } from "./driver/update-driver/update-driver.component";
import { StaffComponent } from "./staff/staff.component";
import { CreateStaffComponent } from "./staff/create-staff/create-staff.component";
import { UpdateStaffComponent } from "./staff/update-staff/update-staff.component";
import { CoDriverComponent } from "./co-driver/co-driver.component";
import { CreateCoDriverComponent } from "./co-driver/create-co-driver/create-co-driver.component";
import { UpdateCoDriverComponent } from "./co-driver/update-co-driver/update-co-driver.component";
import { BusComponent } from "./bus/bus.component";
import { CreateBusComponent } from "./bus/create-bus/create-bus.component";
import { UpdateBusComponent } from "./bus/update-bus/update-bus.component";
import { TripComponent } from "./trip/trip.component";
import { CreateTripComponent } from "./trip/create-trip/create-trip.component";
import { UpdateTripComponent } from "./trip/update-trip/update-trip.component";
import { ContactComponent } from "./contact/contact.component";
import { ProcessContactComponent } from "./contact/process-contact/process-contact.component";

const routes: Routes = [
  { path: "", 
    component: DefaultAdminUiComponent,
    children: [
      { path: "home", component: StatisticComponent},
      { path: "statistic", component: StatisticComponent},
      { 
        path: "ticket",
        children: [
            { path: "", component: TicketComponent},
            { path: "create-ticket", component: CreateTicketComponent},
            { path: "update-ticket/:id", component: UpdateTicketComponent},
            { path: "delete-ticket", component: DeleteTicketComponent},
          ]
      },
      { 
        path: "news",
        children: [
            { path: "", component: NewsComponent},
            { path: "create-news", component: CreateNewsComponent},
            { path: "update-news/:id", component: UpdateNewsComponent},
            { path: "delete-news", component: DeleteNewsComponent},
          ]
      },
      { 
        path: "route",
        children: [
            { path: "", component: RouteComponent},
            { path: "create-route", component: CreateRouteComponent},
            { path: "update-route/:id", component: UpdateRouteComponent},
            { path: "delete-route", component: DeleteRouteComponent},
          ]
      },
      { 
        path: "driver",
        children: [
            { path: "", component: DriverComponent},
            { path: "create-driver", component: CreateDriverComponent},
            { path: "update-driver/:id", component: UpdateDriverComponent},
          ]
      },
      { 
        path: "staff",
        children: [
            { path: "", component: StaffComponent},
            { path: "create-staff", component: CreateStaffComponent},
            { path: "update-staff/:id", component: UpdateStaffComponent},
          ]
      },
      { 
        path: "co-driver",
        children: [
            { path: "", component: CoDriverComponent},
            { path: "create-co-driver", component: CreateCoDriverComponent},
            { path: "update-co-driver/:id", component: UpdateCoDriverComponent},
          ]
      },
      { 
        path: "bus",
        children: [
            { path: "", component: BusComponent},
            { path: "create-bus", component: CreateBusComponent},
            { path: "update-bus/:id", component: UpdateBusComponent},
          ]
      },
      { 
        path: "trip",
        children: [
            { path: "", component: TripComponent},
            { path: "create-trip", component: CreateTripComponent},
            { path: "update-trip/:id", component: UpdateTripComponent},
          ]
      },
      { 
        path: "contact",
        children: [
            { path: "", component: ContactComponent},
            { path: "process-contact/:id", component: ProcessContactComponent},
          ]
      },
      { path: "", component: StatisticComponent, pathMatch: "full"},
      { path: "**", component: StatisticComponent},
    ]
  },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule{}
