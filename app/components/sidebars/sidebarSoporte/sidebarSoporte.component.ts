import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'user-profile', title: 'Mi perfil',  icon:'users_circle-08', class: '' },
      { path: 'dashboard', title: 'Dashboard',  icon:'design_bullet-list-67', class: '' },
];

@Component({
  selector: 'app-sidebar-soporte',
  templateUrl: './sidebarSoporte.component.html',
  styleUrls: ['./sidebarSoporte.component.css']
})
export class SidebarSoporteComponent implements OnInit {
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
