import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/table-list', title: 'Agenda Diaria',  icon:'education_agenda-bookmark', class: '' },
    { path: '/notifications', title: 'Pendientes',  icon:'files_single-copy-04', class: '' },
    { path: '/icons', title: 'Historial',  icon:'education_paper', class: '' },
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
