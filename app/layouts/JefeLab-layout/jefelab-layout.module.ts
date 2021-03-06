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
import { GridComponent } from '../../jefelab/grid/grid.component';
import { HerramientaGridComponent } from '../../jefelab/herramienta-grid/herramienta-grid.component';
import { DashboardComponent } from '../../jefelab/dashboard/dashboard.component';
import { EvaluaHerraComponent } from '../../jefelab/evaluaherra/evaluaherra.component';

import { CilindroGenericoComponent } from '../../jefelab/cilindroGenerico/cilindroGenerico.component';
import { CuboGenericoComponent } from '../../jefelab/cuboGenerico/cuboGenerico.component';
import { VigaGenericoComponent } from '../../jefelab/vigaGenerico/vigaGenerico.component';

import { PruebaCilindroComponent } from '../../jefelab/pruebaCilindro/pruebaCilindro.component';
import { PruebaCuboComponent } from '../../jefelab/pruebaCubo/pruebaCubo.component';
import { PruebaVigaComponent } from '../../jefelab/pruebaViga/pruebaViga.component';

import { ConstruccionComponent } from '../../jefelab/construccion/construccion.component';

import { TecnicosGridComponent } from '../../jefelab/tecnicos-grid/tecnicos-grid.component';
import { HerramientaGridAgregaComponent } from '../../jefelab/herramienta-grida/herramienta-grida.component';
import { TecnicosGridAgregaComponent } from '../../jefelab/tecnicos-grida/tecnicos-grida.component';

import { JLabPendientesComponent } from '../../jefelab/pendientes/pendientes.component';
import { footerEnsayoComponent } from '../../jefelab/footerEnsayo/footerEnsayo.component';

import { llenaFormatoCCHComponent } from '../../jefelab/llenaFormatoCCH/llenaFormatoCCH.component';
import { llenaRevenimientoComponent } from '../../jefelab/llenaRevenimiento/llenaRevenimiento.component';
import { agregaRegistroCCHComponent } from '../../jefelab/agregaRegistroCCH/agregaRegistroCCH.component';
import { agregaRegistroRevenimientoComponent } from '../../jefelab/agregaRegistroRevenimiento/agregaRegistroRevenimiento.component';
import { FormatoCCHGridComponent } from '../../jefelab/formato-cch-grid/formato-cch-grid.component';
import { PendientesPDFGridComponent } from '../../jefelab/pendientes-pdf-grid/pendientes-pdf-grid.component';
import { FormatosGridComponent } from '../../jefelab/formatos-grid/formatos-grid.component';
import { RegistrosRevGridComponent } from '../../jefelab/registrosrev-grid/registrosrev-grid.component';
import { TecGridComponent } from '../../jefelab/tecgrid/tecgrid.component';
import { FechasGridComponent } from '../../jefelab/fechasgrid/fechasgrid.component';
import { OdtEdicionGridComponent } from '../../jefelab/ordenesDeTrabajo-grids/odt-edicion-grid/odt-edicion-grid.component';

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
    ConstruccionComponent,
    ConcreteraComponent,
    CrearConcreteraComponent,
    ConcreteraDetailComponent,
    OrdenTrabajoComponent,
    CrearOrdenTrabajoComponent,
    OrdenTrabajoComponent,
    CrearOrdenTrabajoComponent,
    GridComponent,
    HerramientaGridComponent,
    DashboardComponent,
    TecnicosGridComponent,
    HerramientaGridAgregaComponent,
    TecnicosGridAgregaComponent,
    EvaluaHerraComponent,
    footerEnsayoComponent,
    PruebaCilindroComponent,
    CilindroGenericoComponent,
    PruebaCuboComponent,
    CuboGenericoComponent,
    PruebaVigaComponent,
    VigaGenericoComponent,

    llenaFormatoCCHComponent,
    llenaRevenimientoComponent,
    agregaRegistroCCHComponent,
    agregaRegistroRevenimientoComponent,
    FormatoCCHGridComponent,
    FormatosGridComponent,
    PendientesPDFGridComponent,
    RegistrosRevGridComponent,
    TecGridComponent,
    FechasGridComponent,
    OdtEdicionGridComponent,
    JLabPendientesComponent
  ]
})

export class JefeLabLayoutModule {}
