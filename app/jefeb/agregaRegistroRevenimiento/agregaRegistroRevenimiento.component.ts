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
  selector: 'app-agregaRegistroRevenimiento',
  templateUrl: './agregaRegistroRevenimiento.component.html',
  styleUrls: ['./agregaRegistroRevenimiento.component.scss','../../loadingArrows.css']
})
export class agregaRegistroRevenimientoComponent implements OnInit{

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
  mis_concreteras: Array<any>;
 
  
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        fechaDet: '',
        revProy: '',
        fc: '',
        revp: '',
        revo: '' ,
        tamano:'',
        volumen: '',
        provCon: '',
        unidad: '',  
        hmobra: '',
        tempamb: '',
        tempambrec: '', 
        localizacion: ''          
    }




  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_orden=params.id; this.id_formato=params.id2; this.id_registro=params.id3}); //Recibe tre parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cargando=1;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_registrosCampo', this.id_registro);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );


    url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaConcreteras(res.json()) );

    this.formatoCCHForm = new FormGroup({
      'fechaDet': new FormControl( {value: this.FormatoCCH.fechaDet, disabled: this.hidden}),
      'fc': new FormControl( {value: this.FormatoCCH.fc, disabled: this.hidden}),
      'revp': new FormControl( {value: this.FormatoCCH.revp, disabled: this.hidden}),
      'revo': new FormControl( {value: this.FormatoCCH.revo, disabled: this.hidden}),
      'tamano': new FormControl( {value: this.FormatoCCH.tamano, disabled: this.hidden}),
      'volumen': new FormControl( {value: this.FormatoCCH.volumen, disabled: this.hidden}),       
      'provCon': new FormControl( {value: this.FormatoCCH.provCon, disabled: this.hidden}),
      'unidad': new FormControl( {value: this.FormatoCCH.unidad, disabled: this.hidden}),
      'hmobra': new FormControl( {value: this.FormatoCCH.hmobra, disabled: this.hidden}),
      'tempamb': new FormControl( {value: this.FormatoCCH.tempamb, disabled: this.hidden}),
      'tempambrec': new FormControl( {value: this.FormatoCCH.tempambrec, disabled: this.hidden}),
      'localizacion': new FormControl( {value: this.FormatoCCH.localizacion, disabled: this.hidden})
          });
  }
  
   get fechaDet() { return this.formatoCCHForm.get('fechaDet'); }

   get revProy() { return this.formatoCCHForm.get('revProy'); }

   get fc() { return this.formatoCCHForm.get('fc'); }

   get revp() { return this.formatoCCHForm.get('revp'); }
   
   get revo() { return this.formatoCCHForm.get('revo'); }

   get tamano() { return this.formatoCCHForm.get('tamano'); }              
   
   get volumen() { return this.formatoCCHForm.get('volumen'); }              

   get provCon() { return this.formatoCCHForm.get('provCon'); }              

   get unidad() { return this.formatoCCHForm.get('unidad'); }              

   get hmobra() { return this.formatoCCHForm.get('hmobra'); }              

   get tempamb() { return this.formatoCCHForm.get('tempamb'); }              
   
   get tempambrec() { return this.formatoCCHForm.get('tempambrec'); }              

   get localizacion() { return this.formatoCCHForm.get('localizacion'); }              


  submitted = false;

  onSubmit() { this.submitted = true; }

    llenaConcreteras(resp: any){
     
    console.log(resp);
    this.mis_concreteras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_concreteras[_i]=resp[_i];
    }
    //this.cargando=this.cargando-1;
    console.log("llenaConcreteras this.cargando: "+this.cargando);

    } 
    

    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     fechaDet:  respuesta.fechaDet,
     revProy: respuesta.revProy,
     fc: respuesta.fprima,
     revp:  respuesta.revProyecto,
     revo: respuesta.revObra,
     tamano: respuesta.tamagregado,
     volumen: respuesta.volumen,
     provCon: respuesta.tipoConcreto,
     unidad: respuesta.herramienta_id,
     hmobra: respuesta.horaMuestreo,
     tempamb: respuesta.tempMuestreo,
     tempambrec: respuesta.tempRecoleccion,
     localizacion: respuesta.localizacion
    });

    if(respuesta.status == 1){
      this.mostrar();
    }
     
  }
  //DON'T TOUCH THIS!
  descartaCambios(){
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
  }

  llenarDespues(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '14');
    formData.append('valor', '0');
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+ this.id_orden + '/' + this.id_formato]);
  }

  registroCompletado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '14');
    formData.append('valor', '1');
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+ this.id_orden + '/' + this.id_formato]);
  }


  onBlurClaveEspecimen(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.cesp);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

   onBlurFechaDet(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.fechaDet);
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

    formData.append('campo', '3');
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

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.revp);
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

    formData.append('campo', '5');
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

    formData.append('campo', '6');
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

    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.volumen);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurTipoConcreto(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.provCon);
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

    formData.append('campo', '9');
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

    formData.append('campo', '10');
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

    formData.append('campo', '11');
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

    formData.append('campo', '12');
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

    formData.append('campo', '13');
    formData.append('valor', this.formatoCCHForm.value.localizacion);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  respuestaDescartaCambios(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          console.log(this.id_registro);
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+ this.id_orden + '/' + this.id_formato]);        
     }
   }

  respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          
          //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_formato]);
       
     }
   }

  
  mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });    
  }

}
