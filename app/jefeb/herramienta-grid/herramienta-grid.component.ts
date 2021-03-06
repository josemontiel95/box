import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-herramienta-grid',
  templateUrl: './herramienta-grid.component.html',
  styleUrls: ['./herramienta-grid.component.css']
})
export class HerramientaGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  gridColumnApi;
  rowSelection;
  columnDefs;
  id: string;
  noRowDataError;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},

      
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
            this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
  }

    @Output() agregaHerra = new EventEmitter<any>();

  agregaHerr(ids: any) {
    this.agregaHerra.emit(ids);
 
    console.log(ids);

  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);

    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllHerraOrden');
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
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else if(repuesta.registros == 0){
      this.rowData =[];
      this.noRowDataError="No existen herramientas asignadas a esta orden.";   
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var condi= "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_herramienta;
      condi += selectedRow.condicion;
    });
   this.agregaHerr(condi);
  }


}
