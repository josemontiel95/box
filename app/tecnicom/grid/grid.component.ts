import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id_orden: string;
  rowClassRules;
  noRowDataError;

  @Output() cambiarCargando = new EventEmitter<any>();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_footerEnsayo'},
      {headerName: 'TMU', field: 'nombre' },   
      {headerName: 'Tipo', field: 'tipo' },
      {headerName: 'Creado', field: 'fecha' },    
      {headerName: 'Estado', field: 'estado'}
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-blue-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-yelloy-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      },
      "row-orange-warning": function(params) {
        var color = params.data.color;
        return color == 3;
      },
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 4;
      },
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      }
    };
  }

 

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cambiarCargando.emit(+1);
  }


 rowData: any;

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;

    let url = `${this.global.apiRoot}/footerEnsayo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllFooterPendientes');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.llenaTabla(res.json(), "getAllRegistrosFromFooterByID");
    });
  }

  llenaTabla(repuesta: any, caller){
    console.log(repuesta)
    this.cambiarCargando.emit(-1);
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.error==5){
      this.rowData =[];
      this.noRowDataError="No existen Formatos Pendientes.";   
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var tipo = "";

    selectedRows.forEach(function(selectedRow, index) {
      id   = selectedRow.id_footerEnsayo;
      tipo = selectedRow.tipo;
    });
    switch(tipo){
      case 'CILINDRO':
        this.cambiarCargando.emit(+1);
        this.router.navigate(['tecnico/pendientes/dashboardCilindro/'+id]);
      break;
      case 'CUBO':
        this.cambiarCargando.emit(+1);
        this.router.navigate(['tecnico/pendientes/dashboardCubo/'+id]);
      break;
      case 'VIGAS':
        this.cambiarCargando.emit(+1);
        this.router.navigate(['tecnico/pendientes/dashboardViga/'+id]);
      break;
    }
  }


}
