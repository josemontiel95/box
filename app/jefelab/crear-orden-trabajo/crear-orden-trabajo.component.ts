import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { OrdenTrabajo }    from './OrdenTrabajo';
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
  selector: 'app-crear-orden-trabajo',
  templateUrl: './crear-orden-trabajo.component.html',
  styleUrls: ['./crear-orden-trabajo.component.scss']
})
export class CrearOrdenTrabajoComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
      mis_tipos: Array<any>;

  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
  areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];

  ordenForm: FormGroup; //se crea un formulario de tipo form group

   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;
   mis_lab: Array<any>;

   Orden = {
     obra_id: '',
     actividades: '',
     condicionesTrabajo: '',
     fechaInicio: '',
     fechaFin: '',
     horaInicio: '',
     horaFin: '',
     observaciones: '',
     lugar: '',
     jefe_brigada_id: '',
     area:''
   };  
  
  crearOrdenTrabajo(){
    console.log("crearOrdenTrabajo :: "+this.ordenForm.value.obra_id);
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertJefeLabo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('obra_id',              this.ordenForm.value.obra_id);  
    formData.append('actividades',          this.ordenForm.value.actividades);
    formData.append('condicionesTrabajo',   this.ordenForm.value.condicionesTrabajo); 
    formData.append('fechaInicio',          this.ordenForm.value.fechaInicio);
    formData.append('fechaFin',             this.ordenForm.value.fechaFin);  
    formData.append('horaInicio',           this.ordenForm.value.horaInicio);
    formData.append('horaFin',              this.ordenForm.value.horaFin); 
    formData.append('observaciones',        this.ordenForm.value.observaciones);
    formData.append('lugar',                this.ordenForm.value.lugar);  
    formData.append('jefe_brigada_id',      this.ordenForm.value.jefe_brigada_id);
    formData.append('area',                 this.ordenForm.value.area);
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
       this.router.navigate(['jefeLaboratorio/orden-trabajo']);
     }
   }



  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

    url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaObra(res.json());
                                                   this.labValidator(res.json());
                                                 });

    url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaLaboratorio(res.json());
                                                   this.labValidator(res.json());
                                                 });

    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getJefesBrigadaForDroptdown');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaJefe(res.json());
                                                   this.labValidator(res.json());
                                                 });

    this.ordenForm = new FormGroup({
      'obra_id':             new FormControl(this.Orden.obra_id,  [ Validators.required]),
      'actividades':         new FormControl(this.Orden.actividades,  [  Validators.required]),
      'condicionesTrabajo':  new FormControl(this.Orden.condicionesTrabajo,  [  Validators.required]),
      'fechaInicio':         new FormControl(this.Orden.fechaInicio,  [  Validators.required]), 
      'fechaFin':            new FormControl(this.Orden.fechaFin,  [  Validators.required]),
      'horaInicio':          new FormControl(this.Orden.horaInicio,  [  Validators.required]), 
      'horaFin':             new FormControl(this.Orden.horaFin,  [  Validators.required]), 
      'observaciones':       new FormControl(this.Orden.observaciones,  [  Validators.required]), 
      'lugar':               new FormControl(this.Orden.lugar,  [  Validators.required]), 
      'jefe_brigada_id':     new FormControl(this.Orden.jefe_brigada_id,  [  Validators.required]), 
      'area':                new FormControl(this.Orden.area,  [  Validators.required])
    });
  }

  get obra_id()             { return this.ordenForm.get('obra_id'); }
  get actividades()         { return this.ordenForm.get('actividades'); }
  get condicionesTrabajo()  { return this.ordenForm.get('condicionesTrabajo'); }
  get fechaInicio()         { return this.ordenForm.get('fechaInicio'); }
  get fechaFin()            { return this.ordenForm.get('fechaFin'); }
  get horaInicio()          { return this.ordenForm.get('horaInicio'); }
  get horaFin()             { return this.ordenForm.get('horaFin'); }
  get observaciones()       { return this.ordenForm.get('observaciones'); }
  get lugar()               { return this.ordenForm.get('lugar'); }
  get jefe_brigada_id()     { return this.ordenForm.get('jefe_brigada_id'); } 
  get area()                { return this.ordenForm.get('area'); } 


  submitted = false;

  regresaOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo']);
  }

  onSubmit() { this.submitted = true; }

  llenaTipos(resp: any){
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }



  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaClientes(resp: any){
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    console.log(this.mis_cli);
    this.cargando=this.cargando-1;
  }

  llenaObra(resp: any){
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_obras[_i]=resp[_i];

    }
    console.log(this.mis_obras);
    this.cargando=this.cargando-1;
  }

  llenaJefe(resp: any){
    this.mis_jefes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_jefes[_i]=resp[_i];

    }
    console.log(this.mis_jefes);
    this.cargando=this.cargando-1;
  }

  llenaLaboratorio(resp: any){
        console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }


}




