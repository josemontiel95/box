import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
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
import { InsertarFotoClienteComponent } from '../../admin/insertar-fotocliente/insertar-fotocliente.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { ClientesComponent } from '../../admin/clientes/clientes.component';
import { CrearClienteComponent } from '../../admin/crear-cliente/crear-cliente.component';
import { ClienteDetailComponent } from '../../admin/cliente-detail/cliente-detail.component';
import { ConcreteraComponent } from '../../admin/concretera/concretera.component';
import { LaboratoriosComponent } from '../../admin/laboratorios/laboratorios.component';
import { LaboratorioDetailComponent } from '../../admin/laboratorio-detail/laboratorio-detail.component';
import { CrearLaboratoriosComponent } from '../../admin/crear-laboratorios/crear-laboratorios.component';
import { CrearConcreteraComponent } from '../../admin/crear-concretera/crear-concretera.component';
import { ConcreteraDetailComponent } from '../../admin/concretera-detail/concretera-detail.component';
import { TiposDeHerramientaComponent } from '../../admin/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../admin/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../admin/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { CrearTicketComponent } from '../../admin/crear-ticket/crear-ticket.component';
import { ConstruccionComponent } from '../../admin/construccion/construccion.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
     ReactiveFormsModule,
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
    ConstruccionComponent,
    MapsComponent,
    CrearUsuarioComponent,
    CrearObraComponent,
    InsertarFotoComponent,
    InsertarFotoClienteComponent,
    NotificationsComponent,
    CrearHerramientasComponent,
    HerramientasComponent,
    ClientesComponent,
    CrearClienteComponent,
    ClienteDetailComponent,
    ConcreteraComponent,
    LaboratoriosComponent,
    LaboratorioDetailComponent,
    CrearLaboratoriosComponent,
    CrearConcreteraComponent,
    ConcreteraDetailComponent,
    TiposDeHerramientaComponent,
    CrearTipoHerramientasComponent,
    TipoHerramientaDetailComponent,
    CrearTicketComponent

  ]
})

export class AdminLayoutModule {}
