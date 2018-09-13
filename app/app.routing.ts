import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { JefebLayoutComponent } from './layouts/jefeb-layout/jefeb-layout.component';
import { JefeLabLayoutComponent } from './layouts/JefeLab-layout/jefelab-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TecnicoMLayoutComponent } from './layouts/tecnicom-layout/tecnicom-layout.component';
import { SubAdminLayoutComponent } from './layouts/subadmin-layout/subadmin-layout.component';
import { SoporteLayoutComponent } from './layouts/soporte-layout/soporte-layout.component';
import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
const routes: Routes =[

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{
    path: 'jefeBrigada',
    component:JefebLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/jefeb-layout/jefeb-layout.module#JefebLayoutModule'

  }]},
  {
    path: 'soporte',
    component:SoporteLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/soporte-layout/soporte-layout.module#SoporteLayoutModule'

  }]},
  {
    path: 'administrativo',
    component:SubAdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/subadmin-layout/subadmin-layout.module#SubAdminLayoutModule'

  }]},
   {
    path: 'administrador',
    component: AdminLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'

  }]},

   {
    path: 'jefeLaboratorio',
    component: JefeLabLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/JefeLab-layout/jefelab-layout.module#JefeLabLayoutModule'

  }]},
  {
    path: 'tecnico',
    component: TecnicoMLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/tecnicom-layout/tecnicom-layout.module#TecnicoMLayoutModule'

  }]},
 /* {
    path: '**',
    redirectTo: 'table-list'
  },*/
 
 {
    path: 'login',
    component: LoginComponent
  },
 


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
