import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TecnicoMLayoutRoutes } from './tecnicom-layout.routing';
import { AgGridModule } from 'ag-grid-angular';

import { MatProgressBarModule } from '@angular/material';


import { UserProfileComponent } from '../../tecnicom/user-profile/user-profile.component';
import { PendientesComponent } from '../../tecnicom/pendientes/pendientes.component';
import { LlenaFooterComponent } from '../../tecnicom/llenaFooter/llenaFooter.component';
import { PruebaCilindroComponent } from '../../tecnicom/pruebaCilindro/pruebaCilindro.component';
import { PruebaVigaComponent } from '../../tecnicom/pruebaViga/pruebaViga.component';

/*
import { DashboardComponent } from '../../tecnicom/dashboard/dashboard.component';

import { CrearOrdenTrabajoComponent } from '../../tecnicom/crear-orden-trabajo/crear-orden-trabajo.component';
import { OrdenTrabajoComponent } from '../../tecnicom/orden-trabajo/orden-trabajo.component';
import { llenaFormatoCCHComponent } from '../../tecnicom/llenaFormatoCCH/llenaFormatoCCH.component';
import { llenaRevenimientoComponent } from '../../tecnicom/llenaRevenimiento/llenaRevenimiento.component';
import { CrearLlenaFormatoCCHComponent } from '../../tecnicom/crear-llenaFormatoCCH/crear-llenaFormatoCCH.component';
import { CrearLlenaRevenimientoComponent } from '../../tecnicom/crear-llenaRevenimiento/crear-llenaRevenimiento.component';

import { HerramientaGridComponent } from '../../tecnicom/herramienta-grid/herramienta-grid.component';
import { agregaRegistroCCHComponent } from '../../tecnicom/agregaRegistroCCH/agregaRegistroCCH.component';
import { agregaRegistroRevenimientoComponent } from '../../tecnicom/agregaRegistroRevenimiento/agregaRegistroRevenimiento.component';

import { TecnicosGridComponent } from '../../tecnicom/tecnicos-grid/tecnicos-grid.component';
import { FormatoCCHGridComponent } from '../../tecnicom/formato-cch-grid/formato-cch-grid.component';
import { RegistrosRevGridComponent } from '../../tecnicom/registrosrev-grid/registrosrev-grid.component';

import { TecnicosGridAgregaComponent } from '../../tecnicom/tecnicos-grida/tecnicos-grida.component';

import { FormatosGridComponent } from '../../tecnicom/formatos-grid/formatos-grid.component';

*/


import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TecnicoMLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatProgressBarModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
  UserProfileComponent,
  PendientesComponent,
  LlenaFooterComponent,
  PruebaCilindroComponent,
  PruebaVigaComponent
  /*
    DashboardComponent,
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
    FormatosGridComponent */
  ]
})

export class TecnicoMLayoutModule {}
