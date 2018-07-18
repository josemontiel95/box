import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Herramienta }    from './Herramienta';
import * as moment from 'moment';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-crear-herramientas',
  templateUrl: './crear-herramientas.component.html',
  styleUrls: ['./crear-herramientas.component.scss']
})
export class CrearHerramientasComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
      mis_tipos: Array<any>;
    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  model = new Herramienta('', '', '', '', '', '', '', '', '');
  condi= [1,2,3,4,5,6,7,8,9,10];
  
  crearHerramienta( fechaDeCompra: string, placas: string, condicion: string, tipo: string, active: string , estatus: string ,error: string ,herramienta_tipo_id: string )
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'insert');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");

    search.set('fechaDeCompra', fechaDeCompra);
    search.set('placas', placas);
    search.set('condicion', condicion);
    search.set('tipo', tipo);    
    search.set('active', active);
    search.set('estatus', estatus);
    search.set('herramienta_tipo_id', herramienta_tipo_id);
    this.http.get(url, {search}).subscribe(res => res.json() );

  }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getAll');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );
  }

   submitted = false;

   regresaUsuario(){
    this.router.navigate(['administrador/herramientas']);
  }

  onSubmit() { this.submitted = true; }

  llenaTipos(resp: any)
  {
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }


}




