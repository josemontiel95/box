import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SubAdminLayoutComponent } from './layouts/subadmin-layout/subadmin-layout.component';

import { DataTablesModule } from 'angular-datatables';
;
import { HttpClientModule }    from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
     
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SubAdminLayoutComponent,
    LoginComponent,

  ],
  providers: [/*DataService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
