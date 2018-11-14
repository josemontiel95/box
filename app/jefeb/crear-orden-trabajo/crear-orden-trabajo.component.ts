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


 
  global: Global;
  cargando= 1;
      mis_tipos: Array<any>;
    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
 condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
        
  ordenForm: FormGroup; //se crea un formulario de tipo form group

   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;

   Orden = {
     area: '',
     orden: '',
     cotizacion: '',
     cliente: '',
     obra: '',
     direccion: '',
     nombre: '',
     telefono: '',
     actividades: '',
     condicion: '',
     equipo: '',
     jefeb: '',
     fechainicio: '',
     fechatermnio: '',
     horainicio: '',
     horatermino: '',
     observacio: ''

        //se creo un arreglo llamado cliente con los campos del form
        };  
  
  crearOrdenTrabajo()
  {
      this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    /*formData.append('placas', placas);
    formData.append('herramienta_tipo_id',herramienta_tipo_id);  
    formData.append('condicion', condicion);
    formData.append('fechaDeCompra', fechaDeCompra); */
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

    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getJefesBrigadaForDroptdown');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaJefe(res.json());
                                                   this.labValidator(res.json());
                                                 });


    this.ordenForm = new FormGroup({
      'area': new FormControl( this.Orden.area,  [Validators.required]), 
      'orden': new FormControl(this.Orden.orden,  [ Validators.required]),
      'cotizacion': new FormControl(this.Orden.cotizacion,  [  Validators.required]),
      'cliente': new FormControl(this.Orden.cliente,  [  Validators.required]), 
      'obra': new FormControl(this.Orden.obra,  [  Validators.required]),
      'direccion': new FormControl(this.Orden.direccion,  [  Validators.required]), 
      'telefono': new FormControl( this.Orden.telefono,  [  Validators.required,Validators.pattern("^([0-9])*$")]),
      'nombre': new FormControl(this.Orden.nombre,  [  Validators.required]), 
      'actividades': new FormControl(this.Orden.actividades,  [  Validators.required]), 
      'condicion': new FormControl(this.Orden.condicion,  [  Validators.required]), 
      'equipo': new FormControl(this.Orden.equipo,  [  Validators.required]),       
      'jefeb': new FormControl(this.Orden.jefeb,  [  Validators.required]), 
      'fechainicio': new FormControl(this.Orden.fechainicio,  [  Validators.required]), 
      'fechatermnio': new FormControl(this.Orden.fechatermnio,  [  Validators.required]), 
      'horainicio': new FormControl(this.Orden.horainicio,  [  Validators.required]), 
      'horatermino': new FormControl(this.Orden.horatermino,  [  Validators.required]), 
      'observacio': new FormControl(this.Orden.observacio),       
  
          });


  }

   get area() { return this.ordenForm.get('area'); }

   get orden() { return this.ordenForm.get('orden'); }
  
   get cotizacion() { return this.ordenForm.get('cotizacion'); }

   get cliente() { return this.ordenForm.get('cliente'); }
   
   get obra() { return this.ordenForm.get('obra'); }
  
   get direccion() { return this.ordenForm.get('direccion'); }

   get telefono() { return this.ordenForm.get('telefono'); }
   
   get nombre() { return this.ordenForm.get('nombre'); }
   
   get actividades() { return this.ordenForm.get('actividades'); }
   
   get condicion() { return this.ordenForm.get('condicion'); }
   
   get equipo() { return this.ordenForm.get('equipo'); } 

   get jefeb() { return this.ordenForm.get('jefeb'); } 

   get fechainicio() { return this.ordenForm.get('fechainicio'); } 

   get fechatermnio() { return this.ordenForm.get('fechatermnio'); } 

   get horainicio() { return this.ordenForm.get('horainicio'); } 

   get horatermino() { return this.ordenForm.get('horatermino'); } 

   get observacio() { return this.ordenForm.get('observacio'); } 




   submitted = false;

   regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo']);
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



    labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
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

    llenaObra(resp: any)
  {
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_obras[_i]=resp[_i];

    }
    console.log(this.mis_obras);
    this.cargando=this.cargando-1;
  }

  llenaJefe(resp: any)
  {
    this.mis_jefes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_jefes[_i]=resp[_i];

    }
    console.log(this.mis_jefes);
    this.cargando=this.cargando-1;
  }


}




