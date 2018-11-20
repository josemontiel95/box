import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'user-profile', title: 'Mi perfil',  icon:'users_circle-08', class: '' },
    { path: 'pendientes', title: 'Pendientes',  icon:'design_bullet-list-67', class: '' },
    { path: 'historico', title: 'Historico',  icon:'now-ui-icons files_box ', class: '' },

];

@Component({
  selector: 'app-sidebar-tecnicom',
  templateUrl: './sidebartecnicom.component.html',
  styleUrls: ['./sidebartecnicom.component.css']
})
export class  SidebarTecnicoMComponent implements OnInit {
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
