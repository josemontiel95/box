import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tec-app-grid',
  templateUrl: './tecgrid.component.html',
  styleUrls: ['./tecgrid.component.css']
})
export class TecGridComponent implements OnInit  {
   title = 'app';
  global: Global;
  private gridApi;
  rowSelection;
  columnDefs;
  id;
  eventWraper= new Array();
  noRowDataError;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'ID', field: 'id_usuario'},
      {headerName: 'Tecnico', field: 'nombre' },
      {headerName: 'Asistencias al momento', field: 'asistencias' },
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id);
  }



  @Output() mandaTecn = new EventEmitter<any>();
  @Output() cambiarCargando = new EventEmitter<any>();


  onGridReady(params) {
    this.cambiarCargando.emit(+1);

    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllTecOrden');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
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
    }else if(repuesta.registros == 0){
      this.rowData =[];
      this.noRowDataError="No existen técnicos asignados a esta orden.";   
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id; //array

    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_tecnicos_ordenDeTrabajo;
    });
   this.mandaTecn.emit(id);
  }


}
