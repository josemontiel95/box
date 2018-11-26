import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Http, URLSearchParams} from '@angular/http';
import {
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

//FIN DE LOS IMPORTS

@Component({
  selector: 'app-dashboardLote',
  templateUrl: './dashboardLote.component.html',
  styleUrls: ['./dashboardLote.component.scss','../../loadingArrows.css']
})
export class dashboardLoteComponent implements OnInit{

  id: string = "1001";
  id_footer: string;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  loteCorreos: string;
  title = 'app';
  global: Global;

  rowSelection;
  columnDefs;
  cargando= 4;
  hidden = true;
  hiddenf= true;
  formatoStatus;
  maxNoOfRegistrosRev;
  numberOfRegistros;
  hiddenFormato=true;

  mensajeEstado="";

  customMailFlag=false;
  adjuntoFlag=false;
  mainGridVisible=true;
  
  loteCompletado=false;
  loteDetailsForm: FormGroup;

  loteDetails  = {
    factua: '',
    observaciones: '',
    customMail: '',
    adjunto: '',
    adjuntoPath: '',
    customMailStatus: '',
    customText: ''
  }

  footerForm: FormGroup;

  footer  = {
    noCorreos:'',
    encargado:'',
    ctrl:'',
    fechaEnsayo: ''
  }
  groupMail;
  GroupMailValidStatus;
  

/* Variables para documentos */
  pdf;
  xml;
/* Variables para iconos de documentos */
  pdfIcon;
  xmlIcon;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: '# Orden',         field: 'id_herramienta' },
    {headerName: '# Cotización',    field: 'id_herramienta' },
    {headerName: 'Tipo',            field: 'tipo' },
    {headerName: 'Placas',          field: 'placas' },
    {headerName: 'Condicion',       field: 'condicion'},
    {headerName: 'Fecha de compra', field: 'fechaDeCompra' },
    {headerName: 'Editado en',      field: 'lastEditedON'},

  ];
    this.rowSelection = "single";
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.loteCorreos=params.id); 
    this.cargando=1;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getLoteByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('lote', this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'checkViabilityOfGroupMail');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('lote', this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      if(res.json().error!=0){
        window.alert(res.json().estatus);
      }else if(res.json().GroupMailValid==0){
        this.groupMail=false;
        this.GroupMailValidStatus=res.json().GroupMailValidStatus;
      }else if(res.json().GroupMailValid==1){
        this.groupMail=true;
        this.GroupMailValidStatus=res.json().GroupMailValidStatus;
      }
    });
    
   
    this.loteDetailsForm = new FormGroup({
      'factua':             new FormControl( {value: this.loteDetails.factua,        disabled: true },  [Validators.required]),
      'observaciones':      new FormControl( {value: this.loteDetails.observaciones, disabled: true }),
      'customMail':         new FormControl( {value: this.loteDetails.customMail,    disabled: true }),
      'customText':         new FormControl( {value: this.loteDetails.customText,    disabled: true }),
      'adjunto':            new FormControl( {value: this.loteDetails.adjunto,       disabled: true })
    });
    this.footerForm = new FormGroup({
      'noCorreos':        new FormControl( {value: this.footer.noCorreos,   disabled: true }),
      'encargado':        new FormControl( {value: this.footer.encargado,   disabled: true }),
      'ctrl':             new FormControl( {value: this.footer.ctrl,        disabled: true }),
      'fechaEnsayo':      new FormControl( {value: this.footer.fechaEnsayo, disabled: true })
    });
  }

  get factua()         { return this.loteDetailsForm.get('factua'); }
  get observaciones()  { return this.loteDetailsForm.get('observaciones'); }
  get customMail()     { return this.loteDetailsForm.get('customMail'); }
  get customText()     { return this.loteDetailsForm.get('customText'); }
  get adjunto()        { return this.loteDetailsForm.get('adjunto'); }

  get noCorreos()      { return this.footerForm.get('noCorreos'); }
  get encargado()      { return this.footerForm.get('encargado'); }
  get ctrl()           { return this.footerForm.get('ctrl'); }  

  mandarCorreoenGrupo(){
    if(this.loteCompletado){
      window.alert("Ya completaste el lote. Ya no puedes enviar.");
      return;
    }
    if(this.groupMail){
      if(window.confirm("Se enviar\u00E1 un solo correo con todos los reportes del lote. Si adjunt\u00F3 factura, esta se incluir\u00E1 en el correo.\u00BFEst\u00E1 usted seguro de enviar el correo?")){
        var confirmation = prompt('Por favor esriba "SI" para continuar. Escriba cualquier otra palabra para abortar. Recuerde que esta acci\u00f3n no se puede revertir, verifique sus datos antes de continuar', "NO");
        if(confirmation == "SI"){
          this.mandarCorreoEnGrupo();
        }else{
          window.alert("Operaci\u00F3n abortada");
        }
      }
    }else{
      window.alert(this.GroupMailValidStatus);
    }
  }
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';
    Object.keys(this.loteDetailsForm.controls).forEach((controlName) => {
      this.loteDetailsForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
  });
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
    console.log(respuesta);


    this.footerForm.patchValue({
     noCorreos:     respuesta.correosNo,
     encargado:     respuesta.encargado,
     ctrl:          respuesta.id_loteCorreos,
     fechaEnsayo:   respuesta.fecha
    });
    this.loteDetailsForm.patchValue({
      factua:        respuesta.factua,
      observaciones: respuesta.observaciones,
      customMail:    respuesta.customMail,
      customText:    respuesta.customText,
      adjunto:       respuesta.adjunto

    });
    if(this.loteDetailsForm.getRawValue().customMail==1){
      this.customMailFlag=true;
    }else if(this.loteDetailsForm.getRawValue().customMail==0){
      this.customMailFlag=false;
    }
    if(this.loteDetailsForm.getRawValue().adjunto==1){
      this.adjuntoFlag=true;
    }else if(this.loteDetailsForm.getRawValue().adjunto==0){
      this.adjuntoFlag=false;
    }

    this.formatoStatus=respuesta.status;
    this.pdf =  respuesta.pdfPath;
    this.xml =  respuesta.xmlPath;
    switch(Number(respuesta.status)){
      case 0:
        this.loteCompletado=false;
        this.mensajeEstado = "Listo modificar datos de facturaci\u00F3n y enviar correos";
      break;
      case 1:
      this.loteCompletado=false;
      this.mensajeEstado = "Correos enviados. Listo para completar";
      break;
      case 2:
        this.loteCompletado=true;
        this.mensajeEstado = "Completado";
      break;
    }
    if(this.pdf==null){
      this.pdfIcon = "assets/img/missing.png";
    }else{
      this.pdfIcon = "assets/img/doc.png";
    }

    if(this.xml==null){
      this.xmlIcon = "assets/img/missing.png";
    }else{
      this.xmlIcon = "assets/img/doc.png";
    }
    console.log(this.formatoStatus);
    this.cargando=this.cargando-1;
  }
  onBlurCustomMail(){
    if(Number(this.loteDetailsForm.value.customMail)==1){
      this.customMailFlag=true;
    }else if(Number(this.loteDetailsForm.value.customMail)==0){
      this.customMailFlag=false;
    }
  }
  onBlurAdjunto(){
    if(this.loteDetailsForm.value.adjunto==1){
      this.adjuntoFlag=true;
    }else if(this.loteDetailsForm.value.adjunto==0){
      this.adjuntoFlag=false;
    }
  }
  generarPDF(){
    this.cargando=1;
    this.hiddenFormato=false;

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'generateAllFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    console.log(this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.validaRespuesta(res.json());
                                          });
  }
  actualizarLoteDetails(){
    this.cargando=this.cargando+1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'upDateLoteDetails');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('id_loteCorreos',     this.loteCorreos);
    formData.append('factua',             this.loteDetailsForm.value.factua);
    formData.append('observaciones',      this.loteDetailsForm.value.observaciones );
    formData.append('customMail',         this.loteDetailsForm.value.customMail );
    formData.append('customText',         this.loteDetailsForm.value.customText );
    formData.append('adjunto',            this.loteDetailsForm.value.adjunto );

    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );
  }
  respuestaError(res){
    if(res.error != 0){
      window.alert(res.estatus);
      location.reload();
    }else{
      this.mostrar();
      this.cargando=this.cargando-1;
    }
    if(this.loteDetailsForm.value.adjunto==1){
      this.adjuntoFlag=true;
    }else if(this.loteDetailsForm.value.adjunto==0){
      this.adjuntoFlag=false;
    }
  }
  abrirPDF(){
    if(this.pdf==null){
      window.alert("No existe archivo para este lote");
    }else{
      window.open(this.global.assetsRoot+this.pdf, "_blank");
    }
  }
  abrirXML(){
    if(this.xml==null){
      window.alert("No existe archivo para este lote");
    }else{
      window.open(this.global.assetsRoot+this.xml, "_blank");
    }
  }
  subirDoc(docNo: any ){
    this.router.navigate(['administrativo/insertar-documento/'+this.loteCorreos+'/'+docNo]);
  }
  validaRespuesta(res: any){
    this.cargando=this.cargando-1;
    this.hiddenFormato=true;

    if(res.error==0){
      window.alert("server regreso con exito");
    }else{
      window.alert("server regreso con error, estatus: "+res.estatus+" error: "+res.error);
    }
  }

  mandarCorreoFaltantes(){
    if(this.loteCompletado){
      window.alert("Ya completaste el lote. Ya no puedes enviar.");
      return;
    }
    this.cargando=this.cargando+1;
    this.mainGridVisible=false;
    this.hiddenFormato=false;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'sentAllEmailFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    search.set('all',             '0');
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.mainGridVisible=true;
                                            this.validaRespuesta(res.json());
                                          });
  } 
  mandarCorreoTodos(){
    if(this.loteCompletado){
      window.alert("Ya completaste el lote. Ya no puedes enviar.");
      return;
    }
    this.cargando=this.cargando+1;
    this.mainGridVisible=false;
    this.hiddenFormato=false;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'sentAllEmailFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    search.set('all',             '1');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.mainGridVisible=true;
      this.validaRespuesta(res.json());
    });
  } 
  mandarCorreoEnGrupo(){
    if(this.loteCompletado){
      window.alert("Ya completaste el lote. Ya no puedes enviar.");
      return;
    }
    this.cargando=this.cargando+1;
    this.mainGridVisible=false;
    this.hiddenFormato=false;
    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'sentGroupMailFormatosByLote');
    search.set('token',           this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('lote',            this.loteCorreos);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.mainGridVisible=true;
      this.validaRespuesta(res.json());
    });
  } 

  completarLote(){
    if(this.loteCompletado){
      window.alert("Ya completaste el lote. Ya no puedes completar.");
      return;
    }
    this.cargando=this.cargando+1;
    this.mainGridVisible=false;
    let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'completarLote');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);
    formData.append('lote',            this.loteCorreos);

    this.http.post(url, formData).subscribe(res => {
      this.validaRespuesta(res.json());
      this.mainGridVisible=true;
    });
  }

  cambiarCargando(num){
    this.cargando=this.cargando+num;
  }
    
  respuestaSwitch(res: any){ 
    this.cargando=this.cargando-1;
    this.hiddenFormato=true;
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
          this.mostrar();         
     }
   }

  regresaPendientes(){
    this.cargando=this.cargando+1;
    this.router.navigate(['administrativo/obras/']);
  }

}
