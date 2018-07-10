import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebars/sidebar/sidebar.component';
import { SidebarAdministrativoComponent } from './sidebars/sidebarAdministrativo/sidebarAdministrativo.component';
import { SidebarJefebComponent } from './sidebars/sidebarJefeB/sidebarjefeb.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarJefebComponent,
    SidebarComponent,
    SidebarAdministrativoComponent,
    SidebarJefebComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarJefebComponent,
    SidebarComponent,
    SidebarAdministrativoComponent,
    SidebarJefebComponent,
  ]
})
export class ComponentsModule { }
