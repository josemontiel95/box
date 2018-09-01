import { Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';

import { UserProfileComponent } from '../../tecnicom/user-profile/user-profile.component';
import { PendientesComponent } from '../../tecnicom/pendientes/pendientes.component';
import { LlenaFooterComponent } from '../../tecnicom/llenaFooter/llenaFooter.component';
import { LlenaFooterCuboComponent } from '../../tecnicom/llenaFooterCubo/llenaFooterCubo.component';
import { LlenaFooterVigaComponent } from '../../tecnicom/llenaFooterViga/llenaFooterViga.component';
import { PruebaCilindroComponent } from '../../tecnicom/pruebaCilindro/pruebaCilindro.component';
import { PruebaVigaComponent } from '../../tecnicom/pruebaViga/pruebaViga.component';
import { PruebaCuboComponent } from '../../tecnicom/pruebaCubo/pruebaCubo.component';

/*
import { DashboardComponent } from '../../tecnicom/dashboard/dashboard.component';
import { CrearOrdenTrabajoComponent } from '../../tecnicom/crear-orden-trabajo/crear-orden-trabajo.component';
import { OrdenTrabajoComponent } from '../../tecnicom/orden-trabajo/orden-trabajo.component';
import { GridComponent } from '../../tecnicom/grid/grid.component';
import { llenaFormatoCCHComponent } from '../../tecnicom/llenaFormatoCCH/llenaFormatoCCH.component';
import { llenaRevenimientoComponent } from '../../tecnicom/llenaRevenimiento/llenaRevenimiento.component';
import { CrearLlenaFormatoCCHComponent } from '../../tecnicom/crear-llenaFormatoCCH/crear-llenaFormatoCCH.component';
import { CrearLlenaRevenimientoComponent } from '../../tecnicom/crear-llenaRevenimiento/crear-llenaRevenimiento.component';

import { agregaRegistroCCHComponent } from '../../tecnicom/agregaRegistroCCH/agregaRegistroCCH.component';
import { agregaRegistroRevenimientoComponent } from '../../tecnicom/agregaRegistroRevenimiento/agregaRegistroRevenimiento.component';

import { TecnicosGridComponent } from '../../tecnicom/tecnicos-grid/tecnicos-grid.component';
import { TecnicosGridAgregaComponent } from '../../tecnicom/tecnicos-grida/tecnicos-grida.component';

*/
export const TecnicoMLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'pendientes',   component: PendientesComponent },
    { path: 'llenaFooter/:id/:id2',   component: LlenaFooterComponent },
    { path: 'llenaFooterCubo/:id/:id2',   component: LlenaFooterCuboComponent },
    { path: 'llenaFooterViga/:id/:id2',   component: LlenaFooterVigaComponent },
    { path: 'pruebaCilindro/:id/:id2',   component: PruebaCilindroComponent },
    { path: 'pruebaViga/:id/:id2',   component: PruebaVigaComponent },
    { path: 'pruebaCubo/:id/:id2',   component: PruebaCuboComponent },

/*    
    { path: 'orden-trabajo/dashboard/:id',      component: DashboardComponent },    
    { path: 'orden-trabajo/crear-orden-trabajo',   component: CrearOrdenTrabajoComponent }, 
    { path: 'orden-trabajo',      component: OrdenTrabajoComponent },
    { path: 'orden-trabajo/dashboard/llenaFormatoCCH/:id2/:id',      component: llenaFormatoCCHComponent },
    { path: 'orden-trabajo/dashboard/llenaRevenimiento/:id2/:id',      component: llenaRevenimientoComponent },
    { path: 'orden-trabajo/dashboard/crear-llenaFormatoCCH/:id',      component: CrearLlenaFormatoCCHComponent },
    { path: 'orden-trabajo/dashboard/crear-llenaRevenimiento/:id',      component: CrearLlenaRevenimientoComponent },
    { path: 'orden-trabajo/dashboard/agregaRegistroCCH/:id/:id2/:id3',      component: agregaRegistroCCHComponent },
    { path: 'orden-trabajo/dashboard/agregaRegistroRevenimiento/:id/:id2/:id3',      component: agregaRegistroRevenimientoComponent }   
*/
];
