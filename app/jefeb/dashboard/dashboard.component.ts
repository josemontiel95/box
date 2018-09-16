import { GridComponent } from '../grid/grid.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {

  global: Global;
  cargando= 1;
      mis_tipos: Array<any>;
    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http,private route: ActivatedRoute) { }
  
 formatos = [{"format":"CONTROL DE CONCRETO HIDRAULICO", "id": "1"},{"format":"REVENIMIENTO", "id":"2"}]
 condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
 areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];
   auxx: any;    
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  tipoForm: FormGroup;
  paseForm: FormGroup;
   id: string;
   id2: string;
   id_formato: string;
   ids: string;
   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;
   hidden = true;
   hiddenDetail = true;
   hiddenHerramienta =true;
   hiddenFormato= true;
   hiddenFormatoDispo = true;
   hiddenTecnicos: any;
   pL;
   
   forma={
     formato_tipo_id:'0'
   };

   pase=
   {
     pass: '',
     correo: ''

   }

   Orden = {
     area: '',
     id_ordenDeTrabajo: '',
     cotizacion_id: '',
     id_cliente: '',
     obra_id: '',
     lugar: '',
     nombreContacto: '',
     telefonoDeContacto: '',
     actividades: '',
     condicionesTrabajo: '',
     jefe_brigada_id: '',
     fechaInicio: '',
     fechaFin: '',
     horaInicio: '',
     horaFin: '',
     laboratorio_id: '',
     observaciones: ''

        //se creo un arreglo llamado cliente con los campos del form
        };  
  
  

  ngOnInit(){
       this.hiddenTecnicos = true;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
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

    url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.ordenForm = new FormGroup({
      'area': new FormControl( {value: this.Orden.area, disabled: this.hidden },  [Validators.required]), 
      'id_ordenDeTrabajo': new FormControl({value: this.Orden.id_ordenDeTrabajo , disabled: this.hidden },  [ Validators.required]),
      'cotizacion_id': new FormControl({value: this.Orden.cotizacion_id, disabled: this.hidden },  [  Validators.required]),
      'id_cliente': new FormControl({value: this.Orden.id_cliente, disabled: this.hidden },  [  Validators.required]), 
      'obra_id': new FormControl({value: this.Orden.obra_id, disabled: this.hidden },  [  Validators.required]),
      'lugar': new FormControl({value: this.Orden.lugar, disabled: this.hidden },  [  Validators.required]), 
      'telefonoDeContacto': new FormControl( {value: this.Orden.telefonoDeContacto, disabled: this.hidden },  [  Validators.required,Validators.pattern("^([0-9])*$")]),
      'nombreContacto': new FormControl({value: this.Orden.nombreContacto, disabled: this.hidden },  [  Validators.required]), 
      'actividades': new FormControl({value: this.Orden.actividades, disabled: this.hidden },  [  Validators.required]), 
      'condicionesTrabajo': new FormControl({value: this.Orden.condicionesTrabajo, disabled: this.hidden },  [  Validators.required]), 
      'jefe_brigada_id': new FormControl({value: this.Orden.jefe_brigada_id, disabled: this.hidden },  [  Validators.required]), 
      'fechaInicio': new FormControl({value: this.Orden.fechaInicio, disabled: this.hidden },  [  Validators.required]), 
      'fechaFin': new FormControl({value: this.Orden.fechaFin, disabled: this.hidden },  [  Validators.required]), 
      'horaInicio': new FormControl({value: this.Orden.horaInicio, disabled: this.hidden },  [  Validators.required]), 
      'horaFin': new FormControl({value: this.Orden.horaFin, disabled: this.hidden },  [  Validators.required]), 
      'observaciones': new FormControl({value: this.Orden.observaciones, disabled: this.hidden }),       
      'laboratorio_id': new FormControl({value: this.Orden.laboratorio_id, disabled: this.hidden }, [  Validators.required]), 

          });

      this.tipoForm = new FormGroup({'formato_tipo_id': new FormControl(  this.forma.formato_tipo_id)
          });

 

             this.paseForm = new FormGroup({
          'correo': new FormControl(  this.pase.correo, [  Validators.required]),
          'pass': new FormControl(  this.pase.pass, [  Validators.required])
          });

      }

      

   get area() { return this.ordenForm.get('area'); }

   get id_ordenDeTrabajo() { return this.ordenForm.get('id_ordenDeTrabajo'); }
  
   get cotizacion_id() { return this.ordenForm.get('cotizacion_id'); }

   get id_cliente() { return this.ordenForm.get('id_cliente'); }
   
   get obra_id() { return this.ordenForm.get('obra_id'); }
  
   get lugar() { return this.ordenForm.get('lugar'); }

   get telefonoDeContacto() { return this.ordenForm.get('telefonoDeContacto'); }
   
   get nombreContacto() { return this.ordenForm.get('nombreContacto'); }
   
   get actividades() { return this.ordenForm.get('actividades'); }
   
   get condicionesTrabajo() { return this.ordenForm.get('condicionesTrabajo'); }
   
   get jefe_brigada_id() { return this.ordenForm.get('jefe_brigada_id'); } 

   get fechaInicio() { return this.ordenForm.get('fechaInicio'); } 

   get fechaFin() { return this.ordenForm.get('fechaFin'); } 

   get horaInicio() { return this.ordenForm.get('horaInicio'); } 

   get horaFin() { return this.ordenForm.get('horaFin'); } 

   get observaciones() { return this.ordenForm.get('observaciones'); } 

   get laboratorio_id() { return this.ordenForm.get('laboratorio_id'); } 

   get formato_tipo_id() {return this.tipoForm.get('formato_tipo_id');}
  
   get correo() { return this.paseForm.get('correo'); }

   get pass() { return this.paseForm.get('pass'); }

    mostrar()
  {

    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.ordenForm.controls).forEach((controlName) => {
        this.ordenForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }

  mostrarHerramienta()
  {
    this.hiddenHerramienta = !this.hiddenHerramienta;


  }

          mostrarDetalles2()
  {
     this.hiddenDetail = !this.hiddenDetail;
  }


  pasarlista(){
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'pasarLista');
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);

    formData.append('id_tecnicos_ordenDeTrabajo', this.ids);
    formData.append('email',                      this.paseForm.value.correo);
    formData.append('contrasena',                 this.paseForm.value.pass);  

    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
    this.hiddenTecnicos = true;
  }

   respuestaSwitch(res: any){
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       //window.alert("Insertado con exito.");
     }
   }

    mostrarTecnicos()
  {
    this.hiddenTecnicos = !this.hiddenTecnicos;
  }

   submitted = false;

  pasaTec(pL: any) {
    console.log("pasaTec :: pL[0].id: "+pL[0].id);
    this.pL=pL[0];

    this.hiddenTecnicos=pL[0].estado;
    this.ids= pL[0].id;

    console.log("pasaTec :: this.ids: "+this.ids); false 
    console.log("pasaTec :: this.hiddenTecnicos: "+this.hiddenTecnicos); 1034
  }   

  mostrarDetalles()
  {
     this.hiddenDetail = !this.hiddenDetail;
  }

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

  llenaJefe(resp: any){
    this.mis_jefes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_jefes[_i]=resp[_i];

    }
    console.log(this.mis_jefes);
    this.cargando=this.cargando-1;
  }

    llenado(respuesta: any){
    console.log(respuesta);

    this.ordenForm.patchValue({
     area: respuesta.area,
     id_ordenDeTrabajo: respuesta.id_ordenDeTrabajo,
     cotizacion_id:  respuesta.cotizacion_id,
     id_cliente:  respuesta.id_cliente,
     obra_id:  respuesta.obra_id,
     lugar:  respuesta.lugar,
     nombreContacto: respuesta.nombreContacto,
     telefonoDeContacto:  respuesta.telefonoDeContacto,
     actividades:  respuesta.actividades,
     condicionesTrabajo:  respuesta.condicionesTrabajo,
     jefe_brigada_id:  respuesta.jefe_brigada_id,
     fechaInicio:   respuesta.fechaInicio,
     fechaFin:  respuesta.fechaFin,
     horaInicio:  respuesta.horaInicio,
     horaFin:  respuesta.horaFin,
     observaciones: respuesta.observaciones,
     laboratorio_id: respuesta.laboratorio_id

    });

    if(respuesta.isClienteActive==0){
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    }

     
  }

  addCliente(id_cliente: any,cliente: any){
    let aux= new Array(this.mis_cli.length+1);
    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_cli[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_cliente':id_cliente,'nombre':"*Desactivado*"+cliente+"*Desactivado*"};
      }
    }
    this.mis_cli= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_cli[_i]=aux[_i];
    }
  }

    llenaLaboratorio(resp: any)
  {
        console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

  mostrarFormatos()
  {
    this.hiddenFormato = !this.hiddenFormato;
  }

  ocultarFormatos()
  {
    this.hiddenFormato = true;
  }

  creaIDFormatoCCH(){
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'initInsertCCH');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_ordenDeTrabajo', this.id);
    this.http.post(url, formData).subscribe(res => {
                                              this.asignaIDFormato(res.json());
                                              this.respuestaSwitch(res.json());                 
    });
  }
    creaIDFormatoCCHRev(){
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'initInsertRev');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_ordenDeTrabajo', this.id);
    this.http.post(url, formData).subscribe(res => {
                                              this.asignaIDFormatoRev(res.json());
                                              this.respuestaSwitch(res.json());                 
    });
  }

  asignaIDFormato(res:any){

    this.id_formato = res.id_formatoCampo;
    this.id2 = this.id_formato;
   this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/crear-llenaFormatoCCH/'+this.id + "/" + this.id2]); 
  }

  asignaIDFormatoRev(res:any){

    this.id_formato = res.id_formatoRegistroRev;
    this.id2 = this.id_formato;

     this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/crear-llenaRevenimiento/'+this.id + "/" + this.id2]);
  }
  seleccionaFormato(){

    if(this.tipoForm.value.formato_tipo_id == 0){
      window.alert("Por favor selecciona un Formato");
    }else{
      if(this.tipoForm.value.formato_tipo_id == 1){
        if(window.confirm("¿Estas seguro de crear un nuevo Formato de CCH para concreto, ya no podras eliminarlo mas adelante.")){
            this.creaIDFormatoCCH();
          }

      }
      else 
        if(this.tipoForm.value.formato_tipo_id == 2){
          if(window.confirm("¿Estas seguro de crear un nuevo Formato  Revenimiento, ya no podras eliminarlo mas adelante.")){
            this.creaIDFormatoCCHRev();
          }



       
      }
    }
    
  }

    actualizarOrden()
  {
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);           
    formData.append('id_ordenDeTrabajo', this.id);
     formData.append('rol_usuario_id',  this.global.rol);
    formData.append('cotizacion_id',  this.ordenForm.value.cotizacion_id);
    formData.append('area', this.ordenForm.value.area);           
    formData.append('obra_id', this.ordenForm.value.obra_id);
    formData.append('actividades',  this.ordenForm.value.actividades);
    formData.append('condicionesTrabajo', this.ordenForm.value.condicionesTrabajo);
    formData.append('fechaInicio', this.ordenForm.value.fechaInicio);           
    formData.append('fechaFin', this.ordenForm.value.fechaFin);
    formData.append('horaInicio',  this.ordenForm.value.horaInicio);
    formData.append('horaFin', this.ordenForm.value.horaFin);           
    formData.append('observaciones',this.ordenForm.value.observaciones);
    formData.append('lugar',  this.ordenForm.value.lugar);
    formData.append('jefe_brigada_id', this.ordenForm.value.jefe_brigada_id);
    formData.append('laboratorio_id',  this.ordenForm.value.laboratorio_id);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
    this.cargando = 1;
    console.log(this.cargando);
  }
 

}