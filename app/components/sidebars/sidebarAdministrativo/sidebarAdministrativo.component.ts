import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'user-profile', title: 'Mi Perfil',  icon:'education_agenda-bookmark', class: '' },
    { path: 'ordenes', title: 'Ordenes Completadas',  icon:'files_single-copy-04', class: '' },
    { path: 'obras', title: 'Obras',  icon:'now-ui-icons travel_istanbul', class: '' },
    { path: 'icons', title: 'Tickets',  icon:'education_paper', class: '' },
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
