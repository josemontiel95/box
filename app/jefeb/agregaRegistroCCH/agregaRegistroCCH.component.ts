import { GridComponent } from '../grid/grid.component';
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
  selector: 'app-agregaRegistroCCH',
  templateUrl: './agregaRegistroCCH.component.html',
  styleUrls: ['./agregaRegistroCCH.component.scss','../../loadingArrows.css']
})
export class agregaRegistroCCHComponent implements OnInit{
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
  cargando= 1;
  hidden = false;
  locked =false;
  notRR = false;
  ux = false;
  days= new Array();
  daysCompletition= new Array();
  herramientas: Array<any>;
  
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        cesp:'',
        fecha: '',
        fc: '',
        revp: '',
        revo: '' ,
        tamano:'',
        volumen: '',
        diasEnsaye: '',
        unidad: '',  
        hmobra: '',
        tempamb: '',
        tempambrec: '', 
        localizacion: '',
        herramienta: ''          
    }




  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_orden = params.id; this.id_formato=params.id2; this.id_registro=params.id3; }); //Recibe dos parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cargando=1;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();

    url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getHerramientaForDropdownRegistro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenaHerraPrueba( res.json()) );

    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getDaysPruebasForDropDown');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formato', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenaDaysPrueba( res.json()) );

    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getDaysPruebasForCompletition');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formato', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenaDaysPruebaCompletition( res.json()) );
    
   

  this.formatoCCHForm = new FormGroup({
    'cesp':             new FormControl( {value: this.FormatoCCH.cesp, disabled: true}),
    'fecha':            new FormControl( {value: this.FormatoCCH.fecha, disabled: true}),
    'fc':               new FormControl( {value: this.FormatoCCH.fc, disabled: this.hidden},[Validators.required]),
    'revp':             new FormControl( {value: this.FormatoCCH.revp, disabled: true}),
    'revo':             new FormControl( {value: this.FormatoCCH.revo, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]),
    'tamano':           new FormControl( {value: this.FormatoCCH.tamano, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]),
    'volumen':          new FormControl( {value: this.FormatoCCH.volumen, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),       
    'diasEnsaye':       new FormControl( {value: this.FormatoCCH.diasEnsaye, disabled: this.hidden},[Validators.required]),
    'unidad':           new FormControl( {value: this.FormatoCCH.unidad, disabled: this.hidden},[Validators.required]),
    'hmobra':           new FormControl( {value: this.FormatoCCH.hmobra, disabled: this.hidden},[Validators.required]),
    'tempamb':          new FormControl( {value: this.FormatoCCH.tempamb, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
    'tempambrec':       new FormControl( {value: this.FormatoCCH.tempambrec, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
    'localizacion':     new FormControl( {value: this.FormatoCCH.localizacion, disabled: this.hidden},[Validators.required]),
    'herramienta':      new FormControl( {value: this.FormatoCCH.herramienta, disabled: this.hidden},[Validators.required])
        });
  }

   get cesp()         { return this.formatoCCHForm.get('cesp'); }
   get fecha()        { return this.formatoCCHForm.get('fecha'); }
   get fc()           { return this.formatoCCHForm.get('fc'); }
   get revp()         { return this.formatoCCHForm.get('revp'); }
   get revo()         { return this.formatoCCHForm.get('revo'); }
   get tamano()       { return this.formatoCCHForm.get('tamano'); }                 
   get volumen()      { return this.formatoCCHForm.get('volumen'); }              
   get diasEnsaye()   { return this.formatoCCHForm.get('diasEnsaye'); }     
   get unidad()       { return this.formatoCCHForm.get('unidad'); }              
   get hmobra()       { return this.formatoCCHForm.get('hmobra'); }              
   get tempamb()      { return this.formatoCCHForm.get('tempamb'); }              
   get tempambrec()   { return this.formatoCCHForm.get('tempambrec'); }              
   get localizacion() { return this.formatoCCHForm.get('localizacion'); }              
   get herramienta()  { return this.formatoCCHForm.get('herramienta'); }

  submitted = false;


  cargaDatos(){
    let url =`${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_registrosCampo', this.id_registro);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) ); 
  }
  onSubmit() { this.submitted = true; } 
    

    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     cesp:         respuesta.claveEspecimen,
     fecha:        respuesta.fecha,
     fc:           respuesta.fprima,
     revp:         respuesta.revProyecto,
     revo:         respuesta.revObra,
     tamano:       respuesta.tamagregado,
     volumen:      respuesta.volumen,
     diasEnsaye:   respuesta.diasEnsaye,
     unidad:       respuesta.unidad,
     hmobra:       respuesta.horaMuestreo,
     tempamb:      respuesta.tempMuestreo,
     tempambrec:   respuesta.tempRecoleccion,
     localizacion: respuesta.localizacion,
     herramienta:  respuesta.herramienta_id
    });

    if(respuesta.status == 1){
      this.mostrar();
    }else if(respuesta.status==2){
      this.mostrar();
      this.locked=true;
    }
    this.llenadodiasEnsaye(respuesta.diasEnsaye);
  }

  llenaDaysPrueba(res: any){
    console.log(res);
    if(res.error != 0){
      for (let key in res) {
        this.days.push({'id' : key, 'value' : res[key] });
      }
    }
  }

  llenaHerraPrueba(res: any){
    console.log(res);
    this.herramientas=res;
  }

  llenaDaysPruebaCompletition(res: any){
    console.log(res);
    if(res.error != 0){
      for (let key in res) {
        this.daysCompletition.push({'id' : key, 'value' : res[key] });
      }
    }
    this.cargaDatos();
  }
  
  llenadodiasEnsaye(res: any){
    if(res=="Pendiente"){

    }else{
      for (let key in this.daysCompletition) {
        if(this.daysCompletition[key].id==res){
          this.days.push({'id' : res, 'value' : this.daysCompletition[key].value });
        }else{
        }
      }
    }
  }


  //Esta funcion ya no se usara, desactivaba un registro CCH
  /*descartaCambios(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deactivate');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_registrosCampo', this.id_registro);  
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaDescartaCambios(res.json());                 
                                            } );
  }*/

  llenarDespues(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '12');
    formData.append('valor', '0');
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden + '/' + this.id_formato]);
  }

  registroCompletado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '12');
    formData.append('valor', '1');
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {                                             
                                              this.respuestaSwitch(res.json());                 
                                            } );
    //window.alert("Si procedes ")
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden + '/' +this.id_formato]);
  }

  onBlurHerramienta(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.herramienta);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }


  onChangeGeneric(n){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', n);
    formData.append('valor', this.formatoCCHForm.value.fc);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurFC(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.fc);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurRevProy(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.getRawValue().revp);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurRevObra(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.revo);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  
  onBlurTamNomAg(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.tamano);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurVolumen(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.volumen);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurdiasEnsaye(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '6');
    formData.append('valor', this.formatoCCHForm.value.diasEnsaye);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurUnidad(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.unidad);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurHoraMuestreo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '11');
    formData.append('valor', this.formatoCCHForm.value.hmobra);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurTemperaturaMuestreo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.tempamb);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurTemperaturaRecoleccion(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '9');
    formData.append('valor', this.formatoCCHForm.value.tempambrec);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurLocalizacion(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '10');
    formData.append('valor', this.formatoCCHForm.value.localizacion);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  /*respuestaDescartaCambios(res: any){ 
    console.log(res);
    if(res.error!= 0){
      window.alert(res.estatus);
      location.reload();
    }
    else{
      console.log(this.id_registro);
      this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden + '/' + this.id_formato]);        
    }
  }*/

/* 
  Este metodo valida la respuesta de tipo de Concreto
  En caso de ser de tipo RR, la variable notRR pasara a ser falsa
  En caso contrario la variable RR pasa a ser verdadera
  En el ultimo bloque del codigo se ejecuta un if shorthand que caso de ser verdadero
  Desabilita los 3 campos de especimen y si es falso los habilitara. 
*/


  respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       //location.reload();
     }
     else{
          
          //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_formato]);
       
     }
   }

  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });    
    this.formatoCCHForm.controls['revp']['disable']();
    this.formatoCCHForm.controls['fecha']['disable'](); 
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
}