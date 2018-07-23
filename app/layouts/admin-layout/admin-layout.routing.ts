import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
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

export const AdminLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-detail/:id',   component: UserDetailComponent },
    { path: 'obra-detail/:id',   component: ObraDetailComponent },
    { path: 'herramienta-detail/:id',   component: HerramientaDetailComponent },
    { path: 'cliente-detail/:id',   component: ClienteDetailComponent },
    { path: 'concretera-detail/:id',   component: ConcreteraDetailComponent },    
    { path: 'crear-usuario',   component: CrearUsuarioComponent },
    { path: 'crear-obra',   component: CrearObraComponent },
    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },
    { path: 'insertar-fotocliente/:id',   component: InsertarFotoClienteComponent },
    { path: 'prueba',  		  component: PruebaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'usuarios',          component: IconsComponent },
    { path: 'obras',          component: ObrasComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'crear-herramientas',  component: CrearHerramientasComponent },
    { path: 'clientes',  component: ClientesComponent }, 
    { path: 'crear-cliente',  component: CrearClienteComponent },
    { path: 'concretera',  component: ConcreteraComponent },
    { path: 'crear-concretera',  component: CrearConcreteraComponent },
];
