import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserDetailComponent } from '../../admin/user-detail/user-detail.component';
import { CrearUsuarioComponent } from '../../admin/crear-usuario/crear-usuario.component';
import { InsertarFotoComponent } from '../../admin/insertar-foto/insertar-foto.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PruebaComponent } from '../../prueba/prueba.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../admin/herramienta-detail/herramienta-detail.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-detail/:id',   component: UserDetailComponent },
    { path: 'herramienta-detail/:id',   component: HerramientaDetailComponent },
    { path: 'crear-usuario',   component: CrearUsuarioComponent },
    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },
    { path: 'prueba',  		  component: PruebaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'usuarios',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'crear-herramientas',  component: CrearHerramientasComponent },

];
