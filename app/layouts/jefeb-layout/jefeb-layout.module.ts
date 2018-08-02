import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JefebLayoutRoutes } from './jefeb-layout.routing';
import { DashboardComponent } from '../../jefeb/dashboard/dashboard.component';
import { UserProfileComponent } from '../../jefeb/user-profile/user-profile.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';
import { CrearOrdenTrabajoComponent } from '../../jefeb/crear-orden-trabajo/crear-orden-trabajo.component';
import { GridComponent } from '../../jefeb/grid/grid.component';
import { llenaFormatoCCHComponent } from '../../jefeb/llenaFormatoCCH/llenaFormatoCCH.component';
import { CrearLlenaFormatoCCHComponent } from '../../jefeb/crear-llenaFormatoCCH/crear-llenaFormatoCCH.component';



import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JefebLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatProgressBarModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CrearOrdenTrabajoComponent,
    GridComponent,
    llenaFormatoCCHComponent,
    CrearLlenaFormatoCCHComponent,
    CrearOrdenTrabajoComponent
  ]
})

export class JefebLayoutModule {}
