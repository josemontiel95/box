import { Component, ViewChild ,OnInit, Output, EventEmitter} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrosrev-grid',
  templateUrl: './registrosrev-grid.component.html',
  styleUrls: ['./registrosrev-grid.component.css']
})
export class RegistrosRevGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  id_orden: string;
  id_formato: string;
  id_registro: string;
  id_footer: string;
  rowSelection;
  columnDefs;
  rowClassRules;
  isSelected = false;
  pdfFinal;
  statusEnsayo;


  /* Variables de estado de los botones */ 
  isVerCampoValid = false;
  isVerEnsayoValid = false;
  isGenerarPDFValid = false;
  isVerPDFValid = false;
  isAutoValid = false;

  @Output() cambiarCargando = new EventEmitter<any>();
  @Output() statusForm = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'FECHA REG', field: 'fecha' },
    /*
    {headerName: 'FECHA', field: 'fecha' },
    {headerName: 'F&rsquo;C', field: 'fprima'},
    {headerName: 'REVENIMIENTO: PROYECTO', field: 'revProyecto'},
    {headerName: 'REVENIMIENTO: OBRA', field: 'revObra'},
    {headerName: 'TAMA&Ntilde;O NOMINAL DEL AGREGADO (mm)', field: 'tamagregado' },
    {headerName: 'VOLUMEN (m<sup>2</sup>)', field: 'volumen' },
    {headerName: 'TIPO DE CONCRETO', field: 'tipoConcreto' },
    {headerName: 'UNIDAD', field: 'herramienta_id' },
    {headerName: 'HORA DE MUESTREO EN OBRA', field: 'horaMuestreo' },
    {headerName: 'TEMP AMBIENTE DE MUESTREO (&#176;C)', field: 'tempMuestreo' },
    {headerName: 'TEMP AMBIENTE DE RECOLECCI&Oacute;N (&#176;C)', field: 'tempRecoleccion' },
    {headerName: 'LOCALIZACI&Oacute;N', field: 'localizacion' },
    */
    {headerName: 'ESTATUS', field: 'status' }

      
    ];
    this.rowSelection = "single";

    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var status = params.data.status;
        return status == 1;
      },
      "row-green-warning": function(params) {
        var status = params.data.status;
        return status > 1;
      }
    };
  }

  rowData: any;

  ngOnInit() {
      this.data.currentGlobal.subscribe(global => this.global = global);
      this.route.params.subscribe( params => {this.id_orden = params.id2; this.id_formato=params.id; this.id_footer=params.id3;});
  }

  cargando(num){
    this.cambiarCargando=this.cargando + num;
  }

  onGridReady(params) {
    this.cargando(+1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/formatoRegistroRev/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllRegistrosByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_formatoRegistroRev', this.id_formato);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  llenaTabla(repuesta: any){
    this.cargando(-1);
    console.log(repuesta);
    let isValid=true;
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      console.log("Error Contactar a Soporte");
      isValid=false;
    }else{
      this.rowData =repuesta;
      isValid=true;
      repuesta.forEach(function (value) {
        if(value.status == "0"){
           isValid = false;
        }
      });
    }
    this.statusForm.emit(isValid);
  }



   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
   /* var id = "";
    this.isSelected = true;

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_registrosRev;
      
    });
    this.id_registro = id;
    //this.cargando(+1);
    //this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' +this.id_formato +'/' +id]); */

    var id = "";
    var tipoEnsayo = "";
    var id_registroEnsayo = "";
    var footerEnsayo_id = "";
    var statusEnsayo;
    var pdfFinal;
    var jefaLabApproval_id;
    this.isSelected = true;


    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_registrosRev; //Listo
      tipoEnsayo = selectedRow.tipo;
      id_registroEnsayo = selectedRow.id_ensayo;
      footerEnsayo_id =selectedRow.footerEnsayo_id;
      statusEnsayo = selectedRow.status;
      pdfFinal = selectedRow.pdfFinal;
      jefaLabApproval_id = selectedRow.jefaLabApproval_id;
    });

    this.pdfFinal=pdfFinal;
    this.id_registro = id;
    //this.tipoEnsayo = tipoEnsayo;
    //this.id_registroEnsayo = id_registroEnsayo;
    //this.footerEnsayo_id = footerEnsayo_id;
    if(statusEnsayo > 0){
      this.statusEnsayo = true;
    }else{
      this.statusEnsayo = false;
    }

    if(Number(statusEnsayo) == 0 || statusEnsayo == null){ // registro Sin ensayar.
      window.alert("onSelectionChanged :: IF : 1 :: statusEnsayo : "+statusEnsayo);
      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = false;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(Number(statusEnsayo) > 0 && pdfFinal == null){ // Registro ensayado pero sin PDF
      window.alert("onSelectionChanged :: IF : 2");

      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = true;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }else if(statusEnsayo  > 0 && pdfFinal != null && jefaLabApproval_id == null){ // Registro ensayado, con PDF pero no Autorizado
      window.alert("onSelectionChanged :: IF : 3");
      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = true;
      this.isVerPDFValid     = true;
      this.isAutoValid       = true;
    }else if(statusEnsayo  > 0 && pdfFinal != null && jefaLabApproval_id != null){ // Registro ensayado, con PDF y autorizado
      window.alert("onSelectionChanged :: IF : 4");

      this.isVerCampoValid   = true;
      this.isVerEnsayoValid  = true;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = true;
      this.isAutoValid       = true;
    }else{ // Error
      window.alert("onSelectionChanged :: IF : 5");

      this.isVerCampoValid   = false;
      this.isVerEnsayoValid  = false;
      this.isGenerarPDFValid = false;
      this.isVerPDFValid     = false;
      this.isAutoValid       = false;
    }
  }

  onLoadRev(){
    if(this.isSelected){
      this.cargando(+1);
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/agregaRegistroRevenimiento/'+this.id_orden + '/' +this.id_formato +'/' + this.id_registro]);      
    }else{
      window.alert("Selecciona un ensayo primero");
    }
  }


}
