import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Obra }    from './Obra';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

  //Esto es un dummy, borralo despues.

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.scss','../../loadingArrows.css']
})
export class CrearObraComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    id_obra: string ;
    obra: string;
    revenimiento: string;
    incertidumbre: string;
    prefijo: string;
    fechaDeCre: string;
    foto: string;
    cliente_id: string;
    id_concretera: string;
    tipo: string;
    laboratorio: string;
    descripcion: string;
    submitted = false;
    hidden = false;
    cargando= 2;
    mis_con: Array<any>;
    mis_cli: Array<any>;
 
   model = new Obra(this.id_obra,
                       this.id_concretera,
                       this.obra,
                       this.revenimiento,
                       this.incertidumbre,
                       this.prefijo,
                       this.fechaDeCre,
                       this.foto,
                       this.descripcion,
                       this.laboratorio,
                       this.tipo,
                       this.cliente_id,);

  crearMessage: string= "";
  crearMessageCargando: string= "";


    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;
    let url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
  let search = new URLSearchParams();
  search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
  this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

     url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });

  }

  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaRoles(resp: any)
  {
    this.mis_con= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_con[_i]=resp[_i];
    }
    console.log(this.mis_con);
    this.cargando=this.cargando-1;
  }

  llenaClientes(resp: any)
  {
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    console.log(this.mis_cli);
    this.cargando=this.cargando-1;
  }

  regresaObra(){
    this.router.navigate(['administrador/obras']);
  }

//insertar-foto


  onSubmit() { this.submitted = true; }


  crearObra(obra: string, revenimiento: string, incertidumbre : string, prefijo: string, cliente_id: string, tipo: string, descripcion: string, fechaDeCre: string, id_concretera:string )
  {
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/obra/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', "1001");
    formData.append('obra', obra);
    formData.append('revenimiento', revenimiento);
    formData.append('incertidumbre', incertidumbre);
    formData.append('prefijo', prefijo);
    formData.append('cliente_id', cliente_id);
    formData.append('concretera', id_concretera);
    formData.append('tipo', tipo);
    formData.append('descripcion', descripcion);
    formData.append('fechaDeCreacion', fechaDeCre);
    this.crearMessageCargando="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );
    

  }

  diplay(crearResp: CrearResp){
    
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      //setTimeout(()=>{ this.router.navigate(['administrador/insertar-foto/'+crearResp.id_obra])}, 1500);
       
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
    this.cargando=this.cargando-1;
    this.router.navigate(['administrador/obras']);
  }


}