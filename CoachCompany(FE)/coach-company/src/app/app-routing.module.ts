import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './core/guards/auth_admin.guard';
import { AuthStaffGuard } from './core/guards/auth_staff.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./Modules/user/user-routing.module').then(m => m.UserRoutingModule) },
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin-routing.module').then(m => m.AdminRoutingModule), canActivate: [AuthAdminGuard] },
  { path: 'staff', loadChildren: () => import('./Modules/staff/staff-routing.module').then(m => m.StaffRoutingModule), canActivate: [AuthStaffGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
