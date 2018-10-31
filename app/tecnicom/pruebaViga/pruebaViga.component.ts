//import { GridComponent } from '../grid/grid.component';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Http, URLSearchParams} from '@angular/http';
import {
    FormGroup,
    FormControl,
    Validators
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
  rowSelection;
  columnDefs;
  cargando= 1;
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;   
  oldmembers;
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        idMuestra: '',
        fechaColado: '',
        fechaEnsayo: '',
        edadEnsaye: '',
        condiCurado: '',
        apoyo: '',
        fractura: '',
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
        velocidad: '',
        tiempo: '',
        realizo:''
      }

 curado= [{"condicion":"Humedo", "id":"Humedo"},{"condicion":"Seco", "id":"Seco"},{"condicion":"Intemperie", "id":"Intemperie"}];
 apoyos= [{"tapoyo":"Lijado", "id":"1"},{"tapoyo":"Cuero", "id":"2"}];
 fracture= [{"frac":"Dentro del Claro", "id":"1"},{"frac":"Fuera del Claro", "id":"2"}];



  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
      
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_Footer=params.id; this.id_Registro=params.id2}); //Recibe tre parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    this.cargando= this.cargando+1;


    
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
      this.llenaRapido(res.json());
      this.llenado(res.json());
      //this.desactivaCampos(res.json());
    });

    url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getOldMembers');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
      this.llemaOldMembers(res.json());
    });

                                              


    this.formatoCCHForm = new FormGroup({
      'idMuestra':        new FormControl( {value: this.FormatoCCH.idMuestra, disabled: true}),
      'fechaColado':      new FormControl( {value: this.FormatoCCH.fechaColado, disabled: true}),
      'fechaEnsayo':      new FormControl( {value: this.FormatoCCH.fechaEnsayo, disabled: true}),      
      'edadEnsaye':       new FormControl( {value: this.FormatoCCH.edadEnsaye, disabled: true}),
      'condiCurado':      new FormControl( {value: this.FormatoCCH.condiCurado, disabled: this.hidden}),
      'apoyo':            new FormControl( {value: this.FormatoCCH.apoyo, disabled: this.hidden}),
      'fractura':         new FormControl( {value: this.FormatoCCH.fractura, disabled: this.hidden}),
      'lijado':           new FormControl( {value: this.FormatoCCH.lijado, disabled: this.hidden}),
      'cuero':            new FormControl( {value: this.FormatoCCH.cuero, disabled: this.hidden}),
      'ancho1':           new FormControl( {value: this.FormatoCCH.ancho1, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'ancho2':           new FormControl( {value: this.FormatoCCH.ancho2, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'per1':             new FormControl( {value: this.FormatoCCH.per1, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),      
      'per2':             new FormControl( {value: this.FormatoCCH.per2, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),      
      'l1':               new FormControl( {value: this.FormatoCCH.l1, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),      
      'l2':               new FormControl( {value: this.FormatoCCH.l2, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),            
      'l3':               new FormControl( {value: this.FormatoCCH.l3, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),            
      'prom':             new FormControl( {value: this.FormatoCCH.prom, disabled: true}),            
      'disApoyos':        new FormControl( {value: this.FormatoCCH.disApoyos, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'disCarga':         new FormControl( {value: this.FormatoCCH.disCarga, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'cargaAplicada':    new FormControl( {value: this.FormatoCCH.cargaAplicada, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),       
      'moduloRuptura':    new FormControl( {value: this.FormatoCCH.moduloRuptura, disabled: true}),       
      'defectos':         new FormControl( {value: this.FormatoCCH.defectos, disabled: this.hidden}, [Validators.pattern("^[0-9]+$")]),       
      'velocidad':        new FormControl( {value: this.FormatoCCH.velocidad, disabled: true}),
      'tiempo':           new FormControl( {value: this.FormatoCCH.tiempo, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+([.][0-9]+)?$")]),
      'realizo':          new FormControl( {value: this.FormatoCCH.realizo, disabled: true})  });
  }
  
   get idMuestra()       { return this.formatoCCHForm.get('idMuestra'); }
   get fechaColado()     { return this.formatoCCHForm.get('fechaColado'); }
   get fechaEnsayo()     { return this.formatoCCHForm.get('fechaEnsayo'); }
   get edadEnsaye()      { return this.formatoCCHForm.get('edadEnsaye'); }
   get condiCurado()     { return this.formatoCCHForm.get('condiCurado'); }
   get apoyo()           { return this.formatoCCHForm.get('apoyo'); }
   get fractura()        { return this.formatoCCHForm.get('fractura'); }
   get lijado()          { return this.formatoCCHForm.get('lijado'); }
   get cuero()           { return this.formatoCCHForm.get('cuero'); }
   get ancho1()          { return this.formatoCCHForm.get('ancho1'); }
   get ancho2()          { return this.formatoCCHForm.get('ancho2'); }
   get per1()            { return this.formatoCCHForm.get('per1'); }
   get per2()            { return this.formatoCCHForm.get('per2'); }
   get l1()              { return this.formatoCCHForm.get('l1'); }
   get l2()              { return this.formatoCCHForm.get('l2'); }
   get l3()              { return this.formatoCCHForm.get('l3'); }
   get prom()            { return this.formatoCCHForm.get('prom'); }
   get disApoyos()       { return this.formatoCCHForm.get('disApoyos'); }
   get disCarga()        { return this.formatoCCHForm.get('disCarga'); }
   get cargaAplicada()   { return this.formatoCCHForm.get('cargaAplicada'); }              
   get moduloRuptura()   { return this.formatoCCHForm.get('moduloRuptura'); }              
   get defectos()        { return this.formatoCCHForm.get('defectos'); }   
   get velocidad()       { return this.formatoCCHForm.get('velocidad'); }        
   get tiempo()          { return this.formatoCCHForm.get('tiempo'); }                               
   get realizo()         { return this.formatoCCHForm.get('realizo'); }                          
   
  submitted = false;

  onSubmit() { this.submitted = true; } 

    llenado(respuesta: any){
    this.cargando = this.cargando -1;
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     idMuestra:       respuesta.claveEspecimen,
     fechaColado:     respuesta.fechaColado,
     fechaEnsayo:     respuesta.fechaEnsayo,
     edadEnsaye:      respuesta.diasEnsayeFinal,
     condiCurado:     respuesta.condiciones,
     apoyo:           respuesta.apoyo,
     fractura:        respuesta.posFractura,
     lijado:          respuesta.lijado,
     cuero:           respuesta.cuero,
     ancho1:          respuesta.ancho1,
     ancho2:          respuesta.ancho2,
     per1:            respuesta.per1,
     per2:            respuesta.per2,
     l1:              respuesta.l1,
     l2:              respuesta.l2,
     l3:              respuesta.l3,
     prom:            respuesta.prom,
     disApoyos:       respuesta.disApoyo,
     disCarga:        respuesta.disCarga,
     cargaAplicada:   respuesta.carga,
     moduloRuptura:   respuesta.moduloRuptura,
     defectos:        respuesta.defectos,
     velocidad:       respuesta.velAplicacionExp,
     tiempo:          respuesta.tiempoDeCarga, 
     realizo:         respuesta.nombre 
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

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }

  registroCompletado(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeEnsayo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitchRegComplete(res.json());
    });
  }

  respuestaSwitchRegComplete(res){
    if(res.error!= 0){
      window.alert(res.estatus);
      console.log(res.estatus);
    }
    else{
      this.router.navigate(['tecnico/pendientes/dashboardViga/'+this.id_Footer]);    
     }
  }

  onBlurCurado(){
    this.cargando = this. cargando +1;
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
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }



  onBlurApoyo(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'onChangePuntosDeApoyo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('valor', this.formatoCCHForm.value.apoyo);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {                
      this.respuestaSwitch(res.json());                 
    } );
  }

  onBlurFractura(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.fractura);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.onBlurModuloRuptura();                 
      this.respuestaSwitch(res.json());                 
    });
  } 

  onBlurAncho1(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurAncho2(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurPer1(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurPer2(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL1(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.onBlurPromedio();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL2(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.onBlurPromedio();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurL3(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.onBlurPromedio();
                                              this.respuestaSwitch(res.json());                
                                            } );
  }

  onBlurDisApoyos(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }
  

  onBlurDisCarga(){
    this.cargando = this. cargando +1;
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
                                              this.respuestaSwitch(res.json());                
                                            });
  }
 
  onBlurCargaAplicada(){
    this.cargando = this. cargando +1;
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
                                              this.onBlurModuloRuptura();
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurDefectos(){
    this.cargando = this. cargando +1;
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
                                              this.respuestaSwitch(res.json());                 
                                            });
  }

  onBlurVelocidad(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '15');
    formData.append('valor', this.formatoCCHForm.value.defectos);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());                 
    } );
  }

  onBlurTiempo(){
    this.cargando = this. cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/ensayoViga/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '16');
    formData.append('valor', this.formatoCCHForm.value.tiempo);
    formData.append('id_ensayoViga', this.id_Registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json(),"onBlurTiempo");   
                                              this.onBlurModuloRuptura();          
                                            } );
  }

  respuestaSwitch(res: any, caller = "N.A."){
    this.cargando = this.cargando -1; 
    console.log("respuestaSwitch :: res:");
    console.log(res);
    if(res.error != 0){
      window.alert("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
      console.log("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
    }else{
      //Exito
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
    this.formatoCCHForm.controls['velocidad']['disable']();    
  }

  onBlurPromedio(){
    this.cargando = this. cargando +1;
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'calcularPromedio');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
                                                    console.log(res); 
                                                    this.onChangeProm(res.json());
                                                    this.respuestaSwitch(res.json());
                                                    });
  }

  


  onChangeProm(res: any){
        this.formatoCCHForm.patchValue({
        prom: res.promedio
      });
  }

  onBlurModuloRuptura(){
    this.cargando = this. cargando +1;
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'calcularModulo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ensayoViga', this.id_Registro);
    this.http.get(url, {search}).subscribe(res => { 
      console.log("onBlurModuloRuptura :: ");
      console.log(res.json()); 
      this.onChangeModuloRup(res.json());
      this.onChangeModuloRupValidator(res.json(), "onBlurModuloRuptura");
    });
  }

  onChangeModuloRupValidator(res: any, caller = "N.A."){
    this.cargando = this.cargando -1;
    console.log(res.modulo + res.velAplicacionExp);
    if(res.error == 5){
      //NOTHING
    }else if(res.error != 0){
      window.alert("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
      console.log("ERROR. \nCaller: "+ caller + ". Descripcion: " +res.estatus);
    }
  }

  onChangeModuloRup(res: any){
    this.formatoCCHForm.patchValue({
      moduloRuptura: res.modulo,
      velocidad: res.velAplicacionExp
    }); 
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

  validaCamposVacios(){
    let warning = false;
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
      if(controlName == "l1" || controlName == "l2" || controlName == "l3" || controlName == "prom" || controlName == "defectos"){ 
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

  /*
    Manejo de los Old Members
  */

  llemaOldMembers(res){
    this.cargando=this.cargando-1;
    console.log("llemaOldMembers :: res:");
    console.log(res);
    if(res.error == 12){
      this.oldmembers=[]; //Se asigna oldMembers a un arreglo vacio.
    }else if(res.error > 0){
      window.alert(res.estatus);
    }else{
      this.oldmembers= res;
    }
  }
}


