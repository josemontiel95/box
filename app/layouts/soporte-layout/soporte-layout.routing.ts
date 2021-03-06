import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../soporte/user-profile/user-profile.component';
import { DashboardComponent } from '../../soporte/dashboard/dashboard.component';
/*

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
*/


export const SoporteLayoutRoutes: Routes = [
	{ path: '',      		  redirectTo: 'user-profile', pathMatch: 'full', },
    { path: 'user-profile',   component: UserProfileComponent },
 	{ path: 'dashboard',      component: DashboardComponent },
    /*


    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },*/
  
];
