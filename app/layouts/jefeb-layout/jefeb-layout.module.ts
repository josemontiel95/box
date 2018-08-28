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
import { OrdenTrabajoComponent } from '../../jefeb/orden-trabajo/orden-trabajo.component';
import { GridComponent } from '../../jefeb/grid/grid.component';
import { llenaFormatoCCHComponent } from '../../jefeb/llenaFormatoCCH/llenaFormatoCCH.component';
import { llenaRevenimientoComponent } from '../../jefeb/llenaRevenimiento/llenaRevenimiento.component';
import { CrearLlenaFormatoCCHComponent } from '../../jefeb/crear-llenaFormatoCCH/crear-llenaFormatoCCH.component';
import { CrearLlenaRevenimientoComponent } from '../../jefeb/crear-llenaRevenimiento/crear-llenaRevenimiento.component';

import { HerramientaGridComponent } from '../../jefeb/herramienta-grid/herramienta-grid.component';
import { agregaRegistroCCHComponent } from '../../jefeb/agregaRegistroCCH/agregaRegistroCCH.component';
import { agregaRegistroRevenimientoComponent } from '../../jefeb/agregaRegistroRevenimiento/agregaRegistroRevenimiento.component';

import { TecnicosGridComponent } from '../../jefeb/tecnicos-grid/tecnicos-grid.component';
import { FormatoCCHGridComponent } from '../../jefeb/formato-cch-grid/formato-cch-grid.component';
import { RegistrosRevGridComponent } from '../../jefeb/registrosrev-grid/registrosrev-grid.component';

import { TecnicosGridAgregaComponent } from '../../jefeb/tecnicos-grida/tecnicos-grida.component';

import { FormatosGridComponent } from '../../jefeb/formatos-grid/formatos-grid.component';




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
    OrdenTrabajoComponent,
    GridComponent,
    llenaFormatoCCHComponent,
    llenaRevenimientoComponent,
    CrearLlenaFormatoCCHComponent,
    HerramientaGridComponent,
    TecnicosGridComponent,
    agregaRegistroCCHComponent,
    agregaRegistroRevenimientoComponent,
    FormatoCCHGridComponent,
    RegistrosRevGridComponent,
    CrearLlenaRevenimientoComponent,

    TecnicosGridAgregaComponent,
    FormatosGridComponent
  ]
})

export class JefebLayoutModule {}
