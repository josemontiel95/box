import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubAdminLayoutRoutes } from './subadmin-layout.routing';
import { UserProfileComponent } from '../../administrativo/user-profile/user-profile.component';
import { OrdenesComponent } from '../../administrativo/ordenes/ordenes.component';
import { dashboardLoteComponent } from '../../administrativo/dashboardLote/dashboardLote.component';
import { ObraDetailComponent } from '../../administrativo/obra-detail/obra-detail.component';
import { ObrasComponent } from '../../administrativo/obras/obras.component';
import { GridLotesComponent } from '../../administrativo/grid-lotes/grid-lotes.component';
import { GridCorreosComponent } from '../../administrativo/grid-correos/grid-correos.component';

/*
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
*/
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SubAdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
     AgGridModule.withComponents([]),
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
      UserProfileComponent,
      OrdenesComponent,
      ObraDetailComponent,
      ObrasComponent,
      dashboardLoteComponent,
      GridLotesComponent,
      GridCorreosComponent
   /* DashboardComponent,

    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,*/
  ]
})

export class SubAdminLayoutModule {}
