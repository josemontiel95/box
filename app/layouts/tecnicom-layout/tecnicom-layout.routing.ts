import { Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';
import { ConstruccionComponent } from '../../tecnicom/construccion/construccion.component';

import { UserProfileComponent } from '../../tecnicom/user-profile/user-profile.component';
import { PendientesComponent } from '../../tecnicom/pendientes/pendientes.component';
import { LlenaFooterComponent } from '../../tecnicom/llenaFooter/llenaFooter.component';
import { LlenaFooterCuboComponent } from '../../tecnicom/llenaFooterCubo/llenaFooterCubo.component';
import { LlenaFooterVigaComponent } from '../../tecnicom/llenaFooterViga/llenaFooterViga.component';
import { dashboardCilindroComponent } from '../../tecnicom/dashboardCilindro/dashboardCilindro.component';
import { dashboardCuboComponent } from '../../tecnicom/dashboardCubo/dashboardCubo.component';
import { dashboardVigaComponent } from '../../tecnicom/dashboardViga/dashboardViga.component';
import { PruebaCilindroComponent } from '../../tecnicom/pruebaCilindro/pruebaCilindro.component';
import { PruebaVigaComponent } from '../../tecnicom/pruebaViga/pruebaViga.component';
import { PruebaCuboComponent } from '../../tecnicom/pruebaCubo/pruebaCubo.component';
import { JLabHistoricoComponent } from '../../tecnicom/historico/historico.component';

export const TecnicoMLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'pendientes',   component: PendientesComponent },
    { path: 'pendientes/dashboardCilindro/:id',   component: dashboardCilindroComponent },
    { path: 'pendientes/dashboardCubo/:id',   component: dashboardCuboComponent },
    { path: 'pendientes/dashboardViga/:id',   component: dashboardVigaComponent },
    { path: 'llenaFooter/:id/:id2',   component: LlenaFooterComponent },
    { path: 'llenaFooterCubo/:id/:id2',   component: LlenaFooterCuboComponent },
    { path: 'llenaFooterViga/:id/:id2',   component: LlenaFooterVigaComponent },
    { path: 'pendientes/dashboardCilindro/pruebaCilindro/:id/:id2',   component: PruebaCilindroComponent },
    { path: 'pendientes/dashboardViga/pruebaViga/:id/:id2',   component: PruebaVigaComponent },
    { path: 'pendientes/dashboardCubo/pruebaCubo/:id/:id2',   component: PruebaCuboComponent },
    { path: 'historico',  component: JLabHistoricoComponent },

];
