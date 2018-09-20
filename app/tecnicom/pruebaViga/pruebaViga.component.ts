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
  selector: 'app-pruebaViga',
  templateUrl: './pruebaViga.component.html',
  styleUrls: ['./pruebaViga.component.scss','../../loadingArrows.css']
})
export class PruebaVigaComponent implements OnInit{

  id_Footer:string;
  id_Registro: string;
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
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        idMuestra: '',
        fechaColado: '',
        fechaEnsayo: '',
        edadEnsaye: '',
        condiCurado: '',
        lijado: '',
        cuero: '',
        ancho1: '',
        ancho2: '',
        per1:'',
        per2:'',
        l1:'',
        l2:'',
        l3:'',
        prom:'',
        disApoyos: '',
        disCarga: '',
        cargaAplicada: '',
        moduloRuptura:'',
        defectos: '',
        realizo:''
      }

 curado= [{"condicion":"Humedo", "id":"Humedo"},{"condicion":"Seco", "id":"Seco"},{"condicion":"Intemperie", "id":"Intemperie"}];



  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
      
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_Footer=params.id; this.id_Registro=params.id2}); //Recibe tre parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cargando=1;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
                                                    this.llenaRapido(res.json());
                                                    this.llenado(res.json());
                                                    //this.desactivaCampos(res.json());
                                                  });


    this.formatoCCHForm = new FormGroup({
      'idMuestra': new FormControl( {value: this.FormatoCCH.idMuestra, disabled: true}),
      'fechaColado': new FormControl( {value: this.FormatoCCH.fechaColado, disabled: true}),
      'fechaEnsayo': new FormControl( {value: this.FormatoCCH.fechaEnsayo, disabled: true}),      
      'edadEnsaye': new FormControl( {value: this.FormatoCCH.edadEnsaye, disabled: true}),
      'condiCurado': new FormControl( {value: this.FormatoCCH.condiCurado, disabled: this.hidden}),
      'lijado': new FormControl( {value: this.FormatoCCH.lijado, disabled: this.hidden}),
      'cuero': new FormControl( {value: this.FormatoCCH.cuero, disabled: this.hidden}),
      'ancho1': new FormControl( {value:   this.FormatoCCH.ancho1, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([,][0-9]+)?$")]),
      'ancho2': new FormControl( {value: this.FormatoCCH.ancho2, disabled: this.hidden}),
      'per1': new FormControl( {value:   this.FormatoCCH.per1, disabled: this.hidden}),      
      'per2': new FormControl( {value:   this.FormatoCCH.per2, disabled: this.hidden}),      
      'l1': new FormControl( {value:   this.FormatoCCH.l1, disabled: this.hidden}),      
      'l2': new FormControl( {value:   this.FormatoCCH.l2, disabled: this.hidden}),            
      'l3': new FormControl( {value:   this.FormatoCCH.l3, disabled: this.hidden}),            
      'prom': new FormControl( {value:   this.FormatoCCH.prom, disabled: true}),            
      'disApoyos': new FormControl( {value: this.FormatoCCH.disApoyos, disabled: this.hidden}),
      'disCarga': new FormControl( {value: this.FormatoCCH.disCarga, disabled: this.hidden}),
      'cargaAplicada': new FormControl( {value: this.FormatoCCH.cargaAplicada, disabled: this.hidden}),       
      'moduloRuptura': new FormControl( {value: this.FormatoCCH.moduloRuptura, disabled: true}),       
      'defectos': new FormControl( {value: this.FormatoCCH.defectos, disabled: this.hidden}), 
      'realizo': new FormControl( {value: this.FormatoCCH.realizo, disabled: true})  });
  }
  
   get idMuestra() { return this.formatoCCHForm.get('idMuestra'); }

   get fechaColado() { return this.formatoCCHForm.get('fechaColado'); }

   get fechaEnsayo() { return this.formatoCCHForm.get('fechaEnsayo'); }

   get edadEnsaye() { return this.formatoCCHForm.get('edadEnsaye'); }
   
   get condiCurado() { return this.formatoCCHForm.get('condiCurado'); }

   get lijado() { return this.formatoCCHForm.get('lijado'); }

   get cuero() { return this.formatoCCHForm.get('cuero'); }
   
   get ancho1() { return this.formatoCCHForm.get('ancho1'); }

   get ancho2() { return this.formatoCCHForm.get('ancho2'); }

   get per1() { return this.formatoCCHForm.get('per1'); }

   get per2() { return this.formatoCCHForm.get('per2'); }

   get l1() { return this.formatoCCHForm.get('l1'); }

   get l2() { return this.formatoCCHForm.get('l2'); }

   get l3() { return this.formatoCCHForm.get('l3'); }

   get prom() { return this.formatoCCHForm.get('prom'); }

   get disApoyos() { return this.formatoCCHForm.get('disApoyos'); }
   
   get disCarga() { return this.formatoCCHForm.get('disCarga'); }
   
   get cargaAplicada() { return this.formatoCCHForm.get('cargaAplicada'); }              

   get moduloRuptura() { return this.formatoCCHForm.get('moduloRuptura'); }              

   get defectos() { return this.formatoCCHForm.get('defectos'); }                          

   get realizo() { return this.formatoCCHForm.get('realizo'); }                          
   
  submitted = false;

  onSubmit() { this.submitted = true; } 

    llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     idMuestra: respuesta.claveEspecimen,
     fechaColado:  respuesta.fechaColado,
     fechaEnsayo:  respuesta.fechaEnsayo,
     edadEnsaye: respuesta.diasEnsayeFinal,
     condiCurado: respuesta.condiciones,
     lijado: respuesta.lijado,
     cuero: respuesta.cuero,
     ancho1: respuesta.ancho1,
     ancho2:  respuesta.ancho2,
     per1: respuesta.per1,
     per2: respuesta.per2,
     l1: respuesta.l1,
     l2: respuesta.l2,
     l3: respuesta.l3,
     prom: respuesta.prom,
     disApoyos:  respuesta.disApoyo,
     disCarga: respuesta.disCarga,
     cargaAplicada: respuesta.carga,
     moduloRuptura: respuesta.moduloRuptura,
     defectos: respuesta.defectos, 
     realizo: respuesta.nombre 
   });

    if(respuesta.status == 1){
      this.mostrar();
    }
     this.onBlurPromedio();
     this.onBlurModuloRuptura();
  }
  //DON'T TOUCH THIS!
  

  llenarDespues(){
    this.router.navigate(['tecnico/pendientes/dashboardViga/'+this.id_Footer]);
  }

  registroCompletado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeEnsayo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                              this.updateFechaEnsaye(res.json());                 
                                            } );
    this.router.navigate(['tecnico/pendientes/dashboardViga/'+this.id_Footer]);
  }

  onBlurCurado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.condiCurado);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());                 
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  
  onBlurLijado(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.lijado);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());                 
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurCuero(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.cuero);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());                 
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurAncho1(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.ancho1);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurModuloRuptura();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurAncho2(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '5');
    formData.append('valor', this.formatoCCHForm.value.ancho2);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              //this.updateFechaEnsaye(res.json());
                                              this.onBlurModuloRuptura();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurPer1(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '6');
    formData.append('valor', this.formatoCCHForm.value.per1);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurModuloRuptura();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurPer2(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '7');
    formData.append('valor', this.formatoCCHForm.value.per2);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurModuloRuptura();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL1(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '8');
    formData.append('valor', this.formatoCCHForm.value.l1);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurPromedio();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL2(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '9');
    formData.append('valor', this.formatoCCHForm.value.l2);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurPromedio();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL3(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '10');
    formData.append('valor', this.formatoCCHForm.value.l3);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurPromedio();
                                              //this.respuestaSwitch(res.json());                
                                            } );
  }

  onBlurDisApoyos(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '11');
    formData.append('valor', this.formatoCCHForm.value.disApoyos);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  

  onBlurDisCarga(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '12');
    formData.append('valor', this.formatoCCHForm.value.disCarga);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
 
  onBlurCargaAplicada(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '13');
    formData.append('valor', this.formatoCCHForm.value.cargaAplicada);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.onBlurModuloRuptura();
                                              //this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurDefectos(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '14');
    formData.append('valor', this.formatoCCHForm.value.defectos);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.updateFechaEnsaye(res.json());
                                              this.respuestaSwitch(res.json());                 
                                            } );
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
    this.formatoCCHForm.controls['idMuestra']['disable']();
    this.formatoCCHForm.controls['fechaColado']['disable']();
    this.formatoCCHForm.controls['fechaEnsayo']['disable']();
    this.formatoCCHForm.controls['edadEnsaye']['disable']();
    this.formatoCCHForm.controls['prom']['disable']();
    this.formatoCCHForm.controls['moduloRuptura']['disable']();
    this.formatoCCHForm.controls['realizo']['disable']();    
  }

  onBlurPromedio(){
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'calcularPromedio');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
                                                    console.log(res); 
                                                    this.onChangeProm(res.json());
                                                    //this.respuestaSwitch(res.json());
                                                    });
  }

  updateFechaEnsaye(res: any){
        console.log(res.fechaEnsayo);
        this.formatoCCHForm.patchValue({
        fechaEnsayo: res.fechaEnsayo
      });
  }


  onChangeProm(res: any){
        this.formatoCCHForm.patchValue({
        prom: res.promedio
      });
  }

  onBlurModuloRuptura(){
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'calcularModulo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
                                                    console.log(res); 
                                                    this.onChangeModuloRup(res.json());
                                                    //this.respuestaSwitch(res.json());
                                                    });
  }

  onChangeModuloRup(res: any){
        this.formatoCCHForm.patchValue({
        moduloRuptura: res.modulo
      });
  }
/*
  desactivaCampos(res:any){
    if(res.completado == "SI"){
      this.ocultar();
    } 
   }
*/
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

  validaCamposVacios(){
    let warning = false;
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
      if(controlName == "l1" || controlName == "l2" || controlName == "l3" || controlName == "prom"){ 
        //DO NOTHING
      }else{
        if(this.formatoCCHForm.controls[controlName].value == "" || this.formatoCCHForm.controls[controlName].value == null || this.formatoCCHForm.controls[controlName].value == "null"){
          warning = true;
        }// disables/enables each form control based on 'this.formDisabled'
      }
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
}
