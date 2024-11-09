import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DefaultStaffUiComponent } from './default-staff-ui/default-staff-ui.component';
import { HeaderStaffComponent } from './header/header.component';
import { FooterStaffComponent } from './footer/footer.component';
import { SidebarStaffComponent } from './sidebar/sidebar.component';
import { HomeStaffComponent } from './home/home.component';


@NgModule({
  declarations: [
    DefaultStaffUiComponent,
    HeaderStaffComponent,
    FooterStaffComponent,
    SidebarStaffComponent,
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    HomeStaffComponent,
  ],
  exports: [
    DefaultStaffUiComponent,
    HeaderStaffComponent,
    SidebarStaffComponent,
    FooterStaffComponent,
    HomeStaffComponent
  ]
})
export class StaffModule { }
