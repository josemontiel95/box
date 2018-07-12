import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent  {
//implements OnInit
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
 
  model = new Usuario('1001', 'Dr IQ', '99999', 'IQ', 'Overstreet','19-05-2010');

  crearMessage: string= "";
  crearMessageCargando: string= "";
  
//insertar-foto


  submitted = false;

  onSubmit() { this.submitted = true; }

  crearUsuario(rol_usuario_id: string, email: string, contrasena: string, nombre: string, apellido: string, laboratorio_id: string, fechaDeNac: string, error: string, envioDatos: boolean = true){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'insert');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('nombre', nombre);
    search.set('apellido', apellido);
    search.set('email', email);
    //search.set('nss', nss);
    search.set('fechaDeNac', fechaDeNac);
    search.set('rol_usuario_id_new', rol_usuario_id);
    search.set('constrasena', contrasena);
    search.set('error', error);
    this.crearMessageCargando="Cargando...";
    this.http.get(url, {search}).subscribe(res => this.diplay(res.json()) );


  }

  diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/insertar-foto/'+crearResp.id_usuario])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
  }


}