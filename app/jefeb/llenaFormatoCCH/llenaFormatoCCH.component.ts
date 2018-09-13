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
  selector: 'app-llenaFormatoCCH',
  templateUrl: './llenaFormatoCCH.component.html',
  styleUrls: ['./llenaFormatoCCH.component.scss','../../loadingArrows.css']
})
export class llenaFormatoCCHComponent implements OnInit{

  id: string = "1001";
  id_orden: string;
  id_formato: string;
  id_registro: string;
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando= 5;
  hidden = true;
  hiddenf= true;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  mis_cli: Array<any>;
  mis_obras: Array<any>;
  mis_jefes: Array<any>;
  tipoconcreto= [{"tconcreto":"Normal", "id": "N"},{"tconcreto":"Resistencia Rápida", "id": "RR"},{"tconcreto":"Con aditivo", "id": "CA"}];
  
  numberOfRegistros;
  tipoModificable;

  notRR=true;
  formatoStatus;
  atconcreto  ="";
  aespecimen1 ="";
  aespecimen2 ="";
  aespecimen3 ="";
  aespecimen4 ="";
  maxNoOfRegistrosCCH ="";
  multiplosNoOfRegistrosCCH ="";
  
  formatoCCHForm: FormGroup;

        FormatoCCH = {
        obra:'',
        localizacion: '',
        informe: '',
        empresa:'',
        tconcreto: '',
        especimen1: '',
        especimen2: '',
        especimen3: '',
        especimen4: '',
        direccion: '',
        observaciones:'',
        tipo_especimen:'',
        cono:'',
        varilla:'',
        flexometro:'',
        termometro:''
    }

    espec= [{"especimen":"CILINDRO", "id":"CILINDRO"},{"especimen":"CUBO", "id":"CUBO"},{"especimen":"VIGAS", "id":"VIGAS"}];


   mis_conos: Array<any>;
   mis_varillas: Array<any>;
   mis_flexometro: Array<any>;
   mis_termometro: Array<any>;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: '# Orden', field: 'id_herramienta' },
    {headerName: '# Cotización', field: 'id_herramienta' },
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en', field: 'lastEditedON'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => {this.id_orden=params.id2; this.id_formato=params.id}); 
    this.cargando=6;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
   
    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaConos(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaVarilla');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaVarillas(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaFlexometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaFlexometro(res.json()) );

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaTermometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    this.http.get(url, {search}).subscribe(res => this.llenaTermometro(res.json()) );

    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getformatoDefoults');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenatipo(res.json()) );

     url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getNumberOfRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    this.http.get(url, {search}).subscribe(res => {
      this.numberOfRegistros =res.json().numberOfRegistrosByID;
      this.tipoModificable =(res.json().tipoModificable == 1 ? true : false);
     
      console.log("numberOfRegistros: "+this.numberOfRegistros+" tipoModificable: "+this.tipoModificable);
      this.cargando          =this.cargando-1;
    }); 

    url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getInfoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) ); 


    this.formatoCCHForm = new FormGroup({
      'obra':            new FormControl( {value: this.FormatoCCH.obra,           disabled: this.hidden },  [Validators.required]),
      'localizacion':    new FormControl( {value: this.FormatoCCH.localizacion,   disabled: this.hidden },  [Validators.required]),
      'informe':         new FormControl( {value: this.FormatoCCH.informe,        disabled: this.hidden },  [Validators.required]),
      'empresa':         new FormControl( {value: this.FormatoCCH.empresa,        disabled: this.hidden },  [Validators.required]),
      'tconcreto':       new FormControl( {value: this.FormatoCCH.tconcreto,      disabled: this.hidden },  [Validators.required]),
      'especimen1':      new FormControl( {value: this.FormatoCCH.especimen1,     disabled: this.hidden },  [Validators.required]),
      'especimen2':      new FormControl( {value: this.FormatoCCH.especimen2,     disabled: this.hidden },  [Validators.required]),
      'especimen3':      new FormControl( {value: this.FormatoCCH.especimen3,     disabled: this.hidden },  [Validators.required]),
      'especimen4':      new FormControl( {value: this.FormatoCCH.especimen4,     disabled: this.hidden },  [Validators.required]),
      'direccion':       new FormControl( {value: this.FormatoCCH.direccion,      disabled: this.hidden },  [Validators.required]),
      'observaciones':   new FormControl( {value: this.FormatoCCH.observaciones,  disabled: this.hidden }),       
      'tipo_especimen':  new FormControl( {value: this.FormatoCCH.tipo_especimen, disabled: this.hidden },  [Validators.required]),
      'cono':            new FormControl( {value: this.FormatoCCH.cono,           disabled: this.hidden },  [Validators.required]),
      'varilla':         new FormControl( {value: this.FormatoCCH.varilla,        disabled: this.hidden },  [Validators.required]),
      'flexometro':      new FormControl( {value: this.FormatoCCH.flexometro,     disabled: this.hidden },  [Validators.required]),
      'termometro':      new FormControl( {value: this.FormatoCCH.termometro,     disabled: this.hidden },  [Validators.required]),
          });
  }

   get obra()            { return this.formatoCCHForm.get('obra'); }
   get localizacion()    { return this.formatoCCHForm.get('localizacion'); }
   get informe()         { return this.formatoCCHForm.get('informe'); }
   get empresa()         { return this.formatoCCHForm.get('empresa'); }
   get direccion()       { return this.formatoCCHForm.get('direccion'); }
   get observaciones()   { return this.formatoCCHForm.get('observaciones'); }
   get tipo_especimen()  { return this.formatoCCHForm.get('tipo_especimen'); }
   get tconcreto()       { return this.formatoCCHForm.get('tconcreto'); }
   get especimen1()      { return this.formatoCCHForm.get('especimen1'); }
   get especimen2()      { return this.formatoCCHForm.get('especimen2'); }
   get especimen3()      { return this.formatoCCHForm.get('especimen3'); }
   get especimen4()      { return this.formatoCCHForm.get('especimen4'); }
   get cono()            { return this.formatoCCHForm.get('cono'); }
   get varilla()         { return this.formatoCCHForm.get('varilla'); }
   get flexometro()      { return this.formatoCCHForm.get('flexometro'); }
   get termometro()      { return this.formatoCCHForm.get('termometro'); } 

    mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    this.formatoCCHForm.controls['obra']['disable']();
    this.formatoCCHForm.controls['localizacion']['disable']();
    this.formatoCCHForm.controls['empresa']['disable']();
    this.formatoCCHForm.controls['direccion']['disable']();
    this.formatoCCHForm.controls['observaciones']['disable']();
    this.formatoCCHForm.controls['tipo_especimen']['disable']();
    this.formatoCCHForm.controls['cono']['disable']();
    this.formatoCCHForm.controls['varilla']['disable']();
    this.formatoCCHForm.controls['flexometro']['disable']();
    this.formatoCCHForm.controls['termometro']['disable']();

  }

  llenatipo(resp: any){
    console.log(resp);
    this.notRR=true;
    this.atconcreto= "N";
    this.aespecimen1= resp.cch_def_prueba1;
    this.aespecimen2= resp.cch_def_prueba2;
    this.aespecimen3= resp.cch_def_prueba3;
    this.aespecimen4= resp.cch_def_prueba4;
    this.maxNoOfRegistrosCCH       = resp.maxNoOfRegistrosCCH;
    this.multiplosNoOfRegistrosCCH = resp.multiplosNoOfRegistrosCCH;

  }

  mostrarFooter(){
    this.hiddenf = !this.hiddenf;
    const state = this.hiddenf ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    this.formatoCCHForm.controls['obra']['disable']();
    this.formatoCCHForm.controls['localizacion']['disable']();
    this.formatoCCHForm.controls['empresa']['disable']();
    this.formatoCCHForm.controls['direccion']['disable']();
    this.formatoCCHForm.controls['informe']['disable']();
    this.formatoCCHForm.controls['especimen4']['disable']();
    if(!this.tipoModificable){
      this.formatoCCHForm.controls['tipo_especimen']['disable']();
    }
    this.onBlurTipoConcreto();
  }

  submitted = false;

  onSubmit() { this.submitted = true; }


  
  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }


    
  llenaObra(resp: any){
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_obras[_i]=resp[_i];

    }
    console.log(this.mis_obras);
    //this.cargando=this.cargando-1;
  }

  
  llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     obra:                respuesta.obra,
     localizacion:        respuesta.localizacion,
     informe:             respuesta.informeNo,
     empresa:             respuesta.razonSocial,
     direccion:           respuesta.direccion,
     observaciones:       respuesta.observaciones,
     tipo_especimen:      respuesta.tipo_especimen,
     tconcreto:           respuesta.tipoConcreto,
     especimen1:          respuesta.prueba1,
     especimen2:          respuesta.prueba2,
     especimen3:          respuesta.prueba3,
     especimen4:          respuesta.prueba4,
     cono:                respuesta.cono_id,
     varilla:             respuesta.varilla_id,
     flexometro:          respuesta.flexometro_id,
     termometro:          respuesta.termometro_id
    });

    this.formatoStatus=(respuesta.status == 0 ? true : false);

    this.cargando=this.cargando-1;
     
  }
  onBlurTipoConcreto(){
    if(this.formatoCCHForm.getRawValue().tconcreto == "RR" || this.formatoCCHForm.getRawValue().tconcreto == "CA" ){
      this.notRR = false;
      //window.alert("notRR es false, this.formatoCCHForm.value.tconcreto: "+this.formatoCCHForm.value.tconcreto);
    }else{
      //window.alert("notRR es true, this.formatoCCHForm.value.tconcreto: "+this.formatoCCHForm.value.tconcreto);
      this.notRR = true;
      this.formatoCCHForm.patchValue({
         tconcreto: this.atconcreto,
         especimen1: this.aespecimen1,
         especimen2: this.aespecimen2,
         especimen3: this.aespecimen3,
         especimen4: this.aespecimen4
      });
    }
    //this.notRR = !this.notRR;
    const state = this.hiddenf || this.notRR ? 'disable' : 'enable'; 
    this.formatoCCHForm.controls["especimen1"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.formatoCCHForm.controls["especimen2"][state](); // disables/enables each form control based on 'this.formDisabled'
    this.formatoCCHForm.controls["especimen3"][state](); // disables/enables each form control based on 'this.formDisabled'
    //this.formatoCCHForm.controls["especimen4"][state](); // disables/enables each form control based on 'this.formDisabled'
  }

  onBlurEspecimen3(){
    this.formatoCCHForm.patchValue({
      especimen4: this.formatoCCHForm.value.especimen3,
    });
  }

  obtenStatusReg(){
    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaRegistrosVacios(res.json());
                                          });
  }

  validaRegistrosVacios(res: any){

    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0"){
         //isValid = false;
      }
    });

    if(!isValid){
      window.alert("Tienes al menos un registro vacio, todos los registros deben estar en ESTATUS:1 para completar el formato.");     
    }else{
          if(window.confirm("¿Estas seguro de marcar como completado el formato? ya no podra ser editarlo.")){
            this.formatoCompletado();
          }
    } 
  } //FIN ValidaCamposVacios

  formatoCompletado(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeFormato');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoCampo', this.id_formato);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaFormatoCompletado(res.json());
    });
    
  } 
  respuestaFormatoCompletado(res: any){
    this.cargando=this.cargando-1;
    this.formatoStatus=false;
    console.log(res);
  }

  agregaRegistro(){
    window.alert("this.maxNoOfRegistrosCCH: "+this.maxNoOfRegistrosCCH+" this.numberOfRegistros: "+this.numberOfRegistros+" this.multiplosNoOfRegistrosCCH: "+this.multiplosNoOfRegistrosCCH);
    if(this.maxNoOfRegistrosCCH == this.numberOfRegistros){
      window.alert("Has alcanzado el número máximo de registros.");
      return;
    }else if(0 == this.numberOfRegistros){
       if(window.confirm("Estas creando tu primer registro. Ya no podrás cambiar el tipo de formato. El tipo actual es: "+this.formatoCCHForm.getRawValue().tipo_especimen+"\n ¿Deseas continuar?")){

       }else{
         return;
       }
    }else if(Number(this.numberOfRegistros)%Number(this.multiplosNoOfRegistrosCCH)==0){
       if(window.confirm("Estas a punto de crear el registro número "+(Number(this.numberOfRegistros)+1)+". Recuerda que debes insertar de "+this.multiplosNoOfRegistrosCCH+" en "+this.multiplosNoOfRegistrosCCH+"\n ¿Deseas continuar?")){

       }else{
         return;
       }
    }

    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'initInsert');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('formatoCampo_id', this.id_formato);  
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaRegistro(res.json());                 
                                            } );
    
  }

  actualizarInformeNo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'updateHeader');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoCampo', this.id_formato);  
    formData.append('informeNo', this.formatoCCHForm.value.informe);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
    });
  }

  actualizarFooter(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoCampo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'updateFooter');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('id_formatoCampo',   this.id_formato);  
    formData.append('observaciones',     this.formatoCCHForm.value.observaciones);
    formData.append('tipo',              this.formatoCCHForm.getRawValue().tipo_especimen);
    formData.append('cono_id',           this.formatoCCHForm.value.cono);
    formData.append('tipoConcreto',      this.formatoCCHForm.getRawValue().tconcreto); 
    formData.append('prueba1',           this.formatoCCHForm.getRawValue().especimen1);  
    formData.append('prueba2',           this.formatoCCHForm.getRawValue().especimen2);  
    formData.append('prueba3',           this.formatoCCHForm.getRawValue().especimen3);  
    formData.append('prueba4',           this.formatoCCHForm.getRawValue().especimen4); 
    formData.append('varilla_id',        this.formatoCCHForm.value.varilla);
    formData.append('flexometro_id',     this.formatoCCHForm.value.flexometro);
    formData.append('termometro_id',     this.formatoCCHForm.value.termometro);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitchFooter(res.json());                 
                                            } );

  }

  respuestaSwitch(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.mostrar();         
     }
   }

   respuestaSwitchFooter(res: any){ 
     this.cargando=this.cargando-1;
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.mostrarFooter();         
     }
   }

  respuestaRegistro(res: any){ 
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.id_registro= res.id_registrosCampo;
          console.log(this.id_registro);
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroCCH/'+this.id_orden + '/' + this.id_formato  + '/' +this.id_registro]);        
     }
   }

  llenaConos(resp: any){
    console.log(resp);
    this.mis_conos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_conos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaConos this.cargando: "+this.cargando);
  }

  llenaVarillas(resp: any){
    console.log(resp);
    this.mis_varillas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_varillas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaFlexometro(resp: any){
    console.log(resp);
    this.mis_flexometro= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_flexometro[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaFlexometros this.cargando: "+this.cargando);
  }

  llenaTermometro(resp: any){
    console.log(resp);
    this.mis_termometro= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_termometro[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTermometros this.cargando: "+this.cargando);
  }

  regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/'+ this.id_orden]);
  }




}
