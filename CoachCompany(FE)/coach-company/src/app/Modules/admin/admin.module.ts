import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from './sidebar/sidebar.component';
import { HeaderAdminComponent } from './header/header.component';
import { FooterAdminComponent } from './footer/footer.component';
import { HomeAdminComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DefaultAdminUiComponent } from './default-admin-ui/default-admin-ui.component';
import { StatisticComponent } from "./statistic/statistic.component";
import { ChartComponent } from './chart/chart.component';
import { LayoutCrudComponent } from './layout-crud/layout-crud.component';
import { NewsComponent } from './news/news.component';
import { CreateNewsComponent } from './news/create-news/create-news.component';
import { UpdateNewsComponent } from './news/update-news/update-news.component';
import { DeleteNewsComponent } from './news/delete-news/delete-news.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateRouteComponent } from './route/create-route/create-route.component';
import { DeleteRouteComponent } from './route/delete-route/delete-route.component';
import { UpdateRouteComponent } from './route/update-route/update-route.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    SidebarAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    DefaultAdminUiComponent,
    UpdateNewsComponent,
    DeleteNewsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StatisticComponent,
    HomeAdminComponent,
    ChartComponent,
    LayoutCrudComponent,
    NewsComponent,
    CreateNewsComponent,
    CKEditorModule,
    CreateRouteComponent,
    DeleteRouteComponent,
    UpdateRouteComponent,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,

    
],
  exports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    HomeAdminComponent,
    DefaultAdminUiComponent,

  ]
})
export class AdminModule { }
