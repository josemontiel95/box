import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../jefelab/user-profile/user-profile.component';
import { ObraDetailComponent } from '../../jefelab/obra-detail/obra-detail.component';
import { CrearObraComponent } from '../../jefelab/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../jefelab/insertar-foto/insertar-foto.component';
import { InsertarFotoClienteComponent } from '../../jefelab/insertar-fotocliente/insertar-fotocliente.component';

import { ObrasComponent } from '../../jefelab/obras/obras.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
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

export const JefeLabLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },

    { path: 'obras',          component: ObrasComponent },
    { path: 'obras/obra-detail/:id',   component: ObraDetailComponent },
    { path: 'obras/crear-obra',   component: CrearObraComponent },

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
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },

];
