import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './Modules/user/user.module';
import { AdminModule } from './Modules/admin/admin.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRoutingModule } from './Modules/user/user-routing.module';
import { AdminRoutingModule } from './Modules/admin/admin-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffModule } from './Modules/staff/staff.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminModule,
    StaffModule,
    UserRoutingModule,
    AdminRoutingModule,
    CKEditorModule,
    ReactiveFormsModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
