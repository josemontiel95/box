import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SubAdminLayoutComponent } from './layouts/subadmin-layout/subadmin-layout.component';
import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
const routes: Routes =[

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
    canActivate: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'

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
