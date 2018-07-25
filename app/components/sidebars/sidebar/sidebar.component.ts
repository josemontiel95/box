import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

declare interface RouteInfo2 {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon:'design_bullet-list-67', class: '' },
    { path: 'user-profile', title: 'Mi perfil',  icon:'users_circle-08', class: '' },
    { path: 'obras', title: 'Obras',  icon:'now-ui-icons travel_istanbul', class: '' },
    ];

export const ROUTES2: RouteInfo2[] = [
   { path: 'concretera', title: 'Concretera',  icon:'shopping_tag-content', class: '' },
   { path: 'tipos-de-herramienta', title: 'Tipos de Herramienta',  icon:'now-ui-icons ui-2_settings-90', class: '' },
   { path: 'herramientas', title: 'Herramienta',  icon:'now-ui-icons ui-2_settings-90', class: '' },
   { path: 'usuarios', title: 'Usuarios',  icon:'users_single-02', class: '' },
   { path: 'laboratorios', title: 'Laboratorios',  icon:'now-ui-icons files_box', class: '' },
   { path: 'clientes', title: 'Clientes',  icon:'shopping_shop', class: '' },

];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItems2: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems2 = ROUTES2.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
