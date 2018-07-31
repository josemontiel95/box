import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JefeLabLayoutRoutes } from './jefelab-layout.routing';
import { UserProfileComponent } from '../../jefelab/user-profile/user-profile.component';
import { ObraDetailComponent } from '../../jefelab/obra-detail/obra-detail.component';
import { HerramientaDetailComponent } from '../../jefelab/herramienta-detail/herramienta-detail.component';
import { ObrasComponent } from '../../jefelab/obras/obras.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { CrearObraComponent } from '../../jefelab/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../jefelab/insertar-foto/insertar-foto.component';
import { InsertarFotoClienteComponent } from '../../jefelab/insertar-fotocliente/insertar-fotocliente.component';
import { HerramientasComponent } from '../../jefelab/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../jefelab/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { ClientesComponent } from '../../jefelab/clientes/clientes.component';
import { CrearClienteComponent } from '../../jefelab/crear-cliente/crear-cliente.component';
import { ClienteDetailComponent } from '../../jefelab/cliente-detail/cliente-detail.component';
import { ConcreteraComponent } from '../../jefelab/concretera/concretera.component';
import { CrearConcreteraComponent } from '../../jefelab/crear-concretera/crear-concretera.component';
import { ConcreteraDetailComponent } from '../../jefelab/concretera-detail/concretera-detail.component';
import { OrdenTrabajoComponent } from '../../jefelab/orden-trabajo/orden-trabajo.component';
import { CrearOrdenTrabajoComponent } from '../../jefelab/crear-orden-trabajo/crear-orden-trabajo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JefeLabLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    UserProfileComponent,
    ObraDetailComponent,
    HerramientaDetailComponent,
    ObrasComponent,
    CrearObraComponent,
    InsertarFotoComponent,
    InsertarFotoClienteComponent,
    CrearHerramientasComponent,
    HerramientasComponent,
    ClientesComponent,
    CrearClienteComponent,
    ClienteDetailComponent,
    ConcreteraComponent,
    CrearConcreteraComponent,
    ConcreteraDetailComponent,
    OrdenTrabajoComponent,
    CrearOrdenTrabajoComponent,
  ]
})

export class JefeLabLayoutModule {}
