import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Http, URLSearchParams} from '@angular/http';
import {
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../../loadingArrows.css'] 
})
export class DashboardComponent implements OnInit {

 
  global: Global;
  cargando= 0;
  areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];

  mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http,private route: ActivatedRoute) { }
  
  condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
  aux= 1;  
  auxx: any;   
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  tipoForm: FormGroup;
  id: string;
  id_herra: string;
  id_tecnicos_ordenDeTrabajo: string;
  aux2: Array<any>;

  aux3: Array<any>;
  mis_cli: Array<any>;
  mis_obras: Array<any>;
  mis_jefes: Array<any>;
  mis_tipos: Array<any>;
  hidden = true
   

  hiddenf= true;
  edicionJLab = true;
  ejecucionJBrigada = false;
  terminadoJBrigada = false;
  terminadoJLab = false;
  rowsHerra=true;
  rowsTecnicos=true;

  mensajeStatus = "";
  formatoStatus;
  botonHerramientaDesElimini="Eliminar Herramienta";
  botonTecnicosDesElimini="Eliminar Tecnico";
  hiddenDetail = true;
  hiddenHerramienta= true;
  hiddenTecnicos= true;
  hiddenTecnicosP= true;
  hiddenHerramientaDispo= true;
  hiddenTecnicosDispo= true; 
  hiddenTotalTecnicos= true;  
  hiddenTotalHerramienta= true;  
  herra = {
    herramienta_tipo_id: ''
  }
  Orden = {
    area: '',
    id_ordenDeTrabajo: '',
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
    observaciones: ''
  };  
  

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=this.cargando+4;
    console.log("DashboardComponent :: ngOnInit :: this.cargando+4");


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownForOrdenServicio');
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
    this.http.get(url, {search}).subscribe(res => {
      this.llenaJefe(res.json());
      this.labValidator(res.json());
    });

    url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
	  this.http.get(url, {search}).subscribe(res =>{
      this.llenado(res.json());
      this.statusOrdenTrabajo(res.json());
    });

    this.ordenForm = new FormGroup({
      'area':                 new FormControl({value: this.Orden.area,                 disabled: this.hidden },  [Validators.required]), 
      'id_ordenDeTrabajo':    new FormControl({value: this.Orden.id_ordenDeTrabajo ,   disabled: this.hidden },  [ Validators.required]),
      'id_cliente':           new FormControl({value: this.Orden.id_cliente,           disabled: this.hidden },  [  Validators.required]), 
      'obra_id':              new FormControl({value: this.Orden.obra_id,              disabled: this.hidden },  [  Validators.required]),
      'lugar':                new FormControl({value: this.Orden.lugar,                disabled: this.hidden },  [  Validators.required]), 
      'telefonoDeContacto':   new FormControl({value: this.Orden.telefonoDeContacto,   disabled: true        },  [  Validators.required,Validators.pattern("^([0-9])*$")]),
      'nombreContacto':       new FormControl({value: this.Orden.nombreContacto,       disabled: true        },  [  Validators.required]), 
      'actividades':          new FormControl({value: this.Orden.actividades,          disabled: this.hidden },  [  Validators.required]), 
      'condicionesTrabajo':   new FormControl({value: this.Orden.condicionesTrabajo,   disabled: this.hidden },  [  Validators.required]), 
      'jefe_brigada_id':      new FormControl({value: this.Orden.jefe_brigada_id,      disabled: this.hidden },  [  Validators.required]), 
      'fechaInicio':          new FormControl({value: this.Orden.fechaInicio,          disabled: this.hidden },  [  Validators.required]), 
      'fechaFin':             new FormControl({value: this.Orden.fechaFin,             disabled: this.hidden },  [  Validators.required]), 
      'horaInicio':           new FormControl({value: this.Orden.horaInicio,           disabled: this.hidden },  [  Validators.required]), 
      'horaFin':              new FormControl({value: this.Orden.horaFin,              disabled: this.hidden },  [  Validators.required]), 
      'observaciones':        new FormControl({value: this.Orden.observaciones,        disabled: this.hidden }),       
    });
  

    this.tipoForm = new FormGroup({
      'herramienta_tipo_id': new FormControl(  this.herra.herramienta_tipo_id, [  Validators.required])
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
   get herramienta_tipo_id()  { return this.tipoForm.get('herramienta_tipo_id'); }

   validateTimes(){
    this.cargando=this.cargando+1;

    let startDate = new Date(this.ordenForm.value.fechaInicio);
    let temp = this.ordenForm.value.horaInicio.split(":");
    startDate.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    startDate.setMinutes(parseInt(temp[1]));

    let endDate = new Date(this.ordenForm.value.fechaFin);
    temp = this.ordenForm.value.horaFin.split(":");
    endDate.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    endDate.setMinutes(parseInt(temp[1]));

    if(startDate >= endDate){
      window.alert("La fecha de inicio debe ser menor que la fecha de fin");
      this.cargando=this.cargando-1;
      return;
    }else if(startDate < endDate){
      
    }
    this.cargando=this.cargando-1;
    this.actualizarOrden();
  }

  actualizarOrden(){
    //console.log("crearOrdenTrabajo :: "+this.ordenForm.value.obra_id);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'updateJefeLabo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('area',                this.ordenForm.value.area);  
    formData.append('id_ordenDeTrabajo',   this.ordenForm.getRawValue().id_ordenDeTrabajo);
    formData.append('obra_id',             this.ordenForm.value.obra_id);
    formData.append('lugar',               this.ordenForm.value.lugar);  
    formData.append('actividades',         this.ordenForm.value.actividades);
    formData.append('condicionesTrabajo',  this.ordenForm.value.condicionesTrabajo);  
    formData.append('jefe_brigada_id',     this.ordenForm.value.jefe_brigada_id);
    formData.append('fechaInicio',         this.ordenForm.value.fechaInicio);
    formData.append('fechaFin',            this.ordenForm.value.fechaFin);
    formData.append('horaInicio',          this.ordenForm.value.horaInicio);
    formData.append('horaFin',             this.ordenForm.value.horaFin);
    formData.append('observaciones',       this.ordenForm.value.observaciones);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            } );
  }

  cambiarCargando(num){
    console.log("#DashboardComponent :: cambiarCargando :: this.cargando + "+num);

    this.cargando=this.cargando + num;
  }

  rollbackCambiarDatos(){
    let search = new URLSearchParams();
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    this.http.get(url, {search}).subscribe(res =>
                                                 {this.llenado(res.json());
                                                  this.statusOrdenTrabajo(res.json());});
  }


  evaluaHerra(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/evaluaherra/'+this.id]);
  } 
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
  }

  mostrarHerramienta(){
    this.hiddenHerramienta = !this.hiddenHerramienta;
    this.hiddenTotalHerramienta = !this.hiddenTotalHerramienta;
  }

  confirmaEliminaHerramienta(){
    if(window.confirm("Estas seguro de la eliminación.") == true){
      if(this.edicionJLab){
        this.eliminarHerramienta();
      }else{
        this.desactivaHerramienta();
      }
    }
    else{
      window.alert("Acción Cancelada.");
    }
  }

  confirmaEliminaTecnico(){
    if(window.confirm("Estas seguro de la eliminación.") == true){
      if(this.edicionJLab){
        this.eliminarTecni();
      }else{
        this.desactivarTecni();
      }
    }
    else{
      window.alert("Acción Cancelada.");
    }
  }

  respuestaSwitch(res: any){
    //console.log(res);
    if(res.error!= 0){
      window.alert("ERROR. Intentalo otra vez");
      location.reload();
    }
    else{
      window.alert("Exito.");
      this.cargando = this.cargando-1;
    }
  }   
 
  eliminaHerra(aux3: any){
    this.aux3=aux3;
  }

  eliminaTec(aux2: any){
    this.aux2=aux2;
    console.log(this.aux2);
  }
  addHerra(aux3: any){
    this.aux3=aux3;
  }
  addTec(aux2: any){
    console.log(aux2);
    this.aux2=aux2;
    console.log(this.aux2);
  }


  mandaTecn(id) {
    this.id_tecnicos_ordenDeTrabajo=id;
    this.hiddenTecnicosP=false;
  }
  
  mostrarHerramientaDisponible(){
    if(this.hiddenHerramientaDispo){
      this.hiddenHerramientaDispo = false;
    }
    else{
      this.hiddenHerramientaDispo = true;
      this.cambiarCargando(+1);
      setTimeout(() =>{
        this.hiddenHerramientaDispo = false;
        this.cambiarCargando(-1);
      },700);
    }
  }

  eliminarHerramienta(){
    this.cargando = this.cargando + 1;
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deleteHerra');
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('herramientasArray', JSON.stringify(this.aux3));
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
      this.hiddenHerramienta  = false;
      this.cargando = this.cargando + 1;
      setTimeout(() =>{ 
        this.hiddenHerramienta  = true;
        this.cargando = this.cargando - 1;
      },1000);    
    });
    
  }
  rowsHerramientaHandler(rows){
    this.rowsHerra=rows;
  }
  rowsTecnicosHandler(rows){
    this.rowsTecnicos=rows;
  }
  desactivaHerramienta(){
    this.cargando = this.cargando + 1;
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deactivateHerra');
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('herramientasArray', JSON.stringify(this.aux3));
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
      this.hiddenHerramienta  = false;
      this.cargando = this.cargando + 1;
      setTimeout(() =>{ 
        this.hiddenHerramienta  = true;
        this.cargando = this.cargando - 1;
      },1000);
    });

    
  }
  
  eliminarTecni(){
    this.cargando = this.cargando + 1;
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deleteTec');
    formData.append('token', this.global.token);           
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id',  this.global.rol);
    formData.append('tecnicosArray',  JSON.stringify(this.aux2));
    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaSwitch(res.json());
      this.hiddenTecnicos  = false;
      this.cargando = this.cargando + 1;
      setTimeout(() =>{ 
        this.hiddenTecnicos  = true;
        this.cargando = this.cargando - 1;
      },1000);
    } );
    
  }

  desactivarTecni(){
    this.cargando = this.cargando + 1;
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deactivateTecnicos');
    formData.append('token', this.global.token);           
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id',  this.global.rol);
    formData.append('tecnicosArray',  JSON.stringify(this.aux2));
    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaSwitch(res.json());
      this.hiddenTecnicos  = false;
      this.cargando = this.cargando + 1;
      setTimeout(() =>{ 
        this.hiddenTecnicos  = true;
        this.cargando = this.cargando - 1;
      },1000);
    });
  }

  actualizarHerramienta(){
    this.cargando = this.cargando + 1;    
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('token', this.global.token);
    formData.append('herramientasArray', JSON.stringify(this.aux3));
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
      this.mostrarHerramienta();
    });
}
  
  actualizarTecnicos(){
    this.cargando = this.cargando + 1;
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);           
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id',  this.global.rol);
    formData.append('tecnicosArray',  JSON.stringify(this.aux2));
    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaSwitch(res.json());
      this.mostrarTecnicos();
    } );
  }
  
  mostrarTecnicos(){
    this.hiddenTecnicos = !this.hiddenTecnicos;
    this.hiddenTotalTecnicos = !this.hiddenTotalTecnicos;
  }

   submitted = false;

  regresaOrdenTrabajo(){
    this.router.navigate(['jefeLaboratorio/orden-trabajo']);
  }

  onSubmit() { this.submitted = true; }

 
  llenaTipos(resp: any){
    //console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("DashboardComponent :: llenaTipos :: this.cargando-1");

  }

  labValidator(repuesta: any){
    //console.log(repuesta)
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
    //console.log(this.mis_cli);
    this.cargando=this.cargando-1;
    console.log("DashboardComponent :: llenaClientes :: this.cargando-1");

  }

  llenaObra(resp: any){
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_obras[_i]=resp[_i];

    }
    //console.log(this.mis_obras);
    this.cargando=this.cargando-1;
    console.log("DashboardComponent :: llenaObra :: this.cargando-1");

  }

  llenaJefe(resp: any){
    this.mis_jefes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_jefes[_i]=resp[_i];

    }
    //console.log(this.mis_jefes);
    this.cargando=this.cargando-1;
    console.log("DashboardComponent :: llenaJefe :: this.cargando-1");

  }

  llenado(respuesta: any){
    console.log(respuesta);
    this.ordenForm.patchValue({
     area:                 respuesta.area,
     id_ordenDeTrabajo:    respuesta.id_ordenDeTrabajo,
     cotizacion_id:        respuesta.cotizacion_id,
     id_cliente:           respuesta.id_cliente,
     obra_id:              respuesta.obra_id,
     lugar:                respuesta.lugar,
     nombreContacto:       respuesta.nombreContacto,
     telefonoDeContacto:   respuesta.telefonoDeContacto,
     actividades:          respuesta.actividades,
     condicionesTrabajo:   respuesta.condicionesTrabajo,
     jefe_brigada_id:      respuesta.jefe_brigada_id,
     fechaInicio:          respuesta.fechaInicio,
     fechaFin:             respuesta.fechaFin,
     horaInicio:           respuesta.horaInicio,
     horaFin:              respuesta.horaFin,
     observaciones:        respuesta.observaciones,
    });    

    if(respuesta.isClienteActive==0)
    {
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    }
  }




  statusOrdenTrabajo(respuesta:any){
    this.formatoStatus= (Number(respuesta.status));

    switch(Number(respuesta.status)){
      
      case 0:
        this.edicionJLab = true;
        this.botonHerramientaDesElimini="Eliminar Asignacion/es";
        this.botonTecnicosDesElimini="Eliminar Asignacion/es";
        this.mensajeStatus = "ACTUALMENTE PUEDES HACER MODIFICACIONES EN LA ORDEN DE TRABAJO ";
      break;

      case 1:
        this.ejecucionJBrigada = true;
        this.edicionJLab = false;
        this.botonHerramientaDesElimini="Desasignar Herramienta/as";
        this.botonTecnicosDesElimini="Desasignar Tecnico/os";
        this.mensajeStatus = "EN EJECUCIÓN DEL JEFE DE BRIGADA";
      break;

      case 2:
        this.terminadoJBrigada = true;
        this.edicionJLab = false;
        this.botonHerramientaDesElimini="Desasignar Herramienta/as";
        this.botonTecnicosDesElimini="Desasignar Tecnico/os";
        this.mensajeStatus = "ORDEN TERMINADA POR EL JEFE DE BRIGADA";
      break;

      case 3:
      this.edicionJLab = false;
      this.terminadoJBrigada = false;
      this.terminadoJLab = true;
      this.botonHerramientaDesElimini="Desasignar Herramienta/as";
      this.botonTecnicosDesElimini="Desasignar Tecnico/os";
      this.mensajeStatus = "ORDEN DE TRABAJO COMPLETADA, YA NO SE PUEDEN HACER MODIFICACIONES";
      break;
    }
  }

  obtenStatusFormatos(){
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatos');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaFormatosVacios(res.json());
                                          });
  }

  validaFormatosVacios(res: any){

    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "1" || value.status == "0" ){
         isValid = false;
      }
    });

    if(!isValid){
      window.alert("Tienes al menos un formato incompleto, todos los formatos deben estar ensayados,autorizados y completados para completar esta orden de trabajo.");     
    }else{
          if(window.confirm("¿Estas seguro de marcar como completado la orden de trabajo? ya no podra ser editado y seras redireccionado a evaluar la herramienta.")){
            this.evaluaHerra();
          }
    } 
  } //FIN ValidaCamposVacios

  validaEnviarJBrigada(){

    if(window.confirm("¿Estas Seguro de Enviar la Orden de Trabajo al Jefe de Brigada?. YA NO PODRAS ELIMINAR HERRAMIENTAS NI TECNICOS DE LA ORDEN") == true){
      this.enviarJbrigada();
    }
  }

  enviarJbrigada(){
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
}
