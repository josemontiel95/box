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
  selector: 'app-pruebaCubo',
  templateUrl: './pruebaCubo.component.html',
  styleUrls: ['./pruebaCubo.component.scss','../../loadingArrows.css']
})
export class PruebaCuboComponent implements OnInit{

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
  mis_fallas: Array<any>;
 
  
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        fechaColado: '',
        infoNo: '',
        pesoKg: '',
        clave: '',
        edadEnsaye: '',
        diametro1: '',
        diametro2: '',
        altura1: '',
        altura2: '',
        cargaKg: '',
        area: '',
        resCompresion: '',
        falla: '',
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
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );


    url = `${this.global.apiRoot}/concretera/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaFallas(res.json()) );

    this.formatoCCHForm = new FormGroup({
      'fechaColado': new FormControl( {value: this.FormatoCCH.fechaColado, disabled: true}),
      'infoNo': new FormControl( {value: this.FormatoCCH.infoNo, disabled: true}),
      'clave': new FormControl( {value: this.FormatoCCH.clave, disabled: true}),
      'pesoKg': new FormControl( {value: this.FormatoCCH.pesoKg, disabled: this.hidden}),
      'edadEnsaye': new FormControl( {value: this.FormatoCCH.edadEnsaye, disabled: true}),
      'diametro1': new FormControl( {value: this.FormatoCCH.diametro1, disabled: this.hidden}),
      'diametro2': new FormControl( {value: this.FormatoCCH.diametro2, disabled: this.hidden}),
      'altura1': new FormControl( {value:   this.FormatoCCH.altura1, disabled: this.hidden}),
      'altura2': new FormControl( {value: this.FormatoCCH.altura2, disabled: this.hidden}),
      'cargaKg': new FormControl( {value: this.FormatoCCH.cargaKg, disabled: this.hidden}),
      'area': new FormControl( {value: this.FormatoCCH.area, disabled: this.hidden}),
      'resCompresion': new FormControl( {value: this.FormatoCCH.resCompresion, disabled: this.hidden}),       
      'falla': new FormControl( {value: this.FormatoCCH.falla, disabled: this.hidden}),
      'numRem': new FormControl( {value: this.FormatoCCH.numRem, disabled: this.hidden}),
      'hsalida': new FormControl( {value: this.FormatoCCH.hsalida, disabled: this.hidden}),
      'hllegada': new FormControl( {value: this.FormatoCCH.hllegada, disabled: this.hidden})          });
  }
  
   get fechaColado() { return this.formatoCCHForm.get('fechaColado'); }

   get infoNo() { return this.formatoCCHForm.get('infoNo'); }

   get clave() { return this.formatoCCHForm.get('clave'); }

   get pesoKg() { return this.formatoCCHForm.get('pesoKg'); }

   get edadEnsaye() { return this.formatoCCHForm.get('edadEnsaye'); }

   get diametro1() { return this.formatoCCHForm.get('diametro1'); }

   get diametro2() { return this.formatoCCHForm.get('diametro2'); }
   
   get altura1() { return this.formatoCCHForm.get('altura1'); }

   get altura2() { return this.formatoCCHForm.get('altura2'); }

   get cargaKg() { return this.formatoCCHForm.get('cargaKg'); }
   
   get area() { return this.formatoCCHForm.get('area'); }
   
   get resCompresion() { return this.formatoCCHForm.get('resCompresion'); }              

   get falla() { return this.formatoCCHForm.get('falla'); }                          

   get numRem() { return this.formatoCCHForm.get('numRem'); }              

   get hsalida() { return this.formatoCCHForm.get('hsalida'); }              
   
   get hllegada() { return this.formatoCCHForm.get('hllegada'); }              

  submitted = false;

  onSubmit() { this.submitted = true; }

    llenaFallas(resp: any){
     
    console.log(resp);
    this.mis_fallas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_fallas[_i]=resp[_i];
    }
    //this.cargando=this.cargando-1;
    console.log("llenaFallas this.cargando: "+this.cargando);

    } 
    

    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     fechaColado:  respuesta.fecha,
     infoNo: respuesta.revProyecto,
     clave: respuesta.revObtenido,
     pesoKg: respuesta.revObtenido,
     edadEnsaye: respuesta.revObtenido,
     diametro1: respuesta.diametro1,
     diametro2: respuesta.diametro2,
     altura1: respuesta.altura1,
     altura2:  respuesta.altura2,
     cargaKg:  respuesta.cargaKg,
     area: respuesta.area,
     resCompresion: respuesta.resCompresion,
     falla: respuesta.falla,
     numRem: respuesta.remisionNo,
     hsalida: respuesta.horaSalida,
     hllegada: respuesta.horaLlegada
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
    /*this.data.currentGlobal.subscribe(global => this.global = global);
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
    */
    this.router.navigate(['tecnico/pendientes/']);
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


   onBlurFechaColado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.fechaColado);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurinformeNo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.infoNo);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }


  onBlurClave(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.clave);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurPesoKg(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.pesoKg);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurEdadEnsaye(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.edadEnsaye);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  
  onBlurDiametro1(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '6');
    formData.append('valor', this.formatoCCHForm.value.diametro1);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurDiametro2(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.diametro2);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurAltura1(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.altura1);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurAltura2(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.altura2);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }


  onBlurCargaKg(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.cargaKg);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  

  onBlurArea(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.area);
    formData.append('id_registrosRev', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
 
  onBlurResCompresion(){
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
                                            } );
  }

  onBlurFalla(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '9');
    formData.append('valor', this.formatoCCHForm.value.falla);
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
