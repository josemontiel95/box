import { Component ,OnInit,Output,EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formato-cch-grid',
  templateUrl: './formato-cch-grid.component.html',
  styleUrls: ['./formato-cch-grid.component.css']
})
export class FormatoCCHGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  id_footer: string;
  tipoEnsayo: string;
  id_registroEnsayo: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  footerEnsayo_id: string;
  statusEnsayo = false;
  isSelected = false;
  pdfFinal;
  formatoStatus

  /* Variables de estado de los botones */ 
  isVerCampoValid = false;
  isVerEnsayoValid = false;
  isGenerarPDFValid = false;
  isVerPDFValid = false;
  isAutoValid = false;

  /* FIN DE Variables de estado de los botones */ 
  @Output() cambiarCargando = new EventEmitter<any>();
  @Output() reloadComponent = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'CLAVE DEL ESPECIMEN', field: 'claveEspecimen' },
    {headerName: 'FECHA', field: 'fecha' },
    {headerName: 'LOCALIZACI&Oacute;N', field: 'localizacion' },
    {headerName: 'Dias ensaye', field: 'diasEnsaye' },
    {headerName: 'ESTATUS', field: 'statusGeneral' }
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        var statusEnsayo = params.data.statusEnsayo;
        return (status == 2  || status == 4) && statusEnsayo == 4;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status == 5; 
      },
      "row-orange-warning": function(params) {
        var status = params.data.status;
        var statusEnsayo = params.data.statusEnsayo;
        return  status == 3  || statusEnsayo == 2;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id; this.id_footer=params.id3;});
  }
  onGridReady(params){
    this.cambiarCargando.emit(+1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }
  reloadData(){
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/formatoCampo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoCampo', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }

  llenaTabla(repuesta: any){
    this.cambiarCargando.emit(-1);

    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }


  }
  /*Este metodo es llamado por el boton REGISTRO DE CAMPO y llevara al usuario a AgregaRegistroCCH*/
  onLoadCCH(){
    if(this.isSelected){
      this.cambiarCargando.emit(+1);
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/agregaRegistroCCH/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registro]);      
    }else{
      window.alert("Selecciona un ensayo primero");
    }
  }

  onLoadEnsayo(){
    if(this.isSelected){
      if(!this.isVerEnsayoValid){
        window.alert("ESTE ESPECIMEN AUN NO HA SIDO ENSAYADO POR EL TECNICO DE MUESTRAS");
      }else if(this.tipoEnsayo == "VIGAS"){
        this.cambiarCargando.emit(+1);
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaViga/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else if(this.tipoEnsayo == "CUBO"){
        this.cambiarCargando.emit(+1);
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaCubo/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else if(this.tipoEnsayo == "CILINDRO"){
        this.cambiarCargando.emit(+1);
        this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/pruebaCilindro/'+this.id_orden + '/' +this.id_formato +'/' +this.id_footer + '/' + this.id_registroEnsayo]);
      }else{
        window.alert("ERROR, CONTANTE A SOPORTE");
      }
    }else{
      window.alert("Selecciona un ensayo primero");
    }
    

  }
  onClickVizualizarPDF(){
    if(this.statusEnsayo){
      if(this.isVerPDFValid){
        window.open(this.pdfFinal, "_blank");
      }else{
        window.alert("No se ha generado un PDF para este ensayo");
      }
    }else{
      window.alert("Selecciona un ensayo primero");
    }  
  }
  onClickAutorizar(){
    if(this.statusEnsayo){
      if(this.isAutoValid){
        if(window.confirm("\u00BFEst\u00E1 usted seguro de autorizar el PDF generado y enviarlo al personal administrativo para ser enviado y cobrado al cliente?. Esta acci\u00f3n NO se puede revertir.")){
          if(window.confirm("Al autorizar el PDF generado y enviarlo al personal administrativo perder\u00E1 privilegios de edici\u00f3n sobre todos los especimenes de la muestra. Esta acci\u00f3n NO se puede revertir. \u00BFEst\u00E1 usted seguro de continuar?")){
            var confirmation = prompt("Por favor esriba SI para continuar. Escriba cualquier otra palabra para abortar. Recuerde que esta acci\u00f3n no se puede revertir, verifique sus datos antes de continuar", "NO");
            if(confirmation == "SI"){
              this.cambiarCargando.emit(+1);
              let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
              let formData:FormData = new FormData();
              formData.append('function', 'autEnsayoForAdmin');
              formData.append('token', this.global.token);
              formData.append('rol_usuario_id', this.global.rol);

              formData.append('id_formatoCampo', this.id_formato);  
              formData.append('id_ensayo', this.id_registroEnsayo);  
              this.http.post(url, formData).subscribe(res => {
                this.respuestaGeneratePDF(res.json());
              });
            }else{
              window.alert("La operaci\u00f3n ha sido abortada.");
              // Autorizacion cancelada.
            }
          }else{
            window.alert("La operaci\u00f3n ha sido abortada.");
            // Autorizacion cancelada.
          }
        }else{
          window.alert("La operaci\u00f3n ha sido abortada.");
          // Autorizacion cancelada.
        }
      }else{
        window.alert("No es posible autorizar todavia este ensayo.");
      }
    }else{
      window.alert("Selecciona un ensayo primero");
    }
  }
  onClickGenerarPDF(){
    if(this.statusEnsayo){
      if(this.isGenerarPDFValid){
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
    this.cambiarCargando.emit(+1);

    let url = `${this.global.apiRoot}/footerEnsayo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'generatePDFFinal');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('id_formatoCampo', this.id_formato);  
    formData.append('id_ensayo', this.id_registroEnsayo);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaGeneratePDF(res.json());
    });
  }
  respuestaGeneratePDF(res: any){
    if(res.error==0){
      console.log(res);
      //this.cargando=this.cargando-1;
      this.reloadComponent.emit(+1);
      console.log(res);
    }else{
      window.alert(res.estatus);
      location.reload();
    } 
  }
   
  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var tipoEnsayo = "";
    var id_registroEnsayo = "";
    var footerEnsayo_id = "";
    var statusEnsayo;
    var pdfFinal;
    var jefaLabApproval_id;
    this.isSelected = true;
    var status;


    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_registrosCampo;
      tipoEnsayo = selectedRow.tipo;
      id_registroEnsayo = selectedRow.id_ensayo;
      footerEnsayo_id =selectedRow.footerEnsayo_id;
      statusEnsayo = selectedRow.statusEnsayo;
      pdfFinal = selectedRow.pdfFinal;
      jefaLabApproval_id = selectedRow.jefaLabApproval_id;
      status =  selectedRow.status;
    });

    this.pdfFinal=pdfFinal;
    this.id_registro = id;
    this.tipoEnsayo = tipoEnsayo;
    this.id_registroEnsayo = id_registroEnsayo;
    this.footerEnsayo_id = footerEnsayo_id;
    if(statusEnsayo > 0){
      this.statusEnsayo = true;
    }else{
      this.statusEnsayo = false;
    }

    if(Number(status) == 3 && Number(statusEnsayo) > 0){
      console.log("onSelectionChanged :: IF : -1 :: statusEnsayo : "+statusEnsayo);
      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(Number(status) == 0){
      console.log("onSelectionChanged :: IF : 0 :: statusEnsayo : "+statusEnsayo);
      this.isVerCampoValid   = false;
      this.isVerEnsayoValid  = false;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(Number(statusEnsayo) == 0 || statusEnsayo == null){ // registro Sin ensayar.
      console.log("onSelectionChanged :: IF : 1 :: statusEnsayo : "+statusEnsayo);
      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = false;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(Number(statusEnsayo) > 0 && pdfFinal == null){ // Registro ensayado pero sin PDF
      console.log("onSelectionChanged :: IF : 2");

      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = true;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(statusEnsayo  > 0 && pdfFinal != null && jefaLabApproval_id == null){ // Registro ensayado, con PDF pero no Autorizado
      console.log("onSelectionChanged :: IF : 3");
      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = true;
      this.isVerPDFValid     = true;
      this.isAutoValid       = true;
    }else if(statusEnsayo  > 0 && pdfFinal != null && jefaLabApproval_id != null){ // Registro ensayado, con PDF y autorizado
      console.log("onSelectionChanged :: IF : 4");

      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = true;
      this.isAutoValid       = false;
    }else{ // Error
      console.log("onSelectionChanged :: IF : 5");

      this.isVerCampoValid   = false;
      this.isVerEnsayoValid  = false;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }
  }
}
