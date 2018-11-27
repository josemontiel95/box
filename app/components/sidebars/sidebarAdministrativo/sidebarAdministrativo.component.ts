import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'user-profile', title: 'Mi Perfil',  icon:'users_circle-08', class: '' },
    { path: 'obras', title: 'Pendientes',  icon:'design_bullet-list-67', class: '' },
    { path: 'terminados', title: 'Historico',  icon:'now-ui-icons files_box', class: '' },
    //{ path: 'icons', title: 'Tickets',  icon:'education_paper', class: '' },
];

@Component({
  selector: 'app-sidebar-administrativo',
  templateUrl: './sidebarAdministrativo.component.html',
  styleUrls: ['./sidebarAdministrativo.component.css']
})
export class SidebarAdministrativoComponent implements OnInit {
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
