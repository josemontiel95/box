import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
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
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id;
  eventWraper= new Array();

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
      {headerName: 'ID', field: 'id_usuario'},
      {headerName: 'Tecnico.', field: 'nombre' },
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
    this.route.params.subscribe( params => this.id=params.id);
  }



    @Output() mandaTecn = new EventEmitter<any>();

  mandaTec( ) {
    this.mandaTecn.emit(this.eventWraper);
    console.log(this.eventWraper);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    console.log("this.global.apiRoot"+this.global.apiRoot);
    console.log("this.global.token"+this.global.token);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getTecnicosAvailableForLab');
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
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = 22; //array

    selectedRows.forEach(function(selectedRow, index) {
      //id.push(selectedRow.id_usuario);
      id += selectedRow.id_tecnicos_ordenDeTrabajo;
    });
     this.eventWraper.push({'id' : id});
   this.mandaTec( );
  }


}