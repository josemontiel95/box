import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon:'design_bullet-list-67', class: '' },
    { path: 'user-profile', title: 'Mi perfil',  icon:'users_circle-08', class: '' },
    { path: 'herramientas', title: 'Herramienta',  icon:'now-ui-icons ui-2_settings-90', class: '' },
    { path: 'table-list', title: 'Agenda Diaria',  icon:'education_agenda-bookmark', class: '' },
    { path: 'notifications', title: 'Pendientes',  icon:'files_single-copy-04', class: '' },
    { path: '/icons', title: 'Historial',  icon:'education_paper', class: '' },
    { path: 'maps', title: 'Maps',  icon:'location_map-big', class: '' },
];

@Component({
  selector: 'app-sidebarJefeLab',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarJefeLab implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
