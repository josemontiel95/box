 
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
  styleUrls: ['./dashboard.component.css','../../loadingArrows.css'] 
})
export class DashboardComponent implements OnInit {

  global: Global;
  cargando= 5;
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
   
 

   Orden = {
 cch_def_prueba1:'',
cch_def_prueba2:'',
cch_def_prueba3:'',
ensayo_def_buscula_id:'',
ensayo_def_prensa_id:'',
ensayo_def_regVerFle_id:'',
cch_def_prueba4:'',
ensayo_def_observaciones:'',
ensayo_def_pi:'',
ensayo_def_distanciaApoyos:'',
ensayo_def_kN:'',
ensayo_def_MPa:'',
ensayo_def_divisorKn:'',
maxNoOfRegistrosCCH:'',
multiplosNoOfRegistrosCCH:'',
apiRoot:'',
maxNoOfRegistrosRev:''

        //se creo un arreglo llamado cliente con los campos del form
        };  
  
  

  ngOnInit(){
       this.hiddenTecnicos = true;
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=5;

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
    this.http.get(url, {search}).subscribe(res => {this.llenado(res.json());
                                                  this.statusOrdenTrabajo(res.json());});

   this.ordenForm = new FormGroup({
 
'cch_def_prueba1':  new FormControl({value: this.Orden.cch_def_prueba1}, [Validators.required]),
'cch_def_prueba2':  new FormControl({value: this.Orden.cch_def_prueba2}, [Validators.required]),
'cch_def_prueba3':  new FormControl({value:this.Orden.cch_def_prueba3}, [Validators.required]),
'ensayo_def_buscula_id':  new FormControl({value:this.Orden.ensayo_def_buscula_id}, [Validators.required]),
'ensayo_def_prensa_id':  new FormControl({value:this.Orden.ensayo_def_prensa_id}, [Validators.required]),
'ensayo_def_regVerFle_id':  new FormControl({value:this.Orden.ensayo_def_regVerFle_id}, [Validators.required]),
'cch_def_prueba4':  new FormControl({value:this.Orden.cch_def_prueba4}, [Validators.required]),
'ensayo_def_observaciones':  new FormControl({value:this.Orden.ensayo_def_observaciones}, [Validators.required]),
'ensayo_def_pi':  new FormControl({value:this.Orden.ensayo_def_pi}, [Validators.required]),
'ensayo_def_distanciaApoyos':  new FormControl({value:this.Orden.ensayo_def_distanciaApoyos}, [Validators.required]),
'ensayo_def_kN':  new FormControl({value:this.Orden.ensayo_def_kN}, [Validators.required]),
'ensayo_def_MPa':  new FormControl({value:this.Orden.ensayo_def_MPa}, [Validators.required]),
'ensayo_def_divisorKn':  new FormControl({value:this.Orden.ensayo_def_divisorKn}, [Validators.required]),
'maxNoOfRegistrosCCH':  new FormControl({value:this.Orden.maxNoOfRegistrosCCH}, [Validators.required]),
'multiplosNoOfRegistrosCCH':  new FormControl({value:this.Orden.multiplosNoOfRegistrosCCH}, [Validators.required]),
'apiRoot':  new FormControl({value:this.Orden.apiRoot}, [Validators.required]),
'maxNoOfRegistrosRev':  new FormControl({value:this.Orden.maxNoOfRegistrosRev}, [Validators.required]),
    });
  
 

  }

      

 
   
get cch_def_prueba1() {return this.ordenForm.get('cch_def_prueba1'); }
get cch_def_prueba2() {return this.ordenForm.get('cch_def_prueba2'); }
get cch_def_prueba3() {return this.ordenForm.get('cch_def_prueba3'); }
get ensayo_def_buscula_id() {return this.ordenForm.get('ensayo_def_buscula_id'); }
get ensayo_def_prensa_id() {return this.ordenForm.get('ensayo_def_prensa_id'); }
get ensayo_def_regVerFle_id() {return this.ordenForm.get('ensayo_def_regVerFle_id'); }
get cch_def_prueba4() {return this.ordenForm.get('cch_def_prueba4'); }
get ensayo_def_observaciones() {return this.ordenForm.get('ensayo_def_observaciones'); }
get ensayo_def_pi() {return this.ordenForm.get('ensayo_def_pi'); }
get ensayo_def_distanciaApoyos() {return this.ordenForm.get('ensayo_def_distanciaApoyos'); }
get ensayo_def_kN() {return this.ordenForm.get('ensayo_def_kN'); }
get ensayo_def_MPa() {return this.ordenForm.get('ensayo_def_MPa'); }
get ensayo_def_divisorKn() {return this.ordenForm.get('ensayo_def_divisorKn'); }
get maxNoOfRegistrosCCH() {return this.ordenForm.get('maxNoOfRegistrosCCH'); }
get multiplosNoOfRegistrosCCH() {return this.ordenForm.get('multiplosNoOfRegistrosCCH'); }
get apiRoot() {return this.ordenForm.get('apiRoot'); }
get maxNoOfRegistrosRev() {return this.ordenForm.get('maxNoOfRegistrosRev'); }


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
  /*
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
  }*/

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

     
  }//Fin llenado

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

    actualizarOrden(){
    console.log("crearOrdenTrabajo :: "+this.ordenForm.value.obra_id);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
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