import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Cliente }    from './cliente';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    id_cliente: string;
    rfc: string;
    razonSocial: string;
    nombre: string;
    email: string;
    telefono: string;
    nombreContacto: string;
    direccion: string;
    telefonoDeContacto: string;
    submitted = false;
    hidden = false;
    mis_roles: Array<any>;
    mis_lab: Array<any>;
 
   model = new Cliente(
    this.id_cliente,
    this.rfc,    
    this.razonSocial,
    this.nombre,    
    this.email,
    this.telefono,
    this.nombreContacto,
    this.direccion,
    this.telefonoDeContacto, "");

  crearMessage: string= "";
  crearMessageCargando: string= "";


    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
  this.http.get(url, {search}).subscribe(res => this.llenaRoles(res.json()) );

     url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => this.llenaLaboratorio(res.json()) );

  }

  llenaRoles(resp: any)
  {
    this.mis_roles= new Array(resp.length);
    var j=resp.length-1;
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_roles[_i]=resp[j];
      j--;

    }
  }

  llenaLaboratorio(resp: any)
  {
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
  }

    regresaCliente(){
    this.router.navigate(['administrador/clientes']);
  }



//insertar-foto


  onSubmit() { this.submitted = true; }


  crearCliente(razonSocial: string,  nombre: string ,  rfc: string, telefonoDeContacto: string ,direccion: string,  email: string, telefono: string,  nombreContacto: string   )
  {
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'insert');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    search.set('razonSocial', razonSocial);
    search.set('nombre', nombre);
    search.set('telefono', telefono);  
    search.set('direccion', direccion); 
    search.set('rfc', rfc);      
    search.set('telefonoDeContacto', telefonoDeContacto);     
    search.set('email', email);  
    search.set('nombreContacto', nombreContacto); 
    this.crearMessageCargando="Cargando...";
    this.http.get(url, {search}).subscribe(res => this.diplay(res.json()) );

  }

 diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/clientes'])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
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