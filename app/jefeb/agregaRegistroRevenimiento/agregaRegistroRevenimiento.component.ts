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
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;
  mis_concreteras: Array<any>;
 
  
  formatoCCHForm: FormGroup;

  FormatoCCH = {
    fechaDet: '',
    revProy: '',
    revObtenido: '',
    tamAgregado: '',
    idConcreto: '' ,
    hDet:'',
    unidad: '',
    provCon: '',
    numRem: '',
    hsalida: '',
    hllegada: ''         
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
    
    url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_registrosRev', this.id_registro);
    this.http.get(url, {search}).subscribe(res => {
                                                    this.llenaRapido(res.json());
                                                    this.llenado(res.json()); 
                                                                              });


    url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaConcreteras(res.json()) );

    this.formatoCCHForm = new FormGroup({
      'fechaDet':     new FormControl( {value: this.FormatoCCH.fechaDet, disabled: true},    [Validators.required]),
      'revProy':      new FormControl( {value: this.FormatoCCH.revProy, disabled: true},     [Validators.required,Validators.pattern("^[0-9]+$")]),
      'revObtenido':  new FormControl( {value: this.FormatoCCH.revObtenido, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
      'tamAgregado':  new FormControl( {value: this.FormatoCCH.tamAgregado, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
      'idConcreto':   new FormControl( {value: this.FormatoCCH.idConcreto, disabled: this.hidden},  [Validators.required]),
      'hDet':         new FormControl( {value: this.FormatoCCH.hDet, disabled: this.hidden},        [Validators.required]),
      'unidad':       new FormControl( {value: this.FormatoCCH.unidad, disabled: this.hidden},      [Validators.required]),       
      'provCon':      new FormControl( {value: this.FormatoCCH.provCon, disabled: this.hidden},     [Validators.required]),
      'numRem':       new FormControl( {value: this.FormatoCCH.numRem, disabled: this.hidden},      [Validators.required]),
      'hsalida':      new FormControl( {value: this.FormatoCCH.hsalida, disabled: this.hidden},     [Validators.required]),
      'hllegada':     new FormControl( {value: this.FormatoCCH.hllegada, disabled: this.hidden},    [Validators.required])          
    });
  }
  
  get fechaDet()     { return this.formatoCCHForm.get('fechaDet'); }
  get revProy()      { return this.formatoCCHForm.get('revProy'); }
  get revObtenido()  { return this.formatoCCHForm.get('revObtenido'); }
  get tamAgregado()  { return this.formatoCCHForm.get('tamAgregado'); }
  get idConcreto()   { return this.formatoCCHForm.get('idConcreto'); }
  get hDet()         { return this.formatoCCHForm.get('hDet'); }              
  get unidad()       { return this.formatoCCHForm.get('unidad'); }              
  get provCon()      { return this.formatoCCHForm.get('provCon'); }                          
  get numRem()       { return this.formatoCCHForm.get('numRem'); }              
  get hsalida()      { return this.formatoCCHForm.get('hsalida'); }              
  get hllegada()     { return this.formatoCCHForm.get('hllegada'); }              

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
      }
    }

    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     fechaDet:       respuesta.fecha,
     revProy:        respuesta.revProyecto,
     revObtenido:    respuesta.revObtenido,
     tamAgregado:    respuesta.tamAgregado,
     idConcreto:     respuesta.idenConcreto,
     hDet:           respuesta.horaDeterminacion,
     unidad:         respuesta.unidad,
     provCon:        respuesta.concretera_id,
     numRem:         respuesta.remisionNo,
     hsalida:        respuesta.horaSalida,
     hllegada:       respuesta.horaLlegada
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
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '13');
    formData.append('valor', '0');
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+ this.id_orden + '/' + this.id_formato]);
  }

  registroCompletado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '13');
    formData.append('valor', '1');
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+ this.id_orden + '/' + this.id_formato]);
  }


   onBlurFechaDet(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.getRawValue().fechaDet);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurRevProy(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.getRawValue().revProy);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }


  onBlurRevObtenido(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.revObtenido);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurTamNomAg(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.tamAgregado);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  

  onBlurIdConcreto(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.idConcreto);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurHoraMuestreo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.hDet);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
 
  onBlurUnidad(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.unidad);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurTipoConcreto(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '9');
    formData.append('valor', this.formatoCCHForm.value.provCon);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurNumeroRemision(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '10');
    formData.append('valor', this.formatoCCHForm.value.numRem);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurHoraSalida(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '11');
    formData.append('valor', this.formatoCCHForm.value.hsalida);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurHoraLlegada(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '12');
    formData.append('valor', this.formatoCCHForm.value.hllegada);
    formData.append('id_registrosRev', this.id_registro);
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
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaRevenimiento/'+ this.id_orden + '/' + this.id_formato]);        
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

  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });  
    this.formatoCCHForm.controls['fechaDet']['disable'](); 
    this.formatoCCHForm.controls['revProy']['disable'](); 
  }

  validaCamposVacios(){
    let warning = false;
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        if(this.formatoCCHForm.controls[controlName].value == "" || this.formatoCCHForm.controls[controlName].value == null || this.formatoCCHForm.controls[controlName].value == "null"){
          warning = true;
          console.log("validaCamposVacios :: controlName: "+controlName);
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
