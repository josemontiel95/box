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
    { path: 'orden-trabajo', title: 'Orden de Trabajo',  icon:'now-ui-icons files_paper', class: '' },


];

@Component({
  selector: 'app-sidebar-jefeb',
  templateUrl: './sidebarjefeb.component.html',
  styleUrls: ['./sidebarjefeb.component.css']
})
export class SidebarJefebComponent implements OnInit {
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
