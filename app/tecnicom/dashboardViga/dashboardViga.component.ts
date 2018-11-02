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
  selector: 'app-dashboardViga',
  templateUrl: './dashboardViga.component.html',
  styleUrls: ['./dashboardViga.component.scss','../../loadingArrows.css']
})
export class dashboardVigaComponent implements OnInit{

  id: string = "1001";
  id_footer: string;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  link = "";
  linkFormatoCampo = "";
  rowSelection;
  columnDefs;
  cargando= 4;
  hidden = true;
  hiddenf= true;
  isValid=false;
  isComplete=false;
  tipoModificable;
  preliminar = false;
  preliminarGabs= false;
  status;
  mis_tipos: Array<any>;
  mis_lab: Array<any>;
  mis_cli: Array<any>;
  mis_jefes: Array<any>;

  mis_basculas: Array<any>;
  mis_reglas: Array<any>;
  mis_prensas: Array<any>;

  formatoStatus;
  maxNoOfRegistrosRev;
  numberOfRegistros;
  
  formatoCCHForm: FormGroup;
    FormatoCCH = {
    fechaEnsayo: '',
    observaciones:'',
    bascula:'',
    regla:'',
    prensa:''
    }

  mis_conos: Array<any>;
  mis_varillas: Array<any>;
  mis_flexometro: Array<any>;

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
    this.route.params.subscribe( params => this.id_footer=params.id); 
    this.cargando=5;

    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res =>{
      this.llenado(res.json());
      this.sinNombre(res.json());
    }); 

    url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    search = new URLSearchParams();

    search.set('function', 'getForDroptdownBasculas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res =>{                
      this.llenaBascula(res.json()); 
    });

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownReglasVerFlex');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res =>{                                
      this.llenaReglas(res.json()); 
    });

    search = new URLSearchParams();
    search.set('function', 'getForDroptdownPrensas');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res =>{                                                  
      this.llenaPrensas(res.json()); 
    });

    url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'isTheWholeFamilyHereAndComplete');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.validaComplete(res.json());
    });

    
    //Esta Función no existe en el back pero supondria darme el estado para poder generar el PDF 0 No listo | 1 Listo.

    url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getNumberOfRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    this.http.get(url, {search}).subscribe(res => {
      //this.numberOfRegistros =res.json().numberOfRegistrosByID;
      //this.tipoModificable =(res.json().tipoModificable == 1 ? true : false);
      //console.log("numberOfRegistros: "+this.numberOfRegistros+" tipoModificable: "+this.tipoModificable);
      //this.cargando=this.cargando-1;
    }); 


    this.formatoCCHForm = new FormGroup({
      'fechaEnsayo':      new FormControl( {value: this.FormatoCCH.fechaEnsayo, disabled: true }),
      'observaciones':    new FormControl( {value: this.FormatoCCH.observaciones, disabled: this.hidden }, [Validators.required]),       
      'bascula':          new FormControl( {value: this.FormatoCCH.bascula, disabled: this.hidden },  [Validators.required]),
      'regla':            new FormControl( {value: this.FormatoCCH.regla, disabled: this.hidden },  [Validators.required]),
      'prensa':           new FormControl( {value: this.FormatoCCH.prensa, disabled: this.hidden },  [Validators.required]),
    });
  }

  get fechaEnsayo()       { return this.formatoCCHForm.get('fechaEnsayo'); }
  get observaciones()     { return this.formatoCCHForm.get('observaciones'); }
  get bascula()           { return this.formatoCCHForm.get('bascula'); }
  get regla()             { return this.formatoCCHForm.get('regla'); }
  get prensa()            { return this.formatoCCHForm.get('prensa'); }  
  
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    
    this.formatoCCHForm.controls['observaciones']['disable']();
    
    this.formatoCCHForm.controls['bascula']['disable']();
    this.formatoCCHForm.controls['regla']['disable']();
    this.formatoCCHForm.controls['prensa']['disable']();
  }



  mostrarFooter(){
    this.hiddenf = !this.hiddenf;
    const state = this.hiddenf ? 'disable' : 'enable';

    Object.keys(this.formatoCCHForm.controls).forEach((controlName) => {
        this.formatoCCHForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });

    this.formatoCCHForm.controls['fechaEnsayo']['disable']();

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

  llenado(respuesta:any){
    this.cargando = this.cargando -1;
    console.log(respuesta);

    this.formatoCCHForm.patchValue({
     fechaEnsayo:      respuesta.fecha,
     observaciones:    respuesta.observaciones,
     bascula:          respuesta.buscula_id,
     regla:            respuesta.regVerFle_id,
     prensa:           respuesta.prensa_id
    });

    this.link = respuesta.preliminarGabs;
    this.linkFormatoCampo = respuesta.preliminar;

    this.formatoStatus=(respuesta.status == 0 ? true : false);
    console.log(this.formatoStatus);
    //this.cargando=this.cargando-1;
  }

  sinNombre(respuesta: any){
    //Esta if verifica si ya fue generado un PDF mediante respuesta.preliminar, si fue generado activa Visuarlizar PDF.
    if(respuesta.preliminar == null){
      this.preliminar = false;
    }else{
      this.preliminar = true;
    }

    if(respuesta.preliminarGabs == null){
      this.preliminarGabs = false;
      this.isValid = false;
    }else{
      this.preliminarGabs = true;
      this.isValid = true;
    }

  }

  cambiarCargando(num){
    this.cargando=this.cargando + num;
  }

  reloadData(){
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res =>{
      this.llenado(res.json());
      this.sinNombre(res.json());
    }); 
  }

  /*********************************************/
  /*CODIGO PARA VISUALIZAR EL FORMATO DE CAMPO */ 
  visualizarFormatoDeCampoPDF(){
    if(!this.preliminar){
      window.alert("No se puede acceder al PDF solicitado.");
    }else if(this.preliminar){
      if(window.confirm("¿Estas seguro de Visualizar el PDF?")){
        let link = this.linkFormatoCampo;
        window.open(link, "_blank");
      } 
    }                                  
  }

  /* FIN DEL BLOQUE DE VISUALIZAR EL FORMATO DE CAMPO*/
  /***************************************************/
     
  /***********************************************/
  /*CODIGO PARA GENERAR PDF DE ENSAYO DE GABINO */   
  generaPDFEnsayo(){
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosFromFooterByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('footerEnsayo_id', this.id_footer);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.validaRegistrosVaciosGEN(res.json());
    });                                         
  }

  validaRegistrosVaciosGEN(res: any){
    this.cargando=this.cargando-1;
    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0"){
         isValid = false;
      } 
    });

    if(!isValid){
      window.alert("Tienes al menos un ensayo sin completar, todos los ensayos deben estar en ESTATUS:1 para poder Generar un PDF.");     
    }else if(window.confirm("¿Estas seguro de Generar el PDF de Ensayo?")){
      this.generatePDF();
    } 
  } //FIN ValidaCamposVacios

  generatePDF(){
    this.cargando= this.cargando + 1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'generatePDFEnsayo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_footerEnsayo', this.id_footer);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaGeneratePDF(res.json());
    });
    
  } 

  respuestaGeneratePDF(res: any){
    this.cargando=this.cargando-1;
    if(res.error==0){
      window.alert("Exito al crear el PDF de Ensayo.");
      this.reloadData();
    }else{
      window.alert(res.estatus);
      //location.reload();
    } 
  }

  /* FIN DEL BLOQUE DE GENERACION PDF DE ENSAYO*/
  /*********************************************/

 /*************************************************/
/*CODIGO PARA VISUALIZAR PDF DE ENSAYO DE GABINO */



  visualizarFormatoCampo(){
    if(!this.preliminarGabs){
        window.alert("Para Visualizar PDF: Primero debes Generar el PDF dando click al botón Generar PDF.");
      }else if(window.confirm("¿Estas seguro de Visualizar el PDF?")){
        let link = this.link;
        window.open(link, "_blank");
      } 
  }

  obtenStatusVisualizarPDF(){
      this.cargando=this.cargando+1;
      let url = `${this.global.apiRoot}/ensayoViga/get/endpoint.php`;
      let search = new URLSearchParams();
      search.set('function', 'getAllRegistrosFromFooterByID');
      search.set('token', this.global.token);
      search.set('rol_usuario_id', this.global.rol);
      search.set('footerEnsayo_id', this.id_footer);
      this.http.get(url, {search}).subscribe(res => {
        this.validaRegistrosVaciosVisualizar(res.json());
    });
  }

  validaRegistrosVaciosVisualizar(res: any){
    this.cargando=this.cargando-1;
    let isValid = true;
    res.forEach(function (value) {
      if(value.status == "0"){
         isValid = false;
      }
    });

    if(!isValid){
      window.alert("No hay vigas ensayadas, para poder Visualizar un PDF tiene que haber al menos una ensayada..");     
    }else{
      if(!this.preliminarGabs){
        window.alert("Para Visualizar PDF: Primero debes Generar el PDF dando click al botón Generar PDF.");
      }else if(window.confirm("¿Estas seguro de Visualizar el PDF?")){
        let link = this.link;
        window.open(link, "_blank");
      } 
    } 
  } 

 /* FIN DEL BLOQUE DE GENERACION PDF DE ENSAYO*/
 /*********************************************/

 /*****************************************************/
 /*CODIGO PARA COMPLETAR FORMATO DE ENSAYO DE MUESTRA */  

  validaComplete(res: any){
    this.cargando = this.cargando -1;
    if(res.error == 0){
      this.isComplete = true;
    }else if(res.error >0 && res.error <4 ){
      window.alert(res.estatus);
      this.router.navigate(['login']);
    }else if(res.error == 20){ //NO HAN LLEGADO TODO LOS HIJOS
      this.isComplete = false;
    }else if(res.error == 30){ //NO ESTAN COMPLETADOS TODO LOS HIJOS
      this.isComplete = false;
      this.isValid= false;
    }else if(res.error != 0){ //NO ESTAN COMPLETADOS TODO LOS HIJOS
      this.isComplete = false;
      window.alert(res.estatus);
    }
  }

  obtenStatusReg(){
    this.cargando = this.cargando +1;
    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'isTheWholeFamilyHereAndComplete');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_footerEnsayo', this.id_footer);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.validaRegistrosVacios(res.json());
    });
  }

  validaRegistrosVacios(res: any){
    this.cargando = this.cargando -1;
    if(res.error == 0){
      if(window.confirm("¿Estas seguro de marcar como completado el formato? ya no podrá ser editado.")){
        this.formatoCompletado();
      }
    }else if(res.error >0 && res.error <4 ){
      window.alert(res.estatus);
      this.router.navigate(['login']);
    }else if(res.error == 20){ //NO HAN LLEGADO TODO LOS HIJOS
      window.alert(res.estatus);
    }else if(res.error == 30){ //NO ESTAN COMPLETADOS TODO LOS HIJOS
      window.alert(res.estatus);
    }else if(res.error != 0){ //NO ESTAN COMPLETADOS TODO LOS HIJOS
      window.alert(res.estatus);
    }
  } 

  formatoCompletado(){
    console.log("formatoCompletado :: Sigo vivo");
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completeFormato');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('id_footerEnsayo', this.id_footer);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaFormatoCompletado(res.json());
    });
  } 
  
  respuestaFormatoCompletado(res: any){
    this.cargando=this.cargando-1;
    this.formatoStatus=false;
    console.log(res.status);
    if(res.error==0){
      window.alert("¡Exito! El Formato Se ha Completado");
    }else{
      window.alert(res.estatus);
    }
  }

  /* FIN DEL BLOQUE COMPLETAR FORMATO DE ENSAYO DE MUESTRA*/
 /*********************************************************/

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

  llenaBascula(resp: any){
    this.cargando=this.cargando-1;
    console.log(resp);
    this.mis_basculas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_basculas[_i]=resp[_i];
    }
    console.log("llenaBascula this.cargando: "+this.cargando);
  }

   llenaReglas(resp: any){
    this.cargando=this.cargando-1;
    console.log(resp);
    this.mis_reglas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_reglas[_i]=resp[_i];
    }
    console.log("llenaVarillas this.cargando: "+this.cargando);
  }

  llenaPrensas(resp: any){
    this.cargando=this.cargando-1;
    console.log(resp);
    this.mis_prensas= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ ){
      this.mis_prensas[_i]=resp[_i];
    }
    console.log("llenaPrensas this.cargando: "+this.cargando);
  }

   onChangeBascula(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '1');
    formData.append('valor', this.formatoCCHForm.value.bascula);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangeRegla(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '2');
    formData.append('valor', this.formatoCCHForm.value.regla);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }

  onChangePrensa(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '3');
    formData.append('valor', this.formatoCCHForm.value.prensa);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res =>{
      console.log(this.id_footer);
      this.validaRespuesta(res.json());                 
    });
  }

  onChangeObservaciones(){
    this.cargando = this.cargando +1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertRegistroTecMuestra');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('campo', '4');
    formData.append('valor', this.formatoCCHForm.value.observaciones);
    formData.append('id_footerEnsayo', this.id_footer);
    this.http.post(url, formData).subscribe(res => {
                                              console.log(this.id_footer);
                                              this.validaRespuesta(res.json());                 
                                            } );
  }    


  validaRespuesta(res:any){
    this.cargando = this.cargando -1;
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
     }
     else{
               
     }
   }

  regresaPendientes(){
    this.cargando = this.cargando +1;
    this.router.navigate(['tecnico/pendientes/']);
  }

}
