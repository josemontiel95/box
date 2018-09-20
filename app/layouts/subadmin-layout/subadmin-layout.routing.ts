import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../administrativo/user-profile/user-profile.component';
import { OrdenesComponent } from '../../administrativo/ordenes/ordenes.component';
import { dashboardLoteComponent } from '../../administrativo/dashboardLote/dashboardLote.component';
import { ObraDetailComponent } from '../../administrativo/obra-detail/obra-detail.component';
import { ObrasComponent } from '../../administrativo/obras/obras.component';
/*
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
*/


export const SubAdminLayoutRoutes: Routes = [
    { path: '',                redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },

    { path: 'obras',          component: ObrasComponent },
    { path: 'obras/obra-detail/:id',   component: ObraDetailComponent },
    { path: 'ordenes',   component: OrdenesComponent },
    { path: 'obras/dashboardLote/:id',   component: dashboardLoteComponent },

    /*
    { path: 'dashboard',      component: DashboardComponent },

    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },*/
  
];
