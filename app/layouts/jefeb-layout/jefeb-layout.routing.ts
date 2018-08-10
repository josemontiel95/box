import { Routes } from '@angular/router';
import { DashboardComponent } from '../../jefeb/dashboard/dashboard.component';
import { UserProfileComponent } from '../../jefeb/user-profile/user-profile.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';
import { CrearOrdenTrabajoComponent } from '../../jefeb/crear-orden-trabajo/crear-orden-trabajo.component';
import { OrdenTrabajoComponent } from '../../jefeb/orden-trabajo/orden-trabajo.component';
import { GridComponent } from '../../jefeb/grid/grid.component';
import { llenaFormatoCCHComponent } from '../../jefeb/llenaFormatoCCH/llenaFormatoCCH.component';
import { CrearLlenaFormatoCCHComponent } from '../../jefeb/crear-llenaFormatoCCH/crear-llenaFormatoCCH.component';
import { agregaRegistroCCHComponent } from '../../jefeb/agregaRegistroCCH/agregaRegistroCCH.component';

import { TecnicosGridComponent } from '../../jefeb/tecnicos-grid/tecnicos-grid.component';


export const JefebLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'orden-trabajo/dashboard/:id',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'orden-trabajo/crear-orden-trabajo',   component: CrearOrdenTrabajoComponent }, 
    { path: 'orden-trabajo',      component: OrdenTrabajoComponent },
    { path: 'orden-trabajo/dashboard/llenaFormatoCCH/:id',      component: llenaFormatoCCHComponent },
    { path: 'orden-trabajo/dashboard/crear-llenaFormatoCCH/:id',      component: CrearLlenaFormatoCCHComponent },
    { path: 'orden-trabajo/dashboard/agregaRegistroCCH/:id/:id2',      component: agregaRegistroCCHComponent }
   
];
