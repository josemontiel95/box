import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CrearUsuarioComponent } from '../../crear-usuario/crear-usuario.component';
import { InsertarFotoComponent } from '../../insertar-foto/insertar-foto.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PruebaComponent } from '../../prueba/prueba.component';
import { HerramientasComponent } from '../../herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../crear-herramientas/crear-herramientas.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'crear-usuario',   component: CrearUsuarioComponent },
    { path: 'insertar-foto',   component: InsertarFotoComponent },
    { path: 'prueba',  		  component: PruebaComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'usuarios',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'crear-herramientas',  component: CrearHerramientasComponent },

];
