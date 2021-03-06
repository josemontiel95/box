import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../jefelab/user-profile/user-profile.component';
import { ObraDetailComponent } from '../../jefelab/obra-detail/obra-detail.component';
import { CrearObraComponent } from '../../jefelab/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../jefelab/insertar-foto/insertar-foto.component';
import { InsertarFotoClienteComponent } from '../../jefelab/insertar-fotocliente/insertar-fotocliente.component';
import { ObrasComponent } from '../../jefelab/obras/obras.component';
import { PruebaComponent } from '../../prueba/prueba.component';
import { HerramientasComponent } from '../../jefelab/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../jefelab/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../jefelab/herramienta-detail/herramienta-detail.component';
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

import { PruebaCilindroComponent } from '../../jefelab/pruebaCilindro/pruebaCilindro.component';
import { PruebaCuboComponent } from '../../jefelab/pruebaCubo/pruebaCubo.component';
import { PruebaVigaComponent } from '../../jefelab/pruebaViga/pruebaViga.component';

import { ConstruccionComponent } from '../../jefelab/construccion/construccion.component';

import { TecnicosGridComponent } from '../../jefelab/tecnicos-grid/tecnicos-grid.component';
import { HerramientaGridAgregaComponent } from '../../jefelab/herramienta-grida/herramienta-grida.component';
import { TecnicosGridAgregaComponent } from '../../jefelab/tecnicos-grida/tecnicos-grida.component';

import { JLabPendientesComponent } from '../../jefelab/pendientes/pendientes.component';

import { llenaFormatoCCHComponent } from '../../jefelab/llenaFormatoCCH/llenaFormatoCCH.component';
import { llenaRevenimientoComponent } from '../../jefelab/llenaRevenimiento/llenaRevenimiento.component';
import { agregaRegistroCCHComponent } from '../../jefelab/agregaRegistroCCH/agregaRegistroCCH.component';
import { agregaRegistroRevenimientoComponent } from '../../jefelab/agregaRegistroRevenimiento/agregaRegistroRevenimiento.component';


export const JefeLabLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },

    { path: 'obras',          component: ObrasComponent },
    { path: 'obras/obra-detail/:id',   component: ObraDetailComponent },
    { path: 'obras/crear-obra',   component: CrearObraComponent },

    { path: 'orden-trabajo/dashboard/:id',      component: DashboardComponent },
    { path: 'orden-trabajo',      component: OrdenTrabajoComponent },
    { path: 'orden-trabajo/crear-orden-trabajo',   component: CrearOrdenTrabajoComponent }, 
    { path: 'orden-trabajo/dashboard/evaluaherra/:id',      component: EvaluaHerraComponent },
    { path: 'orden-trabajo/dashboard/llenaFormatoCCH/:id2/:id/:id3',      component: llenaFormatoCCHComponent },
    { path: 'orden-trabajo/dashboard/llenaRevenimiento/:id2/:id',      component: llenaRevenimientoComponent },
    { path: 'orden-trabajo/dashboard/agregaRegistroCCH/:id/:id2/:id3/:id4',      component: agregaRegistroCCHComponent },
    { path: 'orden-trabajo/dashboard/agregaRegistroRevenimiento/:id/:id2/:id3',      component: agregaRegistroRevenimientoComponent },   
    { path: 'orden-trabajo/dashboard/pruebaCilindro/:id/:id2/:id3/:id4',      component: PruebaCilindroComponent },
    { path: 'orden-trabajo/dashboard/pruebaCubo/:id/:id2/:id3/:id4',      component: PruebaCuboComponent },
    { path: 'orden-trabajo/dashboard/pruebaViga/:id/:id2/:id3/:id4',      component: PruebaCuboComponent },


    { path: 'pendientes',  component: JLabPendientesComponent },

    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'herramientas/herramienta-detail/:id',   component: HerramientaDetailComponent },
    { path: 'herramientas/crear-herramientas',  component: CrearHerramientasComponent },

    { path: 'clientes',  component: ClientesComponent }, 
    { path: 'clientes/cliente-detail/:id',   component: ClienteDetailComponent },
    { path: 'clientes/crear-cliente',  component: CrearClienteComponent },


    { path: 'concretera',  component: ConcreteraComponent },
    { path: 'concretera-detail/:id',   component: ConcreteraDetailComponent }, 
    { path: 'crear-concretera',  component: CrearConcreteraComponent },

    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },
    { path: 'insertar-fotocliente/:id',   component: InsertarFotoClienteComponent },
];
