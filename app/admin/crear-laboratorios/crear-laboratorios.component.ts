import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Laboratorios }    from './Laboratorios';
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
  selector: 'app-crear-laboratorios',
  templateUrl: './crear-laboratorios.component.html',
  styleUrls: ['./crear-laboratorios.component.scss']
})
export class CrearLaboratoriosComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
    mis_tipos: Array<any>;
    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  model = new Laboratorios('', '', '', '', '', '', '');
  condi= [1,2,3,4,5,6,7,8,9,10];
  
  crearHerramienta(  laboratorio: string, herramienta_tipo_id: string, estado: string, municipio: string )
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/laboratorio/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', "1001");

    formData.append('laboratorio', laboratorio);
      
    formData.append('estado', estado);
    formData.append('municipio', municipio);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            } );

  }


   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       location.reload();
     }
   }


  aver( municipio: string, laboratorio: string, estado: string, herramienta_tipo_id: string )
  {
    console.log(municipio,
    laboratorio,
    estado,
    herramienta_tipo_id);

  }
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getAllUser');
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




