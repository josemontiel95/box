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
  selector: 'app-llenaRevenimiento',
  templateUrl: './llenaRevenimiento.component.html',
  styleUrls: ['./llenaRevenimiento.component.scss','../../loadingArrows.css']
})
export class llenaRevenimientoComponent implements OnInit{

  id: string = "1001";
  id_orden: string;
  id_formato: string;
  id_registro: string;
  title = 'app';
  global: Global;
  link = "";
  rowSelection;
  columnDefs;
  cargando;
  hidden = true;
  hiddenf= true;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  mis_cli: Array<any>;
  mis_obras: Array<any>;
  mis_jefes: Array<any>;
  formatoStatus;
  preliminar = false;
  pdfFinal;
 
  maxNoOfRegistrosRev;
  numberOfRegistros;
  isValid=false;
  statusRevenimiento = false;

  estadoTitle="";

  /* Variables de estado de los botones */ 
  verformatoCampo=false;
  generarFormatoFinal=false;
  verFormatoFinal=false;
  autYEnviar=false;
  
  formatoCCHForm: FormGroup;
    FormatoCCH = {
    obra:'',
    localizacion: '',
    informe: '',
    empresa:'',
    direccion: '',
    observaciones:'',
    cono:'',
    varilla:'',
    flexometro:'',
    termometro:''
  }

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
    /************************PARAMETRIZACION DE ID_ORDEN Y ID_FORMATO**************************/
    this.route.params.subscribe( params => {this.id_orden=params.id2; this.id_formato=params.id});
    //INICIALIZACIÓN DE LA VARIABLE GLOBAL CARGANDO EN EL NUMERO DE LLAMADAS AL BACK 6 
    this.cargando=7;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
    
    /****LLAMADA AL BACK PARA LLENAR EL DROPDOWN DE CONOS****/
    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => this.llenaConos(res.json()));

    /****LLAMADA AL BACK PARA LLENAR EL DROPDOWN DE VARILLAS****/
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaVarilla');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => this.llenaVarillas(res.json()));

    /****LLAMADA AL BACK PARA LLENAR EL DROPDOWN DE FLEXOMETROS****/
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaFlexometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => this.llenaFlexometro(res.json()));

    /****LLAMADA AL BACK PARA ALMACENAR EL NUMERO MAXIMO DE REGISTROS****/
    url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getformatoDefoults');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {  
      this.maxNoOfRegistrosRev = res.json().maxNoOfRegistrosRev;
      this.cargando=this.cargando-1;
      console.log("getformatoDefoults :: this.maxNoOfRegistrosRev: "+this.maxNoOfRegistrosRev);
    });

    /****LLAMADA AL BACK PARA OBTENER EL NUMERO DE REGISTROS POR ID****/
    url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getNumberOfRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('formatoRegistroRev_id', this.id_formato);
    this.http.get(url, {search}).subscribe(res => {
      this.numberOfRegistros =res.json().numberOfRegistrosByID;
      this.cargando          =this.cargando-1;
      console.log("getNumberOfRegistrosByID :: this.numberOfRegistros: "+this.numberOfRegistros);
    }); 

    url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'formatoSeen');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_formatoRegistroRev', this.id_formato);
    this.http.post(url, formData).subscribe(res => {
      if(res.json().error==0){
        console.log(res.json());
        this.cargando=this.cargando-1;
      }else{
        window.alert(res.json().estatus);
      } 
    }); 

    /****LLAMADA AL BACK PARA LLENAR TODOS LOS CAMPOS, OBTENER STATUS.****/
    url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getInfoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    this.http.get(url, {search}).subscribe(res => {
      this.llenado(res.json());
      this.sinNombre(res.json());
      this.estados(res.json());
    }); 

    this.formatoCCHForm = new FormGroup({
      'obra':            new FormControl( {value: this.FormatoCCH.obra, disabled: this.hidden },  [Validators.required]),
      'localizacion':    new FormControl( {value: this.FormatoCCH.localizacion, disabled: this.hidden },  [Validators.required]),
      'informe':         new FormControl( {value: this.FormatoCCH.informe, disabled: this.hidden },  [Validators.required]),
      'empresa':         new FormControl( {value: this.FormatoCCH.empresa, disabled: this.hidden },  [Validators.required]),
      'direccion':       new FormControl( {value: this.FormatoCCH.direccion, disabled: this.hidden },  [Validators.required]),
      'observaciones':   new FormControl( {value: this.FormatoCCH.observaciones, disabled: this.hidden }),       
      'cono':            new FormControl( {value: this.FormatoCCH.cono, disabled: this.hidden },  [Validators.required]),
      'varilla':         new FormControl( {value: this.FormatoCCH.varilla, disabled: this.hidden },  [Validators.required]),
      'flexometro':      new FormControl( {value: this.FormatoCCH.flexometro, disabled: this.hidden },  [Validators.required]),
    });
  }

  get obra()           { return this.formatoCCHForm.get('obra'); }
  get localizacion()   { return this.formatoCCHForm.get('localizacion'); }
  get informe()        { return this.formatoCCHForm.get('informe'); }
  get empresa()        { return this.formatoCCHForm.get('empresa'); }
  get direccion()      { return this.formatoCCHForm.get('direccion'); }
  get observaciones()  { return this.formatoCCHForm.get('observaciones'); }
  get cono()           { return this.formatoCCHForm.get('cono'); }
  get varilla()        { return this.formatoCCHForm.get('varilla'); }
  get flexometro()     { return this.formatoCCHForm.get('flexometro'); }
  get termometro()     { return this.formatoCCHForm.get('termometro'); } 
  
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
    this.formatoCCHForm.controls['cono']['disable']();
    this.formatoCCHForm.controls['varilla']['disable']();
    this.formatoCCHForm.controls['flexometro']['disable']();
  }

  mostrarFooter(){
    this.hiddenf = !this.hiddenf;
    const state = this.hiddenf ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });

    this.formatoCCHForm.controls['obra']['disable']();
    //this.formatoCCHForm.controls['localizacion']['disable']();
    this.formatoCCHForm.controls['informe']['disable']();
    this.formatoCCHForm.controls['empresa']['disable']();
    this.formatoCCHForm.controls['direccion']['disable']();
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }
  
  labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  statusFormReciver(isValid){
    this.isValid=isValid;
  }
    
  llenaObra(resp: any){
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_obras[_i]=resp[_i];
    }
    console.log(this.mis_obras);
    //this.cargando=this.cargando-1;
  }
  

  
  llenado(respuesta: any){
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
      obra:            respuesta.obra,
      localizacion:    respuesta.localizacion,
      informe:         respuesta.regNo,
      empresa:         respuesta.razonSocial,
      direccion:       respuesta.direccion,
      observaciones:   respuesta.observaciones,
      cono:            respuesta.cono_id,
      varilla:         respuesta.varilla_id,
      flexometro:      respuesta.flexometro_id,
      termometro:      respuesta.termometro_id
    });

    this.link = respuesta.preliminar;
    this.pdfFinal = respuesta.pdfFinal;
    this.statusRevenimiento = respuesta.status;
    this.formatoStatus=(respuesta.status < 2 ? true : false);
    if(!this.formatoStatus){
      this.recargaHerramientas();
    }
    this.cargando=this.cargando-1;
     
  }
  //Aun falta definir los estados en los botones en el hmtl INCOMPLETO
  estados(respuesta: any){
    
    if(respuesta.preliminar == null && respuesta.pdfFinal == null && respuesta.status == 0){
      this.verformatoCampo = false;
      this.generarFormatoFinal = false;
      this.verFormatoFinal = false;
      this.autYEnviar = false;
      this.estadoTitle="En edici\u00f3n por el Jefe de Brigada";
    }else if(respuesta.preliminar != null && respuesta.pdfFinal == null && respuesta.status == 0){
      this.verformatoCampo = true;
      this.generarFormatoFinal = false;
      this.verFormatoFinal = false;
      this.autYEnviar = false;
      this.estadoTitle="En edici\u00f3n por el Jefe de Brigada";
    }else if(respuesta.preliminar != null && respuesta.pdfFinal == null && respuesta.status == 1){
      this.verformatoCampo = true;
      this.generarFormatoFinal = true;
      this.verFormatoFinal = false;
      this.autYEnviar = false;
      this.estadoTitle="En revisi\u00f3n y espera de autorizaci\u00f3n del jefe de laboratorio.";
    }else if(respuesta.preliminar != null && respuesta.pdfFinal != null && respuesta.status == 1){
      this.verformatoCampo = true;
      this.generarFormatoFinal = true;
      this.verFormatoFinal = true;
      this.autYEnviar = true;
      this.estadoTitle="En revisi\u00f3n y espera de autorizaci\u00f3n del jefe de laboratorio.";
    }else if(respuesta.preliminar != null && respuesta.pdfFinal != null && respuesta.status == 2){
      this.verformatoCampo = true;
      this.generarFormatoFinal = false;
      this.verFormatoFinal = true;
      this.autYEnviar = false;
      this.estadoTitle="Se ha autorizado y completado este reporte.";
    }  
  }

  sinNombre(respuesta: any){

      
    //Esta if verifica si ya fue generado un PDF mediante respuesta.preliminar, si fue generado activa Visuarlizar PDF.
   
  }

  recargaHerramientas(){
    this.cargando = this.cargando +3;

    let url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    let search = new URLSearchParams();
   
    search.set('function', 'getForDroptdownJefeBrigadaCono');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => this.llenaConos(res.json()));

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaVarilla');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => this.llenaVarillas(res.json()));

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownJefeBrigadaFlexometro');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id_orden);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => this.llenaFlexometro(res.json()));
  }

  obtenStatusReg(){
    if(!this.autYEnviar){
      window.alert("Todavia no puedes autorizar este reporte. Verifica el estado actual e intentalo otra vez.");
      return;
    }
    if(0 == this.numberOfRegistros){
      if(window.confirm("¿Estas seguro de que quieres marcar como completado sin agregar un solo registro?")){
        this.formatoCompletado();
        return;
      }else{
        return;
      }
    }

    let url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.validaRegistrosVacios(res.json());
    });
  }

  reloadData(){
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getInfoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    this.http.get(url, {search}).subscribe(res => {
      this.llenado(res.json());
      this.sinNombre(res.json());
      this.estados(res.json());
    }); 
  }

  validaRegistrosVacios(res: any){

    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0" || value.status == "3"){
         isValid = false;
        //window.alert("Existe al menos un registro que no ha sido completado, verifica que todos los registros esten completados.");
      }
    });

    if(!isValid){
      window.alert("Tienes al menos un registro sin completar, todos los registros deben estar en ESTATUS:2 o 4 para completar el formato.");     
    }else{
          if(window.confirm("¿Estas seguro de marcar como completado el formato? ya no podrá ser editado.")){
            this.formatoCompletado();
          }
    } 
  } 

  formatoCompletado(){
    console.log("formatoCompletado :: Sigo vivo");
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'autRevenimientoForAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoRegistroRev', this.id_formato);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaFormatoCompletado(res.json());
    });
  } 
  
  respuestaFormatoCompletado(res: any){
    if(res.error==0){
      this.cargando=this.cargando-1;
      this.formatoStatus=false;
      this.reloadData();
      console.log(res);
    }else{
      this.cargando=this.cargando-1;
      window.alert(res.estatus);
    }
    
  }
  
  agregaRegistro(){
    if(this.maxNoOfRegistrosRev == this.numberOfRegistros){
      window.alert("Has alcanzado el número máximo de registros.");
      return;
    }
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'initInsert');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoRegistroRev', this.id_formato);  
    this.http.post(url, formData).subscribe(res => {
                                              console.log(res);
                                              this.respuestaRegistro(res.json());                 
                                            } );
  }

  actualizarInformeNo(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'updateHeader');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoRegistroRev', this.id_formato);  
    formData.append('regNo', this.formatoCCHForm.value.informe);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());                 
                                            } );
  }

  actualizarFooter(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'updateFooter');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoRegistroRev', this.id_formato);  
    formData.append('observaciones', this.formatoCCHForm.value.observaciones);
    formData.append('cono_id', this.formatoCCHForm.value.cono);
    formData.append('varilla_id', this.formatoCCHForm.value.varilla);
    formData.append('flexometro_id', this.formatoCCHForm.value.flexometro);
    formData.append('localizacion', this.formatoCCHForm.value.localizacion);
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
          this.id_registro= res.id_registrosRev;
          console.log(this.id_registro);
          this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' + this.id_formato + '/' +this.id_registro]);        
     }
   }

  llenaConos(resp: any)
  {
    console.log(resp);
    this.mis_conos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_conos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaConos this.cargando: "+this.cargando);
  }

  llenaVarillas(resp: any)
  {
    console.log(resp);
    this.mis_varillas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_varillas[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaFlexometro(resp: any)
  {
    console.log(resp);
    this.mis_flexometro= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_flexometro[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaFlexometros this.cargando: "+this.cargando);
  }

  regresaDashboard(){
    this.router.navigate(['/jefeLaboratorio/orden-trabajo/dashboard/'+ this.id_orden]);
  }

  /*********************************************/
  /*CODIGO PARA VISUALIZAR EL FORMATO DE CAMPO */ 
  visualizarFormatoDeCampoPDF(){
    if(!this.verformatoCampo){
      window.alert("No se puede acceder al PDF solicitado.");
    }else if(this.verformatoCampo){
      if(window.confirm("¿Estas seguro de Visualizar el PDF?")){
        window.open(this.link, "_blank");
      } 
    }                                  
  }

  /* FIN DEL BLOQUE DE VISUALIZAR EL FORMATO DE CAMPO*/
  /***************************************************/

  onClickVizualizarPDF(){
    if(this.verFormatoFinal){
      window.open(this.pdfFinal, "_blank");
    }else{
      window.alert("No se ha generado un PDF para este ensayo");
    }
  }
  onClickGenerarPDF(){
    if(this.generarFormatoFinal){ //Esta variable almacena el status de el formato de revenimiento.
      if(this.isValid){
        if(window.confirm("¿Esta usted seguro de generar el PDF?")){
          this.generatePDF();
        }else{
          // Autorizacion cancelada.
        }
      }else{
        window.alert("No es posible generar un PDF para este ensayo todavia.");
      }
    }else{
      window.alert("Selecciona un ensayo primero");
    }
  }

  generatePDF(){
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/formatoRegistroRev/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'generatePDFFinal');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoRegistroRev', this.id_formato);    
    this.http.post(url, formData).subscribe(res => {
      this.respuestaGeneratePDF(res.json());
    });
  }
  respuestaGeneratePDF(res: any){
    if(res.error==0){
      console.log(res);
      this.cargando=this.cargando-1;
      this.reloadData();
      console.log(res);
    }else{
      window.alert(res.estatus);
      console.log(res);
      this.cargando=this.cargando-1;
    } 
  } 
}
