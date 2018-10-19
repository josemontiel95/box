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
  cargando= 0;
  hiddenA = false;
  hiddenB = false;
  hiddenC = false;
  hidden = false;
  locked =false;
  notRR = false;
  ux = false;
  tipoMuestra = true;
  days1= new Array();
  days2= new Array();
  days3= new Array();
  days4= new Array();
  daysCompletition= new Array();
  herramientas=  new Array();
  herramientas1=  new Array();
  herramientas2=  new Array();
  herramientas3=  new Array();
  groupMembers:  Array<any>;
  herramientaVal: string;

  formatoCCHForm: FormGroup;

        FormatoCCH = {
        cesp1:'',
        cesp2:'',
        cesp3:'',
        cesp4:'',
        fecha: '',
        fc: '',
        revp: '',
        revo: '' ,
        tamano:'',
        volumen: '',
        diasEnsaye1: '',
        diasEnsaye2: '',
        diasEnsaye3: '',
        diasEnsaye4: '',
        unidad: '',  
        hmobra: '',
        tempamb: '',
        tempambrec: '', 
        localizacion: '',
        herramienta: '',
        herramienta1: '',
        herramienta2: '',
        herramienta3: '',          
    }




  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_orden = params.id; this.id_formato=params.id2; this.id_registro=params.id3; }); //Recibe dos parametros
    //El primer parametro es para recibir el numero de registro y el segundo el numero de formato.
    
    this.cargando =3;

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
    'cesp1':            new FormControl( {value: this.FormatoCCH.cesp1, disabled: true}),
    'cesp2':            new FormControl( {value: this.FormatoCCH.cesp2, disabled: true}),
    'cesp3':            new FormControl( {value: this.FormatoCCH.cesp3, disabled: true}),
    'cesp4':            new FormControl( {value: this.FormatoCCH.cesp4, disabled: true}),
    'fecha':            new FormControl( {value: this.FormatoCCH.fecha, disabled: true}),
    'fc':               new FormControl( {value: this.FormatoCCH.fc, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]),
    'revp':             new FormControl( {value: this.FormatoCCH.revp, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]), 
    'revo':             new FormControl( {value: this.FormatoCCH.revo, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]),
    'tamano':           new FormControl( {value: this.FormatoCCH.tamano, disabled: this.hidden},[Validators.required,Validators.pattern("^[0-9]+$")]),
    'volumen':          new FormControl( {value: this.FormatoCCH.volumen, disabled: this.hidden}, [Validators.required,Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]),       
    'diasEnsaye1':      new FormControl( {value: this.FormatoCCH.diasEnsaye1, disabled: true}),
    'diasEnsaye2':      new FormControl( {value: this.FormatoCCH.diasEnsaye2, disabled: true}),
    'diasEnsaye3':      new FormControl( {value: this.FormatoCCH.diasEnsaye3, disabled: true}),
    'diasEnsaye4':      new FormControl( {value: this.FormatoCCH.diasEnsaye4, disabled: true}),
    'unidad':           new FormControl( {value: this.FormatoCCH.unidad, disabled: this.hidden},[Validators.required]),
    'hmobra':           new FormControl( {value: this.FormatoCCH.hmobra, disabled: this.hidden},[Validators.required]),
    'tempamb':          new FormControl( {value: this.FormatoCCH.tempamb, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
    'tempambrec':       new FormControl( {value: this.FormatoCCH.tempambrec, disabled: this.hidden}, [Validators.required,Validators.pattern("^[0-9]+$")]),
    'localizacion':     new FormControl( {value: this.FormatoCCH.localizacion, disabled: this.hidden},[Validators.required]),
    'herramienta':      new FormControl( {value: this.FormatoCCH.herramienta, disabled: this.hidden},[Validators.required]),
    'herramienta1':     new FormControl( {value: this.FormatoCCH.herramienta1, disabled: this.hidden},[Validators.required]),
    'herramienta2':     new FormControl( {value: this.FormatoCCH.herramienta2, disabled: this.hidden},[Validators.required]),
    'herramienta3':     new FormControl( {value: this.FormatoCCH.herramienta3, disabled: this.hidden})
     }); 
  }

   get cesp1()         { return this.formatoCCHForm.get('cesp1'); }
   get cesp2()         { return this.formatoCCHForm.get('cesp2'); }
   get cesp3()         { return this.formatoCCHForm.get('cesp3'); }
   get cesp4()         { return this.formatoCCHForm.get('cesp4'); }
   get fecha()        { return this.formatoCCHForm.get('fecha'); }
   get fc()           { return this.formatoCCHForm.get('fc'); }
   get revp()         { return this.formatoCCHForm.get('revp'); }
   get revo()         { return this.formatoCCHForm.get('revo'); }
   get tamano()       { return this.formatoCCHForm.get('tamano'); }                 
   get volumen()      { return this.formatoCCHForm.get('volumen'); }              
   get diasEnsaye1()   { return this.formatoCCHForm.get('diasEnsaye1'); }
   get diasEnsaye2()   { return this.formatoCCHForm.get('diasEnsaye2'); }     
   get diasEnsaye3()   { return this.formatoCCHForm.get('diasEnsaye3'); }     
   get diasEnsaye4()   { return this.formatoCCHForm.get('diasEnsaye4'); }          
   get unidad()       { return this.formatoCCHForm.get('unidad'); }              
   get hmobra()       { return this.formatoCCHForm.get('hmobra'); }              
   get tempamb()      { return this.formatoCCHForm.get('tempamb'); }              
   get tempambrec()   { return this.formatoCCHForm.get('tempambrec'); }              
   get localizacion() { return this.formatoCCHForm.get('localizacion'); }              
   get herramienta()  { return this.formatoCCHForm.get('herramienta'); }
   get herramienta1()  { return this.formatoCCHForm.get('herramienta1'); }
   get herramienta2()  { return this.formatoCCHForm.get('herramienta2'); }
   get herramienta3()  { return this.formatoCCHForm.get('herramienta3'); }


  submitted = false;


  cargaDatos(){
    this.cargando = this.cargando+1;
    let url =`${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_registrosCampo', this.id_registro);
    this.http.get(url, {search}).subscribe(res => {
                                               
                                                    this.llenaRapido(res.json());
                                                    this.llenado(res.json()); 
                                                    }); 
  }

  onSubmit() { this.submitted = true; }

    
  llenaRapido(respuesta: any){
    
    console.log("llenaRapido :: respuesta");
    console.log(respuesta);

    // Se Copio groupsMember para poderlo manipular.
    this.groupMembers=respuesta.groupMembers;
    console.log(this.groupMembers);
    //Aqui se asignan las banderas del status en el que se encuentre la muestra.
    if(respuesta.status == 1){
      this.hiddenB = true;
      this.mostrar();
    }else if(respuesta.status >= 2){
      this.hiddenA = true;
      this.locked=true;
      this.mostrar();
    }else if(respuesta.status == 0){
      this.hiddenC = true;

    }
    // Esto es para los dias
    this.llenadodiasEnsaye1(this.groupMembers[0].diasEnsaye);
    this.llenadodiasEnsaye2(this.groupMembers[1].diasEnsaye);
    this.llenadodiasEnsaye3(this.groupMembers[2].diasEnsaye);

    this.llenadoHerramienta1(this.groupMembers[0].herramienta_id, this.groupMembers[0].placas );
    this.llenadoHerramienta2(this.groupMembers[1].herramienta_id, this.groupMembers[1].placas );
    this.llenadoHerramienta3(this.groupMembers[2].herramienta_id, this.groupMembers[2].placas );

    if(respuesta.tipo == "VIGAS"){
      this.tipoMuestra = false;
    }else{
    //ES CILINDRO O CUBO
    this.llenadodiasEnsaye4(this.groupMembers[3].diasEnsaye);
    this.llenadoHerramienta4(this.groupMembers[3].herramienta_id, this.groupMembers[3].placas );
      this.tipoMuestra = true;
    } 
    // Hacer lo mismo para herramienta.

    
    

    console.log(this.groupMembers);

  }

  llenado(respuesta: any){
    this.cargando = this.cargando -1;
    console.log("llenado :: respuesta: ");
    console.log(respuesta);
    let groupMemebers = respuesta.groupMembers;
    console.log(groupMemebers);
    //console.log(respuesta.groupMembers.[0].claveEspecimen);

    this.formatoCCHForm.patchValue({
     cesp1:         respuesta.groupMembers[0].claveEspecimen,
     cesp2:         respuesta.groupMembers[1].claveEspecimen,
     cesp3:         respuesta.groupMembers[2].claveEspecimen,
     fecha:         respuesta.fecha,
     fc:            respuesta.fprima,
     revp:          respuesta.revProyecto,
     revo:          respuesta.revObra,
     tamano:        respuesta.tamagregado,
     volumen:       respuesta.volumen,
     diasEnsaye1:   respuesta.groupMembers[0].diasEnsaye,
     diasEnsaye2:   respuesta.groupMembers[1].diasEnsaye,
     diasEnsaye3:   respuesta.groupMembers[2].diasEnsaye,
     unidad:        respuesta.unidad,
     hmobra:        respuesta.horaMuestreo,
     tempamb:       respuesta.tempMuestreo,
     tempambrec:    respuesta.tempRecoleccion,
     localizacion:  respuesta.localizacion,
     herramienta:   respuesta.groupMembers[0].herramienta_id,
     herramienta1:   respuesta.groupMembers[1].herramienta_id,
     herramienta2:   respuesta.groupMembers[2].herramienta_id
    });

    if(respuesta.tipo == "VIGAS"){
    }else{
      this.formatoCCHForm.patchValue({
       cesp4:         respuesta.groupMembers[3].claveEspecimen,
       diasEnsaye4:   respuesta.groupMembers[3].diasEnsaye,
       herramienta3:   respuesta.groupMembers[3].herramienta_id
      }); 
    }
       //aqui
  }

  rellenadoHerramientas(respuesta:any){
    this.cargando = this.cargando +1;
    //Aqui va la llamada para recargar los dropdowns actualizando la herramienta que se consumio
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getHerramientaForDropdownRegistro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenaHerraPrueba( res.json()) );
    //Se borra todo lo del arreglo para no duplicar datos en el siguiente push.
    
  }

  llenadoClaveEspecimen(respuesta: any){
    this.cargando = this.cargando -1;
    console.log("llenadoClaveEspecimen :: respuesta:")
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     cesp1:         respuesta.clave,
     cesp2:         respuesta.clave,
     cesp3:         respuesta.clave,
     cesp4:         respuesta.clave
    });


  }

  llenaDaysPrueba(res: any){
    this.cargando = this.cargando -1;
    console.log("llenaDaysPrueba :: res:");
    console.log(res);
    if(res.error != 0){
      for (let key in res) {
        this.days1.push({'id' : key, 'value' : res[key] });
        this.days2.push({'id' : key, 'value' : res[key] });
        this.days3.push({'id' : key, 'value' : res[key] });
        this.days4.push({'id' : key, 'value' : res[key] });
      }

    }
  }

  llenaHerraPrueba(res: any){
    this.cargando = this.cargando -1;   
    console.log("llenaHerraPrueba :: res:");
    console.log(res);
    /*this.herramientas.length = 0;
    this.herramientas1.length = 0;
    this.herramientas2.length = 0;
    this.herramientas3.length = 0;*/
    if(res.error != 0){
      for (var i =0 ; i < res.length; i++) {
           this.herramientas.push({'id_herramienta' : res[i].id_herramienta, 'placas' : res[i].placas });
           this.herramientas1.push({'id_herramienta' : res[i].id_herramienta, 'placas' : res[i].placas });
           this.herramientas2.push({'id_herramienta' : res[i].id_herramienta, 'placas' : res[i].placas });
           this.herramientas3.push({'id_herramienta' : res[i].id_herramienta, 'placas' : res[i].placas });  
      }
    }
  }

  llenaDaysPruebaCompletition(res: any){
    this.cargando = this.cargando -1;
    console.log(res);
    if(res.error != 0){
      for (let key in res) {
        this.daysCompletition.push({'id' : key, 'value' : res[key] });
      }
    }

    this.cargaDatos();
  }
  
  llenadodiasEnsaye1(res: any){
    if(res=="Pendiente"){

    }else{
      for (let key in this.daysCompletition) {
        if(this.daysCompletition[key].id==res){
          this.days1.push({'id' : res, 'value' : this.daysCompletition[key].value });
        }else{
        }
      }
    }
  }

  llenadodiasEnsaye2(res: any){
    if(res=="Pendiente"){

    }else{
      for (let key in this.daysCompletition) {
        if(this.daysCompletition[key].id==res){
          this.days2.push({'id' : res, 'value' : this.daysCompletition[key].value });
        }else{
        }
      }
    }
  }

  llenadodiasEnsaye3(res: any){
    if(res=="Pendiente"){

    }else{
      for (let key in this.daysCompletition) {
        if(this.daysCompletition[key].id==res){
          this.days3.push({'id' : res, 'value' : this.daysCompletition[key].value });
        }else{
        }
      }
    }
  }
  llenadodiasEnsaye4(res: any){
    if(res=="Pendiente"){

    }else{
      for (let key in this.daysCompletition) {
        if(this.daysCompletition[key].id==res){
          this.days4.push({'id' : res, 'value' : this.daysCompletition[key].value });
        }else{
        }
      }
    }
  }

  llenadoHerramienta1(res: any, res1: any){

    if(res==null){

    }else{
          this.herramientas.push({'id_herramienta' : res, 'placas' : res1 });     
    }
  }

  llenadoHerramienta2(res: any, res1: any){
    if(res==null){

    }else{
          this.herramientas1.push({'id_herramienta' : res, 'placas' : res1 });     
    }
  }

  llenadoHerramienta3(res: any, res1: any){
    if(res==null){

    }else{
          this.herramientas2.push({'id_herramienta' : res, 'placas' : res1 });     
    }
  }

  llenadoHerramienta4(res: any, res1: any){
    if(res==null){

    }else{
          this.herramientas3.push({'id_herramienta' : res, 'placas' : res1 });     
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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

  cambioRegistroIncompleto(){
    this.cargando = this.cargando +1;
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
                                              this.respuestaSwitchCambioRegistro(res.json());                 
                                            } );

    
    //window.alert("Si procedes ")
    //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_orden + '/' +this.id_formato]);
  }

  limpiaHerramientas(){
    //Este metodo limpia los arreglos.
    this.herramientas = new Array();
    this.herramientas1 = new Array();
    this.herramientas2 = new Array();
    this.herramientas3 = new Array();
  }

  onBlurHerramienta(){
    //Se llama a limpiaHerramientas para cargar mas adelante los datos sin tener basura.
    this.limpiaHerramientas();
    this.cargando = this.cargando +1;

    //Llamada al back para Insertar la herramienta.
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.herramienta);
    formData.append('id_registrosCampo', this.groupMembers[0].id_registrosCampo);
    this.http.post(url, formData).subscribe(res => {
                                              //this.respuestaSwitch(res.json());
                                              this.cargando = this.cargando -1;
                                              //this.llenadoClaveEspecimen(res.json()); //Experimental
                                              this.cargaDatos();
                                              this.rellenadoHerramientas(res.json());                
                                            } );

  }

  onBlurHerramienta1(){
    //Se llama a limpiaHerramientas para cargar mas adelante los datos sin tener basura.
    this.limpiaHerramientas();
    this.cargando = this.cargando +1;

    //Llamada al back para Insertar la herramienta.
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.herramienta1);
    formData.append('id_registrosCampo', this.groupMembers[1].id_registrosCampo);
    this.http.post(url, formData).subscribe(res => {
                                              //this.respuestaSwitch(res.json());
                                              this.cargando = this.cargando -1;
                                              //this.llenadoClaveEspecimen(res.json()); //Experimental                                              
                                              this.cargaDatos();
                                              this.rellenadoHerramientas(res.json());                 
                                            } );
 
  }

  onBlurHerramienta2(){
    //Se llama a limpiaHerramientas para cargar mas adelante los datos sin tener basura.
    this.limpiaHerramientas();
    this.cargando = this.cargando +1;
    //Llamada al back para Insertar la herramienta.
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.herramienta2);
    formData.append('id_registrosCampo', this.groupMembers[2].id_registrosCampo);
    this.http.post(url, formData).subscribe(res => {
                                              //this.respuestaSwitch(res.json());
                                              //this.llenadoClaveEspecimen(res.json()); //Experimental
                                              this.cargando = this.cargando -1;
                                              this.cargaDatos();
                                              this.rellenadoHerramientas(res.json());                 
                                            } );
   
  }

  onBlurHerramienta3(){
    //Se llama a limpiaHerramientas para cargar mas adelante los datos sin tener basura.
    this.limpiaHerramientas();
    this.cargando = this.cargando +1;

    //Llamada al back para Insertar la herramienta.
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.herramienta3);
    formData.append('id_registrosCampo', this.groupMembers[3].id_registrosCampo);
    this.http.post(url, formData).subscribe(res => {
                                              //this.respuestaSwitch(res.json());
                                              this.llenadoClaveEspecimen(res.json()); //Experimental
                                              this.cargaDatos();
                                              this.rellenadoHerramientas(res.json());                 
                                            } );

  }


  onChangeGeneric(n){
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroJefeBrigada');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '13');
    formData.append('valor', this.formatoCCHForm.value.revp);
    formData.append('id_registrosCampo', this.id_registro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  onBlurRevObra(){
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
    this.cargando = this.cargando +1;
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
     this.cargando = this.cargando -1; 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       //location.reload();
     }
     else{
          
          //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_formato]);
       
     }
   }

   respuestaSwitchCambioRegistro(res: any){
     this.cargando = this.cargando -1; 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       //location.reload();
     }
     else{
          this.cargaDatos();
          this.hiddenB = false;
          this.hiddenA = false;
          this.mostrar();
          //this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/llenaFormatoCCH/'+this.id_formato]);
       
     }
   }
  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable'; 
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });    
    this.formatoCCHForm.controls['cesp1']['disable']();
    this.formatoCCHForm.controls['cesp2']['disable']();
    this.formatoCCHForm.controls['cesp3']['disable']();
    this.formatoCCHForm.controls['cesp4']['disable']();
    this.formatoCCHForm.controls['revp']['disable']();
    this.formatoCCHForm.controls['fecha']['disable'](); 
  }

  validaCamposVacios(){
    let warning = false;
    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        if(this.formatoCCHForm.controls[controlName].value == "" || this.formatoCCHForm.controls[controlName].value == null || this.formatoCCHForm.controls[controlName].value == "null"){
          if(!this.tipoMuestra && (controlName=="cesp4" || controlName=="diasEnsaye4" || controlName=="herramienta3")){ // Viga
            
          }else if(!this.tipoMuestra){
            warning = true;
          }else if(this.tipoMuestra){
            warning = true;
          }
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