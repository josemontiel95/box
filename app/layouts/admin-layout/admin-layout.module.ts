import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { PruebaComponent } from '../../prueba/prueba.component';
import { AgGridModule } from 'ag-grid-angular';
import { CrearUsuarioComponent } from '../../crear-usuario/crear-usuario.component';
import { InsertarFotoComponent } from '../../insertar-foto/insertar-foto.component';
import { HerramientasComponent } from '../../herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../crear-herramientas/crear-herramientas.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    PruebaComponent,
    IconsComponent,
    MapsComponent,
    CrearUsuarioComponent,
    InsertarFotoComponent,
    NotificationsComponent,
    CrearHerramientasComponent,
    HerramientasComponent
  ]
})

export class AdminLayoutModule {}
