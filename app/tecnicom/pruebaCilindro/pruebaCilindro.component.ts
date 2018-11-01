//import { GridComponent } from '../grid/grid.component';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

//FIN DE LOS IMPORTS

@Component({
  selector: 'app-pruebaCilindro',
  templateUrl: './pruebaCilindro.component.html',
  styleUrls: ['./pruebaCilindro.component.scss','../../loadingArrows.css']
})
export class PruebaCilindroComponent implements OnInit{

  id_Footer:string;
  id_Registro: string;
  id_orden: string;
  id_registro: string;
  id_formato: string;
  campo: "1"; //Esta variable es para seleccionar el campo que se insertara cuando pierda el foco.
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 0;
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;
  oldmembers;
  mis_fallas: Array<any>;
 
  
  formatoCCHForm: FormGroup;
    FormatoCCH = {
    fechaColado:     '',
    infoNo:          '',
    pesoKg:          '',
    clave:           '',
    edadEnsaye:      '',
    diametro1:       '',
    diametro2:       '',
    altura1:         '',
    altura2:         '',
    cargaKg:         '',
    area:            '',
    resCompresion:   '',
    velocidad:       '',
    tiempo:          '',
    falla:           ''
  }

  fallas= [{"falla":"Ninguna Falla", "id": 0},{"falla":1, "id": 1},{"falla":2, "id": 2},{"falla":3, "id": 3},{"falla":4, "id": 4},{"falla":5, "id": 5},{"falla":6, "id": 6}];

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_Footer=params.id; this.id_Registro=params.id2}); //Recibe dos parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cargando = this.cargando + 3;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/ensayoCilindro/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoCilindro', this.id_Registro);
    this.http.get(url, {search}).subscribe(res =>{
      this.llenaRapido(res.json());
      this.llenado(res.json());
      this.llenadoValidator(res.json());
    });

    url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
      this.llenaFallas(res.json());
    });

    url = `${this.global.apiRoot}/ensayoCilindro/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getOldMembers');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoCilindro', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
      this.llamaOldMembers(res.json());
    });
    this.formatoCCHForm = new FormGroup({
      'fechaColado':      new FormControl( {value: this.FormatoCCH.fechaColado, disabled: true}),
      'infoNo':           new FormControl( {value: this.FormatoCCH.infoNo, disabled: true}),
      'clave':            new FormControl( {value: this.FormatoCCH.clave, disabled: true}),
      'pesoKg':           new FormControl( {value: this.FormatoCCH.pesoKg, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'edadEnsaye':       new FormControl( {value: this.FormatoCCH.edadEnsaye, disabled: true}),
      'diametro1':        new FormControl( {value: this.FormatoCCH.diametro1, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'diametro2':        new FormControl( {value: this.FormatoCCH.diametro2, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'altura1':          new FormControl( {value: this.FormatoCCH.altura1, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'altura2':          new FormControl( {value: this.FormatoCCH.altura2, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'cargaKg':          new FormControl( {value: this.FormatoCCH.cargaKg, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'area':             new FormControl( {value: this.FormatoCCH.area, disabled: true}),
      'resCompresion':    new FormControl( {value: this.FormatoCCH.resCompresion, disabled: true}),
      'velocidad':        new FormControl( {value: this.FormatoCCH.velocidad, disabled: true}),
      'tiempo':           new FormControl( {value: this.FormatoCCH.tiempo, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),       
      'falla':            new FormControl( {value: this.FormatoCCH.falla, disabled: this.hidden})});
  }
  
  get fechaColado()   { return this.formatoCCHForm.get('fechaColado'); }
  get infoNo()        { return this.formatoCCHForm.get('infoNo'); }
  get clave()         { return this.formatoCCHForm.get('clave'); }
  get pesoKg()        { return this.formatoCCHForm.get('pesoKg'); }
  get edadEnsaye()    { return this.formatoCCHForm.get('edadEnsaye'); }
  get diametro1()     { return this.formatoCCHForm.get('diametro1'); }
  get diametro2()     { return this.formatoCCHForm.get('diametro2'); } 
  get altura1()       { return this.formatoCCHForm.get('altura1'); }
  get altura2()       { return this.formatoCCHForm.get('altura2'); }
  get cargaKg()       { return this.formatoCCHForm.get('cargaKg'); }  
  get area()          { return this.formatoCCHForm.get('area'); }   
  get resCompresion() { return this.formatoCCHForm.get('resCompresion'); }
  get velocidad()     { return this.formatoCCHForm.get('velocidad'); }        
  get tiempo()        { return this.formatoCCHForm.get('tiempo'); }               
  get falla()         { return this.formatoCCHForm.get('falla'); }                          
   
  submitted = false;

  onSubmit() { this.submitted = true; }

  llenadoValidator(respuesta: any){
    this.cargando = this.cargando -1;
    if(respuesta.error>0){
      window.alert(respuesta.estatus);
    }else{ 
    } //EXITO.
  }

  llenaFallas(resp: any){
    this.cargando = this.cargando -1;
    console.log(resp);
    this.mis_fallas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_fallas[_i]=resp[_i];
    }
    //console.log("llenaFallas this.cargando: "+this.cargando);
  } 
    

  llenado(respuesta: any){
    //console.log(respuesta);
    this.formatoCCHForm.patchValue({
    fechaColado:      respuesta.fechaColado,
    infoNo:           respuesta.informeNo,
    clave:            respuesta.claveEspecimen,
    pesoKg:           respuesta.peso,
    edadEnsaye:       respuesta.diasEnsayeFinal,
    diametro1:        respuesta.d1,
    diametro2:        respuesta.d2,
    altura1:          respuesta.h1,
    altura2:          respuesta.h2,
    cargaKg:          respuesta.carga,
    area:             respuesta.area,
    resCompresion:    respuesta.resCompresion,
    velocidad:        respuesta.velAplicacionExp,
    tiempo:           respuesta.tiempoDeCarga, 
    falla:            respuesta.falla});

    this.onBlurAreaResis();

    if(respuesta.status == 1){
      this.mostrar();
    }  
  }

  //DON'T TOUCH THIS!
  descartaCambios(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deactivate');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_registrosCampo', this.id_registro);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaDescartaCambios(res.json());                 
    });
  }

  llenarDespues(){
    this.cargando = this.cargando +1;
    this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+this.id_Footer]);
  }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }

  registroCompletado(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeEnsayo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitchRegComplete(res.json());                 
    });
  }

  respuestaSwitchRegComplete(res){
    if(res.error!= 0){
      window.alert(res.estatus);
      //console.log(res.estatus);
    }
    else{
      this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+this.id_Footer]);    
    }
  }

  onBlurPesoKg(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.pesoKg);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }
  
  onBlurDiametro1(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.diametro1);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.onBlurAreaResis();
      this.respuestaSwitch(res.json());                 
    });
  }

  onBlurDiametro2(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.diametro2);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.onBlurAreaResis();
      this.respuestaSwitch(res.json());                 
    });
  }

  onBlurAltura1(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.altura1);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }

  onBlurAltura2(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.altura2);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }


  onBlurCargaKg(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '6');
    formData.append('valor', this.formatoCCHForm.value.cargaKg);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.onBlurAreaResis();
      this.respuestaSwitch(res.json());                 
    });
  }
  

  onBlurAreaResis(){
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/ensayoCilindro/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'calcularAreaResis');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ensayoCilindro', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
      //console.log(res); 
      this.onChangeArea(res.json());
      this.onChangeAreaValidator(res.json(),"onBlurAreaResis");
    });
  }

  onChangeAreaValidator(res: any, caller = "N.A."){
    this.cargando = this.cargando -1;
    //console.log(res.area + res.resistencia);
    if(res.error == 5){
      //NOTHING
    }else if(res.error != 0){
      window.alert("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
      console.log("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
    }
  }

  onChangeArea(res: any){
    if(res.area == 0 || res.resistencia == 0){

    }else{
      this.formatoCCHForm.patchValue({
      area: res.area,
      resCompresion: res.resistencia,
      velocidad: res.velAplicacionExp
      });
    }
    
  }
 
  onBlurResCompresion(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.resCompresion);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }

  onBlurVelocidad(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '9'); //Falta cambiar el numero de campo
    formData.append('valor', this.formatoCCHForm.value.velocidad);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }

  onBlurTiempo(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '10'); //Falta cambiar el numero de campo
    formData.append('valor', this.formatoCCHForm.value.tiempo);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());   
      this.onBlurAreaResis();          
    });
  }

  onBlurFalla(){
    this.cargando = this.cargando + 1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoCilindro/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.falla);
    formData.append('id_ensayoCilindro', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    });
  }

  respuestaDescartaCambios(res: any){ 
    console.log(res);
    if(res.error!= 0){
      window.alert(res.estatus);
      location.reload();
    }
    else{
      this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+ this.id_orden + '/' + this.id_formato]);        
    }
  }

  respuestaSwitch(res: any, caller = "N.A."){
    this.cargando = this.cargando -1; 
    console.log("respuestaSwitch :: res:");
    console.log(res);
    if(res.error!= 0){
      window.alert("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
      console.log("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
    }
    else{    
    }
   }

  ocultar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });    
  }
  
  cambiarDatos(){
    if(window.confirm("¿Estas seguro de cambiar los datos de este registro?.")){
      //window.alert("Aqui voy a llamar a la conexion la funcion de la BD");
      if(window.confirm("ESTA ACCIÓN PROVOCARÁ QUE SE ENVIE UN NUEVO CORREO NOTIFICANDO AL CLIENTE DEL CAMBIO. EL ADMINISTRADOR SERA NOTIFICADO DE ESTE CAMBIO. ¿Esta seguro de continuar?")){
      //window.alert("Aqui voy a llamar a la conexion la funcion de la BD");
      this.mostrar();
      }
    }
  }

  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.formatoCCHForm.controls['fechaColado']['disable']();
    this.formatoCCHForm.controls['infoNo']['disable']();
    this.formatoCCHForm.controls['clave']['disable']();
    this.formatoCCHForm.controls['edadEnsaye']['disable']();
    this.formatoCCHForm.controls['area']['disable']();
    this.formatoCCHForm.controls['resCompresion']['disable']();
  }

  validaCamposVacios(){
    let warning = false;
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
      if(this.formatoCCHForm.controls[controlName].value == "" || this.formatoCCHForm.controls[controlName].value == null || this.formatoCCHForm.controls[controlName].value == "null"){
        warning = true;
      }// disables/enables each form control based on 'this.formDisabled'
    });

    if(warning){
      window.alert("Tienes al menos un campo vacio, verifica tus datos.");     
    }else{
      if(window.confirm("¿Estas seguro de marcar como completado el registro? ya no podras editarlo.")){
        //window.alert("Aqui voy a llamar a la conexion la funcion de la BD");
        this.registroCompletado();
      }
    }
  } //FIN ValidaCamposVacios

  llenaRapido(respuesta: any){
    if(respuesta.status == 1){
      this.hiddenB = true;
      //this.mostrar();
    }else if(respuesta.status >= 2){
      this.hiddenA = true;
      this.locked=true;
      this.mostrar();
    }else if(respuesta.status == 0){
      this.hiddenC = true;
      this.hidden = false;
    }
  }

  /*
    Manejo de los Old Members
  */

  llamaOldMembers(res){
    this.cargando=this.cargando-1;
    console.log("llamaOldMembers :: res:");
    console.log(res);
    if(res.error == 12){
      this.oldmembers=[]; //Se asigna oldMembers a un arreglo vacio.
    }else if(res.error > 0){
      window.alert(res.estatus);
    }else{
      this.oldmembers= res;
    }
    console.log(this.oldmembers);
  }

}
