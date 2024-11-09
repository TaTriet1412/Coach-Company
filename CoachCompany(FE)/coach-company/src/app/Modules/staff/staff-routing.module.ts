import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultStaffUiComponent } from './default-staff-ui/default-staff-ui.component';
import { HomeStaffComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultStaffUiComponent,
    children: [
        { path: "", component: HomeStaffComponent},
        { path: "home", component: HomeStaffComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
