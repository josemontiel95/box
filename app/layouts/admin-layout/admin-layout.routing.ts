import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { UserDetailComponent } from '../../admin/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../admin/obra-detail/obra-detail.component';
import { CrearUsuarioComponent } from '../../admin/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../admin/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../admin/insertar-foto/insertar-foto.component';
import { InsertarFotoClienteComponent } from '../../admin/insertar-fotocliente/insertar-fotocliente.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { ObrasComponent } from '../../admin/obras/obras.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PruebaComponent } from '../../prueba/prueba.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../admin/herramienta-detail/herramienta-detail.component';
import { ClientesComponent } from '../../admin/clientes/clientes.component';
import { CrearClienteComponent } from '../../admin/crear-cliente/crear-cliente.component';
import { ClienteDetailComponent } from '../../admin/cliente-detail/cliente-detail.component';
import { ConcreteraComponent } from '../../admin/concretera/concretera.component';
import { CrearConcreteraComponent } from '../../admin/crear-concretera/crear-concretera.component';
import { ConcreteraDetailComponent } from '../../admin/concretera-detail/concretera-detail.component';
import { TiposDeHerramientaComponent } from '../../admin/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../admin/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../admin/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    
    { path: 'usuarios',          component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },
    { path: 'usuarios/crear-usuario',   component: CrearUsuarioComponent },

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
    { path: 'prueba',  		  component: PruebaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },

    { path: 'tipos-de-herramienta',  component: TiposDeHerramientaComponent },
    { path: 'crear-tipo-de-herramienta',  component: CrearTipoHerramientasComponent },
    { path: 'tipo-de-herramienta-detail/:id',  component: TipoHerramientaDetailComponent },

];
