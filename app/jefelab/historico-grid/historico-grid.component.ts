import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-grid',
  templateUrl: './historico-grid.component.html',
  styleUrls: ['./historico-grid.component.css']
})
export class HistoricoGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  noRowDataError;
  id_Footer: string;
  tipoNo;
  ordenTrabajo;
  id = "";
  tipo = "";
  ruta = 0;
  selected = false;
  noRowData = false;


  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'CTRL FORMATO', field: 'id' },    
      {headerName: 'INFORME N&Uacute;MERO', field: 'informeNo' },
      {headerName: 'TIPO', field: 'tipo' },
      {headerName: 'ACCION REQUERIDA', field: 'accReq' }
    ];
    this.rowSelection = "single";
  }

  rowData: any;
  @Output() cambiarCargando = new EventEmitter<any>();

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id_orden=params.id);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.cambiarCargando.emit(+1);
    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAwaitingApprovalSeen');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
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
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen formatos para esta orden.";   
      this.noRowData=true;

    }else{
      this.rowData =repuesta;
      this.noRowData=false;

    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var tipoo;
    var rutaa;
    var tipoNo;
    var id;
    var ordenDeTrabajo_id;
    var id_footerEnsayo;

    selectedRows.forEach(function(selectedRow, index) {
      tipoNo = selectedRow.tipoNo;
      id     = selectedRow.id;
      id_footerEnsayo = selectedRow.id_footerEnsayo
      ordenDeTrabajo_id = selectedRow.ordenDeTrabajo_id;
    });

    this.ordenTrabajo = ordenDeTrabajo_id; //ID Orden Trabajo
    this.id =id;                           //ID Formato
    this.id_Footer = id_footerEnsayo;      //ID Footer 
    this.tipo =tipoo;
    this.ruta =rutaa;
    console.log("Que paso: "+this.id);
    this.selected= true;
    this.tipoNo = tipoNo;

  }

  selectOption(){
    this.cambiarCargando.emit(+1);
    if(this.tipoNo == 1){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaRevenimiento/'+ this.ordenTrabajo + "/" + this.id]);
    }else if(this.tipoNo > 1){
      this.router.navigate(['jefeLaboratorio/orden-trabajo/dashboard/llenaFormatoCCH/'+this.ordenTrabajo + "/" + this.id + "/" + this.id_Footer]);
    }else if(this.tipoNo == 0){
      window.alert("Error. Algo salió mal. Contacta a soporte.");
    }
  }

}
