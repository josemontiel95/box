import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-herramienta-grid',
  templateUrl: './herramienta-grid.component.html',
  styleUrls: ['./herramienta-grid.component.css']
})
export class HerramientaGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  id_formato: string;
  rowSelection;
  columnDefs;
  id: string;
  error: any;
  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'ID', field: 'id_herramienta' },  
    {headerName: 'Tipo', field: 'tipo' },
    {headerName: 'Placas', field: 'placas' },
    {headerName: 'Condicion', field: 'condicion'},

      
    ];
    this.rowSelection = "multiple";
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllHerraOrden');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
    this.http.get(url, {search}).subscribe(res => {
                                                this.error = res.json().error;
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

      //@Input( ) idh: any;

    @Output() eliminaHerra = new EventEmitter<any>();
    @Output() evaluaHerra = new EventEmitter<any>();

    evaluaHerr(cond: any)
    {
    this.evaluaHerra.emit(cond);
 

    }

  eliminaHerr(ids: any) 
  {
    this.eliminaHerra.emit(ids);


  }


  llenaTabla(repuesta: any){

      if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
      if(this.error == 5)
      {
        this.evaluaHerr(this.error);
        console.log(this.error);
      }
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = []; //array
    var cond = "";
    var ids = "";

    selectedRows.forEach(function(selectedRow, index) {
      id.push(selectedRow.id_herramienta);
      cond += selectedRow.condicion;
      ids += selectedRow.id_herramienta;
    });
   this.eliminaHerr(id);
   this.evaluaHerr(ids);
   this.evaluaHerr(cond);


  }


}
