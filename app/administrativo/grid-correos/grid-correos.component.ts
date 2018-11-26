import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-correos',
  templateUrl: './grid-correos.component.html',
  styleUrls: ['./grid-correos.component.css']
})
export class GridCorreosComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  id_footer: string;
  lote: string;
  rowClassRules;
  selected=false;
  pdfLink;
  tipoNo;
  id_formato;
  id_registrosCampo;
  deleteAbility=false;
  id_correoDeLote;
  noRowDataError;
  noRowData;
  @Output() cambiarCargando = new EventEmitter<any>();
  @Output() reloadComponent = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Cliente', field: 'razonSocial' },
      {headerName: '# Cot.', field: 'cotizacion' },
      {headerName: 'Obra', field: 'obra' },
      {headerName: '# Informe', field: 'informeNo' },
      {headerName: 'Clave Especimen', field: 'claveEspecimen' },
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'F. Colado', field: 'fechaColado' },
      {headerName: '# envios', field: 'sentToClientFinal' }
  ];

    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var corrLoteStatus = params.data.corrLoteStatus;
        var sentToClientFinal = params.data.sentToClientFinal;
        return corrLoteStatus == 0 && sentToClientFinal > 0;
      },
      "row-green-warning": function(params) {
        var corrLoteStatus = params.data.corrLoteStatus;
        return corrLoteStatus > 0;
      }
    };
  }

  ngOnInit() {
     this.data.currentGlobal.subscribe(global => this.global = global);
     this.route.params.subscribe( params => this.lote=params.id); 
  }


  rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.cambiarCargando.emit(+1); 

    let url = `${this.global.apiRoot}/loteCorreos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFormatosByLote');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('lote', this.lote);
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
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No hay ensayos de la obra seleccionada";   
      this.noRowData=true;
    }else{
      this.noRowData=false;
      this.noRowDataError="";   
      this.rowData =repuesta;
    }
  }

   
  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id_correoDeLote = "";
    var link = "";
    var tipoNo = "";
    var id_formato = "";
    var id_registrosCampo = "";
    var corrLoteStatus;
    this.selected=true;

    selectedRows.forEach(function(selectedRow, index) {
      corrLoteStatus = selectedRow.corrLoteStatus;
      id_correoDeLote = selectedRow.id_correoDeLote;
      link = selectedRow.pdfFinal;
      tipoNo = selectedRow.tipoNo;
      id_formato = selectedRow.id_formato;
      id_registrosCampo = selectedRow.id_registrosCampo;
    });
    this.tipoNo = tipoNo;
    this.id_formato = id_formato;
    this.id_registrosCampo = id_registrosCampo;
    this.pdfLink=link;
    this.id_correoDeLote=id_correoDeLote;
    if(corrLoteStatus==0){
      this.deleteAbility=true;
    }else if(corrLoteStatus > 0){
      this.deleteAbility=false;
    }else{
      window.alert("Error en la validacion del estado del registro. Informa de este evento a soporte.");
      this.deleteAbility=false;
    }
  }

  openPDF(){
    window.open(this.pdfLink, "_blank");
  }
  mandarCorreoFinalAClientes(){
    this.cambiarCargando.emit(+1); 
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'sentFinalMailAdministrativo');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', this.global.rol);

    formData.append('tipoNo', this.tipoNo);  
    formData.append('id_formato', this.id_formato);  
    formData.append('id_registrosCampo', this.id_registrosCampo);  
    this.http.post(url, formData).subscribe(res => {
      this.respuestaMandarCorreoFinalAClientes(res.json());
    });
  }
  respuestaMandarCorreoFinalAClientes(res){
    this.reloadComponent.emit(+1);
  }
  deleteRegistro(){
    if(this.deleteAbility){
      if(window.confirm("\u00BFEst\u00E1 usted seguro de eliminar este reporte del lote?")){

        this.cambiarCargando.emit(+1); 
        this.data.currentGlobal.subscribe(global => this.global = global);
        let url = `${this.global.apiRoot}/loteCorreos/post/endpoint.php`;
        let formData:FormData = new FormData();
        formData.append('function', 'deleteCorreoLote');
        formData.append('token', this.global.token);
        formData.append('rol_usuario_id', this.global.rol);

        formData.append('id_correoDeLote', this.id_correoDeLote); 
 
        this.http.post(url, formData).subscribe(res => {
          this.validaRespuesta(res.json());
        });
      }
    }else{
      window.alert("Ya no puedes eliminar este reporte pues ya ha sido enviado al cliente.");
    }
  }
  validaRespuesta(res: any){
    this.cambiarCargando.emit(-1); 

    if(res.error==0){
      window.alert("server regreso con exito");
    }else{
      window.alert("server regreso con error, estatus: "+res.estatus+" error: "+res.error);
    }
  }
}
