import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TecnicoMLayoutRoutes } from './tecnicom-layout.routing';
import { AgGridModule } from 'ag-grid-angular';

import { MatProgressBarModule } from '@angular/material';

import { GridComponent } from '../../tecnicom/grid/grid.component';
import { GridCilindrosComponent } from '../../tecnicom/grid-cilindros/grid-cilindros.component';
import { GridCuboComponent } from '../../tecnicom/grid-cubo/grid-cubo.component';
import { GridVigaComponent } from '../../tecnicom/grid-viga/grid-viga.component';
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
import { VigaGenericoComponent } from '../../tecnicom/vigaGenerico/vigaGenerico.component';
import { PruebaCuboComponent } from '../../tecnicom/pruebaCubo/pruebaCubo.component';




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
  LlenaFooterCuboComponent,
  LlenaFooterVigaComponent,
  dashboardCilindroComponent,
  dashboardCuboComponent,
  dashboardVigaComponent,
  PruebaCilindroComponent,
  PruebaVigaComponent,
  GridComponent,
  GridCilindrosComponent,
  GridCuboComponent,
  GridVigaComponent,
  PruebaCuboComponent,
  VigaGenericoComponent
 
  ]
})

export class TecnicoMLayoutModule {}
