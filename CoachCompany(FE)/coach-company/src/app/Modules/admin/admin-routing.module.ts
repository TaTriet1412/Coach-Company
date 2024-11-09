import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent } from "./home/home.component";
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

const routes: Routes = [
  { path: "", 
    component: DefaultAdminUiComponent,
    children: [
      { path: "", component: HomeAdminComponent},
      { path: "home", component: HomeAdminComponent},
      { path: "statistic", component: StatisticComponent},
      { 
        path: "ticket",
        children: [
            { path: "", component: TicketComponent},
            { path: "create-ticket", component: CreateTicketComponent},
            { path: "update-ticket", component: UpdateTicketComponent},
            { path: "delete-ticket", component: DeleteTicketComponent},
          ]
      },
      { 
        path: "news",
        children: [
            { path: "", component: NewsComponent},
            { path: "create-news", component: CreateNewsComponent},
            { path: "update-news", component: UpdateNewsComponent},
            { path: "delete-news", component: DeleteNewsComponent},
          ]
      },
    ]
  },
  
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule{}
