import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserDetailComponent } from '../../admin/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../admin/obra-detail/obra-detail.component';
import { HerramientaDetailComponent } from '../../admin/herramienta-detail/herramienta-detail.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { ObrasComponent } from '../../admin/obras/obras.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { PruebaComponent } from '../../prueba/prueba.component';
import { AgGridModule } from 'ag-grid-angular';
import { CrearUsuarioComponent } from '../../admin/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../admin/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../admin/insertar-foto/insertar-foto.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { ClientesComponent } from '../../admin/clientes/clientes.component';
import { CrearClienteComponent } from '../../admin/crear-cliente/crear-cliente.component';
import { ClienteDetailComponent } from '../../admin/cliente-detail/cliente-detail.component';
import { ConcreteraComponent } from '../../admin/concretera/concretera.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserDetailComponent,
    ObraDetailComponent,
    HerramientaDetailComponent,
    TableListComponent,
    TypographyComponent,
    PruebaComponent,
    IconsComponent,
    ObrasComponent,
    MapsComponent,
    CrearUsuarioComponent,
    CrearObraComponent,
    InsertarFotoComponent,
    NotificationsComponent,
    CrearHerramientasComponent,
    HerramientasComponent,
    ClientesComponent,
    CrearClienteComponent,
    ClienteDetailComponent,
    ConcreteraComponent

  ]
})

export class AdminLayoutModule {}
