import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Http, URLSearchParams} from '@angular/http';
import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../../loadingArrows.css'] 
})
export class DashboardComponent implements OnInit {

  global: Global;
  cargando= 5;
  mis_lab: Array<any>;
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
  hiddenBotonFormato = false;
  hiddenFormatoDispo = true;
  hiddenTecnicos: any;

  edicionJLab= false;
  ejecucionJBrigada = false;
  terminadoJBrigada = false;
  terminadoJLab = false;

  mensajeStatus = "";
  formatoStatus;

  pL;
   
  forma={
    formato_tipo_id:'0'
  };

  pase={
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
  };  
  
  constructor(private router: Router, private data: DataService, private http: Http,private route: ActivatedRoute) { 
    // Empty Constructor
  }


  ngOnInit(){
    this.hiddenTecnicos = true;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=4;

    let url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    let search = new URLSearchParams();
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
    this.http.get(url, {search}).subscribe(res => {this.llenado(res.json());
                                                  this.statusOrdenTrabajo(res.json());});

   this.ordenForm = new FormGroup({
      'area':                 new FormControl({value: this.Orden.area,                 disabled: true },  [Validators.required]), 
      'id_ordenDeTrabajo':    new FormControl({value: this.Orden.id_ordenDeTrabajo ,   disabled: true },  [ Validators.required]),
      'id_cliente':           new FormControl({value: this.Orden.id_cliente,           disabled: true },  [  Validators.required]), 
      'obra_id':              new FormControl({value: this.Orden.obra_id,              disabled: true },  [  Validators.required]),
      'lugar':                new FormControl({value: this.Orden.lugar,                disabled: true },  [  Validators.required]), 
      'telefonoDeContacto':   new FormControl({value: this.Orden.telefonoDeContacto,   disabled: true },  [  Validators.required,Validators.pattern("^([0-9])*$")]),
      'nombreContacto':       new FormControl({value: this.Orden.nombreContacto,       disabled: true },  [  Validators.required]), 
      'actividades':          new FormControl({value: this.Orden.actividades,          disabled: true },  [  Validators.required]), 
      'condicionesTrabajo':   new FormControl({value: this.Orden.condicionesTrabajo,   disabled: true },  [  Validators.required]), 
      'jefe_brigada_id':      new FormControl({value: this.Orden.jefe_brigada_id,      disabled: true },  [  Validators.required]), 
      'fechaInicio':          new FormControl({value: this.Orden.fechaInicio,          disabled: true },  [  Validators.required]), 
      'fechaFin':             new FormControl({value: this.Orden.fechaFin,             disabled: true },  [  Validators.required]), 
      'horaInicio':           new FormControl({value: this.Orden.horaInicio,           disabled: true },  [  Validators.required]), 
      'horaFin':              new FormControl({value: this.Orden.horaFin,              disabled: true },  [  Validators.required]), 
      'observaciones':        new FormControl({value: this.Orden.observaciones,        disabled: this.hidden }),       
    });
  
    this.tipoForm = new FormGroup({
      'formato_tipo_id': new FormControl(  this.forma.formato_tipo_id)
    });
    
    this.paseForm = new FormGroup({
      'correo': new FormControl(  this.pase.correo, [  Validators.required]),
      'pass': new FormControl(  this.pase.pass, [  Validators.required])
    });

  }

      

   get area()                 { return this.ordenForm.get('area'); }
   get id_ordenDeTrabajo()    { return this.ordenForm.get('id_ordenDeTrabajo'); }
   get id_cliente()           { return this.ordenForm.get('id_cliente'); }
   get obra_id()              { return this.ordenForm.get('obra_id'); }
   get lugar()                { return this.ordenForm.get('lugar'); }
   get telefonoDeContacto()   { return this.ordenForm.get('telefonoDeContacto'); }
   get nombreContacto()       { return this.ordenForm.get('nombreContacto'); }
   get actividades()          { return this.ordenForm.get('actividades'); }
   get condicionesTrabajo()   { return this.ordenForm.get('condicionesTrabajo'); }
   get jefe_brigada_id()      { return this.ordenForm.get('jefe_brigada_id'); } 
   get fechaInicio()          { return this.ordenForm.get('fechaInicio'); } 
   get fechaFin()             { return this.ordenForm.get('fechaFin'); } 
   get horaInicio()           { return this.ordenForm.get('horaInicio'); } 
   get horaFin()              { return this.ordenForm.get('horaFin'); } 
   get observaciones()        { return this.ordenForm.get('observaciones'); }  

   get laboratorio_id() { return this.ordenForm.get('laboratorio_id'); } 
   get formato_tipo_id() {return this.tipoForm.get('formato_tipo_id');}
   get correo() { return this.paseForm.get('correo'); }
   get pass() { return this.paseForm.get('pass'); }

  mostrarDetalles(){
    this.hiddenDetail = !this.hiddenDetail;
    if(this.hiddenDetail == true)
    {
     this.hiddenDetail = false;
    }
  }

  mostrarDetalles2(){
     this.hiddenDetail = !this.hiddenDetail;
  }
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';
    Object.keys(this.ordenForm.controls).forEach((controlName) => {
        this.ordenForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.ordenForm.controls["id_ordenDeTrabajo"]['disable']();
    this.ordenForm.controls["telefonoDeContacto"]['disable']();
    this.ordenForm.controls["nombreContacto"]['disable']();
    this.ordenForm.controls["id_cliente"]['disable']();

    this.ordenForm.controls["area"]['disable']();
    this.ordenForm.controls["jefe_brigada_id"]['disable']();
    this.ordenForm.controls["obra_id"]['disable']();
    this.ordenForm.controls["lugar"]['disable']();

    this.ordenForm.controls["actividades"]['disable']();
    this.ordenForm.controls["condicionesTrabajo"]['disable']();
    this.ordenForm.controls["fechaInicio"]['disable']();
    this.ordenForm.controls["fechaFin"]['disable']();

    this.ordenForm.controls["horaInicio"]['disable']();
    this.ordenForm.controls["horaFin"]['disable']();
  }

  mostrarHerramienta()
  {
    this.hiddenHerramienta = !this.hiddenHerramienta;
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
          this.cargando=0;
       //window.alert("Insertado con exito.");
     }
   }

  mostrarTecnicos(){
    this.hiddenTecnicos = !this.hiddenTecnicos;
  }

   submitted = false;

  pasaTec(pL: any) {
    if(this.ejecucionJBrigada){
      this.pL=pL[0];
      this.hiddenTecnicos=pL[0].estado;
      this.ids= pL[0].id;
    }
  }   

  regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo']);
  }

  onSubmit() { this.submitted = true; }





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
    for (var _i = 0; _i < resp.length; _i++ ){
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
     area:                  respuesta.area,
     id_ordenDeTrabajo:     respuesta.id_ordenDeTrabajo,
     cotizacion_id:         respuesta.cotizacion_id,
     id_cliente:            respuesta.id_cliente,
     obra_id:               respuesta.obra_id,
     lugar:                 respuesta.lugar,
     nombreContacto:        respuesta.nombreContacto,
     telefonoDeContacto:    respuesta.telefonoDeContacto,
     actividades:           respuesta.actividades,
     condicionesTrabajo:    respuesta.condicionesTrabajo,
     jefe_brigada_id:       respuesta.jefe_brigada_id,
     fechaInicio:           respuesta.fechaInicio,
     fechaFin:              respuesta.fechaFin,
     horaInicio:            respuesta.horaInicio,
     horaFin:               respuesta.horaFin,
     observaciones:         respuesta.observaciones,
     laboratorio_id:        respuesta.laboratorio_id

    });

    if(respuesta.isClienteActive==0){
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    } 
  }//Fin llenado

  obtenStatusFormatos(){
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatos');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.validaFormatosVacios(res.json());
    });
  }

  validaFormatosVacios(res: any){

    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0"){
         isValid = false;
      }
    });

    if(!isValid){
      window.alert("Tienes al menos un formato incompleto, todos los formatos deben estar en ESTATUS:1 para completar esta orden de trabajo.");     
    }else{
          if(window.confirm("¿Estas seguro de marcar como completado la orden de trabajo? ya no podra ser editado.")){
            this.completarOrden();
          }
    } 
  } //FIN ValidaCamposVacios

  completarOrden(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upStatusByID');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol); 
    formData.append('id_ordenDeTrabajo', this.id);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
      this.statusOrdenTrabajo(res.json());
    });

  }

  statusOrdenTrabajo(respuesta:any){
    this.formatoStatus= (Number(respuesta.status));

    switch(Number(respuesta.status)){
      case 1:
        this.ejecucionJBrigada = true;
        this.edicionJLab = true;
        this.mensajeStatus = "ORDEN DE TRABAJO EN EJECUCIÓN";
      break;

      case 2:
        this.edicionJLab = false;
        this.hiddenBotonFormato = true;
        this.mensajeStatus = "ORDEN TERMINADA POR EL JEFE DE BRIGADA";
      break;
      case 3:
        this.edicionJLab = false;
        this.hiddenBotonFormato = true;
        this.terminadoJLab = true;
        this.mensajeStatus = "ORDEN COMPLETADA";
      break;
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

  llenaLaboratorio(resp: any){
    console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_lab[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
  }

  mostrarFormatos(){
    this.hiddenFormato = !this.hiddenFormato;
  }

  ocultarFormatos(){
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

  actualizarOrden(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'updateJefeLabo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('area',                this.ordenForm.getRawValue().area);  
    formData.append('id_ordenDeTrabajo',   this.ordenForm.getRawValue().id_ordenDeTrabajo);
    formData.append('obra_id',             this.ordenForm.getRawValue().obra_id);
    formData.append('lugar',               this.ordenForm.getRawValue().lugar);  
    formData.append('actividades',         this.ordenForm.getRawValue().actividades);
    formData.append('condicionesTrabajo',  this.ordenForm.getRawValue().condicionesTrabajo);  
    formData.append('jefe_brigada_id',     this.ordenForm.getRawValue().jefe_brigada_id);
    formData.append('fechaInicio',         this.ordenForm.getRawValue().fechaInicio);
    formData.append('fechaFin',            this.ordenForm.getRawValue().fechaFin);
    formData.append('horaInicio',          this.ordenForm.getRawValue().horaInicio);
    formData.append('horaFin',             this.ordenForm.getRawValue().horaFin);
    formData.append('observaciones',       this.ordenForm.value.observaciones);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    } );
  }
 

}