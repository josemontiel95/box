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

import { TecnicosGridComponent } from '../../jefeb/tecnicos-grid/tecnicos-grid.component';


export const JefebLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'orden-trabajo/dashboard/:id',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'orden-trabajo/crear-orden-trabajo',   component: CrearOrdenTrabajoComponent }, 
    { path: 'orden-trabajo',      component: OrdenTrabajoComponent },
    { path: 'llenaFormatoCCH',      component: llenaFormatoCCHComponent },
    { path: 'crear-llenaFormatoCCH',      component: CrearLlenaFormatoCCHComponent },   
];
