import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { JefebLayoutComponent } from './layouts/jefeb-layout/jefeb-layout.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SubAdminLayoutComponent } from './layouts/subadmin-layout/subadmin-layout.component';

import { DataTablesModule } from 'angular-datatables';
;
import { HttpClientModule }    from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DataService } from "./data.service";
import { AppGuard } from './app.guard';

import { MatProgressBarModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    DataTablesModule,
    MatProgressBarModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    
     
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SubAdminLayoutComponent,
    LoginComponent,
    JefebLayoutComponent,
  ],
  providers: [DataService,
  AppGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
